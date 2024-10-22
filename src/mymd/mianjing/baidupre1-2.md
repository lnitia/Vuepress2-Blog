---
icon: list
date: 2024-09-02
category:
  - 面经
order: 16
excerpt: <p>百度提前批一面 - 企业it平台捞</p>
editLink: false
article: false
---
# 百度一面-第二次

## 1 自我介绍

## 2 介绍青岛项目

## 3 threejs如何进行三维模型展示，有哪几种图形

**three.js** 是一个基于WebGL的JavaScript库，用于在网页中创建和展示三维图形。展示三维模型的基本步骤如下：

1. **场景（Scene）** : 创建一个场景对象（`THREE.Scene()`），这是所有三维元素的容器。
2. **相机（Camera）** : 设置一个相机（通常使用 `THREE.PerspectiveCamera`），确定观察点、视角和可视范围。
3. **渲染器（Renderer）** : 创建渲染器（`THREE.WebGLRenderer`），将场景和相机的组合渲染到屏幕上。
4. **灯光（Light）** : 添加灯光，模拟现实世界中的光照效果（如 `THREE.AmbientLight`，`THREE.DirectionalLight`）。
5. **几何体（Geometry）** : 使用内置的几何体（如立方体、球体、平面等），或加载外部3D模型文件（如 `.obj`，`.fbx`）。
6. **材质（Material）** : 为几何体指定材质，控制表面外观（如颜色、纹理等）。
7. **动画（Animation）** : 使用 `THREE.Clock`或 `requestAnimationFrame`来更新场景中的物体位置或状态。

 **常见的几何图形** ：

* **立方体** (`THREE.BoxGeometry`)
* **球体** (`THREE.SphereGeometry`)
* **平面** (`THREE.PlaneGeometry`)
* **圆柱体** (`THREE.CylinderGeometry`)
* **锥体** (`THREE.ConeGeometry`)
* **环形** (`THREE.TorusGeometry`)

## 4 渲染时有页面卡住吗，如何进行优化的

## 5 localStorage、sessionStorage、cookie的区别，什么时候会用cookie，如何设置cookie过期时间

* **localStorage** : 存储在浏览器中的键值对，数据持久化，页面关闭后数据仍然存在，没有过期时间限制。
* **sessionStorage** : 存储在浏览器中的键值对，仅在当前会话（页面关闭前）有效，关闭页面或浏览器后数据被清除。
* **cookie** : 存储在浏览器中的小数据块，可以设置过期时间，会随每次HTTP请求发送到服务器。大小限制为4KB左右。

 **什么时候使用cookie** :

* 需要在客户端和服务器之间交换少量数据（如用户认证信息）。
* 需要设置数据的过期时间。

 **设置cookie过期时间** :

```js
document.cookie = "username=John; expires=Wed, 13 Sep 2024 12:00:00 UTC; path=/";
```

`expires`或者`max-age`设置过期时间，`path`指定cookie的有效路径。

## 6 青岛系统有没有考虑边界问题

错误处理：try-catch

输入验证：限制输入为数字、必填

## 7 websocket是用来接收什么数据，有没有重连机制

SDP（Session Description Protocol，会话描述协议）交换，用于协商视频编解码器、数据通道等参数。

Signaling 信令服务器自带心跳重连机制

## 8 选择webrtc有考虑兼容性吗，还是只是为了实现功能

## 9 周报系统富文本是用什么实现的，对底层实现有看过吗，是用dom实现的还是canvas实现的

**mavonEditor，**基于Vue.js的Markdown编辑器，主要使用**DOM**进行渲染。

* 输入内容时，mavonEditor解析Markdown语法并生成对应的HTML结构。
* Vue.js的响应式系统会实时更新DOM，反映用户输入的内容。

## 10 从0-1实现富文本，有哪几种实现方式

