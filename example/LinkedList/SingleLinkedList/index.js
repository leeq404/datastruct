class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}
// 单向链表
class SingleLinkedList {
  constructor() {
    this.root = new Node('head')
    this.length = 0
  }

  /** 主要操作集 */
  //#region  插入一个新元素
  insert(data) {
    let currentNode = this.root
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = new Node(data)
    this.length++
    return true
  }
  //#endregion

  //#region  返回指定元素的节点
  find(data) {
    if (!this.length) throw new Error('the single linked list is emtpy.')
    let currentNode = this.root
    while (currentNode.data != data && currentNode.next) {
      currentNode = currentNode.next
    }
    if (currentNode.data == data) {
      return currentNode
    } else {
      return 'Not find element in the single linked list.'
    }
  }
  //#endregion

  //#region  删除链表中指定的数据
  delete(data) {
    let currentNode = this.root
    if (!this.length) throw new Error('the single linked list is emtpy.')
    /** 先找到需要删除的元素的直接前驱元素 */
    while (currentNode.next && currentNode.next.data != data) {
      currentNode = currentNode.next
    }

    if (currentNode.next.data != data)
      return 'Not find element in the single linked list.'
    /** 将当前元素的next指针指向需要删除的元素的直接后继元素 */
    let deleteElement = currentNode.next
    currentNode.next = currentNode.next.next
    this.length--
    /** 返回被删除的元素 */
    return deleteElement
  }
  //#endregion

  //#region  清空线性表
  clear() {
    this.root.next = null
    this.length = 0
  }
  //#endregion

  //#region  获取线性表的长度
  length() {
    return this.length
  }
  //#endregion

  //#region  输出线性表
  display() {
    if (!this.length) return 'the single linked list is empty.'
    return JSON.stringify(this.root)
  }
  //#endregion
}
