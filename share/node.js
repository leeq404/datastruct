class Node {
  constructor(data) {
    this.left = null
    this.data = data
    this.right = null
  }
  show() {
    return this.data
  }
}

module.exports = Node
