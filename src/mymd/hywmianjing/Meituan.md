---
icon: list
date: 2024-07-18
category:
  - 面经
order: 7
excerpt: <p>美团一面</p>
editLink: false
article: false
---
# 美团一面

## 1. H5新特性

- 语义化标签
- 增强型表格
- 音视频
- canvas与svg
- 地理定位
- 拖放api
- web worker
- web storage
- web socket

## 3. ES6新特性

- class语法糖
- promise、async/await、generator
- 继承
- 箭头函数
- 块级作用域、let、const
- 扩展运算符、解构赋值
- es6模块化
- 新数据类型symbol、map、set
- 新方法：string.padstart(number, substr)、str.includes()、str.startWith()、Array.from、arr.find()、Object.keys()

## 4. tcp与udp

1. tcp是**可靠连接**（三次握手，四次挥手，超时重传机制，数据校验和），udp**不可靠**（只知道对端的IP和端口号就可以发送，不需要实现建立连接，没有确认机制、重传机制，存在丢包）
2. tcp面向**字节流**（如果发送的 `字节数`太长，会被拆分成多个 `TCP`的数据包发出，如果发送的字节数太短，就会先在 `缓冲区`里等待， 等到 `缓冲区`长度达到设置长度，然后等到其他 `合适的时机`发送出去。），网络阻塞，upd面向**报文**（应用层交给 `UDP`多长的报文， UDP原样发送既不会拆分，也不会合并。）
3. tcp首部最多20字节，udp为8字节
4. tcp为一对一，udp可以一对一、一对多
5. tcp适合对网络质量有要求的，比如浏览器请求、文件传输，udp适合对网络速度有要求的，比如视频通话
6. tcp传输慢，udp传输快

## 5. 为什么tcp传输慢，可靠

### 5.1 校验和

传输的数据当作一个16位整数，全加起来，最前面的进位补到最后面，取反得到校验和。发送方和接收方验证校验和是否相同

### 5.2 流量控制

让发送方的发送速率不要太快，要让接收方来得及接收。利用**滑动窗口机制**可以很方便地在TCP连接上实现对发送方的流量控制。

### 5.3 超时重传

在规定时间内，发送方没有接收到响应的ACK报文。数据丢了或者ack包丢了。

### 5.4 拥塞控制

TCP引入**慢启动机制**（滑动窗口），先发出少量数据，就像探路一样，先摸清当前的网络拥堵状态后，再决定按照多大的速度传送数据。

拥塞控制算法：慢启动、拥塞避免、快重传、快恢复

慢启动：启动初期以指数增长方式增长至慢启动阈值；再线性增长至拥塞阈值；立即将滑动窗口降为1，重复。

### 5.5 连接管理

三次握手，四次挥手

### 5.6 确认应答

发送端每次发送数据时，给每个数据包分配一个序列号（接收方检测数据是否有丢失或者乱序和重复等）

接收端会发送ACK应答包（发送端没有收到也会重发数据）

### 5.7 数据分段

面向字节流，发送的 `字节数`太长，会被拆分成多个 `TCP`的数据包发出，如果发送的字节数太短，就会先在 `缓冲区`里等待， 等到 `缓冲区`长度达到设置长度，然后等到其他 `合适的时机`发送出去。

20 字节 IP 头 + 20 字节 TCP 头 + 字节数据

## 6. HTTP版本

### 6.1 http1.0

短连接，不能复用，可能阻塞

### 6.2 http1.1

**长连接（connection：keep-alive）:tcp的保活机制**，服务器端设置一个保活定时器，定时器定时的向另一端发出保活探测的TCP报文，如果接收到了ACK报文，那么就证明对方存活，可以继续保有连接；否则就证明网络存在故障。

**增加缓存处理**：涉及到强缓存（expire、cache-control：max-age）、协商缓存（last-modified、etag）

**请求管道化：** 将所有的 HTTP 请求一次性发出（多个tcp），而无需关心上一次发送请求的状态。服务端还是一一进行处理的，如果当服务端返回的其中一个响应阻塞后，接下来的响应也会被阻塞。

问题：存在**队头阻塞**：虽然可以一次性发送所有请求，但服务端是依次处理，响应阻塞，后面的所有响应都会阻塞

### 6.3 http2.0

**多路复用**: 解决了浏览器限制同一个域名下请求数量的问题。 **一个TCP** 可以并行交错发送多个请求（不用按照顺序一一对应），对端可以通过帧中的**标识**知道属于哪个请求。HTTP/2 可以通过发送信号取消某一次请求，同时保证TCP连接还打开着，可以被其他请求使用。（TCP 连接减少而使**网络拥塞状况得以改观**；）

