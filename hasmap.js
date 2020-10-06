/* 哈希表 */
/**哈希表的原理
 * 1.哈希表需要用数组来储存数据
 * 2.每个数组的下表是通过哈希函数来生成的
 * 3.哈希表的空间必须比要容纳的内容元素多
 * 4.一般遇到冲突使用链地址法来解决
 */
class HasMap {
  constructor() {
    //需要的属性
    //1.要一个储存哈希表内容的容器，
    this.storage = [];
    //2.要一个表示当前储存的数据量
    this.count = 0;
    //3.用于标记数组中一共可以存放的元素数量,这个数是用来对数组容量进行限制的。在哈希函数中起到缩小哈希化后的数字的作用，以保证哈希化后的数字能够压缩到合理的在 storage 范围内。
    this.limit = 7;
  }
  //需要一个哈希函数，把输入的数据进行哈希化,并压缩到数组范围内
  hasFunc(str) {
    //1.将字符串转换成较大的数字 hascode
    //注意！这里hascode可以是任意值，之所以写0，是因为数字比较小，计算更快。霍纳算法中，首次计算是从最高次数项开始的。所以开始的数字在一定程度可以减小后面数字的大小。
    /**
     * 为什么要使用霍纳法则?
     * 对于单词转换成数字的时候，为了保证单词的唯一性，不能是把每个单词使用 unicode 转换成数字后相加，
     * 因此需要对每个位置上的单词进行一定的转换
     * 比如：cast 每个字母对应的unicode 分别是 99 97 115 116； 如果单纯的相加，会导致转化的数字会重复
     * 因此 cast 可以这样  99*37^3 + 97*37^2 + 115*37^1 + 116*37^0 这样的数字不会重复；
     * 再次问为什么要用霍纳法则呢？
     * 霍纳法则可以对多项式相加进行化简，提升把字符转化成数字的速度。
     * 1.如果直接使用多项式转化的话，会导致计算量非常大。大概需要 O(2^N)
     * 2.霍纳法则简化后，需要时间复杂度 O(N);
     */
    /**
     * 为什么hascode初始化值是0?
     * 根据霍纳法则，从最高次数项开始，要保证第一个项系数都要参与运算
     */
    let hascode = 0;
    //霍纳算法进行哈希化
    for (let i = 0; i < str.length; i++) {
      hascode = hascode * 37 + str.charCodeAt(i);
    }
    //2.把大的数字hascode压缩到数组范围之内，
    hascode = hascode % this.limit;
    return hascode;
  }
  isEmpty() {
    return !this.count;
  }
  //插入一个数据或者修改
  put(key, val) {
    //1.获取到 hascode 下标
    let hascode = this.hasFunc(key);
    //2.查询容器中该 hascode 下标位置是否有值

    //2.1 如果没有值，直接创建一个数组来储存第一个值，并返回true
    if (this.storage[hascode] == null) {
      this.storage[hascode] = [{ key, val }];
      this.count++;
      this.resize();
      return;
    }
    //2.2 如果改位置有值了，进行下一步
    //3 遍历hascode下标位置的数组，查找数组中每个对象，判断是否已经存在 key ；
    let index = 0,
      chain = this.storage[hascode];
    // console.log(chain);
    while (index < chain.length) {
      //3.1 如果存在 key 替换该位置key所对应的对象。
      if (chain[index].key == key) {
        chain[index].val = val;
        return;
      }
      index++;
    }
    //3.2 如果没有存在 key 直接在后面数组最后插入一个对象。
    chain.push({ key, val });
    this.count++;
    this.resize();
  }
  //获取数据
  get(key) {
    //1.判断是否哈希表是否为空
    //1.1如果是空，直接返回-1
    if (this.isEmpty()) return -1;
    //1.2不为空直接下一步
    //2. 获取hascode
    let hascode = this.hasFunc(key);
    //3.通过 hascode 查询该位置是否为空
    //3.1如果为空，直接返回-1
    if (!this.storage[hascode]) return -1;
    //3.2如果不为空，下一步
    //4. 循环遍历hascode位置的数组，查询key是否存在
    let index = 0,
      chain = this.storage[hascode];

    while (index < chain.length) {
      //4.1如果存在直接返回对应的val
      if (chain[index].key === key) {
        return chain[index].val;
      }
      index++;
    }
    //4.2如果不存在，返回-1
    return -1;
  }
  //删除方法
  remove(key) {
    if (this.isEmpty()) return -1;
    let hascode = this.hasFunc(key);
    if (this.storage[hascode] == null) return -1;
    let index = 0;
    while (index < this.storage[hascode].length) {
      if (this.storage[hascode][index].key == key) {
        return this.storage[hascode].splice(index, 1);
      }
      index++;
    }
    return -1;
  }
  //哈希表扩容
  resize() {
    //1.如果当前 loadFactor 装载因子超过0.75 则对数组进行扩容 ,loadFactor 是  当前容纳的数列 count与 数组限制长度 limit之比； count/limit > 0.75
    //1.1 如果 loadFactor 小于0.75,直接return；
    if (this.count / this.limit < 0.75) return;
    //1.2 如果大于 0.75 下一步
    //2. 对数组容纳量扩充约等于2倍，但是要求必须是质数倍
    this.limit = this.limit * 2 + 1;
    while (!this.isPrime(this.limit)) {
      this.limit++;
    }
    //3. 保存当前 storage 并把原来的 storage ，count 清空 //这里要重新初始化，并且重新插入所有数据，是因为 数组限制长度（limit）改变后，原来通过哈希函数获取的hascode已经不能在新的数组上对应了。因此要重新创建并插入；
    let oldStorage = this.storage;
    this.storage = [];
    this.count = 0;
    //4.遍历旧的storage 并重新插入新的 storgae中。
    let index = 0;
    while (index < oldStorage.length) {
      if (oldStorage[index]) {
        let chainIndex = 0;
        while (chainIndex < oldStorage[index].length) {
          let obj = oldStorage[index][chainIndex];
          this.put(obj.key, obj.val);
          chainIndex++;
        }
      }
      index++;
    }
    console.log('重新插入成功,当前limit是：%d',this.limit);
  }
  //判断一个数是不是质数
  isPrime(num) {
    //1. 对这个数进行二分,得到一个较小的数.
    let newNum = parseInt( Math.sqrt(num) );
    //2. 循环遍历这个数，判断用输入的数 % 遍历的每个数
    for (let i = 2; i <= newNum; i++) {
      //2.1 如果取模后等于0，说明不是质数，返回fasle
      if (num % i == 0) {
        return false;
      }
    }
    //2.2 如果遍历完成没有发现等于0的，则返回true；
    return true;
  }
}
let hastable = new HasMap();
hastable.put("lipeng11", { age: "18", sex: "男" });
hastable.put("chen", { age: "3", sex: "女" });
console.log(hastable.remove("lipeng11"));
console.log(hastable.get("chessnjiaxu65131231"));
