---
icon: list
date: 2024-08-15
category:
  - 面经
order: 7
excerpt: <p>滴滴一面</p>
editLink: false
article: false
---
# 滴滴一面

## 1 自我介绍

## 2 在开发中比较有挑战性的内容，展开说说

## 3 css盒模型

## 4 flex布局的基本概念，flex属性有哪些子属性，解释flex：1

容器内的子元素可以自动调整大小和顺序以适应不同的屏幕尺寸和容器尺寸。

**`flex: 1`** 是 `flex-grow: 1; flex-shrink: 1; flex-basis: 0` 的简写，表示子元素会在容器内均分剩余空间，并且会随容器缩小而缩小

## 5 浏览器多个tab页面进行通信的实现方式有哪些

* **LocalStorage** ：通过监听 `storage` 事件在不同的标签页之间同步数据。
* **SharedWorker** ：通过共享 Worker 实现多个 Tab 页之间的通信。
* **BroadcastChannel API** ：专门用于多标签页之间的消息广播。
* **Service Worker** ：可以拦截网络请求，进行数据共享。
* **WebSocket** ：通过服务器中转消息，实现多页面实时通信。

## 6 es6+语法

* **箭头函数** ：简化函数定义，`this` 绑定到函数定义时的上下文。
* **`let` 和 `const`** ：块级作用域的变量定义方式。
* **模板字符串** ：使用反引号（```）包裹字符串，支持变量嵌入和多行字符串。
* **解构赋值** ：快速从对象或数组中提取值。
* **扩展运算符** ：用于展开数组或对象，或者合并对象。
* **`Promise`** ：用于异步编程，简化回调地狱。
* **`async/await`** ：基于 Promise 的异步操作的更简洁写法。
* **模块导入导出** ：通过 `import` 和 `export` 实现模块化。
* `class` : 声明类

## 7 promise.all和promise.race的区别

## 8 对象继承实现方式

class ：extends

function ：1. 直接拷贝方法和属性； 2. 组合式继承

## 9 深拷贝和浅拷贝区别

* **浅拷贝** ：拷贝对象的引用，修改拷贝后的对象会影响原对象。常见的浅拷贝方法有 `Object.assign`、数组的 `slice`、`concat` 等。
* **深拷贝** ：拷贝对象的值，生成完全独立的对象，修改拷贝后的对象不会影响原对象。常见的深拷贝方法有 `JSON.parse(JSON.stringify(object))`（但不支持函数、`undefined`、`Symbol` 等特殊值）以及递归遍历实现深拷贝。

## 10 react还是vue，react版本

react 17.x

## 11 useEffect第二个参数不传和传[]的区别

不传 - 每次数据改变都会执行

[] - 只有初始化执行一次

## 12 高阶组件主要用在什么场合

高阶组件是一个函数，接受一个**组件**作为参数并返回一个新**组件**。它主要用于**代码复用**、跨组件共享逻辑（如状态管理、权限控制、日志记录等）。

## 13 render props有了解过吗

Render Props 是一种在 React 组件间**代码复用**的技术。组件接收一个**函数**作为 `props`，并通过这个函数返回要渲染的内容。

## 14 react component和purecomponent区别

* **Component** ：每次父组件更新时，无论 `props` 是否改变，子组件都会重新渲染。
* **PureComponent** ：通过浅比较 `props` 和 `state` 来决定是否重新渲染，避免不必要的渲染以提升性能。

## 15 webpack如何初始化项目

* 创建一个空文件夹，进入文件夹后运行 `npm init -y` 初始化 `package.json` 文件。
* 安装 Webpack 及其 CLI 工具：`npm install --save-dev webpack webpack-cli`。
* 创建 Webpack 配置文件 `webpack.config.js`，配置入口、输出、加载器和插件等。
* 在 `package.json` 中添加构建脚本 `"build": "webpack"`，通过 `npm run build` 进行构建。

## 16 常用的loader和plugins

loader: 

* `babel-loader`：将 ES6+ 代码转译为 ES5。
* `css-loader`：解析 `@import` 和 `url()` 语法，实现 `CSS` 模块化。
* `style-loader`：将 CSS 插入到 DOM 中。
* `file-loader`：处理文件导入，例如图片和字体。
* `url-loader`：类似于 `file-loader`，但可将小文件转化为 base64 数据 URL。

plugins：

* `HtmlWebpackPlugin`：自动生成 `index.html` 文件，并自动引入打包后的文件。
* `MiniCssExtractPlugin`：将 CSS 从 JS 文件中分离出来，生成独立的 CSS 文件。
* `CleanWebpackPlugin`：每次构建前清理输出目录。
* `DefinePlugin`：定义全局常量，例如环境变量。
* `HotModuleReplacementPlugin`：启用热模块替换（HMR）功能，实时更新页面内容。

## 17 事件循环代码分析

```jsx
async functionasync1(){
console.log("async1 start");
await async2();
console.log("async1 end");
}

async functionasync2(){
console.log("async2");
}

console.log("script start");

setTimeout(function(){
console.log("setTimeout");
},0);

async1();

new Promise(function(resolve){
console.log("promise1");
resolve();
}).then(function(){
console.log("promise2");
});

console.log("script end");

//结果：
//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2
//setTimeout
```

## 18 手撕

```js
function remoteAdd(a, b) {
  return new Promise((resolve) => resolve(a + b))
}

//方法1
function sum(...args) {
  // 用reduce函数链式调用remoteAdd
  return args.reduce((promise, current) => {
    return promise.then(result => remoteAdd(result, current));
  }, Promise.resolve(0)); // 初始值为Promise.resolve(0)
}
//方法2
async function sum(...args) {
  let result = 0;
  for (const num of args) {
    result = await remoteAdd(result, num);
  }
  return result;
}
//方法3
function sum(...args) {
  let promise = Promise.resolve(0);
  args.forEach((num) => {
    promise = promise.then((result) => remoteAdd(result, num));
  });
  return promise;
}

// case
sum(1, 2).then(console.log) //Promise<3>
sum(1, 2, 4).then(console.log) //Promise<7>
```

## 19 为什么选择前端方向

## 20 平时怎么学习前端

## 21 反问

技术栈：vue和react都有，vue比较多，跨端-和vue2语法差不多，内部实现的框架，react也有类似RN的

工作年限、发展方向：7年，先深度、广度-转ios、服务端、api层，兴趣为导向