**头部压缩：huffman算法**

**服务器推送资源**

问题：仍存在队头阻塞，甚至更严重。因为只有一个tcp连接，后续的传输都要等前面，http/1.1 多个tcp连接，阻塞一个，其他的还可以正常跑。

### 6.4 http3.0

**向前纠错机制：** 它本身的内容之外还包括了其他数据包的数据，因此少量的丢包可以通过其他包的冗余数据直接组装而无需重传。

解决队头阻塞：基于QUIC协议（udp）。**采用UDP作为传输层协议，重新实现了无序连接，并在此基础上通过有序的QUIC Stream提供了多路复用**。

更适合移动端：**IP地址的频繁变动会导致TCP连接、TLS会话反复握手**，3.0 创造出Connection ID概念实现了**连接迁移**，通过融合传输层、表示层，既缩短了握手时长，也加密了传输层中的绝大部分字段，提升了网络安全性。**复用原连接**。

### 6.5 https

利用**SSL/TLS**来加密数据包。

服务器向CA申请数字证书，并返回数字证书和公钥，浏览器判断证书合法性。

客户端对所有传输的内容都经过**对称加密**（密钥只有一个）

对称加密的密钥为**非对称加密**（采用服务端的公钥对对称加密的密钥加密）

问题：HTTPS比HTTP耗费更多服务器资源，SSL证书通常需要绑定IP，不能在同一IP上绑定多个域名

## 7. 前端安全

### 7.1 浏览器安全

- **跨站脚本攻击XSS**：通过恶意注入脚本在浏览器运行，然后盗取用户信息。（输入过滤，输出编码转义，httponly）
- **跨站请求伪造CRSF**：骗用户点击链接，获取用户的登录状态发起跨站请求。（使用token，验证referer，自定义http属性）
- **点击挟持：** 利用 `CSS`将攻击者实际想让你点击的页面进行透明化隐藏。点击弹窗右上角的 `"X"`想关闭弹窗事，跳转到其他页面。（设置 `http`响应头 `X-FRAME-OPTIONS`，防御利用 `iframe`嵌套的点击劫持攻击）
- **中间人攻击MITM**：在通信双方之间，窃听甚至篡改通信信息。（使用https、http严格传输安全HSTS）
- **SQL注入：** 向服务器提交恶意的sql代码，导致源程序执行包含恶意代码的sql（在需要改动数据库的输入中对其转码编译）

白名单CSP：告诉浏览器哪些资源可以加载执行，让那些真的插入进入的恶意代码也不会被执行（meta标签里/请求头中设置可信域名）

严格传输安全协议HSTS：强制客户端使用 `https` 与服务器建立连接

### 7.2 node服务端安全

正则表达式攻击ReDos

时序攻击

爬虫（反iframe嵌入、font-face、雷碧图显示价格、nginx）

## 8. promise链式调用

真正的链式 Promise 是指在当前 Promise 达到 fulfilled 状态后，即开始进行下一个 Promise（后邻 Promise）。then()返回一个新的promise。

```js
function myPromise(excutor){
    let self = this
    self.state = 'pending'
    self.value = ''
    self.onResolvedCallbacks = []
    self.onRejectedCallbacks = []

    self.resolve = function(value) {
        if(self.state == 'pending'){
            self.value = value
            self.state = 'fulfilled'
            self.onResolvedCallbacks.forEach((item) => {
                item.onResolved(value);
              })
        }
    }

    self.reject = function(value) {
        if(self.state == 'pending'){
            self.value = value
            self.state = 'rejected'
            self.onRejectedCallbacks.forEach((item) => {
                item.onRejected(value);
              })
        }
    }

    try {
        excutor(self.resolve,self.reject)
    } catch (error) {
        self.reject(error)
    }
  
    // then()
    myPromise.prototype.then = function(onFulfilled, onRejected){
        let self = this
        return new Promise((resolve, reject)=>{
            function run(type) {
                try {
                  //获取回调函数的执行结果
                  let result = type(self.value);
                  //判断
                  if (result instanceof Promise) {
                    //如果是 Promise 类型的对象
                    result.then(
                      (v) => {
                        resolve(v);
                      },
                      (j) => {
                        reject(j);
                      }
                    );
                  } else {
                    //结果的对象状态为『成功』
                    resolve(result);
                  }
                } catch (e) {
                  reject(e);
                }
              }

            if(self.state == 'fulfilled'){
                run(onFulfilled)

            }
            if(self.state == 'rejected'){
                run(onRejected)
            }
            if(self.state == 'pending'){
                self.onRejectedCallbacks.push({
                    onRejected: function () {
                        run(onRejected);
                    }})
                self.onResolvedCallbacks.push({
                    onResolved: function () {
                        run(onFulfilled);
                    }})
            }
        })  
    }
  
    // catch()
    myPromise.prototype.catch = function(onRejected){
        return this.then(undefined, onRejected);
    }
  
    // resolve()
    myPromise.resolve = function(value){
        //返回promise对象
        return new myPromise((r, j) => {
            if(value instanceof myPromise){
                value.then(v=>r(v), r=>j(r))
            }else{
                //状态设置为成功
                resolve(value);
            }
        });
    }
  
    //添加 reject 方法
    myPromise.reject = function(error){
        return new myPromise((resolve, reject)=>{
            reject(error);
        });
    }
  
}

const p = new myPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
const p1 = p.then(
    (res) => {
      console.log(res, "成功");
      return new Promise((r, j) => {
        r(res);
      });
    },
    (err) => {
      console.log(err, "失败");
    }
);
console.log(p1, "p1");
```

