---
icon: list
date: 2024-07-18
category:
  - 面经
order: 1
excerpt: <p>华泰证券</p>
editLink: false
article: false
---
# 华泰证券面经

## 1 自我介绍

## 2 研究生小组周报办公系统负责内容

前端 - vue2  + 后端 - nodejs

## 3 技术栈主要是vue还是react

react

## 4 讲一下事件冒泡

**事件冒泡**：当一个元素接收到事件的时候，会把他接收到的事件传给自己的父级，一直到 `window` （注意这里传递的仅仅是事件，例如 `click、focus`等等这些事件， 并不传递所绑定的事件函数。）

eg：给三个盒子依次绑定点击事件，当点击盒子的时候，会依次触发父级元素的点击事件

**事件捕获**：当鼠标点击或者触发 `dom`事件时（被触发 `dom`事件的这个元素被叫作事件源），浏览器会从根节点 =>事件源（由外到内）进行事件传播

先事件捕获再事件冒泡

**事件委托**：也称为 `事件代理`。就是利用 `事件冒泡`，把子元素的事件都绑定到父元素上。如果子元素阻止了事件冒泡，那么委托就无法实现。

## 5 addeventlistener是什么，接收几个参数

事件监听器

`element.addEventListener(event, function, useCapture)`

event：不可省略。注意: 在 addEventListener() 方法中不能使用 "on" 前缀，会报错。 eg：要使用 "click" ,而不是 "onclick"。

function：不可省略。事件发生时运行的函数。

useCapture:可以省略，默认值是 false。true ：使用事件捕获，false ：使用事件冒泡

## 6 能改变原数组的值的方法

7个：push、pop、shift、unshift、sort、reverse、splice(start, deleteCount, item1, item2)（区别于slice(start, end)）

## 7 怎么学习react的

官方文档 - 视频 - 边看边做

## 8 学的过程中遇到什么困难，怎么解决的

## 9 讲一下promise

**介绍**：是异步编程的一种解决方案， 它的构造函数是同步执行的，then 方法是异步执行的，所以Promise创建后里面的函数会立即执行，构造函数中的resolve和reject只有第一次执行有效，也就是说Promise状态一旦改变就不能再变

**作用**：主要是用来解决回调地狱的问题，通过使用.then来使得代码成链式调用，方便维护和使用。.then中的回调函数属于异步任务中的微任务

**状态**：promise一共有3个状态：pending、fulfilled和rejected

pedding->初始状态：调用promise时，一开始就呈现出等待状态，遇到resolve或者reject之前，都处于这个状态，且可以改变，但如果确定了状态（fulfilled/reject），则结果将永远不变，不能再次修改

fulfilled->成功状态：在执行了resolve后，promise则会从pedding变成fulfilled，后续会进入.then 的回调函数中，在回调函数的第一个参数函数中可以获取到值

rejected->失败状态：在执行了reject后，promise状态会变成rejected，rejected函数传递的参数，可以在.then的第二个参数函数中获取到，或者是在.catch获取到，但是如果程序上的错误，得通过.catch函数去拿到失败消息，在.then中是获取不了的

**九个方法**：Promise.resolve，Promise.reject，Promise.then，Promise.catch，Promise.any，Promise.finally

* **Promise.all(promises)**：接收一个包含多个Promise对象的数组，等待所有都完成时，返回存放它们结果的数组。如果任一被拒绝，则立即抛出错误，其他已完成的结果会被忽略
* **Promise.allSettled(promises)** : 接收一个包含多个Promise对象的数组，等待所有都已完成或者已拒绝时，返回存放它们结果对象的数组。每个结果对象的结构为 `{status:'fulfilled' // 或 'rejected', value // 或reason}`
* **Promise.race(promises)** : 接收一个包含多个Promise对象的数组，等待第一个有结果（完成/拒绝）的Promise，并把其result/error作为结果返回

## 10 还有哪些异步方法

回调函数、async/await、generator

## 11 nodejs环境和浏览器环境区别

