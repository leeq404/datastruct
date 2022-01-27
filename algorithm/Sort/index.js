function randomArr(length, range) {
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push(Math.ceil(Math.random() * range))
  }
  return arr
}

function swap(num, index1, index2) {
  let temp = num[index1]
  num[index1] = num[index2]
  num[index2] = temp
}

function bubbleSort(num) {
  for (let i = 0; i < num.length; i++) {
    for (let j = 0; j < num.length - 1; j++) {
      if(num[j]>num[j+1]) {
        swap(num, j, j + 1)
      }
    }
  }
  return num
}

function selectSort(num) {
  for (let i = 0; i < num.length; i++) {
    for (let j = i; j < num.length; j++) {
      if (num[j] < num[i]) {
        swap(num, i, j)
      }
    }
  }
  return num
}

function quickSort(num) {
  if (num.length < 2) return num
  let middle = Math.ceil(num.length / 2)
  let left = []
  let right = []
  for (let i = 0; i < num.length; i++) {
    if (i == middle) continue
    num[middle] >= num[i] ? left.push(num[i]) : right.push(num[i])
  }
  // return quicksort(left).concat(num[middle],quicksort(right))
  return [...quickSort(left), num[middle], ...quickSort(right)]
}

function insertSort(num) {
  for (let i = 0; i < num.length; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (num[j] < num[j - 1]) {
        swap(num, j - 1, j)
      }
    }
  }
  return num
}

function shellSort(num, step) {
  for (let m = step; m > 0; m--) {
    for (let i = 0; i < num.length - m + 1; i += m) {
      for (let k = i + 1; k > 0; k -= m) {
        if (num[k] < num[k - 1]) {
          swap(num, k, k - 1)
        }
      }
    }
  }
  return num
}

function mergeSort(num) {
  function merge(left, right) {
    let temp = []
    while (left.length && right.length) {
      temp.push(left[0] > right[0] ? right.shift() : left.shift())
    }
    return temp.concat(left, right)
  }

  if (num.length <= 1) return num
  let middle = Math.floor(num.length / 2)
  return merge(mergeSort(num.slice(0, middle)), mergeSort(num.slice(middle)))
}

// SORT TEST
function Test(fn) {
  let arr = randomArr(1000000, 20000000)
  let arr_copy = JSON.parse(JSON.stringify(arr))
  let args = [...arguments]

  console.time(`${fn.name} sort time:`)
  let ret = args[0].apply(null, [arr, ...args.slice(1)])
  console.timeEnd(`${fn.name} sort time:`)
  let ret2 = arr_copy.sort((a, b) => a - b)

  for (let i = 0; i < 10000; i++) {
    if (ret[i] !== ret2[i]) return false
  }

  return true
  
}

// let insertSortRet = Test(insertSort)
// console.log('insertsort test result:', insertSortRet)

// let shellSortRet = Test(shellSort, 5)
// console.log('shellsort test result:', shellSortRet)
// let bubbleSortRet = Test(bubbleSort)
// console.log('pbubblesort test result:', bubbleSortRet)
// let selectSortRet = Test(selectSort)
// console.log('selectsort test result:', selectSortRet)

let mergeSortRet = Test(mergeSort)
console.log('mergesort test result:', mergeSortRet)
let quickSortRet = Test(quickSort)
console.log('quicksort test result:', quickSortRet)
