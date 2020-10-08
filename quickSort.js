/* 快速排序 */
/* 
  原理
  首先找到一个枢纽（一般是从一组数中取出来首、尾、中三个数，找出其中的中位数），作为第一个要确定位置的数，
  然后把其他的数根据大于枢纽的放一边，小于枢纽的放另一边，这样就保证这个位置就确定了，
  然后重复循环这样的操作，直到
*/
function quickSort(arr, start = 0, end = arr.length - 1) {
  //1. 找出枢纽
  let { middle: pivot, arr: newArr } = median(arr, start, end);
  arr = newArr;
  //2. 把枢纽和数组倒数二个元素调换顺序，因为进过找枢纽，已经把传入的 start end 和middle 排好序了；
  let tmp = arr[pivot];
  arr[pivot] = arr[end - 1];
  arr[end - 1] = tmp;
  pivot = end - 1;
  //3. 定义2个数组指针，分别指向数组左边和倒数第二个元素
  let left = start;
  let right = pivot;
  //4. 开始循环，如果左边小于右边的话，则退出循环
  while (left < right) {
    if (arr[left] > arr[right] ) {
      tmp = arr[left];
      arr[left] = arr[right];
      arr[right] = tmp;
    }
    //5. 从左边指针开始循环往后查找，直到左边指针所指的元素大于枢纽，退出这个循环查找
    while (arr[++left] < arr[pivot]);
    //6. 然后从右边指针开始循环向前查找，直到查到右边指针所指的元素小于枢纽，退出这次查找
    while (arr[--right] > arr[pivot]);
    //7.则左右调换顺序
  }
  //8. 循环完成后一定是左边指针大于右边的指针，所以把左边指针所指的数与枢纽调换位置
  //9 ，这里判断如果左边指针和枢纽位置指针不相同，则调换位置，相同则不管
  if (left != pivot) {
  tmp = arr[pivot];
  arr[pivot] = arr[left];
  arr[left] = tmp;
  pivot = left;
  }
  //10. 分别递归调用左边的和右边的
  if (pivot - 1 > start) {
    arr = quickSort(arr, start, pivot - 1);
  }
  if (pivot + 1 < end) {
    arr = quickSort(arr, pivot + 1, end);
  }
  return arr;
}
function median(arr, start, end) {
  //1. 通过数组传入的开始位置，找出中间位置
  //2. 对中间位置进行取整
  let middle = Math.floor((start + end) / 2);
  //3. 对开始 中间 结束 3个位置进行冒泡排序
  let tmp = null;
  if (arr[start] > arr[middle]) {
    tmp = arr[middle];
    arr[middle] = arr[start];
    arr[start] = tmp;
  }
  if (arr[middle] > arr[end]) {
    tmp = arr[middle];
    arr[middle] = arr[end];
    arr[end] = tmp;
  }
  if (arr[start] > arr[middle]) {
    tmp = arr[middle];
    arr[middle] = arr[start];
    arr[start] = tmp;
  }
  //4. 完成后返回最中间的数的索引（作为枢纽）和 数组
  return { middle, arr };
}
let arr = [7, 6,12312,55,5,5,5,6,6,6,4,4,4, 5, 4, 3, 1, 2, 1];
console.time("quickSort");
console.log(quickSort(arr));
console.timeEnd("quickSort");