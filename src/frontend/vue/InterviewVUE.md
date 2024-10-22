---
icon: vuejs
date: 2024-03-04
category:
  - 前端
  - vue
tag:
  - 基础
order: 1
excerpt: <p>vue基础知识汇总</p>
editLink: false
---
# Vue基础知识汇总

## 0. 绪论

### 0.1 vue的优缺点

#### 优点

1. 数据驱动视图。从真实dom中抽出虚拟dom，配合diff算法、响应式和观察者模式、异步队列等手段，以最小代价更新dom，渲染页面。
2. 组件化。组件用单文件进行代码编写，包括html、css、js。
3. 强大的api，满足业务开发需求。mixin、set、extend、filter等
4. 可以进行服务器渲染（**SRR**）。Vue 也支持将组件在服务端直接渲染成 HTML 字符串，作为服务端响应返回给浏览器。这可以更**快的首屏渲染**、更好的SEO、统一的心智模型。注:在为你的应用使用 SSR 之前，你首先应该问自己是否真的需要它。这主要取决于首屏加载速度对应用的重要程度。构建配置和部署相关的要求高、开发限制、服务端负载大等问题。
5. 可以进行**静态**站点生成（**SSG**）。如果用服务端渲染一个页面所需的数据对每个用户来说都是相同的，那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来都重新渲染页面。预渲染的页面生成后作为静态 HTML 文件被服务器托管，**快的首屏渲染**。这样 N 次渲染，变成了 1 次渲染，N 次客户端渲染变成了 1 次静态页面生成。每当数据变化时，都需要**重新部署**。
6. 生命周期钩子函数、选项式和组合式的api代码格式。

#### 缺点

1. 客户端渲染的不足（CSR）。Vue / React 裸框架，都使用了 JS 的能力，向 `<div id="App"></div>` 中动态填充 HTML，完全由浏览器渲染，搜索引擎抓取不到任何关于页面的信息。从而造成**白屏、SEO不友好**等问题。
2. vue2中定义好的响应式数据，新增属性不具备响应式。

### 0.2 vue与react的不同与运用场景

1. vue—尤雨溪，react—facebook
2. vue—渐进式双向绑定的MVVM框架，容易上手，react—js能力要求高，声明式与单向数据流（数据主要从父节点通过props传递到子节点，数据主要从父节点通过props传递到子节点）
3. 组件写法：vue—template的单文件组件格式，react—JSX+inline style（html和css全写进js中）
4. diff算法：vue对比节点，如果节点元素类型相同，但是className不同，认为是不同类型的元素，会进行删除重建，但是react则会认为是同类型的节点，只会修改节点属性。
5. 响应式原理：vue—Object.definedProperty/Proxy+Reflect，react—setState()方法来更新状态，状态更新之后，组件也会重新渲染。
6. 封装程度：vue—高，内置多个指令和数据双向绑定，react—低，适合扩展。

### 0.3 什么是虚拟dom

在react、vue之前，改变页面内容是通过遍历查询daom树找到需要修改的dom元素进行修改。

虚拟dom是一个与 dom 树对应的虚拟dom对象（js对象）。以对象嵌套的形式表示dom树，更改dom变成更改js对象属性。查找js对象属性的开销小于查找dom元素。

状态变更时，记录新树和旧树的差异，最后把差异更新到真正的dom。避免了过去小小改变就操作dom而引起回流与重绘。

### 0.4 MVVM

M——数据模型；V——视图；VM——视图模型

是把 MVC 中的 Controller 演变成 ViewModel 。VM是数据与视图的桥梁，将数据绑定到VM中，并渲染到视图上；视图上的数据发生变化，又会通知VM修改数据模型中的数据。

mvvm主要解决了mvc中大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。

mvvm相对于mvp就是将三者之间的更新自动化了

补充：

MVC——model、view、controller : model=>view=>controller=>model

MVP——model、view、presenter ：view<=>presenter<=>model

### 0.5 diff算法

Vue2的核⼼Diff算法采⽤了 **双端⽐较** 的算法，同时从新旧children的两端开始进⾏⽐较，借助key值找到可复⽤的节点，再进⾏相关操作。**相⽐React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅**。