## 9. useCallback和useMemo和react.memo

在React的组件中，如果子组件没有被React.memo包裹，或者没有使用useMemo来处理props传递参数，那么**当父组件的任何值更新时，整个组件都将会进行重新渲染，包括父组件下面的所有子组件**。

比如一个父组件下面有数以千计的子组件，如果没有借助React.memo或者useMemo的话，每次父组件的更新都会触发子组件的更新，这岂不是对性能消耗非常大。

**useMemo和useCallback**：都是reactHook提供的两个API，用于缓存数据，优化性能；两者接收的参数都是一样的，第一个参数表示一个**回调函数**，第二个表示**依赖的数据**（**空数组只会记住第一次执行的，不填依赖则失效，不存储**）。依赖数据发生变化的时候，才会**调用传进去的回调函数**去重新计算结果，起到一个缓存的作用。

**useMemo**：把需要传递给子组件的参数用useMemo进行处理，从而实现了子组件的更新只发生在传递给子组件的参数发生变化的时候。应保证第一个参数函数里所使用的变量都出现在第二个依赖参数数组中。

**react.memo**：高阶组件，包裹子组件。只有当它的 **props 发生改变时**，它才会重新渲染。否则，React 将复用上一次渲染的结果，这可以避免不必要的渲染，提高应用的性能。注：**对props进行浅比较**，可能会导致问题。如果 `item` 对象的属性发生了改变，但 `item` 对象本身的引用没有改变，那么 `React.memo` 可能会错过这个变化，导致 UI 不正确。

```js
// List 组件接收一个 items prop，并为每个 item 渲染一个列表项。
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>

// 过度优化
const ListItem = React.memo(function ListItem({ item }) {
  return <li>{item.name}</li>;
});

function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
```

**区别：**

**useMemo** 缓存的结果是回调函数中return回来的值，主要用于**缓存计算结果的值**。

比如：需要更改某一对象属性的值，定义的函数以该对象的该个属性为传参，一旦对象其他属性改变了，该方法也会被调用。采用useMemo对该函数包裹，只监听该属性的变化才执行函数

```js
function Info(props) {
  let [personalInfo , setPersonalInfo] = useState({
    name: 'kevin kang',
    gender: 'male'
  })
 
  function formatGender(gender) {
    console.log('---调用了翻译性别的方法---')
    return gender === 'male' ? '男' : '女'
  }
 
  // BAD 
  // 不使用useMemo的情况下，修改其他属性，也会重新调用formatGender方法，浪费计算资源
  // let gender =  formatGender(personalInfo.gender)
 
  // GOOD
  let gender = useMemo(()=>{
    return formatGender(personalInfo.gender)
  }, 
  [personalInfo.gender])
```

**useCallback** 缓存的结果是函数，主要用于**缓存函数**，和react.memo搭配。

比如：父组件里有两个组件，一个是按钮组件绑定了点击事件进行点击计数，另一个组件是个图表组件，传入了图表数据和图表点击事件。当点击计数按钮，会发现图表组件也重新渲染了（图表数据没有变化）。处理方法=》图表事件上用usecallback，依赖参数为传入的图表数据。

```js
import React, { useCallback } from 'react'

funtion Parent(num) {
    const handleClick = useCallback(() => {
        // 处理点击事件
        console.log(num)
    }, [num]) // 只有当num发生改变时子组件接收到的回调函数才会发生变化，若没有改变，传入子组件的回调不变，子组件不会触发渲染。
    return 
        <div>  
            <Child onClick={()=>handleClick()}
        </div>
}
```

