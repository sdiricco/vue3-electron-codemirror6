import { readDir } from "./nodeApi";
import chokidar from "chokidar";
import EventEmitter from 'eventemitter3'
import {merge}from 'lodash'

const disableWatcher = true;

export const event = new EventEmitter();


let tree = [];
let dirPath = '';
const chockidarConfig = {
  ignoreInitial: true,
  depth: 0
}
const watchers = [];

function attachListenersToWatcher(watcher: {id: any, value:any}){
  const log = console.log.bind(console);
  watcher.value
    .on("add", (path) => refreshNode(watcher.id))
    .on("addDir", (path) => log(`id: ${watcher.id} - File ${path} has been added`))
    .on("change", (path) => log(`id: ${watcher.id} - File ${path} has been changed`))
    .on("unlink", (path) => refreshNode(watcher.id));
} 

async function refreshNode(nodeId: any){
  let nodeDir = ''
  if (nodeId === 'root') {
    nodeDir = dirPath
  }
  else{
    const node = getTreeNodeById(tree, nodeId);
    nodeDir = node.item.path
  }
  const items = await readDir({ dirPath: nodeDir });
  updateTreeRoot()
  event.emit('update-tree', items)
}

// create tree
// create a tree reading directory. This function is not recursively
export async function createTree(_dirPath = "") {
  dirPath = _dirPath;
  const items = await readDir({ dirPath });
  // const watcher = {
  //   id: 'root',
  //   value: chokidar.watch(dirPath, chockidarConfig)
  // }
  // watchers.push(watcher)
  // attachListenersToWatcher(watcher)

  tree = createNode(items)

  return tree;
}

async function updateTreeRoot(){
  const items = await readDir({ dirPath });
  const newtree = createNode(items)
  tree = updateNode(tree, newtree)
  return tree;
}



// update directory tree
// Passing a tree and a directory tree node, returns a new tree with contents
export async function updateDirectoryTree(tree:Array<any>, node:any, overwrite?:boolean){
  //if exist children it means that the directory tree is already read
  if(node.children && !overwrite){
    return tree;
  }
  const items = await readDir({ dirPath: node.item.path });
  // const dirWatcher = chokidar.watch(node.item.path , chockidarConfig)
  // const watcherLenght = watchers.push({
  //   id: node.id,
  //   value: dirWatcher
  // })
  // attachListenersToWatcher(watchers[watcherLenght - 1])

  const _node = appendChildrenToNode(node, items)
  tree = updateTreeNodeById(tree, _node.id, _node)
  return tree;
}

//create a node
function createNode(items: Array<any>){
  return items.map((item: any, i: number) => {
    const type = item.type;
    const leaf = type === "directory" ? false : true;
    return {
      key: String(i),
      id: String(i),
      label: item.name,
      data: item.name,
      item: item,
      leaf,
    };
  });
}

function updateNode(oldNode: Array<any>, newNode: Array<any>){
  return merge(oldNode, newNode);
}

//append children to node
function appendChildrenToNode(node:any, children:Array<any>){
  node.children = children.map((item:any, i:number) => {
    const type = item.type;
    const leaf = type === 'directory' ? false : true
    return {
      key: `${node.key}-${String(i)}`,
      id: `${node.id}-${String(i)}`,
      label: item.name,
      data: item.name,
      item: item,
      leaf,
    }
  })
  return node;
}

//utils
export function updateTreeNodeById(tree:Array<any> = [], nodeId = null, item = null):Array<any> {
  for (let i = 0; i< tree.length; i++) {
    if (tree[i].id === nodeId) {
      tree[i] = item;
      return tree;
    }
    if (tree[i].children && tree[i].children.length > 0) {
      if (updateTreeNodeById(tree[i].children, nodeId, item).length) {
        return tree;
      }
    }
  }
  return [];
}

export function getTreeNodeById(tree:Array<any> = [], nodeId = null):any {
  for (let i = 0; i< tree.length; i++) {
    if (tree[i].id === nodeId) {
      return tree[i];
    }
    if (tree[i].children && tree[i].children.length > 0) {
      if (getTreeNodeById(tree[i].children, nodeId).length) {
        return tree[i];
      }
    }
  }
  return null;
}