Vue3.x借鉴了 **ivi算法和 inferno算法**。在创建VNode时就确定其类型，以及在 mount/patch 的过程中采⽤ **位运算 来判断⼀个VNode的类型，** 在这个基础之上再配合核⼼的Diff算法，使得性能上较Vue2.x有了提升。(实际的实现可以结合Vue3.x源码看）。

## 1. vue如何渲染页面

### 1.1 命令式 => 声明式

点击按钮将div内容改为你好

```html
<div>hello world</div>
<button>按钮</button>
```

命令式

```js
const div = document.getElementByTagName("div")[0];
const button = document.getElementByTagName("button")[0]
button.onclick = function(){
    div.innerText = "你好"
}
```

声明式

```vue
<div>{{text}}</div>
<button @click="()=>{text = "你好"}">按钮</button>

<script>
export default {
    data(){
        return {
            text:"hello world"
        }
    }
}
</script>
```

### 1.2 数据劫持

输入框更新内容,h1也更新；点击按钮，input、h1也更新

```vue
<div>
    <input type="text" />
    <h1></h1>
    <button>按钮</button>
</div>
<script>
    const input = document.getElementByTagName("input")[0];
    const h1 = document.getElementByTagName("h1")[0];
    const btn = document.getElementByTagName("button")[0];
    var data = { text: ""}
  
    // 命令式
    input.addEventListener('input', function(e){
        data.text = e.target.value
        h1.innerText = data.text
    })
    btn.onclick = function(){
        data.text = '你好'
        h1.innerText = data.text
    }
  
    // vue2:Object.defineProperty(target, property, handler), 缺点:后续添加的属性不具备响应式
    data(){
        return {
            data:{text:" "}
        }
    }
    // data对象，属性，若要代理对象多个属性需要进行遍历操作，forEach
    Object.defineProperty(data, "text", function(e){
        get:function(){
            return data["text"]
        },
        set:function(newValue){
            h1.innerText = newValue;
            input.innerText = newValue;
        }
    })
  
    // vue3:proxy+reflect
    // reflect可以用于获取目标对象的行为，它与Object类似，但更易读，为操作对象提供更优雅的方式。其方法与proxy对应
  
    // obj代理data，data为对象，没具体说明哪个属性key，所以添加修改属性都具有响应式
    const obj = new Proxy(data, {
        get(target, key, receiver){
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newValue){
            target[key] = newValue
            document.body.innerText = data.text
            return Reflect.set(target, key, newValue)
        }
    })
    btn.onclick = function(){
        obj.text = "你好"
    }
</script>
```

### 1.3 Proxy+Reflect

Proxy: 创建操作一个对象的中介代理，要操作该对象需通过中介同意

**使用方法：**

```js
let p = new proxy(target, handler)
// target为目标对象，可以是数组、对象、函数; handler是一个对象，里面有进行代理的函数
```

Reflect: 提供拦截 JavaScript 操作的方法。这些方法与 Proxy的方法相同

**单独使用Proxy**

```js
const obj = {
  name: 'wang.haoyu',
};

const proxy = new Proxy(obj, {
  // get陷阱中target表示原对象;
  // key表示访问的属性名;
  // receiver可以表示代理对象proxy,同时也许他会代表继承 Proxy 的那个对象
  // 当然，你不要将 revceiver 和 get 陷阱中的 this 弄混了，陷阱中的 this 关键字表示的是代理的 handler 对象.
  get(target, key, receiver) {
    console.log('劫持你的数据访问' + key);
    return target[key]
  },
});

proxy.name // 劫持你的数据访问name -> wang.haoyu
// 当访问我们访问 proxy.name 时实际触发了对应的 get 函数，它会执行 get 函数中的逻辑，最终返回对应的 target[key] 也就是所谓的 wang.haoyu .
```

**为啥要用Reflect：**

1. 触发代理对象的劫持时保证正确的 this 上下文指向（**Reflect中的receiver**）

   即可以修改属性访问中的 this 指向为传入的 receiver 对象

```js
const parent = {
  name: '19Qingfeng',
  get value() {
    return this.name;
  },
};
 
const handler = {
  get(target, key, receiver) {
    return Reflect.get(target, key);
    // 这里相当于 return target[key]
  },
};
 
const proxy = new Proxy(parent, handler);
 
const obj = {
  name: 'wang.haoyu',
};
 
// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);
 
// log: false
console.log(obj.value); // 打印的是parent[value]：19Qingfeng
```

但是我们想打印的是obj[value]: wang.haoyu => reflect的receiver上场

```js
  return Reflect.get(target, key);
改为
  return Reflect.get(target, key， receiver);
// 相当于target[key].call(receiver)
```

2. 框架健壮性

 **Reflect.defineProperty() 是有返回值的**，所以通过 返回值 来判断你当前操作是否成功

### 1.4 实现响应式

**vue2：发布订阅模式+数据劫持**

```js
// 订阅器
let Dep = {
    clientList:{},
    listen: function(key, fn){
        (this.clientList[key]||(this.clientList[key] == 0)).push(fn)
    },
    trigger: function(){
        let key = Array.prototype.shift.call(arguments);
        fns = this.clientList[key];
        if(!fns || fns.length === 0){
            return false;
        }
        for(let i = 0, fn; fn = fns[i++];){
            fn.apply(this, arguments)
        }
    }
}
// 数据劫持
let dataHijack = function({data, tag, dataKey, selector}){
    let value = '',
        el = document.querySelector(selector);
    Object.defineProperty(data, dataKey, {
        get: function(){
            console.log("get value")
            return value
        },
        set: function(val){
            value = val
            Dep.trigger(tag, val)
        }
    })
    Dep.listen(tag, function(text){
        el.innerHTML = text
    })
}
```

使用

```vue
<div>
    <span class="box-1"></span>
    <span class="box-2"></span>
</div>
<script src="./index.js"></script>
<script>
    let dataObj = {}
    dataHijack({
        data: dataObj,
        tag: 'veiw-1',
        dataKey:'one',
        selector:'.box-1'
    })
    dataHijack({
        data: dataObj,
        tag: 'veiw-2',
        dataKey:'two',
        selector:'.box-2'
    })
    dataObj.one = ""
</script>
```

**vue3: reflect+proxy**

```js
const obj = {
  name: 'wang.haoyu',
};

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('劫持你的数据访问' + key);
    return Reflect.get(target, key);
    // 这里相当于 return target[key]
  },
  set(target, key, value, receiver){
      return Reflect.set(target, key, value, receiver);
    //target[key] = value
  },
  deleteProperty(target, key){
      return delete target[key]
  }
});
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f15b9900c70f42d9a4c100a9eeebb456~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 1.1 data数据初始化：reactive化，及加上了setter/getter函数，实现数据劫持。监听者observer监听数据变化,有变化就通知订阅者。
- 1.2 Vue 的指令编译器 Compiler 对元素节点的各个指令进行解析，初始化视图，并订阅/初始化 订阅者Watcher 来更新试图。
- 1.3 Watcher 会将自己添加到消息订阅器 Dep 中，此时初始化完毕。当dep.notice()通知watcher后，watcher自身可以收到变化通知，执行update()，触发compile中的回调，从而更新视图。
- 2.当data属性发生改变之后，触发 Observer 中 setter 方法，立即调用 Dep.notify(), Dep 这个数组开始遍历所有的订阅者，通知它们去重新渲染组件。

### 1.5 proxy代替defineProperty的原因

1. defineProperty API 的局限性最大原因是它只能针对单例属性做监听。

   在 Vue 中使用 下标的方式直接修改属性的值或者添加一个预先不存在的对象属性是无法做到 setter 监听的，及不是响应式的。解决方式是使用Vue.$set()。

   ⽆法监听数组根据 index 对于元素的赋值。只能使用pop()、push()，shift(), unshift()，splice()，sort()，reverse(), this.$set(arr

   ,index, newVal)。
2. Proxy API 的监听是针对一个对象的，可以代理所有属性。
3. vue3的响应式是惰性的。vue2中如果要劫持深层对象的属性，需要遍历每层对象属性并执行object.definedProperty，从而将每层对象属性变为响应式。vue3中，使用proxy api不会监视内部深层的属性，只有真正访问到内部属性时，在getter中递归响应式，将其变为响应式，减少性能消耗。

## 2. vueRouter

### 2.1 安装

```js
npm install vue-router
// 注意与vue的版本对应
```

**router: 路由实例对象**

**route: 路由信息对象**

### 2.2 创建路由组件

```js
// 创建文件src/router/index.js

import Vue from 'vue'   // 引入Vue
import Router from 'vue-router'  // 引入vue-router
import Home from '@/pages/Home'  // 引入Home.vue组件
 
Vue.use(Router)  // Vue全局注册使用Router
 
export default new Router({
  routes: [              // 配置路由，这里是个数组
    {                    // 每一个路由都是一个对象
      path: '/',         // 路由路径
      name: 'Home',     // 路由名称，
      component: Home   // 对应的组件模板
    }，
    {
      path:'/list',
      component:() => import('@/pages/List'), // 按需引入
      children:[        // 子路由,嵌套路由 （此处偷个懒，免得单独再列一点）
        {path:'/',component:() => import('@/pages/List')}, // 按需引入
        {path:'list1',component:() => import('@/pages/List1')},
        {path:'list2',component:() => import('@/pages/List2')},
      ]
    }
  ]
})
```

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
    router,
    render:h => h(App)
}).$mount('#app')
```

### 2.3 显示应用

```vue
// App.vue
<template>
    <div>
        <keep-alive> // 缓存数据，
            <router-view></router-view> // 用于渲染匹配的组件
        </keep-alive>
        <router-link to="/">{{首页}}</router-link> // 导航组件，渲染成带连接的a标签，如跳转至首页
    </div>
</template>
```

### 2.4 路由传值

1. router-link传值

```js
// 通过params属性传值 => 最后用`$route.params.key`进行接收. 只能用 name
<router-link :to="{name:'Home', params:{key:value}}"></router-link>

// 通过query属性传值 => 最后用`$route.query.userId`进行接收.
<router-link :to="{ path: '/news', query: { userId: 1111}}">click to news page</router-link>

// ---------------------------------------
// router.js
{
    path: '/test/:userId/:userName?', //?问号的意思是该参数不是必传项 
// params是路由的一部分,必须要在路由后面添加参数名。query是拼接在url后面的参数，没有也没关系。
    name: 'test',
    component: 'test.vue',
    props: true,
},
// App.vue
<router-link to="/test/${userId}/${userName}">跳转</router-link>
// 接收
this.$route.params.userId  // 123
this.$route.params.userName  // xia
```

2. 编程式传值

```js
// query传值
this.$router.push({name:'home',query: {id:'1'}})
this.$router.push({path:'/home',query: {id:'1'}})
// path:'home' => url:"home?id=1"
 
// params传参
this.$router.push({name:'home',params: {id:'1'}})  // 只能用 name
// 路由配置 path: "/home/:id" 或者 path: "/home:id",刷新页面id会保留。不配置path ,第一次可请求,刷新页面id会消失
// => url:"home/1"
```

### 2.5 路由跳转

```js
// 1. router-link 链接如果是'/'开始就是从根路由开始，如果开始不带'/'，则从当前路由开始。
<router-link :to="{name:'home'}">
<router-link :to="{path:'/home'}"> //name,path都行, 建议用name

// 2. this.$router.push() (函数里面调用) 点击后退会返回到上一个页面
this.$router.push({name:'home',query: {id:'1'}})
this.$router.push({path:'/home',query: {id:'1'}})
this.$router.push({name:'home',params: {id:'1'}}) // 只能用 name

// 3. this.$router.replace() (用法同push) history栈中不会有记录

// 4. this.$router.go(n) 向前或者向后跳转n个页面，n可为正整数或负整数
```

### 2.6 路由原理

1. 工作原理(**改变URL，在不重新向后端请求页面的情况下，更新页面视图**)：url改变 => 触发监听事件（判断hash/history模式）=> 改变vueRouter里的current变量 => vue监听current的监听者 => 获取新的组件 => 渲染新组件
2. 路由模式hash/history

   hash：#后面为hash内容，通过location.hash拿到路由地址，Window.onhashchange()监听hash改变

   history: 通过location.pathname拿到路由地址，Window.onpopstate()监听history改变

   刷新⻚⾯时，hash 模式可以正常加载到 hash 值对应的⻚⾯，⽽ history 没有处理的话，会返回 404，⼀般需要后端将所有⻚⾯都配置重定向到⾸⻚路由
3. 手写hash模式(内容刷新，页面没刷新)

```vue
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

3. 手写history模式

```vue
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

### 2.7 路由权限控制

1. 路由元信息（meta）

   `vue-router` 在构建路由时提供了元信息 `meta` 配置接口，我们可以在元信息中添加路由对应的权限，然后在路由守卫中检查相关权限，控制其路由跳转。

   缺点： 每次路由跳转都要做一遍校验是对计算**资源的浪费**，另外对于用户无权访问的路由，理论上就不应该挂载

   ```js
   const myRouter = new VueRouter({
   	routes: [{
           path: '/login',
           name: 'login',
           meta: {
           	roles: ['admin', 'user']
           },
           component: () => import('@/components/Login')
       },{
           path: '/home',
           name: 'home',
           meta: {
               roles: ['admin']
           },
           component: () => import('@/views/Home')
       },{
       	path: '/404',
       	component: () => import('@/components/404')
     	}]
   })

   //假设通过接口从后台获取的用户角色，可以存储在token中
   const role = 'user'

   myRouter.beforeEach((to,from,next)=>{
   	if(to.meta.roles.includes(role)){
   		next()	//放行， 路由守卫中检查相关权限，控制其路由跳转。
   	}else{
   		next({path:"/404"})	//跳到404页面
   	}
   })
   ```
2. 动态生成路由表（addRoutes）

   `vue-router` 提供了 `addRoutes()` 方法，可以动态注册路由，需要注意的是，动态添加路由是在路由表中 ` push` 路由，由于路由是按顺序匹配的，**因此需要将诸如404页面这样的路由放在动态添加的最后**。

   ```js
   // store.js
   // 将需要动态注册的路由提取到vuex中
   const dynamicRoutes = [
     {
       path: '/manage',
       name: 'Manage',
       meta: {
         requireAuth: true
       },
       component: () => import('./views/Manage')
     },
     {
       path: '/userCenter',
       name: 'UserCenter',
       meta: {
         requireAuth: true
       },
       component: () => import('./views/UserCenter')
     }
   ]
   ```

   在 `vuex` 中添加 `userRoutes` 数组用于存储用户的定制菜单。在 `setUserInfo` 中根据后端返回的菜单生成用户的路由表。

   ```js
   // store.js
   setUserInfo (state, userInfo) {
     state.userInfo = userInfo
     state.auth = true // 获取到用户信息的同时将auth标记为true，当然也可以直接判断userInfo
     // 生成用户路由表
     state.userRoutes = dynamicRoutes.filter(route => {
       return userInfo.menus.some(menu => menu.name === route.name)
     })
     router.addRoutes(state.userRoutes) // 注册路由
   }
   ```

   菜单渲染

   ```js
   // App.vue
   <div id="nav">
     	<router-link to="/">主页</router-link>
     	<router-link to="/login">登录</router-link>
     	<template v-for="(menu, index) of $store.state.userInfo.menus">
       	<router-link :to="{ name: menu.name }" :key="index">{{menu.title}}</router-link>
     	</template>
   </div>
   ```

### 2.8 vue-router钩子函数

- 全局前置守卫 router.beforeEach ((to,from,next)=>{})
- 全局解析守卫 router.beforeResolve // 在路由跳转前，所有 **组件内守卫** 和 **异步路由组件** 被解析之后触发
- 全局后置钩子 router.afterEach ((to,from)=>{})
- 路由独享的守卫 beforeEnter  // 只在**进入路由时触发**，在 `beforeEach` 之后紧随执行
- 组件内的守卫 beforeRouteEnter(路由进入组件之前调用，该钩子在全局守卫 `beforeEach` 和路由守卫 `beforeEnter` 之后) 、 beforeRouteUpdate 、 beforeRouteLeave

  ![未命名文件.png](https://img-blog.csdnimg.cn/img_convert/b5b38b996ba13af6ab3e700f849caed0.png)

## 3. 组件通信

### 3.1 父传子

```vue
// 父组件
<div>
    <h1>father</h1>
    <son :msg="message"></son>
</div>
<script>
    export default {
        data(){
            return {
                message:"1111"
            }
        }
    }
</script>

// 子组件
<div>
    <h1>father</h1>
    <p>{{msg}}</p>
</div>
<script>
    export default {
        props:["msg"]
    }
</script>
```

### 3.2 子传父

```vue
// 子组件
<div>
    <button @click="sendFather">toFather</button>
</div>
<script>
    export default {
        data(){
            return { value:"111" }
        }
        method:{
            sendFather(){
                this.$emit(sendSon,this.value)
            }
        }
    }
</script>

// 父组件
<div>
    <h1>father</h1>
    <son :msg="message" @sendSon="getFromSon"></son>
    <p>{{sonMessage}}</p>
</div>
<script>
    export default {
        data(){
            return {
                message:"1111"
                sonMessage:""
            }
        }
        method:{
        getFromSon(value){
            this.sonMessage = value
        }
    }
    }
</script>
```

### 3.3 跨组件传值

1. eventBus

```js
//main.js挂载
import Vue from 'vue'
export const EventBus = new Vue()

// One.vue发送
methods: {
	  send() {
	    Event.$emit('data-a', this.name);
	  }
	}

// Two.vue接收
mounted() {
    Event.$on('data-a',name => {
	     this.name = name;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
	 })}
```

2. provide/inject 绑定并不是可响应的

```js
// One.vue发送
export default {
    provide:{
        for:"send"
    }
}

// Two.vue接收
export default {
    inject:['for'],
    data(){
        return {
            demo:this.for
        }
    }
}
```

3. localStorage/sessionStorage
4. vueX

   **注：vuex和全局对象的区别是vuex状态储存是响应式的，且状态不能直接修改。**

**state**

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)
```

```js
// 使用方法
store.commit('increment') // -> 1

methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}，
computed: {
    count () {
      return store.state.count // 在vue中展示state数据用computed，响应式的
   // return this.$store.state.count
    }
  }