实际上，useCallback是useMemo第一个传参的返回值为函数的特殊情况。

```js
fuction useMyCallback(callback, deps){
    useMemo(() => () => callback, deps)
}
```

**react.memo**

- 当我们的父子组件之间不需要传值/函数通信时，可以选择用React.memo来避免子组件的无效重复渲染。
- 但我们的父子组件之间需要进行传值通信时，React.memo（**props浅比较**）和useMemo都可以使用。**存在过度优化和不必要的复杂度**
- 而在使用函数的情况，需要考虑有没有函数传递给子组件使用useCallback。

## 10. 路由模式hash/history

路由：基于spa页面的局部更新，改变url不发送新的请求，监听url变化执行对应操作。

### 10.3 hash和history的区别

1. 外观：hash有#，history没有
2. 请求：hash值变化浏览器不会重新发起请求，且路由的全覆盖，也不会返回 404 错误。history刷新浏览器会重新发起请求，且如果服务端没有匹配当前的url，就会出现404页面。（重定向，返回同一个html页面）
3. 原理：hash是监听浏览器onhashchange()，history是监听浏览器onpopstate()
4. 记录：hash模式只有#后面的内容被修改才会添加新的记录栈；history通过 `pushState()`设置的url与当前url一模一样也会被记录到历史记录栈。但是用replaceState会覆盖当前记录。

### 10.2 hash路由实现

\#后面为hash内容，通过**location.hash**拿到路由地址，**Window.onhashchange()** 监听hash改变

```js
<body>
    <a href="#/home">home</a>
    <a href="#/center">center</a>
    <span id="content"></span>
    <script>
        window.addEventListener('hashchange', function(event){
            let hash = location.hash;
            if(hash == '#/home'){
                document.getElementById('content').innerHTML = 'home'
            }else if(hash == '#/center'){
                document.getElementById('content').innerHTML = 'center'
            }
        })
    </script>
</body>
```

### 10.3 history路由实现

通过**location.pathname**拿到路由地址，**Window.onpopstate()** 监听history改变

```js
<body>
    <p onclick="jump('/home')">home</p>
    <p onclick="jump('/center')">center</p>
    <span id="content"></span>
    <script>
        function jump(url){
            history.pushState({page:url},"title",url);
         // history.replaceState({page:url},"title",url);
            if(url == '/home'){
                document.getElementById('content').innerHTML = 'home'
            }else if(url == '/center'){
                document.getElementById('content').innerHTML = 'center'
            }
        }
        window.addEventListener('popstate', function(event){
            if(event.state.page == '/home'){
                document.getElementById('content').innerHTML = 'home'
            }else if(event.state.page == '/center'){
                document.getElementById('content').innerHTML = 'center'
            }
        }
    </script>
</body>
```

## 11. react全局数据管理

1. redux：用公共的store树储存状态，通过dispatch一个action，使对应的reducer更改数据。单向数据流，异步逻辑
2. context：提供provider和consumer，在要使用的组件外嵌套一层provider，组件内用consumer使用数据。容易数据流混乱，context的值一旦变化，所有依赖该context的组件全部都会 force update。
3. umi的useModel在context基础上二次封装。
4. dva
5. mobx

## 12. LRU缓存手撕

```js
// es6
// 第一步代码
class LRUCache {
    constructor(n){
        this.size = n; // 初始化最大缓存数据条数n
        this.data = new Map(); // 初始化缓存空间map
    }
// 第二步代码
    put(domain, info){
    if(this.data.size >= this.size) {
        // 删除最不常用数据
        const firstKey= [...this.data.keys()][0];// 次数不必当心data为空，因为this.size 一般不会取0，满足this.data.size >= this.size时，this.data自然也不为空。
        this.data.delete(firstKey);
        }
        this.data.set(domain, info) // 写入数据
    }

// 第三步代码
    get (domain) {
        if(!this.data.has(domain)){
            return false;
        }
        const info = this.data.get(domain); //获取结果
        this.data.delete(domain); // 移除数据
        this.data.set(domain, info); // 重新添加该数据
        return info;
    }
}
```

