/* 希尔排序 */
/* 
  对希尔排序的总结
  希尔排序原理：
    希尔排序基于插入排序，内部排序使用插入排序，外部控制使用增量的方式。
    先用大增量来对数组进行大范围的位置排序进行修正，使得元素大体位置更加靠近正确的顺序位置
    然后通过逐渐缩小增量步长，对元素进行细致的位置排序
    直到最后增量长度变成1，再进行一次插入排序，这样不需要太多次循环，就可以找到元素要插入的位置
  由于希尔排序先对大范围对顺序进行排序，所以最后一次排序的时候，只需要进行很少量的交换
*/
function shellSort(arr) {
  //1. 首先要确定一个增量
  let length = arr.length;
  let gap = Math.floor(length / 2);
  //2. 根据增量是否大于0，进行循环
  while (gap > 0) {
    //3. 从gap开始循环遍历每个元素
    for (let i = gap; i < length; i++) {
      //4.对每个元素插入排序到对应到分组中去
      let tmp = arr[i];
      let j = i;
      while (tmp < arr[j - gap] && j > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = tmp;
    }

    gap = Math.floor(gap / 2);
  }
  //6. 完成之后返回数组
  return arr;
}

// console.log(shell);
console.time("shell");
console.log(shellSort([5,4,3,2,1,123,213,3,2,1]));
console.timeEnd("shell");
