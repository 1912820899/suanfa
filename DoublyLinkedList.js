class DoublyLinkedList {
  constructor(order = true) {
    //默认从头向结尾的链表顺序
    this.length = 0;
    this.head = null;
    this.tail = null;
    this.order = !!order;
  }

  createNode(data) {
    return {
      data,
      prev: null,
      next: null,
    };
  }
  isEmpty() {
    return !this.length;
  }
  toString() {
    //1.如果是空，直接返回空字符串
    if (this.isEmpty()) return "";
    //2.如果不为空，如果是顺序的
    let current, str, orderChief, orderKey;
    //2.1从前往后遍历循环添加字符串
    if (this.order) {
      orderChief = "head";
      orderKey = "next";
    } else {
      //3.如果不为空，链表顺序是倒序的，则倒序遍历添加
      orderChief = "tail";
      orderKey = "prev";
    }
    current = this[orderChief];
    str = current.data;
    while (current[orderKey]) {
      current = current[orderKey];
      str += "," + current.data;
    }
    return str;
  }
  //添加一个元素,默认向后添加元素
  append(data) {
    //1。创建一个node节点
    let node = this.createNode(data);
    this.length += 1;
    //2.如果是第一个节点,需要把头部和尾部都指向这个节点，并返回
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return node;
    }
    console.log(data);
    //3.如果不是第一个节点
    //4.1给尾部添加一个节点;
    if (this.order) {
      let current = this.tail;
      this.tail = node;
      node.prev = current;
      current.next = node;
    } else {
      //4.2给头部添加一个节点;
      let current = this.head;
      this.head = node;
      node.next = current;
      current.prev = node;
    }
    return node;
  }
  //任意位置插入一个元素
  /* insert(position,data){
    //1.越界判断
    if(position>this.length || position<0)return false;
    //2.从前往后遍历并插入
    
    let current = this.head;
    let index= 0;
    let preview = null;
    while(index++<position){

    }
  
    //3.返回这个元素
  } */
}

let doubly = new DoublyLinkedList();
doubly.append("kkk");
doubly.append("ddd");
// doubly.append("mmm");
// doubly.toString();
console.log(doubly.toString());
