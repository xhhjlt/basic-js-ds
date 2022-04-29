const {
  NotImplementedError
} = require('../extensions/index.js');

const {
  Node
} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rooot = null;
  }

  root() {
    return this.rooot;
  }

  add(data) {

    /*function addToSubTree(subtree, data) {
      if (!(subtree)) return new Node(data);

      if (data < subtree.data) subtree.left = addToSubTree(subtree.left, data);

      if (data > subtree.data) subtree.right = addToSubTree(subtree.right, data);

      return subtree;
    }
    this.rooot = addToSubTree(this.rooot, data)*/
    if (!this.rooot) {
      this.rooot = new Node(data);
      return;
    }
    let parent = null;
    let subtree = this.rooot;
    while (subtree) {
      if (subtree.data === data) return;
      parent = subtree;
      if (data < parent.data) subtree = parent.left;
      if (data > parent.data) subtree = parent.right;
    }
    subtree = new Node(data);
    if (data < parent.data) parent.left = subtree;
    if (data > parent.data) parent.right = subtree;

  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let subtree = this.rooot;
    while (subtree) {
      if (subtree.data === data) break;
      if (data < subtree.data) {
        subtree = subtree.left;
      } else {
        subtree = subtree.right;
      }
    }
    return subtree;
  }
  remove(data) {
    if (!this.has(data)) return;
    this.rooot = deleteNode(data, this.rooot);

    function deleteNode(data, subtree) {
      if (!subtree) return null;

      if (data < subtree.data) {
        subtree.left = deleteNode(data, subtree.left);
        return subtree;
      }

      if (data > subtree.data) {
        subtree.right = deleteNode(data, subtree.right);
        return subtree;
      }

      if (data === subtree.data) {
        if (!(subtree.left || subtree.right)) {
          return null
        }
        if (subtree.right && !subtree.left) {
          subtree = subtree.right;
          return subtree;
        }
        if (!subtree.right && subtree.left) {
          subtree = subtree.left;
          return subtree;
        }
        if (subtree.right && subtree.left) {
          let newSubTree = new BinarySearchTree;
          newSubTree.rooot = subtree.right;
          let minRight = newSubTree.min();
          subtree.data = minRight;
          subtree.right = deleteNode(minRight, subtree.right);
          return subtree;
        }
      }
    }
  }
  /*remove(data) {
    if (!this.has(data)) return;
    let isParentLeft = false;
    let subtree = this.rooot;
    let parent = null;
    while (subtree) {
      if (subtree.data === data) {
        if (!(subtree.left || subtree.right)) {
          if (parent) {
            if (isParentLeft) {
              parent.left = null;
            } else {
              parent.right = null;
            }
          } else {
            this.rooot = null;
          }
          return;
        }
        if (subtree.right && !subtree.left) {
          if (parent) {
          if (isParentLeft) {
            parent.left = subtree.right;
          } else {
            parent.right = subtree.right;
          }
            } else {
            this.rooot = subtree.right;
          }
          return;
        }
        if (!subtree.right && subtree.left) {
          if (parent) {
          if (isParentLeft) {
            parent.left = subtree.left;
          } else {
            parent.right = subtree.left;
          }
          } else {
            this.rooot = subtree.left;
          }
          return;
        }
        if (subtree.right && subtree.left) {
          let newSubTree = new BinarySearchTree;
          newSubTree.rooot = subtree.right;
          let minRight = newSubTree.min();

          //console.log(newSubTree);
          //console.log(minRight);

          subtree.data = minRight;
          subtree = subtree.right;
          data = minRight;
        }
      }
      parent = subtree;
      if (data < subtree.data) {
        isParentLeft = true;
        subtree = subtree.left;
      } else if (data > subtree.data) {
        isParentLeft = false;
        subtree = subtree.right;
      }
    }
  }*/

  min() {
    if (!this.rooot) return null;
    let subtree = this.rooot;
    let parent = null;
    while (subtree) {
      parent = subtree;
      subtree = subtree.left;
    }
    return parent.data;
  }

  max() {
    if (!this.rooot) return null;
    let subtree = this.rooot;
    let parent = null;
    while (subtree) {
      parent = subtree;
      subtree = subtree.right;
    }
    return parent.data;
  }
}

module.exports = {
  BinarySearchTree
};