```

使用mapState辅助函数帮助我们生成计算属性

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
  
    // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
  computed: {
    localComputed () { /* ... */ },
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ])
  }
}
```

**getter**（从 store 中的 state 中派生出一些状态）

```js
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos (state，getters) {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// 使用
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

mapGetter辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

```js
computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
       doneCount: 'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
```

**mutation**

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。**mutation 必须是同步函数**

```js
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    increment (state, payload) {
      // 变更状态
      state.count+= payload.amount
    }
  }
})
// 调用方式
store.commit('increment',{ amount:10 })
```

可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）

```js
 methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
```

**action**

Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。

```js
// 注册
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state, payload) {
      state.count+=payload.amount
    }
  },
  actions: {
    // 与 store 实例具有相同方法和属性的 context 对象。可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
    incrementAsync (context, payload) { 
      context.commit('increment',payload.amount)
    }
    // 解构方式
    incrementAsync ({ commit },payload) {
      setTimeout(() => {
        commit('increment',payload)
      }, 1000)
    }
})

// 调用
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

组件中调用

```js
methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
```

**module**

Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter

```js
const moduleA = {
  namespaced:true
  state: () => ({ 
    name:"111"
  }),
  mutations: {
    moduleAupdname(state){
      state.name = "Liu"
    }
  },
  actions: { ... },
  getters: {
    fullname(state,getter,rootState，rootGetters){
      return rootState.counter // 获取父模块的状态。rootGetters获取夫模块的getter
    }
  }
}

const moduleB = {
  namespaced:true
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  state:{
	counter:100,
  },
  modules: {
     moduleA,
     moduleB
  }
})

// 组件调用
$store.state.moduleA.name // -> 111
this.$store.commit("moduleAupdname")
$store.getters.fullname // 不用写成$store.getters.moduleA.fullname了，因为程序会默认先从初始的store中的getters寻找有没有fullname这个方法，如果没有，就会去新的模块moduleA中寻找，这就意味着，在开发时，一定不要写重复名字的方法
$store.state.moduleB // -> moduleB 的状态
```

