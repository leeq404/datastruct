class Node {
  constructor(data) {
    this.left = null
    this.data = data
    this.right = null
  }
}

class AVLTree {
  constructor() {
    this.root = null
    this.size = 0
    this.stack = []
    this.outPut = []
  }

  insert(data) {
    this.root = this._insert(this.root, new Node(data))
  }

  _insert(node, newNode) {
    if (!node) {
      return newNode
    }
    if (newNode.data > node.data) {
      /** 节点在根节点的右子树上 */
      node.right = node.right ? this._insert(node.right, newNode) : newNode
      // 添加完节点后检测树的高度
      if (this._height(node.right) - this._height(node.left) > 1) {
        /** 在不平衡的状态下判断是RR旋转还是RL旋转 */
        if (this._height(node.right.right) > this._height(node.right.left)) {
          /** 在右子树的右子树上，应当进行RR旋转 */
          node = this.RRRotation(node)
        } else {
          /** 在右子树的左子树上，应当进行RL旋转*/
          node = this.RLRotation(node)
        }
      }
    } else if (newNode.data < node.data) {
      node.left = node.left ? this._insert(node.left, newNode) : newNode
      if (this._height(node.left) - this._height(node.right) > 1) {
        if (this._height(node.left.left) > this._height(node.left.right)) {
          /** LL旋转 */
          node = this.LLRotation(node)
        } else {
          /** LR旋转 */
          node = this.LRRotation(node)
        }
      }
    }

    return node
  }

  treeHeight() {
    return this._height(this.root)
  }

  _height(node) {
    let MaxHeight = 0
    if (!node) {
      return 0
    } else {
      let leftheight = 1 + this._height(node.left)
      let rightHight = 1 + this._height(node.right)
      MaxHeight = Math.max(leftheight, rightHight)
    }
    return MaxHeight
  }

  RRRotation(node) {
    /**
     * 1. 破坏者是发现者的右子树的右子树上                  10 发现者                      15
     *    平衡方法：                                     /   \                         /   \
     *       将发现者的右节点作为根节点                  8     15           RR         10    20
     *       原根节点作为新的根节点的左子树                   /   \         ---->     /   \    \
     *       新的根节点原有的左子树作为新根节点的右子树       13    20                8     13   25
     *                                                           \
     *                                                            25 破坏者
     */

    let temp = node.right // 找到新的根节点
    node.right = null
    let oldNode = node
    if (temp.left) {
      // 如果新的根节点有左子树，将左子树作为原根节点的右子树
      oldNode.right = temp.left
      temp.left = null
    }
    temp.left = oldNode // 将原有的根节点作为新的根节点的左子树
    return temp
  }

  RLRotation(node) {
    /**
     *  破坏者是发现者的右子树的左子树上                        10                           12
     *    平衡方法：                                         /   \                        /   \
     *       将根节点的右子树的左节点作为新的根节点            8     15           RL       10    15
     *       将新的根节点的左子树作为原根节点的右子树               /  \         ---->    /     /  \
     *       将新节点的右子树作为原根节点的右子树的左子树          12    18               8     11  28
     *                                                        /
     *                                                       11
     */
    let temp = node.right
    let newRoot = temp.left
    node.right = newRoot.left
    temp.left = newRoot.right
    newRoot.left = node
    newRoot.right = temp
    return newRoot
  }

  LLRotation(node) {
    /**
     * 破坏者是发现者的左子树的左子树上                          10 发现者                     5
     *    平衡方法：                                         /   \                        /   \
     *       将发现者的左节点作为根节点                      5     15        LL            3    10
     *       原根节点作为新的根节点的右子树                 /  \             ---->        /    /   \
     *       新的根节点原有的右子树作为新根节点的左子树     3    8                        1    8     15
     *                                                  /
     *                                                 1  破坏者
     */
    let temp = node.left // 找出新的根节点
    node.left = null
    let oldNode = node
    if (temp.right) {
      // 如果新的根节点有右节点，将右子树作为原根节点的左子树
      oldNode.left = temp.right
      temp.right = null
    }
    temp.right = oldNode // 将原根节点作为新的根节点的右子树
    return temp
  }

