/* 
链表
结构：需要一个header指向一个node，每个node需要包含一个next指向下一个node
特点：插入删除效率非常高，但是查询效率比较低
*/

class Chain {
  header = null;
  length = 0;
  createNode(data) {
    return {
      data,
      next: null,
    };
  }
  //向链表尾部添加一个新节点
  append(data) {
    this.length += 1;
    let node = this.createNode(data);
    if (!this.header) {
      this.header = node;
      return node;
    }
    let currentNode = this.header;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = node;
    return node;
  }
  //向链表特定位置插入一项
  /* insert(position, data) {
    if (position >= this.length) {
      return false;
    }
    let node = this.createNode(data);
    let currentNode = this.header;
    let previewNode;
    for (let i = 0; i < this.length; i++) {
      if (i == position) {
        if (i == 0) {
          node.next = currentNode;
          this.header = node;
        } else {
          node.next = currentNode;
          previewNode.next = node;
        }
        return;
      }
      previewNode = currentNode;
      currentNode = currentNode.next;
    }
  } */
  insert(position, data) {
    //1.越界判断
    if (position < 0 || position > this.length) return false;
    //2.创建node节点
    let node = this.createNode(data);
    //3.如果是插入第一个
    if (position == 0) {
      node.next = this.header;
      this.header = node;
    } else {
      //4.如果不是第一个，循环遍历找到一个。
      let current = this.header;
      let perview = null;
      let index = 0;
      while (index++ < position) {
        perview = current;
        current = current.next;
      }
      perview.next = node;
      node.next = current;
    }
  }
  //查看链表
  toString() {
    //1.判断是否链接是否为空
    //如果为空直接返回空字符串
    if (this.isEmpty()) return "";
    //如果不为空，遍历查找所以字符串并拼接
    let current = this.header;
    let str = current.data;
    while (current.next) {
      current = current.next;
      str += "," + current.data;
    }
    return str;
  }
  //判断链表是否为空
  isEmpty() {
    return !this.length;
  }
  //查看链表长度
  size() {
    return this.length;
  }
  //修改某个位置的元素
  update(positon, data) {
    //1.越界判断
    if (positon < 0 || positon > this.length) return false;
    //2.遍历查找
    let current = this.header;
    let index = 0;
    while (index++ < positon) {
      current = current.next;
    }
    //3.查找到之后替换node内容
    current.data = data;
    return true;
  }
  //获取对应位置元素
  get(position) {
    //1.越界判断
    if (position < 0 || position > this.length) return false;
    //2.通过postion遍历查找，找到之后直接返回node
    let current = this.header;
    let index = 0;
    while (index++ < position) {
      current = current.next;
    }
    return current;
  }
  //返回元素在列表中的索引，如果列表中没有该元素则返回-1
  indeOf(element) {
    let curretn = this.header,
      index = 0;
    while(curretn.next){
      if(curretn.data === element){
        return index;
      }
      curretn = curretn.next;
      index++;
    }
    return -1;
  }
  //从列表删除特定位置移除一项
  removeAt(positon) {
    //1.越界判断
    if (this.isOver(positon)) return false;
    //2.遍历查找
    let current = this.header;
    let preview = null;
    let index = 0;
    while (index++ < positon) {
      preview = current;
      current = current.next;
    }
    //3.长度减去1
    this.length -= 1;
    //4.如果preview是空，说明只有一个元素，直接把header置空
    if (!preview) {
      this.header = null;
    } else {
      preview.next = current.next;
    }
  }
  //从链表中移除一项(最后一项)
  remove() {
    //1.判断是否为空，为空直接返回
    if (this.isEmpty()) return false;
    //2.不为空，循环遍历直到最后一项
    let current = this.header;
    let preview = null;
    while (current.next) {
      preview = current;
      current = current.next;
    }
    //3.如果preview为空，则直接给header置空
    if (!preview) {
      this.header = null;
    } else {
      //4.移除最后一项
      preview.next = null;
    }
    //5。并缩小链表长度
    this.length -= 1;
  }
  //越界返回 true
  isOver(positon) {
    return positon > this.length || positon < 0;
  }
}
let chain = new Chain();
chain.append("abc");
chain.append("cba");
chain.append("李朋泽");
chain.append("李大钊");
chain.append("阮一峰");
chain.append("陈家小");
/* chain.insert(1, "小皮友");
chain.update(0, "小票"); */
// console.log(chain.get(4);
// chain.remove();
// console.log(chain.toString());
console.log(chain.indeOf("abc"));
console.log(chain.indeOf("阮一峰"));