组件中调用模块：

```js
1、基本方式：
    this.$store.state.moduleA.countA
    this.$store.getters['moduleA/moduleAGetter']
    this.$store.commit('moduleA/moduleAMutation')
    this.$store.dispatch('moduleA/moduleAAction')

2、辅助函数方式：
    ...mapState({
        count:state=>state.moduleB.countB
    })
    ...mapGetters('moduleA',['moduleAGetter']),
    ...mapMutations('moduleA',['moduleAMutation']),
    ...mapActions('moduleA',['moduleAAction'])
```

4. $attrs/$listeners

   $attrs里存放的是父组件中绑定的非props属性，$listener里存放的是父组件中绑定的非原生事件

```js
 //App.vue中传入数据到dad组件
<template>
   <div>
     <dad
       :name="name"
       :age="age"
       :gender="gender"
       :height="height"
       title="胡玉炜"
     ></dad>
   </div>
 </template>
 <script>
 import dad './components/dad.vue'
 export default {
   components: { dad},
   data() {
     return {
       name: "胡玉炜",
       age: "18",
       gender: "男",
       height: "261"
     };
   }
 };
 </script>

// dad.vue中接收数据，数据在实例创建完成后被立即同步调用在控制台
 <template>
   <div>
     <p>name: {{ name}}</p>
     <p>childCom1的$attrs: {{ $attrs }}</p>
   </div>
 </template>
 <script>
 import son from './son.vue'
 export default {
   components: {
     son 
   },
   inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
   props: {
     name: String // name作为props属性绑定
   },
   created() {
     console.log(this.$attrs); // 除去props以外其他由父组件传入的参数都在这里
      // { "age": "18", "gender": "男", "height": "261", "title": "胡玉炜" }
   }
 };
 </script>
```