1. 在 Node.js 中没有浏览器提供的 `document`、`window` 和所有其他对象。在浏览器中，没有 Node.js 通过其模块提供的所有优秀 API，例如文件系统访问功能。
2. 在 Node.js 中可以控制环境（nodejs版本）。可以支持的所有现代 ES2015+ JavaScript，而浏览器版本无法自由选择，可能只能使用较旧的 JavaScript / ECMAScript 版本，就需要通过 Babel 将代码转换为 ES5 兼容。
3. Node.js 同时支持 CommonJS 和 ES 模块系统。nodejs可以同时使用 `require()` 和 `import`，而在浏览器中只能使用 `import`。

## 12 nodejs和浏览器不同的全局变量有哪些

全局变量是全局对象的属性

nodejs

1、全局对象

* global：表示Node所在的全局环境，类似于浏览器中的window对象。
* process：指向Node内置的process模块，允许开发者与当前进程互动。eg：在DOS或终端窗口直接输入node，就会进入NODE的命令行方式（REPL环境）。要退出的话，可以输入 process.exit()
* console：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。

2、全局函数

* 定时器函数：共有4个，分别是setTimeout(), clearTimeout(), setInterval(), clearInterval()
* require()：用于加载模块

3、全局变量：

* __filename：指向当前运行的脚本文件名。
* __dirname：指向当前运行的脚本所在的目录。

浏览器 - 全局对象为window

## 13 globol下面包括哪些东西

1. __dirname
2. __filename
3. exports
4. module
5. require()

有些内置对象 是 JavaScript 语言本身的一部分，它们也可以全局地访问。

## 14 nodejs有一个处理二进制数据的是什么

Buffer类：允许将原始二进制数据存储在内存中，并提供了一系列的方法来操作这些数据。例如，使用 `Buffer.from()`方法将字符串或数组转换为Buffer对象，使用 `Buffer.toString()`方法将Buffer对象转换为字符串或数组。此外，可以使用Buffer类来对二进制数据进行编码和解码操作。

## 15 express框架和koa框架区别

Koa 是 Express 的轻量级版本。它是一个中间件框架，没有像 Express 那样的额外模块（比如，没有内置路由和模板引擎）。

## 16 express怎么部署的，一个实例还是多个实例

一个实例

多个实例部署：不同的服务器或同一服务器的不同端口上运行多个 Express 实例

## 17 用户量问题，面对很多用户的时候怎么部署

前端部署：

1. **静态文件托管** ：将前端项目构建为静态文件（HTML、CSS、JavaScript）。使用 CDN（内容分发网络）托管静态文件，以提高加载速度和可靠性。
2. **构建优化** ：使用构建工具（如 Webpack、Parcel）对前端代码进行优化和压缩。启用代码拆分和懒加载，以减少初始加载时间。使用 Tree Shaking 和 Dead Code Elimination 减少包的大小。
3. **HTTP/2 和缓存** ：启用 HTTP/2 协议，以提高传输效率。设置合理的缓存策略，使用 Cache-Control 和 ETag 头部，以减少重复加载。

nodejs部署：多实例部署

## 18 nodejs是几个线程

两种线程：*event loop* 处理的主线程和 *worker pool* 中的几个辅助线程。

事件循环是一种机制，它采用回调（函数）并注册它们，准备在将来的某个时刻执行。它与相关的 JavaScript 代码在同一个线程中运行。当 JavaScript 操作阻塞线程时，事件循环也会被阻止。

工作池是一种执行模型，它产生并处理单独的线程，然后同步执行任务，并将结果返回到事件循环。事件循环使用返回的结果执行提供的回调。

## 19 有了解哪些前端比较新的东西吗

跨端 flutter，react native

ES新语法

## 20 了解到哪些ES新语法

ES15（2024）

1. Object.groupBy 分组
2. Promise.withResolvers 把 Promise实例、resolve、reject 解构出来供使用
3. String.prototype.isWellFormed、String.prototype.toWellForme测试字符串格式是否正确及转换为正确格式

## 21 遇到的困难的问题，举个例子，怎么解决的

## 22 有什么问题

技术栈 - react多，vue也有用，用的是vue3
