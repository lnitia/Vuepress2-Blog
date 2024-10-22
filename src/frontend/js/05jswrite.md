---
icon: javascript
date: 2024-01-08
category:
  - 前端
  - js
tag:
  - 基础
order: 5
excerpt: <p>js手写代码</p>
editLink: false
---
# JS手写代码

[前端常见js手写题汇总](https://juejin.cn/post/6877179322759643150?searchId=20240612200714A9D50F87B611637A96D9)

## 1 防抖

```js
//防抖：连续的事件只需触发一次回调
function MyDebounce(fn,delay){
  let timer = null
  return function(){
    clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }
}
```

## 2 节流

```js
//节流：控制执行次数，可用时间戳or定时器实现
//1.时间戳:首节流
function MyThrottle1(fn,interval) {
  let pre = 0
  return function() {
    let now = Date.now()
    if (now - pre >= interval) {
      fn.apply(this, arguments)
      pre = now
    }
  }
}

//2.定时器：尾节流
function MyThrottle2(fn,interval){
  let timer = null
  return function(){
    if(!timer){
      timer = setTimeout(() => {
        fn.apply(this,arguments)
        timer = null
      }, interval);
    }
  }
}
```

## 3 call、apply、bind

```js
//call:列表传参，立即执行，返回执行结果
Function.prototype.mycall = function(context){
  if (typeof this != "function"){
    throw new TypeError('not a function')
  }
  const sym = Symbol() // 创建一个唯一的 Symbol 以避免属性名冲突
  const arg = [...arguments].slice(1) // 获取除 context 外的所有参数
  context = context || global // 如果 context 是 null 或 undefined，默认指向全局对象（浏览器中是 window，Node.js 中是 global）
  context[sym] = this // 改变this指向
  const result = context[sym](...arg) // 将后续参数传入foo
  delete context[sym]
  return result
}

//apply：数组传参，立即执行，返回执行结果
Function.prototype.myapply = function(context){
  if (typeof this != "function") {
    throw new TypeError('not a function')
  }
  context = context || global
  context.fn = this
  const result = arguments[1] ? context.fn(...arguments[1]) : context.fn()
  delete context.fn
  return result
}

//bind：列表传参，不会立即执行，返回一个修改this之后的新函数
Function.prototype.mybind = function (context) {
  if (typeof this != "function") {
    throw new TypeError('not a function')
  }
  const self = this
  const args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.myapply(context, args.concat(...arguments));
  }
}

const obj = {
  name:"obj"
}

function foo(greeting, punctuation){
  console.log(`${greeting}, ${this.name}${punctuation}`)
}

foo.mycall(obj, "Hello", "!")
foo.myapply(obj, ["Hi", "!"])
var newFunc = foo.mybind(obj);
newFunc("Hello", "?");
```

## 4 深拷贝

```js
function myDeepClone(obj){
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  // 是否是数组
  let objC = Array.isArray(obj) ? [] : {}
  // 如果是引用类型 细处理
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归拷贝对象或数组
      objC[key] = myDeepClone(obj[key]);
    }
  }
  return objC
}
```

## 5 数组去重

```js
//1.set:es6常用
function unique1(arr){
  return Array.from(new Set(arr)) //简化版：return [...new Set(arr)]
}

//2.reduce遍历 + includes判定
function unique2(arr) {
  return arr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
}

//3.双层for循环判定 + splice去除，es5常用
function unique3(arr){
  for (let i = 0; i < arr.length; i++){
    for (let j = i+1; j < arr.length; j++){
      if(arr[i] === arr[j]){
        arr.splice(j,1)
        j--
      }
    }
  }
  return arr
}

//4.indexOf判定
function unique4(arr){
  let result = []
  for(let i = 0; i < arr.length; i++){
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}

//5.filter遍历 + indexOf判定
function unique5(arr){
  return arr.filter((item,index,arr) => {
    return arr.indexOf(item, 0) === index  //判定：当前元素在原始数组中的第一个索引 = 当前索引值
  })
}


//test
var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
console.log(unique1(arr))
console.log(unique2(arr))
//[1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {…}, {…}]  //{}没有去重：set、includes
console.log(unique3(arr))
console.log(unique4(arr))
//[1, 'true', true, 15, false, undefined, null, NaN, NaN, 'NaN', 0, 'a', {…}, {…}]    //NaN和{}没有去重：indexOf
console.log(unique5(arr))
//[1, 'true', true, 15, false, undefined, null, 'NaN', 0, 'a', {…}, {…}]  //{}没有去重，NAN和'NAN'只保留了一个'NAN'
```

## 6 AJAX

```js
//原生ajax请求（每个 XMLHttpRequest 对象只能处理一个请求）

//get请求
var xhr1 = new XMLHttpRequest()

xhr1.open('get','https://demo-api.apipost.cn/api/demo/news_details?id=20&status=1')
xhr1.send()

xhr1.onreadystatechange = function () {
  if (xhr1.readyState == 4 && xhr1.status == 200) {
    console.log('get请求成功')
    console.log('get：', xhr1.responseText);
  }
}

//post请求
var xhr2 = new XMLHttpRequest()

xhr2.open('post', 'https://demo-api.apipost.cn/api/demo/collect_news')
xhr2.setRequestHeader('Content-type', 'multipart/form-data') //先open再设置请求头
xhr2.send('id=20')

xhr2.onreadystatechange = function () {
  if (xhr2.readyState == 4 && xhr2.status == 200) {
    console.log('post请求成功')
    console.log('post：', xhr2.responseText);
  }
}

```

## 7 JSONP跨域

```js
//JSONP实现跨域：利用script标签没有跨域限制的特点，通过src指向一个ajax的URL，最后跟一个回调函数callback
function JSONP(url,data,callback){
  const cbName = "callback_" + new Date().getTime() //生成一个唯一的回调函数名 
  const params = normalizeParams(data)
  url = url.indexOf('?') >=0 ? url : url + '?'
  url = `${url}${params}&jsoncallback=${cbName}`
  const script = document.createElement('script')
  script.src = url
  //在全局 window 对象上定义一个名为 cbName 的函数，当服务器响应 JSONP 请求时，它会返回一段 JavaScript 代码，并将结果作为参数传递给 jsoncallback
  window[cbName] = function (data) {  
    callback(data)
    document.body.removeChild(script)
  }
  document.body.appendChild(script)
}

function normalizeParams(data) {
  if (!data || Object.keys(data).length === 0) {
    return ''
  }
  return Object.keys(data).map((key, index) => {
    return `${index ? '&' : ''}${key}=${data[key]}`
  })
}

//test
const params = {
  name: 'AAA',
  age: 23,
  address: '广东'
}
JSONP('https://www.runoob.com/try/ajax/jsonp.php', params, function (data) {
  console.log(data)
})
```