* **基于contenteditable属性** : 设置元素的 `contenteditable`为 `true`，直接在元素内编辑。适合轻量级实现，操作简单。
* **基于iframe** : 在一个iframe内编辑内容，隔离样式和脚本，适用于复杂的富文本编辑器。
* **基于Canvas** : 通过绘制来实现复杂的富文本编辑，但实现难度较高，适合对文本样式有特殊需求的应用。

## 11 富文本只是纯文本还是有复杂数据结构

## 12 如果插入了一段不合规则的js脚本或dom会不会被xss攻击

为防止XSS攻击，mavonEditor或任何富文本编辑器都应该对用户输入的内容进行严格的**过滤**和**转义** 。

## 13 express有了解吗

**Express**是一个基于Node.js的Web应用框架，简化了服务器和API的构建过程。它提供了：

* **中间件系统** : 用于处理HTTP请求、响应、错误、日志等。
* **路由系统** : 定义不同URL路径对应的处理逻辑。
* **模板引擎支持** : 用于生成动态HTML页面。
* **扩展性强** : 通过插件或中间件扩展功能。

## 14 简单说一下JWT，为什么不用cookie

**JWT（JSON Web Token）** 是一种用于客户端和服务器之间传递安全信息的标准。它的主要特点是：

* **自包含** : JWT中包含了所有必要的信息，服务器无需存储会话状态。
* **可扩展性** : 可以根据需求添加自定义数据。
* **安全性** : 通过签名确保数据未被篡改。

 **为什么不用Cookie** :

* **跨域安全** : JWT可以通过HTTP头传递，避免了跨域问题，而Cookie受限于SameSite策略。
* **无状态性** : JWT不依赖服务器状态，适合分布式系统，而Cookie通常需要服务器存储会话信息。

## 15 vue和react的区别

## 16 有用过vue3吗，有用过vuex吗，讲一下实现原理

**Vuex**是Vue.js的状态管理模式，主要包括以下部分：

* **State** : 存储应用的全局状态。
* **Mutations** : 修改状态的唯一方法，必须是同步函数。
* **Actions** : 处理异步操作，提交mutations以修改状态。
* **Getters** : 从state中派生出计算结果，相当于Vue组件中的computed属性。
* **Modules** : 组织大型应用的状态管理，将store分割成模块。

 **原理** :

* Vuex通过Vue的响应式系统使得state的变化能够自动更新视图。
* Actions和Mutations确保了状态修改的可追溯性和可控性。

## 17 v-if或者是v-show，如何与template绑定，vue语法是怎么编译处理的

* **v-if** : 动态地在DOM中添加或删除元素。`v-if`指令通过条件判断，编译过程中将决定是否渲染该部分的HTML。
* **v-show** : 通过CSS的 `display`属性控制元素的显示与隐藏，渲染过程中并不会真正移除DOM元素。

 **编译处理** :

* Vue的模板编译器会将 `v-if`、`v-show`等指令解析成渲染函数，最终通过Vue的响应式系统进行更新。

## 18 react的hooks和setstate有什么区别

* **Hooks** : React提供的一个新的API，允许在函数组件中使用state和生命周期。`useState`用于声明state变量，`useEffect`用于处理副作用。
* **setState** : 是类组件中更新state的方法，调用后会触发组件重新渲染。

 **区别** :

* Hooks使得函数组件可以具有类组件的功能，而不需要使用类的语法。
* setState是类组件的固有方法，hooks则适用于函数组件。

## 19 hooks实现didmount生命周期应该怎么实现

可以认为 useEffect Hook 为 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合。

## 20 useEffect第二个参数，返回的回调函数的值的作用，如果监听了一个事件，最后想销毁一个事件要怎么做

**返回的回调函数** : 用于清理副作用，比如取消订阅、清除定时器等。执行顺序是在组件卸载或下次 `useEffect`执行之前。