```js
// 既然是es5那么可选的只有Array和Object了
function DoubleLinkNode (key, info){
    this.key = key;
    this.info = info;
    this.pre = null;
    this.next = null;
}

function DoubleLinkNode (key, info){
    this.key = key;
    this.info = info;
    this.pre = null;
    this.next = null;
}

LRUCache.prototype.moveToTop = function (node){
    head.next.pre = node;
    node.next = head.next;
    node.pre = head; 
    head.next = node；
};
LRUCache.prototype.deleteNode = funtion(node) {
    // 链表中移除节点实际上就是将节点的前后节点相连 孤立目标节点即可
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null; 
  
    // 别忘了还要从哈希表去掉节点的key值
    delete this.hashMap[node.key];
   
}

LRUCache.prototype.put = function (key, value){
   // 首先判断节点是否存在，存在则更新对应信息，不存在则插入
   if(this.hashmap[key]){
     const node = this.hashmap[key];
     node.value = value；// 更新
     this.moveToTop(node); // todo1 将节点移动到最前面
     return ;
   } 
   // 否则插入新节点
   const size = Object.keys(this.hashmap).length;
   if(size >= this.size)}{
       // 超过容量，需要先删除最不经常使用的节点，也就是末尾节点
       const node = this.tail.pre;
       this.removeNode(node); // todo2 将节点移除
   }
   // 正常插入新节点 并添加到最前面
   const newNode =  new DoubleLinkNode(key, value);
   this.hashMap[key] = value;
   this.moveToTop(node);
};

LRUCache.prototype.get(domain) = function(){
    if (!this.hashmap[domain]) {
      return false;
    }
    const node = this.hashmap[domain];
    this.deleteNode(node)
    // 因为deleteNode的时候删除了 所以要重新登记
    this.hashmap[domain] = node;
    this.moveToTop(node);
    return node.info;
};
```

## 13. sleep()函数

setTimeout定时器可能不准，setTimeout 是一个异步任务，在执行到 setTimeout 的时候，js 引擎不会立刻把定时任务放到事件循环的任务队列中，而是等待时间到了，再放进事件循环的队列中。

注意，是时间到了才加入队列，那么如果队列中已经有了其他的任务要执行，这个新加的定时器任务自然要等待前面的任务结束，所以时间会延后。

```js
function sleep(delay){
    return new Promise(resolve=>{
        setTimeout(resolve,delay)
    })
}

async function fn(){
    console.log('1')
    await sleep(3000)
    console.log('3')
}

fn()
```

## 14. DNS解析过程

1. 查找本地浏览器缓存
2. 查找操作系统缓存
3. 查找本地DNS服务器缓存
4. 请求根DNS服务器，返回顶级DNS服务器地址
5. 本地DNS服务器向其发送解析请求，返回此域名对应的Name Server域名服务器（域名提供商的服务器）的地址
6. 域名提供商的服务器将ip发给本地dns服务器。本地DNS服务器会缓存这个域名和IP的对应关系，缓存时间由TTL值控制。
7. 本地电脑根据TTL值缓存在本地系统缓存中。

## 15. setTimeout不准时

### 15.1 setTimeout的this

```js
var name = "我是全局的变量";
var user = {
  name: "我是对象里面的变量",
  showName: function () {
    console.log(this.name);
  }
}
setTimeout(user.showName, 1000); // "我是全局的变量"，严格模式为undefined
```

解决：箭头函数、call/bind/apply、匿名函数

### 15.2 不准时原因

1. 当前任务执行时间过久。同步的代码执行时间过久，是会导致异步代码延迟执行的。

```js
// 没有中间那一段 for 循环的代码，按照两个 setTimeout 设定的时间，打印的顺序应该是 2、1 的。
// 中间加上这样一段 for 循环的代码之后，两个定时都到期了，就会按照入队顺序执行：1、2
setTimeout(() => {
  console.log(1);
}, 20);
for (let i = 0; i < 90000000; i++) { } 
setTimeout(() => {
  console.log(2);
}, 0);
```

2. 嵌套调用存在最小时延4ms

如果定时器嵌套 `5` 次以上并且延迟时间小于 `4ms`，则会把延迟时间设置为 `4ms`。

3. 未激活的页面（**切换了标签页或者把浏览器最小化**），setTimeout最小执行间隔为1s。**优化后台页面的加载损耗以及降低耗电量**

比如：一个计时器，每 `50ms` 计时一次，倒计时从 `100` 到 `0`。当浏览器最小化时，是1s计时一个数

4. 延时时间有最大值，大约24.8天。超过这个值，相当于设为0.

### 15.3 替代方案

setTimeout使用用于对时间精确度不高的。

对于动画=>采用**requestAnimationFrame**（根据屏幕刷新率执行，每刷新间隔执行一次，页面未激活的话，requestAnimationFrame 也会停止渲染）