4. ref和$parent/$children(仅限于父子实例）和$root根实例

```js
// ref
// 子组件
export default {
  data () {
    return {
      title: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      window.alert('Hello');
    }
  }
}

// 父组件
<template>
  <component-a ref="comA"></component-a> //ref拿到子组件实例
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.title);  // Vue.js
      comA.sayHello();  // 弹窗
    }
  }
</script>
```

```js
// $parent/$children 一般不使用，$parent为对象，$children为数组
// 子组件
<div>{{sayHello}}</div> // 使用父组件的msg

export default {
  data(){
          return {
              sonMsg:"111"
          }
      }
  computed: {
    sayHello () {
      return this.$parent.msg
    }
  }
}

// 父组件
<template>
  <component-a></component-a> 
  <button @click="changeSon">改变子组件的值</button>
</template>
<script>
  export default {
    data(){
        return {
            msg:"1245"
        }
    },
    method:{
        changeSon(){
            this.$children[0].sonMsg = "newValue" // 改变子组件的值
        }
    }
  
  }
</script>
```

```js
// 父组件
mounted(){
console.log(this.$root) //获取根实例,最后所有组件都是挂载到根实例上
console.log(this.$root.$children[0]) //获取根实例的一级子组件
console.log(this.$root.$children[0].$children[0]) //获取根实例的二级子组件
}
```

## 4. 生命周期

### 4.1 vue2

创建前/后：

**beforeCreate：** 实例初始化后，但vue实例的挂载元素el和数据对象data都为undefined，还未初始化。获取不到数据。

**created：**vue实例的数据对象data有了，**可以访问到data、method**，el还没有，组件没有挂载。 在这里做**初始数据的获取**。

载入前/后：

**beforeMount：** vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。**做初始数据的获取。**

**mounted：** vue实例挂载完成，data.message成功渲染页面。

更新前/后：当data变化时，会触发**beforeUpdate（发⽣在虚拟 DOM 重新渲染和打补丁之 前，这个时候我们可以在更新之前访问现有的 DOM，对可能会被移除的元素做⼀些操作，⽐如移除事件监听器。利⽤diff算法进⾏对⽐）和updated（虚拟 DOM 重新渲染和打补丁之后调⽤）** 方法。

销毁前/后：

**beforeDestroy：** 在实例销毁之前调⽤。⼀般在这⼀步我们可以销毁定时器、 解绑全局事件等

**destroyed：** 对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

**nextTick：** 更新数据后立即操作dom。

使⽤ **keep-alive** 的时候，还有两个钩⼦函数，分别是 **activated 和 deactivated** 。 ⽤ keep-alive 包裹的组件在切换时不会进⾏销毁，⽽是缓存到内存中并执⾏ deactivated 钩⼦函数，命中缓存渲染后会执⾏ actived 钩⼦函数

**注：vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢？**

一般在 created（或 beforeRouter） 里面就可以，如果涉及到需要页面加载 完成之后的话就用 mounted。**在created里时页面还没有渲染出来，所以做一些dom操作会获取不到dom元素，而mounted已经渲染了，能获得dom元素**

### 4.2 父子组件生命周期

#### 1.加载渲染

**同步引入：**⽗组件的beforeCreate、created、beforeMount --> 所有⼦组 件的beforeCreate、created、**beforeMount** --> 所有⼦组件的mounted --> ⽗组件的 mounted（**⽗组件先创建，然后⼦组件创建；⼦组件先挂载，然后⽗组件挂载**）

**异步引入：**⽗组件的beforeCreate、created、beforeMount、mounted -- > ⼦组件的beforeCreate、created、beforeMount、mounted

#### 2. 子组件更新

⽗beforeUpdate->⼦beforeUpdate->⼦updated->⽗updated

#### 3. 父组件更新

⽗beforeUpdate->⽗updated

#### 4. 销毁过程

⽗beforeDestroy->⼦beforeDestroy->⼦destroyed->⽗destroyed

### 4.3 vue3

除了 **`beforecate`和 `created`(它们被 `setup`方法本身所取代)**，我们可以在 `setup`方法中访问的API生命周期钩子有9个选项:

**`onBeforeMount`** – 在挂载开始之前被调用：相关的 `render` 函数首次被调用。

**`onMounted`** – 组件挂载时调用

**`onBeforeUpdate`**  – 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

**`onUpdated`**  –  由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

**onBeforeUnmount** –  在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。

**`onUnmounted`** – 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

**`onActivated`**  –  被 `keep-alive` 缓存的组件激活时调用。

**`onDeactivated`** – 被 `keep-alive` 缓存的组件停用时调用。

**`onErrorCaptured`** – 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。

## 5. vue中的监听事件

**1.@keyup.方法**

```vue
<template>
    <input ref="myInput" type="text" value="hello world" autofocus @keyup.enter="handleKey">
</template>
<script>
    export default {
        methods: {
            handleKey(e) {
                console.log(e)
            }}}
</script>
```

**2.addEventListener（eventName，func）**

```vue
<script>
export default {
    mounted() {
        document.addEventListener('keyup', this.handleKey)
    },
    beforeDestroy() {
        document.removeEventListener('keyup', this.handleKey)
    },
    methods: {
        handleKey(e) {
            console.log(e)
        }}}
</script>
```

## 6. watch和computed以及data

### 6.1 watch的深度监听

deep设置为true,此时不能简写。

```js
let vm=new Vue({
    el:"#first", 
    data:{
        msg:{
            name:'北京'
        }}, 
    watch:{
        msg:{
            handler (newMsg,oldMsg){
                console.log(newMsg);
            },
            immediate:true, // 在页面初次加载时第一次绑定值的时候,在页面初次加载时第一次绑定值的时候
            deep:true // 深度监听
        }}})

// 不能简写：
watch:{
    msg(newMsg,oldMsg){
        console.log(newMsg);
    }
}
```

### 6.2 完整可写计算属性

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}

// 简写的计算属性仅为可读
 computed: {
    fullName(){
         return this.firstName + ' ' + this.lastName
    }   
 }
```

### 6.3 两者的不同和使用场景

1. computed 是计算⼀个新的属性，并将该属性挂载到 Vue 实例上，⽽ watch 是监听已经存在且已挂载到 Vue 实例上的数据，所以⽤ watch 同样可以监听 computed 计算属性的变化。
2. computed 支持缓存，只有依赖数据发生改变，才会重新进行计算；⽽ watch 则是当数据发⽣变化直接立即调⽤执⾏函数。
3. 从使⽤场景上说，如果一个属性是由其他属性计算而来的，一般用computed；⽽ watch 适⽤⼀个数据影响多个数据。
4. computed不支持异步，当 computed 内有异步操作时无效，无法监听数据的变化；watch支持

### 6.4 组件中data为啥用return一个对象的形式

当data定义为**对象**后，这就表示**所有的组件实例共⽤了⼀份data数据**，因此，⽆论在哪个组件实例中修改了data,都**会影响到所有的组件实例。**

写成⼀个**函数**，数据**以函数返回值形式定义**，这样每复⽤⼀次组件，就会**返回⼀份新的data**，类似于给每个组件实例创建⼀个私有的数据空间，让各个组件实例维护各⾃的数据。

## 7. 双向绑定v-model

**1、用JavaScript代码更新Model时，View就会自动更新。用户更新了View，Model的数据也自动被更新了**

**2、v-model指令的作用是使绑定的数据和表单元素的值相互关联，即双向绑定。等同于：**

- v-bind绑定一个value属性, 将message的内容显示到input中
- v-on指令给当前元素绑定input事件，将input输入值复值到message

**3、v-model的使用场景是表单，用于便捷地设置和获取表单元素的值**

```html
<body>
    <div id="app">
        <input type="button" value="修改message" @click="changeMsg">
        <br>
        <input type="text" v-model="message" @keyup.enter="getMsg">
        <input type="text" :value="message" @input="message= $event.target.value" /> <!--语法糖-->
        <h2>{{message}}</h2>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                message: "干就完事了！"
            },
            methods: {
                getMsg: function () {
                    alert(this.message);
                },
                changeMsg: function () {
                    this.message = "干不动了啊！"
                }
            }
        });
    </script>
