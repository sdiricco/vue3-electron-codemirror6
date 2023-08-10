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

