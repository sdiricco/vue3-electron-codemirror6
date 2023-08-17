import { exsistPath, readDir } from "./nodeApi";
import chokidar from "chokidar";
import EventEmitter from 'eventemitter3'



const chockidarConfig = {
  ignoreInitial: true,
  depth: 0
}


export class Tree extends EventEmitter {
  private dirPath: string;
  private tree: any[];
  private watchers: any[];
  private enableWatcher: boolean;
  private removingFolder: boolean;
  constructor(data: {enableWatcher: boolean}){
    super();
    this.removingFolder = false;
    this.dirPath = '';
    this.tree = [];
    this.watchers = [];
    this.enableWatcher = data.enableWatcher;
    this.onWatcherEvent = this.onWatcherEvent.bind(this)
  }
  /******************************************/
  /* PUBLIC */
  /******************************************/

  //create tree
  async create(dirPath: string): Promise<any[]> | null{
    if (this.tree.length) {
      console.warn('Tree already exists. Destroy first')
      return null;
    }
    const items = await readDir({ dirPath });
    this.tree = createTree(items, null);
    if (this.enableWatcher) {
      this.watchNode(dirPath, null);
    }
    this.dirPath = dirPath;
    return this.tree;
  }

  //create children and attach to node. The node must be a directory
  async createNodeChildren(node: any):Promise<any[]>{
    if (node.children) {
      return this.tree;
    }
    const dirPath = node.item.path
    const items = await readDir({ dirPath });
    const tree = createTree(items, node.id);
    node.children = tree
    if (this.enableWatcher) {
      this.watchNode(dirPath, node.id);
    }
    this.tree = updateTree(this.tree, node.id, node)
    return this.tree
  }

  //destroy tree
  async destroy(): Promise<void>{
    await this.destroyWatchers();
    this.tree = [];
    this.dirPath = '';
  }

  //watch node
  watchNode(dirPath:string, id: string | null):void{
    const watcher = {
      id,
      value: chokidar.watch(dirPath, chockidarConfig)
    }
    this.watchers.push(watcher)
    watcher.value
      .on("add", () => this.onWatcherEvent(watcher.id))
      .on("addDir", () => this.onWatcherEvent(watcher.id))
      // .on('unlinkDir')// must be tested
      .on("unlink", () => this.onWatcherEvent(watcher.id));
  }

  async removeWatcher(id:string | null){
    if (!id) {
      return;
    }
    const index = this.watchers.findIndex(w => w.id == id);
    if (index > -1) {
      await this.watchers[index].value.close()
      this.watchers.splice(index, 1)
    }
  }

  async destroyWatchers():Promise<void>{
    for(let watcher of this.watchers){
      await watcher.value.close()
    }
    this.watchers = [];
  }


  async onWatcherEvent(id: string | null):Promise<void>{
    if (this.removingFolder) {
      return;
    }
    console.log('id', id);
    if (id) {
      const node = getNodeById(this.tree, id)
      const dirPath = node.item.path;
      const oldTree = node.children;
      //read files and folders
      const items = await readDir({ dirPath });
      let newTree = createTree(items)
      newTree = mergeChildren(newTree, oldTree); 
      node.children = newTree;
      this.tree = updateTree(this.tree, id, node) 
    }
    else{
      const dirPath = this.dirPath;
      const oldTree = this.tree;
      //read files and folders
      const items = await readDir({ dirPath });
      let newTree = createTree(items)
      this.tree = mergeChildren(newTree, oldTree); 
    }
    this.emit('update-tree', this.tree);
  }
}



/************************************************************************************************************/
/* UTILS */
/************************************************************************************************************/

//update tree by id
export function updateTree(tree:Array<any> = [], nodeId = null, item = null):Array<any> {
  for (let i = 0; i< tree.length; i++) {
    if (tree[i].id === nodeId) {
      tree[i] = item;
      return tree;
    }
    if (tree[i].children && tree[i].children.length > 0) {
      if (updateTree(tree[i].children, nodeId, item).length) {
        return tree;
      }
    }
  }
  return [];
}

//get tree node by id
export function getNodeById(tree:Array<any> = [], nodeId = null):any {
  for (let i = 0; i< tree.length; i++) {
    if (tree[i].id === nodeId) {
      return tree[i];
    }
    if (tree[i].children && tree[i].children.length > 0) {
      if (getNodeById(tree[i].children, nodeId).length) {
        return tree[i];
      }
    }
  }
  return null;
}

//create a node
function createNode(item: any, i: number, parentId?: number){
  const type = item.type;
  const leaf = type === "directory" ? false : true;
  const id = parentId ? `${parentId}-${String(i)}` : String(i)
  return {
    key: id,
    id: id,
    label: item.name,
    data: item.name,
    item: item,
    leaf,
  };
}

//create tree
function createTree(items: any[], parentId?: number):any[]{
  return items.map((item, i) => createNode(item, i, parentId))
}

//merge tree 
function mergeChildren(treeDest: any[], treeSource: any[]): any[]{
  return treeDest.map((treeItem:any) => {
    const oldTreeItem = treeSource.find(_ => _.id === treeItem.id)
    if(oldTreeItem && oldTreeItem.children && oldTreeItem.children.length){
      treeItem.children = oldTreeItem.children;
    }
    return treeItem
  })
}

