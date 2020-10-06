/* 图结构封装 */
class Graph {
  constructor() {
    //需要的属性，图结构表示方法使用：邻接表
    //1.顶点
    this.vertexes = [];
    //2.边
    this.edges = new Map();
  }
  //插入一个顶点
  insertVertexes(v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  }
  //插入一条边
  insertEdge(v1, v2) {
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
  }
  //返回一个Map，包含一个 key（元素） 和 一个val （是否已经被探测过）
  isExpload() {
    let vertexesMap = new Map();
    let vertexes = this.vertexes;
    for (let i = 0; i < vertexes.length; i++) {
      vertexesMap.set(vertexes[i], false);
      let edges = this.edges.get(vertexes[i]);
      for (let j = 0; j < edges.length; j++) {
        vertexesMap.set(edges[j], false);
      }
    }
    return vertexesMap;
  }
  //广度优先搜索 BFS BroundFirstSearch
  bfs() {
    //广度优先搜索原理主要是利用队列来实现，先把所有的内容都给搜索到，然后再依次的去处理每一个搜索到的内容
    //0 首先需要一个标识符来确定每个顶点是否已经进入过队列
    let queue = [];
    let vertexesMap = this.isExpload();
    //1. 拿到第一个顶点，加入队列中
    vertexesMap.set(this.vertexes[0], true);
    queue.push(this.vertexes[0]);
    //2. 根据队列不为空循环处理队列的内容
    while (queue.length != 0) {
      //3. 执行队列中的第一个顶点
      //4. 拿到顶点之后，弹出顶点
      let vertexe = queue.shift();
      //5. 对这个顶点执行相应的操作，实际可是传递一个回调函数来进行处理
      console.log(vertexe);
      //6. 循环探测该顶点的边连接的其他的所有顶点。
      let otherVertexes = this.edges.get(vertexe);
      for (let i = 0; i < otherVertexes.length; i++) {
        //7. 对探测的顶点进行判断
        //7.1 如果顶点没有加入，则把该顶点加入队列
        if (!vertexesMap.get(otherVertexes[i])) {
          vertexesMap.set(otherVertexes[i],true);
          queue.push(otherVertexes[i]);
        }
        //7.2 如果顶点已经被加入过队列，则不再加入.
      }

    }
  }
  //深度优先搜索 DeepFirstSearch 
  dfs(){
    //深度搜索原理是通过递归，先把一个分支上的所有内容都遍历完成，然后再去遍历其他的分支
    //1.获取所有状态
    let vertexesMap = this.isExpload();
    this.dfsNode(this.vertexes[0],vertexesMap);
  }
  //遍历处理每个顶点
  dfsNode(vertexe,vertexesMap){
    //1. 需要标识符来判断是否已经处理过。
    
    //1.1 处理传入的顶点，并把顶点切换为已经处理
    console.log(vertexe);
    vertexesMap.set(vertexe,true);
    //2.获取传入顶点的边所对应的顶点；
    let vertexes = this.edges.get(vertexe);
    //3.根据循环遍历获得的顶点
    for(let i=0;i<vertexes.length;i++){
      //4.判断顶点是否已经处理过
      //4.1 如果没有处理过，继续调用该函数，进行处理遍历
      if(  !vertexesMap.get(vertexes[i])  ){
        this.dfsNode(vertexes[i],vertexesMap);
      }
      //4.2 如果处理过则不用管了，
    }

  }
}
let graph = new Graph();
graph.insertVertexes('a');
graph.insertVertexes('b');
graph.insertVertexes('c');
graph.insertVertexes('d');
graph.insertEdge("a",'b');
graph.insertEdge("a",'c');
graph.insertEdge("a",'d');
graph.insertEdge("b",'c');
graph.insertEdge("b",'d');
// graph.bfs();
graph.dfs();