```js
useEffect(() => {
  const handleEvent = () => {
    // 事件处理逻辑
  };

  window.addEventListener('resize', handleEvent);

  return () => {
    window.removeEventListener('resize', handleEvent);
  };
}, []);

```

## 21 react的diff算法

**React的diff算法**用于比较虚拟DOM树的不同部分，以便只更新实际DOM中的变化部分。主要原则有：

* **同层比较** : 只比较同一层级的元素，不跨层级比较。
* **标识不同节点** : 基于节点类型和key属性来判断节点是否相同，若不同则直接替换。
* **减少复杂度** : 使用O(n)复杂度来进行比较和更新。

## 22 webpack有哪些loader和plugin，bable-loader的作用

 **Loaders** : 用于转换模块的源代码，常见的有：

* `babel-loader`: 转换ES6+代码为兼容旧浏览器的JavaScript代码。
* `css-loader`: 允许你 `import`或 `require`CSS文件。
* `style-loader`: 将CSS注入到DOM中。
* `file-loader`: 处理图片、字体等文件，并返回URL。

 **Plugins** : 用于执行更复杂的任务，常见的有：

* `HtmlWebpackPlugin`: 自动生成HTML文件并注入打包后的资源。
* `CleanWebpackPlugin`: 在每次构建前清理输出目录。
* `MiniCssExtractPlugin`: 将CSS提取到单独的文件中。

## 23 常用的es6语法

## 24 promise的状态，如果状态改变后为什么不能再改变了

**Promise的状态**包括：`pending`（等待中）、`fulfilled`（已完成）、`rejected`（已拒绝）。

* 一旦Promise的状态从 `pending`变为 `fulfilled`或 `rejected`，就会被锁定，无法再改变。
* 这是为了保证异步操作结果的一致性，防止不确定性。

## 25 浏览器输入到页面展示的过程，经历了哪些协议

## 26 TCP建立连接、断开连接过程

## 27 页面的渲染步骤

## 28 为什么会发生重绘和重排，如何去避免

 **重绘（Repaint）** : 当元素的样式属性（如颜色、背景）发生变化时，会触发重绘，不会影响元素布局。

 **重排（Reflow）** : 当元素的几何属性（如大小、位置）变化时，会触发重排，浏览器需要重新计算布局。

 **避免** :

* 合理使用 `transform`、`opacity`等不会引发重排的CSS属性。
* 避免频繁修改DOM，使用 `DocumentFragment`或批量更新。
* 使用 `requestAnimationFrame`来处理频繁的动画和DOM更新。

## 29 用css实现一个图片360度旋转

```css
@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.image-rotate {
  animation: rotate360 2s linear infinite;
}

```

```html
<img src="image.jpg" class="image-rotate">
```

## 30 http和https区别，加密过程，什么是对称加密、非对称加密，私钥存在什么位置

 **HTTP和HTTPS的区别** :

* **HTTP** : 明文传输，数据不加密，易受中间人攻击。
* **HTTPS** : 加密传输，使用SSL/TLS协议，提供数据加密和身份验证。

 **加密过程** :

1. **客户端发起请求** ，服务器返回证书（包含公钥）。
2. **客户端验证证书** ，生成对称密钥，并用服务器公钥加密发送给服务器。
3. **服务器解密** ，双方开始使用对称密钥进行通信。

 **对称加密** : 使用同一个密钥加密和解密，速度快，适合大数据量。
 **非对称加密** : 使用公钥加密，私钥解密，安全性高，适合密钥交换。

 **私钥位置** : 通常存储在服务器的安全位置（如HSM硬件安全模块）或加密的文件中。

## 31 事件委托有什么好处

* **减少内存消耗** : 通过将事件处理程序绑定到父级元素，而不是每个子元素，减少了事件处理程序的数量。
* **动态元素处理** : 方便处理动态添加或删除的元素，无需重新绑定事件。
* **提高性能** : 尤其在大量DOM元素存在时，事件委托可以显著提高性能。

