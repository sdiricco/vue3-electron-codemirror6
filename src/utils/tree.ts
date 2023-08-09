import {cloneDeep, flatMapDeep, merge} from "lodash";

export function treeToArray(array:Array<any> = [],): Array<any> {
  const _array = cloneDeep(array)
  const iterateFn = (item: any):any => {
    return !item.children || !item.children.length ? item : [item, flatMapDeep(item.children, iterateFn)];
  };
  return flatMapDeep(_array, iterateFn);
}

export function arrayToTree(array:Array<any> = [], { id = null } = {}): Array<any> {
  return array
    .filter((item:any) => item.parentId === id)
    .map((item:any) => ({
      ...cloneDeep(item),
      children: arrayToTree(array, { id: item.id }),
    }))
    .map((item:any) => {
      if (!item.children.length) {
        delete item.children;
      }
      return item;
    });
}

/* UPDATE ITEM FROM MENU BY ID */
export function updateItem(tree = [], id = null, item = {}):Array<any> {
    const _tree = cloneDeep(tree)
    let array = treeToArray(_tree);

    const idx = array.findIndex((item) => item.id === id);
    if (idx >= 0) {
      array[idx] = merge(array[idx], item) ;
    }

    let array2 = treeToArray(array)
    console.log(array2);
    
    return arrayToTree(array2);
  }

export function updateTreeNodeById(tree:Array<any> = [], nodeId = null, item = null) {
    for (let i = 0; i< tree.length; i++) {
      if (tree[i].id === nodeId) {
        console.log('here')
        tree[i] = item;
        return tree; // Node updated
      }
      if (tree[i].children && tree[i].children.length > 0) {
        if (updateTreeNodeById(tree[i].children, nodeId, item)) {
          return tree; // Node updated
        }
      }
    }
    return false; // Node not found
  }

