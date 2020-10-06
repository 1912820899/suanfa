/* 选择排序 */
//使用递归来完成选择排序
function selectionSort(arr, index = 0) {
  //0.1判断如果元素开始位置后面少于2个元素，则直接返回数组；
  if (arr.length - index < 2) return arr;
  //0.2 否则进入下一步
  // 1.定义一个元素来储存最小值的位置，定义一个元素来储存最小值
  //1 或者 定义一个对象来储存最小值的位置和最小值
  let min = index;
  //2. 对输入数据进行遍历
  for (let i = index; i < arr.length; i++) {
    //3.判断第一个元素和每一个元素的大小
    //3.1 如果第一个元素大于某个元素，则把该元素下标和大小保存起来,进入下一步
    if (arr[i] < arr[min]) {
      min = i;
    }
    //3.2 如果对象元素小于每一个元素，不用处理
  }
  //4. 把得到最小元素下标和值与索引元素位置交换
  if (index != min) {
    let tmp = arr[index];
    arr[index] = arr[min];
    arr[min] = tmp;
  }
  //5.对元素下标+1后再次调用自身
  index++;
  return selectionSort(arr, index);
}
//嵌套循环实现选择排序
function selectionSort1(arr) {
  let index,
    length = arr.length;
  for (let j = 0; j < length - 1; j++) {
    index = j;
    for (let i = j; i < length; i++) {
      if (arr[i] < arr[index]) {
        index = i;
      }
    }
    if (index != j) {
      let tmp = arr[j];
      arr[j] = arr[index];
      arr[index] = tmp;
    }
  }
  return arr;
}
console.log(selectionSort1([4, 2, 2525, 13, 2, 1]));
