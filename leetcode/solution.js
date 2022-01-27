class Solution {
  towNumberSum(nums, target) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
      if (map.has(target - nums[i])) {
        return [i, map.get(target - nums[i])]
      } else {
        map.set(nums[i], i)
      }
    }
    return []
  }

  numIslands(grid) {
    let height = grid.length
    let width = grid[0].length
    let count = 0
    // for (let i = 0; i < height; i++) {
    //   for (let j = 0; j < width; j++) {
    //     if (grid[i][j] == '0') continue
    //     dfs(i, j)
    //     count += 1
    //   }
    // }
    // function dfs(h, w) {
    //   if (h >= height || h < 0 || w < 0 || w >= width || grid[h][w] == '0')
    //     return
    //   grid[h][w] = '0'
    //   dfs(h + 1, w)
    //   dfs(h - 1, w)
    //   dfs(h, w + 1)
    //   dfs(h, w - 1)
    // }
    // return count

    let stack = []
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (grid[i][j] == 0) continue
        stack.push([i, j])
        count += 1
        while (stack.length) {
          let node = stack.pop()
          let h = node[0]
          let w = node[1]

          if (h < 0 || h >= height || w < 0 || w >= width || grid[h][w] == 0) {
            continue
          }
          grid[h][w] = 0
          stack.push([h - 1, w])
          stack.push([h + 1, w])
          stack.push([h, w - 1])
          stack.push([h, w + 1])
        }
      }
    }

    return count
  }

  maxAreaOfIsland(grid) {
    let width = grid[0].length
    let height = grid.length

    let queue = []
    let max = 0
    let count = 0
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (grid[i][j] == 0) continue
        queue.push([i, j])
        while (queue.length) {
          let node = queue.shift()
          let h = node[0]
          let w = node[1]
          if (h < 0 || h >= height || w < 0 || w >= width || grid[h][w] == '#')
            continue
          grid[h][w] = '#'
          queue.push([h + 1, w])
          queue.push([h - 1, w])
          queue.push([h, w + 1])
          queue.push([h, w - 1])
          count += 1
        }
        max = Math.max(max, count)
        count = 0
      }
    }
    return max
  }

  ladderLength(beginWord, endWord, wordList) {
    let len = wordList.length
    if (!len) return 0
    let setWord = new Set(wordList)
    let queue = [[beginWord, 1]]
    while (queue.length) {
      let [word, step] = queue.shift()
      if (word == endWord) return step
      for (let i = 0; i < word.length; i++) {
        for (let j = 97; j <= 122; j++) {
          let newWord =
            word.slice(0, i) + String.fromCharCode(j) + word.slice(i + 1)
          if (setWord.has(newWord)) {
            queue.push([newWord, step + 1])
            setWord.delete(newWord)
          }
        }
      }
    }

    return 0
  }

  solve(board) {
    if (board.length <= 1) return board

    let height = board.length
    let width = board[0].length

    let edge = []
    let visited = []
    let queue = []
    for (let i = 0; i < height; i++) {
      let row = []
      for (let j = 0; j < width; j++) {
        row.push(0)
        if (i == height - 1 || i == 0 || j == 0 || j == width - 1) {
          edge.push([i, j])
        }
      }
      visited.push(row)
    }

    for (let k = 0; k < edge.length; k++) {
      queue = [edge[k]]
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          while (queue.length) {
            let [h, w] = queue.shift()
            if (
              w < 0 ||
              w > width - 1 ||
              h < 0 ||
              h > height - 1 ||
              board[h][w] == 'X'
            )
              continue
            if (board[h][w] == 'O' && visited[h][w] == 0) {
              visited[h][w] = 1
              queue.push([h + 1, w])
              queue.push([h - 1, w])
              queue.push([h, w + 1])
              queue.push([h, w - 1])
            }
          }
        }
      }
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        console.log()
        if (visited[i][j] == 0 && board[i][j] == 'O') {
          board[i][j] = 'X'
        }
      }
    }

    return board
  }

}

let solution = new Solution()

let ret = solution.solve([
  ['O', 'O', 'O'],
  ['O', 'O', 'O'],
  ['O', 'O', 'O'],
])
console.log(ret)