## 32 进程和线程的区别，进程间通信的方式

 **进程** :

* 独立的程序执行实例，拥有独立的内存空间。
* 进程之间相互独立，切换开销较大。

 **线程** :

* 进程内的执行单元，线程共享进程的内存空间。
* 线程间切换开销较小，但需要注意同步问题。

 **进程间通信方式** :

* **消息队列** : 通过消息队列传递数据。
* **信号** : 用于进程间的简单通知。
* **管道（Pipe）** : 通过管道实现数据流的传递。
* **共享内存** : 允许多个进程共享相同的内存区域。

## 33 垃圾回收

垃圾回收机制（GC）用于自动管理内存，释放不再使用的对象。常见的垃圾回收算法有：

* **标记-清除（Mark and Sweep）** : 标记可达对象，然后清除未标记的对象。
* **引用计数（Reference Counting）** : 通过维护每个对象的引用计数，引用计数为0时回收。
* **分代回收** : 将对象按生命周期分为新生代和老年代，分别处理，优化性能。

## 34 闭包，在什么场景下会用到，有什么优缺点

**闭包**是指有权访问另一个函数作用域中变量的函数。常用于：

* **数据私有化** : 通过闭包创建私有变量，外部无法直接访问。
* **回调函数** : 将函数和上下文数据绑定在一起传递。
* **模块化编程** : 在JavaScript中使用闭包来实现模块化。

 **优点** :

* 保持状态，延长变量的生命周期。
* 方便创建工厂函数和模块化代码。

 **缺点** :

* 可能导致内存泄漏，尤其在不正确处理闭包时。
* 增加调试复杂度。

## 35 手撕

1. 数组forEach方法

```javascript
arr.forEach((element, index, array)=>{})
```

2. 防抖

```js
function debounce(fn,delay){
   let timer = null
   return function(){
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn
      },delay)
   }
}
```

3. 输入str='a-b-c-d'，输出'aBCD'

方法1：

```js
let str = 'a-b-c-d'
let st = str.replaceAll('-', '')
let res = st[0] + st.slice(1).toUpperCase();
console.log(res)
```

注意：

1. 用replaceAll才能全部替换
2. 要用新变量接收

方法2：

```js
let parts = str.split('-');
let result = parts[0];
for (let i = 1; i < parts.length; i++) {
  result += parts[i].toUpperCase();
}
console.log(result)
```

4. 发布订阅

发布订阅模式（也称为观察者模式）是一种设计模式，允许对象（发布者）向其他对象（订阅者）发送通知，而无需显式知道这些对象是谁

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // 发布事件
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  // 取消订阅
  off(event, listenerToRemove) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  // 订阅一次性事件
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper); // 执行一次后取消订阅
    };
    this.on(event, wrapper);
  }
}

// 使用示例
const emitter = new EventEmitter();

const onMessage = (message) => {
  console.log(`Received message: ${message}`);
};

// 订阅事件
emitter.on('message', onMessage);

// 发布事件
emitter.emit('message', 'Hello, World!');  // 输出: Received message: Hello, World!

// 取消订阅
emitter.off('message', onMessage);

// 再次发布事件，不会有输出
emitter.emit('message', 'Hello again!');

// 订阅一次性事件
emitter.once('message', (message) => {
  console.log(`Received one-time message: ${message}`);
});

emitter.emit('message', 'This will be logged');  // 输出: Received one-time message: This will be logged
emitter.emit('message', 'This will not be logged');  // 无输出

```

* **`on(event, listener)`** : 用于订阅事件，将事件和回调函数关联起来。
* **`emit(event, ...args)`** : 用于发布事件，触发所有订阅该事件的回调函数，并传递相关参数。
* **`off(event, listenerToRemove)`** : 用于取消订阅事件，移除指定的回调函数。
* **`once(event, listener)`** : 用于订阅一次性事件，回调函数只会触发一次。

## 36 反问