  LRRotation(node) {
    /**
     *  破坏者是在发现者的左子树的右子树上                       10                           8
     *    平衡方法：                                         /   \                        /   \
     *       将原根节点的左子树的右节点作为新的根节点         5     15      LR              5    10
     *       将新的根节点的左子树作为原根节点左子树的右子树  /  \           ---->          /  \    \
     *       将新的根节点的右子树作为原根节点的左子树      3    8                        3    7    15
     *                                                      /
     *                                                     7
     */
    let temp = node.left
    let newRoot = temp.right
    temp.right = newRoot.left
    node.left = newRoot.right
    newRoot.left = temp
    newRoot.right = node
    return newRoot
  }

  // 层次遍历
  levelOrder() {
    this.outPut = []
    this.stack.push(this.root)
    while (this.stack.length) {
      let currentNode = this.stack.shift()
      this.outPut.push(currentNode.data)
      if (currentNode.left) {
        this.stack.push(currentNode.left)
      }
      if (currentNode.right) {
        this.stack.push(currentNode.right)
      }
    }
    return this.outPut
  }

  find(data) {
    let currentNode = this.root
    while (currentNode) {
      if (currentNode.data == data) {
        return currentNode
      } else if (currentNode.data > data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }
    console.log('Not find element in the balanced tree.')
    return false
  }

  findParentNode(data) {
    let currentNode = this.root
    while (currentNode) {
      if (data < currentNode.data) {
        if (currentNode.left && currentNode.left.data == data) {
          return currentNode
        } else {
          currentNode = currentNode.left
        }
      } else if (data > currentNode.data) {
        if (currentNode.right && currentNode.right.data == data) {
          return currentNode
        } else {
          currentNode = currentNode.right
        }
      } else {
        return currentNode
      }
    }
    console.log('Not find the element parent in the balanced tree.')
    return false
  }

  delete(data) {
    this.root = this._removeNode(this.root, data)
  }

  _removeNode(node, data) {
    /** 删除一个节点的相当于在相反的子树上添加一个节点 */
    if (!node) return null
    if (node.data == data) {
      if (!node.left && !node.right) {
        node = null
      } else if (!node.left) {
        /** 左子树不存在 */
        node = node.right
      } else if (!node.right) {
        /** 右子树不存在 */
        node = node.left
      } else {
        /** 左右子树都存在的情况 */
        let maxNode = this._findMax(node.left)
        node.data = maxNode.data
        node.left = this._removeNode(node.left, maxNode.data)
        /** 找到父节点后检测父节点是否平衡 */
      }
      /** 每次删除一个节点检测当前树的高度
       *  找到删除了的节点的父节点，检测左右子树高度
       */
    } else if (node.data > data) {
      node.left = this._removeNode(node.left, data)
    } else {
      node.right = this._removeNode(node.right, data)
    }
    /** 在回溯阶段检测该节点的平衡性 */
    if (node) {
      node = this.adjustTree(node)
    }
    return node
  }

  adjustTree(node) {
    if (!node) return null
    if (this._height(node.left) - this._height(node.right) > 1) {
      // 左旋
      if (this._height(node.left.left) > this._height(node.left.right)) {
        // LL旋转
        node = this.LLRotation(node)
      } else {
        // LR旋转
        node = this.LRRotation(node)
      }
    } else if (this._height(node.right) - this._height(node.left) > 1) {
      // 右旋
      if (this._height(node.right.left) > this._height(node.right.right)) {
        // RR旋转
        node = this.RLRotation(node)
      } else {
        // RL旋转
        node = this.RRRotation(node)
      }
    }
    return node
  }

  _findMin(node) {
    return !node ? null : node.left ? this._findMin(node.left) : node
  }

  _findMax(node) {
    return !node ? null : node.right ? this._findMax(node.right) : node
  }
}

