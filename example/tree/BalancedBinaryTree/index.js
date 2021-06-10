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
      node.right = node.right ? this._insert(node.right, newNode) : newNode
      // 添加完节点后检测树的高度
      let leftHeight = this._height(node.left)
      let rightHeight = this._height(node.right)
      if (rightHeight - leftHeight > 1) {
        /** RR 旋转*/
        node = this.rRotation(node)
      }
    } else if (newNode.data < node.data) {
      node.left = node.left ? this._insert(node.left, newNode) : newNode
      let leftHeight = this._height(node.left)
      let rightHeight = this._height(node.right)
      if (leftHeight - rightHeight > 1) {
        /** LL 旋转*/
        node = this.lRotation(node)
      }
    }

    return node
  }

  getHeight() {
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

  rRotation(node) {
    /**
     * 1. 破坏者是发现者的右节点的右节点                    10 发现者                      15
     *    平衡方法：                                     /   \                         /   \
     *       将发现者的右节点作为根节点                  8     15           RR         10    20
     *       原根节点作为新的根节点的左子树                   /   \         ---->     /   \    \
     *       新的根节点原有的左子树作为新根节点的右子树       13    20                8     13   25
     *                                                           \
     *                                                            25 破坏者
     */

    /**
     * 2. 破坏者是发现者的右节点的左节点                    10 发现者                   10                         15
     *    平衡方法：                                     /   \                      /   \                      /   \
     *       将发现者的右节点作为根节点                  8     15           L        8    15      R            10    20
     *       原根节点作为新的根节点的左子树                   /   \          ---->       /   \      ----->    /   \    \
     *       新的根节点原有的左子树作为新根节点的右子树       13    20                   13    18             8    13    25
     *                                                          /                            \
     *                                                         18 破坏者                      20
     */
    let temp = node.right // 找到新的根节点
    node.right = null
    let oldNode = node
    if (temp.right.left) {
      // 如果新的根节点有左子树，将左子树作为原根节点的右子树
      oldRoot.right = temp.right.left
      temp.right.left = null
    }
    temp.left = oldNode // 将原有的根节点作为新的根节点的左子树
    return temp
  }

  lRotation(node) {
    /**
     * 破坏者是发现者的左节点的左节点                           10 发现者                     5
     *    平衡方法：                                         /  \                         /   \
     *       将发现者的左节点作为根节点                      5     15        LL            3    10
     *       原根节点作为新的根节点的右子树                 /  \             ---->        /    /   \
     *       新的根节点原有的右子树作为新根节点的左子树     3    8                        1    8     15
     *                                                  /
     *                                                 1  破坏者
     */

    /**
     * 2. 破坏者是发现者的左节点的右节点                        10 发现者                   10                     5
     *    平衡方法：                                         /   \                      /   \                  /   \
     *       将发现者的左节点作为根节点                      5     15      R            5     15     L         4     10
     *       原根节点作为新的根节点的右子树                 /  \           ---->       /  \         ----->    /     /   \
     *       新的根节点原有的右子树作为新根节点的左子树     3    8                     4    8                 3     8     15
     *                                                   \                         /
     *                                                    4  破坏者                3
     */
    let temp = node.left // 找出新的根节点
    node.left = null
    let oldNode = node
    if (temp.left.right) {
      // 如果新的根节点有右节点，将右子树作为原根节点的左子树
      oldNode.left = temp.left.right
      temp.left.right = null
    }
    temp.right = oldNode // 将原根节点作为新的根节点的右子树
    return temp
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
}

let treeInstance = new AVLTree()

treeInstance.insert(10)
treeInstance.insert(9)
treeInstance.insert(8)
treeInstance.insert(7)
treeInstance.insert(6)
treeInstance.insert(5)
treeInstance.insert(4)
let ret = treeInstance.levelOrder()
console.log(ret)
console.log(treeInstance.getHeight())
console.log(JSON.stringify(treeInstance.root))
