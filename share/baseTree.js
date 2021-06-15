class BaseTree {
  size = 0 /** 树节点数量 */
  stack = [] /** 遍历堆栈 */
  outPut = [] /** 使用不同排序模式输出的顺序数组 */
  constructor() {
    this.root = null
  }
  insert() {}
  delete() {}
}

module.exports = BaseTree
