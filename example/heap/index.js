class Heap {
  /**
   *
   * @param {*} model
   *  MAX 最大堆
   *  MIN 最小堆
   */
  constructor(model = 'MAX') {
    this.heap = []
    this.size = 0
    this.model = model
  }

  insert(data) {
    /**
     * 最大堆的实现
     */
    this.heap.push(data)
    this.size++
    /**
     * 每次插入新的元素后依次和他的父节点相比较，如果大于他的父节点则交换他们的位置
     */
    for (
      let i = this.size - 1 /** 最后一个元素的索引 */;
      i > 0;
      /** 因为数组索引是从0开始的，因此父节点的索引为 Math.floor((i - 1) / 2) */
      i = Math.floor((i - 1) / 2)
    ) {
      let parentIndex = Math.floor((i - 1) / 2)

      if (this.model == 'MAX') {
        if (this.heap[i] > this.heap[parentIndex]) {
          this.swap(i, parentIndex)
        }
      } else {
        if (this.heap[i] < this.heap[parentIndex]) {
          this.swap(i, parentIndex)
        }
      }
    }
  }

  remove() {
    /** 删除元素的基本思路
     *  1.使用最后一个元素代替需要删除的元素
     *  2.然后调整堆的有序性
     */

    // 使用最后一个元素替换堆定元素
    this.swap(this.size - 1, 0)
    this.heap.length = this.size - 1
    this.size--
    // 调整堆的有序性
    // for (let i = 0; i <= (this.size - 1) / 2; i++) {
    //   if (this.heap[i] < this.heap[2 * i]) {
    //     this.swap(i, i * 2)
    //   } else if (this.heap[i] < this.heap[2 * i + 1]) {
    //     this.swap(i, i * 2 + 1)
    //   }
    // }
    for (let i = 0; i < (this.size - 1) / 2; ) {
      if (this.model == 'MAX') {
        if (this.heap[i * 2] > this.heap[i * 2 + 1]) {
          this.swap(i, i * 2)
          i = 2 * i
        } else {
          this.swap(i, i * 2 + 1)
          i = 2 * i + 1
        }
      } else {
        if (this.heap[i * 2] < this.heap[i * 2 + 1]) {
          this.swap(i, i * 2)
          i = 2 * i
        } else {
          this.swap(i, i * 2 + 1)
          i = 2 * i + 1
        }
      }
    }
  }

  swap(index1, index2) {
    let temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
  }

  getTop() {
    return this.heap[0]
  }

  display() {
    return this.heap
  }
}
