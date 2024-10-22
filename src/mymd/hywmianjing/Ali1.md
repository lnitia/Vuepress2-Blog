---
icon: list
date: 2024-07-18
category:
  - 面经
order: 1
excerpt: <p>阿里</p>
editLink: false
article: false
---
# 阿里一面

## 1. 自我介绍

## 2. 青岛项目技术设计，详细介绍

1. 前处理三维静态模型
2. 前处理二维轨道预览
3. 后处理仿真三维场景

## 3. 参数和3d模型的渲染的影响

这个需要模型配合。

## 4. 三维模型渲染慢的解决方案

1. 前后端请求
2. 压缩三维模型
3. 异步加载模型
4. 转化成 Blob 格式的文件，存在 IndexedDB 中，就可以解决免去二次加载时网络请求的时间。（localforage.setItem()）
5. 模型预加载
6. 过渡loading

## 5. umi屏幕适配原理

1. 将根节点字体设置为屏幕宽度的十分之一
2. 利用插件postcss将css的px转化为rem

## 6. 其他适配方案

1. 百分比布局
2. rem布局
3. 媒体查询+改根节点字体/改静态页面
4. flex弹性布局
5. 流式布局，宽度百分比，高度px

## 7. echart渲染大数据做了哪些优化

1. 提供dataZoom，进行数据区域放缩，类似于范围条，只显示所选范围的
2. 线条曲线提供sampling，过滤数据，比如只取过滤点的最大值、平均值等，还有个lttb算法（最大程度保证数据趋势和极值）
3. 提供appendData进行分片加载数据和增量渲染（渲染新数据时不会清除已经渲染的）

## 8. 渲染大数据表格方案

1. echart提供的一些api优化，如sampling中的lttb算法过滤数据，dataZoom区域显示，appendData进行分片加载数据和增量渲染。
2. 懒加载表图，只显示屏幕上的。
3. web worker，将计算密集型或者高延迟的渲染任务交给worker线程，主线程负责ui交互。
4. 虚拟列表：只渲染可视区域的内容的列表。当鼠标滚动时，再渲染下一波内容，即虚拟列表中的dom元素始终是指定数目的。
   1. 计算当前可见区域起始数据的 startIndex
   2. 计算当前可见区域结束数据的 endIndex
   3. 计算当前可见区域的数据，并渲染到页面中
   4. 计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset，并设置到列表上

## 9. fiber架构（完整）

背景：传统dom tree遍历子节点需要进行递归，会占用大量js调用栈。而是用fiber tree遍历链表，不用递归。（递归调用，执行栈会越来越深，而且不能中断，中断后就不能恢复了。递归如果非常深，就会十分卡顿。）

React Fiber把**更新过程碎片化**，把一个**耗时长的任务分成很多小片**，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，**这样唯一的线程就不会被独占**，其他任务依然有运行的机会。

- 每个**元素**都会有一个fiber对象对应。这些fiber对象之间相互关联，构成了**fiber tree**。
- react fiber的**更新过程是碎片化**的，一次更新会分为n个任务片。每个片执行完成后就会把**控制权交给调度器。**
- **调度器**会查看浏览器**是否有级别更高的任务**（比如：alert，onclick，等），如果有执行这个高级别任务。
- 当整个FiberTree中的节点都被处理后，统一提交所有FiberNode更新。
- 好处：细粒度的任务调度能力=>细化了任务的粒度=>降低了任务阻塞的时长，对任务整体来说没有提速。

遇到**进程阻塞**的问题时，**任务分割、异步调用 和 缓存策略** 是三个显著的解决思路。

## 10. fiber切分小块后为什么由合起来

## 11. 强缓存、协商缓存

### 11.1 强缓存

强缓存：不用请求服务器，在过期时间内直接从缓存中读取资源

**expire和cache-control: max-age=300**

其中max-age=300 public/private/immutable/no-cache/no-store

- public指客户端和代理服务器都可以缓存该资源
- private指只允许客户端缓存该资源
- immutable使用户做了刷新操作，也不向服务器发起http请求
- no-cache指不使用强缓存
- no-store指不使用缓存

### 11.2 协商缓存

协商缓存：请求服务器是否使用缓存，服务器根据请求头判断

last-modified（资源最后请求时间）和Etag（请求资源文件的hash值）

- last-modified精确到秒，所以一秒若改变多次，只会更新最后一次
- Etag由服务端生成，增加服务端压力

## 12. 强缓存存储方案和策略

- 对与**频繁变动**的资源：

  使用 **Cache-Control: no-cache**，使浏览器每次都请求服务器，然后配合 **ETag 或者 Last-Modified** 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。
