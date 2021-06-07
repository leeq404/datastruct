class Node {
  /** 节点 */
  constructor(data) {
    this.left = null
    this.data = data
    this.right = null
  }
  show() {
    return this.data
  }
}

class BSTree {
  /**
   * 二叉搜索树中很多操作都是基于递归来实现的，因此需要深入理解什么是递归？
   * 递归的优势和劣势是什么？
   * 能否不适用递归完成二叉搜素树中的功能？
   * 二叉树中的主要功能：
   *  节点插入
   *  节点删除
   *  树中的最大值
   *  树中的最小值
   *  树的高度
   *  树中节点的数量
   *  节点的遍历
   *    先序
   *    中序
   *    后序
   *    层次
   */

  size = 0           /** 树节点数量 */
  stack = []         /** 遍历堆栈 */
  outPut = []        /** 使用不同排序模式输出的顺序数组 */
  constructor() {
    this.root = null
  }

  // 节点插入
  insert(data) {
    /**
     * 左节点始终小于根节点，右节点始终大于根节点
     * 左节点始终小于右节点
     * 没有相等的节点
     */
    let newNode = new Node(data)
    if (!this.root) {
      this.root = newNode
      this.size++
      return true
    }

    let currentNode = this.root
    while (true) {
      /** 如果新插入节点值小于当前节点，判断当前节点有无子节点
       *  如果当前节点没有子节点，并且数值小于当前节点，将当前
       *  新添加的节点添加到当前节点的左节点。右节点同理
       */
      if (newNode.data < currentNode.data) {
        if (currentNode.left) {
          currentNode = currentNode.left
          continue
        }
        currentNode.left = newNode
        this.size++
        return true
      } else if (newNode.data > currentNode.data) {
        if (currentNode.right) {
          currentNode = currentNode.right
          continue
        }
        currentNode.right = newNode
        this.size++
        return true
      } else {
        throw new Error('树中不能有相同的节点')
      }
    }
  }

  find(data) {
    if (!this.size) return null
    let currentNode = this.root
    while (true) {
      if (data > currentNode.data) {
        currentNode = currentNode.right
        continue
      } else if (data < currentNode.data) {
        currentNode = currentNode.left
        continue
      } else {
        return currentNode
      }
    }
  }

  delete(data) {
    this._removeNode(this.root, data)
  }

  _removeNode(node, data) {
    if (!node) return null
    if (node.data == data) {
      /** 当删除的元素等于当前元素时 */
      if (!node.left && !node.right) {
        node = null
      } else if (!node.left) {
        node = node.right
      } else if (!node.right) {
        node = node.left
      } else {
        /** 使用右子树最小值替换当前需要删除的值 */
        // let minNode = this._findMin(node.right)
        // node.data = minNode.data
        // node.right = this._removeNode(node.right, minNode.data)
        /** 使用左子树最大值替换当前需要删除的值 */
        let maxNode = this._findMax(node.left)
        node.data = maxNode.data
        node.left = this._removeNode(node.left, maxNode.data)
      }
    } else if (node.data > data) {
      node.left = this._removeNode(node.left, data)
    } else {
      node.right = this._removeNode(node.right, data)
    }

    return node
  }

  getMin() {
    return this._findMin(this.root).data
  }

  getMax() {
    return this._findMax(this.root).data
  }

  _findMin(node) {
    return !node ? null : node.left ? this._findMin(node.left) : node
  }

  _findMax(node) {
    return !node ? null : node.right ? this._findMax(node.right) : node
  }

  toString() {
    return JSON.stringify(this.root)
  }

  /**
   * @param {*} model 遍历顺序模式
   * 先序: PO
   * 中序: IO
   * 后序：BO
   * 层次: LO
   * @returns
   */
  display(model) {
    this.outPut = []
    switch (model) {
      case 'PO':
        this._preOrderIterator(this.root)
        break
      case 'IO':
        this._inOrderIterator(this.root)
        break
      case 'BO':
        this._postOrderIterator(this.root)
        break
      case 'LO':
        this.stack.push(this.root)
        this._levelOrderIterator()
        break
    }
    return this.outPut
  }

  /** 先序: 根 左 右 */
  _preOrderIterator(node) {
    if (node) {
      this.outPut.push(node.data)
      this._preOrderIterator(node.left)
      this._preOrderIterator(node.right)
    }
  }

  /** 中序：左 根 右  */
  _inOrderIterator(node) {
    if (node) {
      this._inOrderIterator(node.left)
      this.outPut.push(node.data)
      this._inOrderIterator(node.right)
    }
  }

  /** 后序：左 右 根  */
  _postOrderIterator(node) {
    if (node) {
      this._postOrderIterator(node.left)
      this._postOrderIterator(node.right)
      this.outPut.push(node.data)
    }
  }

  /** 层次：根 节点 叶子  */
  _levelOrderIterator() {
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
  }

  // 二叉树高度
  treeHight() {
    return this._getTreeHeight(this.root)
  }

  _getTreeHeight(node) {
    let leftHight,
      rightHight = 0
    if (node) {
      leftHight = this._getTreeHeight(node.left)
      rightHight = this._getTreeHeight(node.right)
      return Math.max(leftHight, rightHight) + 1
    } else {
      return 0
    }
  }
}
