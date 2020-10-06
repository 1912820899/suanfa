/* 二叉搜索树 */
class BST {

  constructor() {
    //二叉搜索树的属性
    //只需要一个根节点 root
    this.root = null;
  }
  //创建节点
  createNode({key, val}) {
    return {
      left: null,
      key,
      val,
      right: null,
    };
  }
  //插入 需要传入这种格式的-{key,val}
  insert(data){
    //0. 创建节点
    let node = this.createNode(data);
    //1.判断root是否为空
    //1.1 空的话，直接插入
    if(this.root == null){
      //1.2 创建节点
      this.root = node;
      return;
    }
    //1.3 非空进入直接出入节点
    this.insertNode(this.root,node);
  }
  //插入节点处理函数
   insertNode(pNode,newNode){
    //2. 比较父节点的key和要插入节点的key，
    //2.1 如果小于父节点key， 进入下一步
    if(pNode.key > newNode.key){
      //3. 判断left 是否为空，为空直接插入
      if(pNode.left == null){
        pNode.left = newNode;
      }else{
        //3.1 不为空，继续比较left中的key 
        //3.2 如果left 中key 大于 传入的key
        //...一直循环并判断比较key，直到查询到 left或者 right为空的节点，然后插入
        this.insertNode(pNode.left,newNode);
      }
    }else{
      if(pNode.right == null){
        pNode.right = newNode;
      }else{
        //3.1 不为空，继续比较right中的key 
        //3.2 如果right 中key 大于 传入的key
        //...一直循环并判断比较key，直到查询到 right或者 right为空的节点，然后插入
        this.insertNode(pNode.right,newNode);
      }
    }
    
  }
  //先序遍历,如果要处理每个遍历的内容，需要传入一个回调函数
  preOrderTraverse(cb){
    //1.判断root是否为空
    //2.空直接返回
    if(this.root == null)return;
    //3.非空的话，遍历每一个node
    this.preOrderTraverseNode(this.root,cb);
  }
  //先序遍历node处理函数
  preOrderTraverseNode(node,cb){
    if(node != null){
      cb(node);
      this.preOrderTraverseNode(node.left,cb);
      this.preOrderTraverseNode(node.right,cb);
    }
  }
  //中序遍历
  inOrderTraverse(){
    if(this.root == null)return;
    this.inOrderTraverseNode();
  }
  inOrderTraverseNode(node=this.root){
    if(node != null){
      this.inOrderTraverseNode(this.left);
      console.log(node);
      this.inOrderTraverseNode(this.right);
    }
  }
  //后序遍历
  postOrderTraverse(){
    if(this.root == null)return;
    this.postOrderTraverseNode();
  }
  postOrderTraverseNode(node=this.root){
    if(node != null){
      this.postOrderTraverseNode(this.left);
      this.postOrderTraverseNode(this.right);
      console.log(node);
    }
  }
  //获取最大值
  max(){
    if(this.root ==null)return null;
    return this.getMaxNode(this.root);
  }
  getMaxNode(node){
    if( node.right == null ){
      return node;
    }else{
     return this.getMaxNode(node.right);
    }
  }
  min(){
    if(this.root == null)return null;
    let current = this.root;
    while(current.left != null){
      current = current.left;
    }
    return current;

  }
  //查找一个节点
  serch(key){
    if(this.root == null)return false;
    let current = this.root;
    while(current.key != key){
      if(key < current.key){
        current = current.left;
      }else{
        current = current.right;
      }
    }
    return current;
  }
  
}
let bst = new BST();
bst.insert({key:11,val:3});
bst.insert({key:15,val:333});
bst.insert({key:7,val:3});
bst.insert({key:5,val:3});
bst.insert({key:3,val:3});
bst.insert({key:333,val:311111});
bst.insert({key:9,val:3});
bst.insert({key:8,val:3});
bst.insert({key:1,val:555});
/* bst.preOrderTraverse(function(node){
  console.log(node.val);
}); */
console.log(bst.serch(5));