- 对于**不常变化**的资源：

  通常在处理这类资源时，给它们的 Cache-Control 配置一个**很大的 max-age=31536000 (**一年)，这样浏览器之后请求相同的 URL 会命中强制缓存。而为了**解决更新的问题，**就需要在文件名(或者路径)中添加 hash， 版本号等动态字符，之后更改动态字符，从而**达到更改引用 URL 的目的**，让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。
- 对于**首屏**：

  向vue打包的js，css文件名都是有hash值的，唯一的，页面请求的是新资源，自然不会有缓存问题，但是index.html会存在更新问题，所以一般对index.html使用协商缓存而不是强缓存。

## 13. 磁盘缓存和内存缓存，何时使用，使用策略

- 内存缓存memory cache：**访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存**，关闭 Tab 页面，内存中的缓存也就被释放了。
- 磁盘缓存disk cache：根据请求头。**大文件或者内存使用率高时，放在磁盘。**
- 离线缓存ApplicationCache：运行在浏览器背后的独立线程，一般可以用来实现缓存功能。让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。
- 推送缓存

## 14. promise、async、generator

- **promise**：实现异步编程，为构造函数，传入resolve和reject，通过then方法处理成功或者失败后的回调。通过链式调用，可以防止回调地狱等问题。
- **async：** 与await配合，实现异步编程同步化。async返回一个promise对象，await后面为async返回的promise对象，此时await会阻塞后面的代码，等待该promise对象resolve的值。
- **generator：** 每调用一次生成器，函数内部状态就改变一次。他是一个带星号的函数，通过yield关键字实现改变。函数.next()就会执行一次，返回value和done

## 15. await异步代码同步化（generator+co库）

async、await 是 co 库的官方实现。也可以看作自带启动器的 generator 函数的语法糖。不同的是，async、await 只支持 Promise 和原始类型的值，不支持 thunk 函数。

如果用生成器实现await的话，每次next后，会返回一个value，该value为promise，需要value.then的res作为传参放入到迭代器的下一个next中，直到done为true。

每次执行 generator 函数时自己写启动器比较麻烦。**co函数库 是一个 generator 函数的自启动执行器**，使用条件是 generator 函数的 yield 命令后面，只能是 thunk 函数或 Promise 对象，co 函数执行完返回一个 Promise 对象。该promise对象的res就是await等待执行后获得的值。

```js
// async await
async function readfile() {
  try {
    const content1 = await readFileWithPromise('/etc/passwd', 'utf8')
    console.log(content1)
    const content2 = await readFileWithPromise('/etc/profile', 'utf8')
    console.log(content2)
    return 'done'
  } catch (err) {
    throw(err)
  }
}
readfile().then(
  res => console.log(res),
  err => console.error(err)
)

// generator with co
co(function* () {
  try {  
    const content1 = yield readFileWithPromise('/etc/passwd', 'utf8')
    console.log(content1)
    const content2 = yield readFileWithPromise('/etc/profile', 'utf8')
    console.log(content2)
    return 'done'
  } catch (err) {
    console.error(err)
    return 'fail'
  }
})
```

## 16. yield和await的区别

yield：一旦遇到yield，生成器就会暂停执行，next()后恢复

await：等待一个promise对象执行结果。内部原理为自动迭代器co函数+生成器generator

## 17. 生成器generator原理

生成器究竟是如何让函数暂停, 又会如何恢复的呢

**协程的执行机制**

协程理解为线程中的一个个任务。**一个线程一次只能执行一个协程**。比如当前执行 A 协程，另外还有一个 B 协程，如果想要执行 B 的任务，就必须在 A 协程中将**JS 线程的控制权转交给 B协程**，那么现在 B 执行，A 就相当于处于暂停的状态。

## 17. 怎么了解前端新技术

## 18. 学习前端的规划

## 19. 有没有脱离框架，了解一些框架的原理

1. umi的全局共享数据

   底层基于React.context实现，umi会将model文件夹自定义的hook函数里的state设置为全局状态，当组件要使用时，会在组件外部包裹一层context的provider标签，将state提供给组件使用。同时会提供一个setState的函数，对全局数据进行更改。

   原始的context数据流很乱，umi对其进行二次封装，提用户管理数据流，使之更清晰

   同样的，redux也是将数据流更加清晰。将数据统一放在state树中，通过dispatch一个action，使之执行对应的reducer更改数据。
2. umi自适应

   根节点字体设为屏幕宽度1/10，postcss插件将css的px转为rem，根据媒体查询改变布局
3. echart的大数据渲染优化方案

   appendData：分片加载和增量渲染；sampling：数据过滤；dataZoom分区渲染

## 20. 反问

技术栈：面向阿里巴巴内部办事，react、数据可视化、ai结合大模型、webpack
