/**
 * KMP 算法是字符串匹配中常用的算法
 * 其核心思想就是利用现有已经匹配的字符，降低匹配次数
 * KMP 算法中核心知识点是next数组的求解
 */

/**
 * next 数组求解的核心算法
 */
// const match = function (s) {
//   /**
//    * 该函数是求解字符串s中的每一个的字符的公共前后缀的长度
//    * KMP算法就是根据公共前后缀长度来决定每次移动的距离
//    */
//   let next = new Array(s.length).fill(0)
//   for (let i = 0, j = 1; j < s.length; j++) {
//     /**
//      * 单个字符没有公共前后缀，因此 next[0] 等于 0
//      * 从第二个字符开始往前匹配，只要匹配成功就让 i,j 都加 1
//      * 当无法匹配时，改变i的值，继续往前寻找匹配字符，如果没有找到
//      * 将当前字符的公共前后缀设置为0
//      */
//     if (s[i] == s[j]) {
//       next[j] = i + 1
//       j++
//       i++
//     } else {
//       // 当i等于0时说明当前字符的公共前后缀为0
//       if (i == 0) {
//         next[j] = next[0]
//         j++
//       }
//       /**
//        * 当出现不相等的情况，将i值设置为当前比较字符的
//        * 前一位字符的公共前后缀长度直到 i= 0为止
//        */
//       i = next[i - 1]
//     }
//   }
//   return next
// }
const match = function (s) {
  // 创建一个长度为s的数组用于保存每个字符的最长公共部分，并初始化为0
  const next = new Array(s.length).fill(0)
  // next数组已经初始化并且第一个字符始最长公共部分始终为0
  for (let i = 1; i < s.length; i++) {
    // 这里是去比较是s[next[i]-1]当前s[i]的最长公共长度的下一位是否相等
    let j = next[i - 1]
    while (s[i] !== s[j] && j >= 0) {
      if (j == 0) break
      j = next[j] - 1
    }
    // 如果s[i]等于s[j],那么当前s[i]的最长公共部分的长度为j+1
    if (s[i] == s[j]) {
      next[i] = j + 1
    }

  }

  return next
}

/**
 *
 * @param {*} s1 模板串
 * @param {*} s2 待匹配的串
 */
const KMP = function (s1, s2) {
  // 先求出模板串的next数组
  let next = match(s1)
  let i = 0
  for (let j = 0; j < s2.length;) {
    // 当i等于模板串的长度时，表示找到了子串
    if (s1[i] == s2[j] && i == s1.length - 1) return true
    if (s1[i] !== s[j]) {
      /**
       * 当i不等于0时，并且当前字符和模板串中的字符不相等时，需要移动模板串
       * 的匹配下标，移动的具体距离为当前匹配字符的前一个字符的公共前后缀长度
       * 如果一次移动无法匹配需要再次重复之前步骤，直到i等于0为止
       */
      if (i == 0) j++
      else i = next[i - 1]
    } else {
      i++
      j++
    }
  }
  if (i < s2.length) return false
}