</body>

</html>

```

**4. v-model修饰符**

```js
<!-- 在每次 input 事件触发后将输入框的值与数据进行同步，添加 lazy 修饰符，只有当焦点移除input时才会触发事件 -->
<input v-model.lazy="msg" >
<!--去除字符串首尾的空格-->
<input v-model.trim="msg">
<!--将数据转化为值类型-->
<input v-model.number="age" type="number
```

## 8. v-指令

### 8.1 v-show和v-if

v-if: 当为true时会对事件监听器、子组件进行渲染，为false时进行销毁

v-show: 只是基于css进行切换，不管为true还是false都会渲染

v-show适合需要频繁切换的dom

### 8.2 v-html

v-html的内容直接作为普通html插入

在⽹站上动态渲染任意 HTML，很容易导致 XSS 攻击。所以**只能在可信内容上使⽤ v-html，**且永远不 能⽤于⽤户提交的内容上。

### 8.3 v-for

1. **用法**

   ```js
   <div v-for="(item, index) in items" :key="item.id">
     {{ item.text }}
   </div>
   ```
2. **key的作用**

   给每个节点一个唯一标识，方便diff快速对比。（⽐如没有key时在⼀群相同节点中插⼊节点会依次改变指向最后创建新节点，有了key则可以正确 的找到区间插⼊新的节点）
3. **v-for与v-if不连用**

   vue2中，同一节点上，v-for的优先级比v-if的高，意味着v-if会重复运行在每个v-for循环中，造成浪费。一般建议将v-if写在v-for的父节点中

   vue3不存在此问题，v-if优先级高于v-for

## 9. nextTick

### 9.1 为什么需要 nextTick

Vue 是异步修改 DOM 的并且不鼓励开发者直接接触 DOM。

Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。**$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM。**

有时候业务需要必须对数据更改--刷新后 的 DOM 做相应的处理，这时候就可以使用 Vue.nextTick(callback)这个 api 了。

**nextTick()，是将回调函数延迟在下一次dom更新数据后调用**，简单的理解是：**当数据更新了，在dom中渲染后，自动执行该函数，**

### 9.2 理解原理前的准备

首先需要知道事件循环中**宏任务**和**微任务**这两个概念(这其实也是面试常考点)。

常见的宏任务有 script, setTimeout, setInterval, setImmediate, I/O, UI rendering

常见的微任务有 process.nextTick(Nodejs),Promise.then(), MutationObserver;

### 9.3 理解 nextTick

而 nextTick 的原理正是 vue 通过异步队列控制 DOM 更新和 nextTick 回调函数先后执行的方式。如果 大家看过这部分的源码，会发现其中做了很多 isNative()的判断，因为这里还存在兼容性优雅降级的问题。

- 利用微任务会在宏任务队列执行完毕之后立即执行的这个机制，把任务放在微任务中，用promise实现。
- nextTick的最佳选择就是微任务，但是promise是es6的，就会涉及兼容问题，所以vue求其次选择宏任务作为降级。
- setTimeout和setImmediate属于宏任务，setTimeout所有浏览器都兼容，但是执行有延迟，是最后的兜底方案，setImmediate可以兼容ie浏览器。

```js
<template>
  <div class="hello">
    <div>
      <button id="firstBtn" @click="testClick()" ref="aa">{{testMsg}}</button>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      testMsg:"原始值",
    }
  },
  methods:{
    testClick:function(){
      let that=this;
      that.testMsg="修改后的值";
      console.log(that.$refs.aa.innerText);   //that.$refs.aa获取指定DOM，输出：原始值
      that.$nextTick(function(){
        console.log(that.$refs.aa.innerText);  //输出：修改后的值
      });
    }
  }
}
</script>
 
```

### 9.4 使用情景

1. Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。

原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。

2. 更改数据后当你想立即使用js操作新的视图的时候需要使用它

**对新DOM一系列的js操作都需要放进Vue.nextTick()的回调函数中**

### 9.5 原理

vue是异步执行dom更新的。重新赋值后。dom不会马上更新，而是在异步队列中清除，在下一个事件循环开始时执行更新时才进行

## 10. vue的编译

过程：

1. 解析：将模板字符串解析成AST，AST元素节点包括普通元素、表达式、纯文本
2. 优化语法树：遍历AST树，非响应式数据，生成的dom不会改变，在patch过程就跳过他们的diff对比
3. 生成代码：通过generate方法，将ast生成render函数

## 11. vue组件中name的作用

### 11.1 **用到keep-alive时设置是其中某一组件是否缓存**

```js
//Table.vue
export default {
    name:'Table'
}，
activated(){
  //方案二：activated:被 keep-alive 缓存的组件激活时调用。
  this.getData();
},
mounted(){
   this.getData();
}，
methods:{
   getData(){
          axios.get('/xx/table.json',{
              params:{
                id:this.$route.query.id  
              }
          }).then(()=>{
            .......
          })
     }
 }
//App.vue
<div id="app"> 
    <keep-alive exclude="Table"> 
      // 方案一：在keep-alive中加入exclude属性，exclude="Table"这样就不会对Table组件进行缓存，第二次进入该页面时就会得到最新数据。
      //因为有些页面,如试试数据统计,要实时刷新,所以就不需要缓存
      <router-view/>
    </keep-alive>
  </div>
```

### 11.2 递归组件

在自己的模板中调用自身

```js
// 父组件
<template>
  <div>
    <ul>
      <tree :model="treeData"></tree> // 将数据传给子组件
    </ul>
  </div>
</template>

<script>
  import tree from '@/components/tree'
  export default {
    data () {
      return {
        treeData: {
          title: '1',
          children: [
            {title: '1-1'},
            {
              title: '1-2',
              children: [
                {title: '1-2-1'},
                {title: '1-2-2'},
                {title: '1-2-3'},
              ]
            },
            {
              title: '1-3',
              children: [
                {
                  title: '1-3-1',
                  children: [
                    {
                      title: '1-3-1-1'
                    },
                    {
                      title: '1-3-1-2'
                    }
                  ]
                },
                {title: '1-3-2'},
                {title: '1-3-3'},
              ]
            },
          ]
        }
      }
    },
    created(){

    },
    methods:{

    },
  }
</script>

<style scoped lang="scss"></style>
```

```js
<template>
  <div>
    <div v-for="(item, index) in model" :key="index">
      {{ item.title }}
      <div
        v-if="item.children && item.children.length" // 递归条件
        style="margin-left:20px;"
      >
        <tree :model="item.children"></tree>  // 子组件调用自身实现递归
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 这里要写name:tree才可以递归
  name: "tree",
  props: {
    model: Array  
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
```

### 11.3 vue-tool调试时显示

![img](https://pic4.zhimg.com/v2-0045f69d678ca8fd0c0eaec407ed1373_r.jpg)

## 12. vue首屏加载优化

- 把不常改变的库放到 index.html 中，通过 cdn 引入，然后找到 build/webpack.base.conf.js 文件，在 module.exports = { } 中添加以下代码

  ```js
  externals: {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
  }
  ```

  这样 webpack 就不会把 vue.js, vue-router, element-ui 库打包了。
- vue 路由的懒加载

  import 或者 require 懒加载。
- 不生成 map 文件 (**项目打包后，代码都是经过压缩加密的**，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  **有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。** **生产环境打包一般需要禁止map输出**，map文件会造成项目源码泄漏)

  找到 config/index.js，修改为 productionSourceMap: false
- vue 组件尽量不要全局引入
- 使用更轻量级的工具库

## 13. vue开发技巧

### 13.1 v-slot

1. 匿名插槽：没有命名,有且只有一个

   ```vue
   // 父组件
   <todo-list>
     <template v-slot:default>
       任意内容
       <p>我是匿名插槽 </p>
     </template>
   </todo-list>
   // 子组件
   <slot>我是默认值</slot>
   //v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写
   ```
2. 具名插槽：slot标签带name命名的

   ```vue
   // 父组件
   <todo-list>
     <template v-slot:todo>
       任意内容
       <p>我是匿名插槽 </p>
     </template>
   </todo-list>
   //子组件
   <slot name="todo">我是默认值</slot>
   ```
3. 作用域插槽：子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)

   ```vue
   // 父组件
   <todo-list>
       <template v-slot:todo="slotProps" >
         {{slotProps.user.firstName}}
       </template>
   </todo-list>
   //slotProps 可以随意命名
   //slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user="user"
   // 子组件
   <slot name="todo" :user="user" :test="test">
     {{ user.lastName }}
   </slot>
   data() {
     return {
       user:{
         lastName:"Zhang",
         firstName:"yue"
       },
       test:[1,2,3,4]
      }
     },
   // {{ user.lastName }}是默认数据 v-slot:todo 当父页面没有(="slotProps")
   ```

### 13.2 render函数

有些代码在 template 里面写，会重复很多，所以这个时候 render 函数就有作用啦

```vue
// 根据 props 生成标签
// 初级
<template>
  <div>
    <div v-if="level === 1"> <slot></slot> </div>
    <p v-else-if="level === 2"> <slot></slot> </p>
    <h1 v-else-if="level === 3"> <slot></slot> </h1>
    <h2 v-else-if="level === 4"> <slot></slot> </h2>
    <strong v-else-if="level === 5"> <slot></slot> </stong>
    <textarea v-else-if="level === 6"> <slot></slot> </textarea>
  </div>
</template>

// 优化版,利用 render 函数减小了代码重复率
<template>
  <div>
    <child :level="level">Hello world!</child>
  </div>
</template>
<script type='text/javascript'>
import Vue from 'vue'
Vue.component('child', {
  render(h) {
    const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level-1]
    return h(tag, this.$slots.default)
  },
props: {
  level: { type: Number, required: true }
  }
})
export default {
  name: 'hehe',
  data() { return { level: 3 } }
}
</script>
```

### 13.3 递归组件

开发一个 tree 组件,里面层级是根据后台数据决定的,这个时候就需要用到动态组件

```vue
// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。
// 递归组件必须设置name 和结束的阀值
// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：联级选择器和树形控件
<template>
  <div v-for="(item,index) in treeArr">
    子组件，当前层级值： {{index}} <br/>
    <!-- 递归调用自身, 后台判断是否不存在改值 -->
    <tree :item="item.arr" v-if="item.flag"></tree>
  </div>
</template>
<script>
export default {
// 必须定义name，组件内部才能递归调用
name: 'tree',
data(){
  return {}
},
// 接收外部传入的值
props: {
  item: {
    type:Array,
    default: ()=>[]
  }
}
} 
</script>
```

### 13.4 components和 Vue.component

components：局部注册组件

```js
export default{
  components:{home}
}
```

Vue.component：全局注册组件

```js
Vue.component('home',home)
```

### 13.5 Vue.extend + vm.$mount

1. 组件模板都是事先定义好的，如果我要从接口动态渲染组件怎么办？
2. 所有内容都是在 #app 下渲染，注册组件都是在当前位置渲染。如果我要实现一个类似于 window.alert() 提示组件要求像调用 JS 函数一样调用它，该怎么办？

```vue
<div id="mount-point"></div>
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')

// 结果如下：
<p>Walter White aka Heisenberg</p>
```

### 13.6 mixins和extends

mixins接收对象数组（可理解为多继承），extends接收的是对象或函数（可理解为单继承）单次扩展一个组件 。

```js
const extend = {
  created () {
    console.log('extends created')
  }
}
const mixin1 = {
  created () {
    console.log('mixin1 created')
  }
}
const mixin2 = {
  created () {
    console.log('mixin2 created')
  }
}
export default {
  extends: extend,
  mixins: [mixin1, mixin2],
  name: 'app',
  created () {
    console.log('created') // 优先调用mixins和extends继承的父类，extends触发的优先级更高，相对于是队列
                           //extends created；mixin1 created；mixin2 created；created
  }
}
```

### 13.7 Vue.directive

自定义指令

```js
// 全局定义
Vue.directive("change-color",function(el,binding,vnode){
    el.style["color"]= binding.value;
})
// 使用
<template>
    <div v-change-color=“color”>{{message}}</div>
</template>
<script>
export default{
data(){
    return{
        color:'green'
    }
}
}
</script>
```

生命周期：

1.bind：只调用一次，指令第一次绑定到元素时候调用，用这个钩子可以定义一个绑定时执行一次的初始化动作。

2.inserted:被绑定的元素插入父节点的时候调用(父节点存在即可调用，不必存在document中)

3.update: 被绑定与元素所在模板更新时调用，而且无论绑定值是否有变化，通过比较更新前后的绑定值，忽略不必要的模板更新

4.componentUpdate :被绑定的元素所在模板完成一次更新更新周期的时候调用

5.unbind: 只调用一次，指令元素解绑的时候调用

### 13.8 filter

```js
// 使用
// 在双花括号中
{{ message | capitalize }}
// 在 `v-bind` 中
<div v-bind:id="rawId | formatId"></div>

// 全局注册
Vue.filter('stampToYYMMDD', (value) =>{
// 处理逻辑
})
// 局部注册
filters: {
    stampToYYMMDD: (value)=> {// 处理逻辑
}
} 
```

### 13.9 Vue.compile

Compiles a template string into a render function

```js
var res = Vue.compile('<div><span>{{ msg }}</span></div>')
new Vue({
    data: {
        msg: 'hello'
    },
    render: res.render,
    staticRenderFns: res.staticRenderFns
})
```

### 13.10 v-pre

有些静态的标签不需要多次编译

```vue
<span v-pre>{{ this will not be compiled }}</span> 显示的是{{ this will not be compiled }}
<span v-pre>{{msg}}</span> 即使data里面定义了msg这里仍然是显示的{{msg}}
```

### 13.11 v-cloak

这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕

```vue
// template 中
<div class="#app" v-cloak>
  <p>{{value.name}}</p>
</div>
// css 中
[v-cloak] {
  display: none;
}
```

这样就可以解决闪烁,但是会出现白屏,这样可以结合骨架屏使用

### 13.12 img加载失败

有些时候后台返回图片地址不一定能打开,所以这个时候应该加一张默认图片

```vue
// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
export default{
    data(){
        return{
            imgUrl:''
        }
    },
    methods:{
        handleError(e){
            e.target.src=reqiure('图片路径') //当然如果项目配置了transformToRequire,参考上面 27.2
        }
    }}
</script>
```

## 14. vue3和vue2区别

1. 选项式api=>组合式api
2. 生命周期函数
3. 响应式原理（object.defineproperty=>reflect+proxy）
4. vue3支持多节点fragment
5. vue3更支持 TypeScript， 是一种类型系统，面向对象的语法
6. vue3提供了一些组件，suspense（配合loading组件）， Teleport（使部分组件移到vue组件以外，比如弹框）
7. 虚拟dom和diff算法做了优化。增加 patchFlag（帮助区分动静节点），为1（动态节点）则会对比其文本，不会关注class，style
8. vue3推崇的函数式编程：提高复用能力，简化代码实现，提升代码逻辑的信息密度

## 15. mixin原理

 当我们的项目越来越大，可能会发现在**相似的组件**里一遍又一遍的在复制粘贴相同的代码段（data，method，watcher等）。

当然，也可以把相似的组件写成一个组件，然后用props来定制它，但是使用太多的props很容易导致混乱。

  不过，我们还有一种解决方案，公共代码抽离，**那就是Mixin（混入）**。**全局去注入**一些methods, filter或者hooks时，监听在什么阶段时什么组件被加载了，被卸载了等等，我们就可以使用mixin来做。

- 局部混入：mixins:[myMixin]
- 全局混入:   Vue.mixin(myMixin)

注意：

- 不同组件混入的方法变量，互不影响
- 冲突时，以组件本身的为准，即混入的会被覆盖‘
- 混合对象里的钩子函数在组件里的钩子函数之前调用，同一个钩子函数里，会先执行混入对象的东西，再执行本组件的

混入方式：

- 函数叠加混入（data、provide）
- 数组叠加混入（hook、watch）
- 原型链叠加混入（components，filters，directives）
- 对象覆盖混入（props，methods，computed，inject ）
- 替换覆盖混入（el，template，propData）

## 16. 渐进增强和优雅降级

渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。（确保网站在任何情况下都可以工作，并为一些现代浏览器提供额外的优化和功能）

- 更好地利用这些浏览器的功能，更好地利用这些浏览器的功能，使用较新的技术和功能
- 降级方案可能会很复杂

优雅降级 graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。（应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段）

- 任何浏览器或设备上都能够正常使用
- 无法充分利用浏览器的性能和功能

## 17. 为什么不直接改prop而是用emit

这是由于Vue遵循的[单向数据流](https://so.csdn.net/so/search?q=单向数据流&spm=1001.2101.3001.7020)的概念。单向数据流意味着数据只能从父组件流向子组件，不能反过来。这样做的好处是，我们可以清楚地跟踪数据的来源和如何被使用，使得应用程序更加易于维护和理解。如果子组件可以修改props中的数据，那么将会打破单向数据流的规则，导致数据变得难以追踪和维护。

用emit更改：

- 当点击子组件时，子组件中通过$emit方法触发update事件，并将一个新的值传递给父组件。
- 在父组件中，我们定义一个名为updateData的方法来处理这个事件。该方法会更新props中的数据。最后，我们使用v-bind指令把父组件的数据绑定到子组件上，在即可。

## 18. keepalive原理

1. 先获取到插槽里的内容
2. 调用getFirstComponentChild方法获取第一个子组件，获取到该组件的name，如果有name属性就用name，没有就用tag名。
3. 接下来会将这个name通过include与exclude属性进行匹配，匹配不成功（说明不需要进行缓存）则不进行任何操作直接返回这个组件的 vnode（vnode是一个VNode类型的对象），否则的话走下一步缓存。匹配：
4. 缓存机制：接下来的事情很简单，根据key在this.cache中查找，如果存在则说明之前已经缓存过了，直接将缓存的vnode的componentInstance（组件实例）覆盖到目前的vnode上面。否则将vnode存储在cache中。最后返回vnode（有缓存时该vnode的componentInstance已经被替换成缓存中的了）。缓存的处理：

   ```js
   /* 如果命中缓存，则直接从缓存中拿 vnode 的组件实例 */
   if (cache[key]) {
       vnode.componentInstance = cache[key].componentInstance
       /* 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个 */
       remove(keys, key)
       keys.push(key)
   } 
   /* 如果没有命中缓存，则将其设置进缓存 */
   else {
       cache[key] = vnode
       keys.push(key)
       /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
       if (this.max && keys.length > parseInt(this.max)) {
           pruneCacheEntry(cache, keys[0], keys, this._vnode)
       }
   }
   /* 最后设置keepAlive标记位 */
   vnode.data.keepAlive = true
   ```
5. 命中缓存时会直接从缓存中拿 vnode 的组件实例，此时重新调整该组件key的顺序，将其从原来的地方删掉并重新放在this.keys中最后一个。**LRU缓存**，最近最少使用。
