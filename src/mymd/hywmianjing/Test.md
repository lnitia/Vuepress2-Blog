---
icon: list
date: 2024-07-18
category:
  - 面经
order: 12
editLink: false
article: false
---
# Test

## 1. 数据结构分类

8大数据结构：哈希表、数组、链表、树、图、栈、队列、堆

### 1.1 逻辑结构分类

即按照元素之间的关系分类：

⑴集合结构。该结构的数据元素间的关系是“属于同一个集合”。确定的，无序的，不会有相同元素的。

⑵线性结构。该结构的数据元素之间存在着一对一的关系。线性表，栈，队列，数组，串 。

⑶树型结构。该结构的数据元素之间存在着一对多的关系。二叉树、堆（完全⼆叉树）。

⑷网状结构。该结构的数据元素之间存在着多对多的关系。图（有向、无向图）

### 1.2 储存结构分类

⑴顺序储存。内存中是连续的，适用于**频繁查询。数组**。

⑵链式储存。内存中是不连续的，适用于**频繁插入和删除。链表。**

## 2. 对象与数组

### 2.1 对象

对象底层实现是**哈希表结构**。

### 2.2 Set和Map

Set和Map都是对象

new Map([[key, value],[key,value]...])

new Set([1,2...])

### 2.3 WeakSet和WeakMap

我们使用对象作为常规 `Map` 的键，那么当 `Map` 存在时，该对象也将存在。它会占用内存，并且不会被（垃圾回收机制）回收。

`WeakMap` 不会阻止垃圾回收机制对作为键的对象（key object）的回收。

区别：

1. Weak的**key必须为对象**
2. Weak的对象键为弱引用，**会被垃圾回收机制回收**
3. 不想数据管理用WeakSet
4. Weak不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法。

### 2.4 对象与数组的区别

对象：有key：value的无序集合

数组：有编码（下标）的有序集合

## 3. 设计模式

- 单例模式: 一个类只生成一个实例。 **vuex中的store**
- 工厂模式: 根据不同的参数，返回不同类的实例。**`document.createElement` 创建 `DOM` 元素, 只需传入标签名**
- 适配器模式: 用于解决兼容问题，接口/方法/数据不兼容，将其转换成访问者期望的格式进行使用。**将不同的数据结构适配成展示组件所能接受的数据结构。**
- 装饰器模式：在不改变原对象的基础上，增加新属性/方法/功能。
- 观察者模式: 被观察者中有观察者列表,被观察者状态改变则遍历执行列表中的观察者的方法
- 发布订阅模式: 由事件调度中心统一管理消息的发布和订阅。

  - 如微信公众号推送。用户将订阅公众号的事件注册到事件调度中心，当发布者发布新文章时，会发布事件至事件调度中心，调度中心会发消息告诉订阅者。
  - 如vue的双向绑定。通过 `DefineProperty`劫持各个数据的 `setter`和 `getter`，并为每个数据添加一个订阅者列表，这个列表将会记录所有依赖这个数据的组件。响应式后的数据相当于消息的发布者。当响应式数据发生变化时，会出 `setter`，`setter`负责通知数据的订阅者列表中的 `Watcher`，`Watcher`触发组件重新渲染来更新视图。视图层相当于消息的订阅者。

## 4. 选择器

```js
<body>
    <div>
        <p>hezi</p> // 字体蓝色
    </div>
    <div>hezi</div> // 字体蓝色
</body>
<style>
    div{
        color: blue; // div内所有字体都为蓝色的
    }
    div:only-child{ // 匹配没有任何兄弟元素的元素,若改为p,则为红色
        color: red;
    }
</style>
```

行内样式（style="…"）>ID选择器(#box{…})>类选择器(.con{…})>标签选择器(div{…})>通用选择器(*{…})

伪类选择器:

- `link` 表示的是正常情况下链接的样式。
- `visit` 代表链接访问后的样式，则链接一旦被访问，则之后它的样式就会是你所设置的visited样式。
- `hover` 在鼠标移到链接上时添加的特殊样式。
- `focus` 在一个元素成为焦点时生效，用户可以通过键盘或鼠标激活焦点。
- `active` 在一个元素处于激活状态（鼠标在元素上按下还没有松开）时所使用的样式。
- `hover` 理论上任何元素都可以使用的，focus多是针对表单的，如input等 。而active多用于链接。

link与visit的位置是随意的。但hover，focus，active则必须按照**focus–hover–active**这个顺序。**FHA**

letter-spacing: 用于设置文本字符的间距表现。正值会导致字符分布得更远，负值会使字符更接近。可继承

## 5. 立即执行函数

防止变量污染。函数在定义的同时直接就执行了。

适合做一次性的任务。

```js
(function(){
    var a=b=5; // 相当于var a=5,b=5(a为局部变量,b为全局变量,前提是非严格模式)
})();
console.log(b); // 5
console.log(a) //Uncaught ReferenceError: a is not defined

//  a 使用 var 关键字进行声明，因此其属于函数内部的局部变量(仅存在于函数中)，相反，b 被分配到全局命名空间，可以看作 var a = 5; b = 5;
// 如果启用了严格模式，代码会在输出 b 时报错 Uncaught ReferenceError: b is not defined ，需要记住的是，严格模式要求你显示的引用全局作用域.
```

## 6. 遍历对象属性

1. for in 自身和原型链上的可枚举属性,除symbol
2. Object.keys(obj) 自身的可枚举属性,除symbol
3. Object.getOwnPropertyNames(obj) 自身所有属性,除symbol
4. Object.getOwnPropertySymbols(obj) 自身的所有 Symbol 属性
5. Reflect.ownKeys(obj) 所有属性

## 7. 遍历数组

1. for循环
2. for in

   ```js
   var a = [1, 2, 3];
   for (var key in a) {
     console.log(a[key]);
   }
   ```
3. for of
4. foreach 不影响原数组，性能差
5. map 创建一个新数组,不影响原数组

## 8. foreach和map

foreach：无返回值undefined，除了抛出异常以外，没有办法中止或跳出 forEach() 循环。

map：有返回值，可以return出来一个length和原数组一致的数组。不能跳出循环。

**抛出 new throw error() 通过try catch去捕获这个错误才可以终止循环。**

为什么不能：传入的是回调函数，return，break都只是结束的当前item的回调，而不是整个循环

## 代码判断

```js
var a = [];                // [ ]
a.push(1, 2);        // [1,2]  数组末尾添加 1,2
a.shift(3, 4);      //  [ 2 ]   shift（）会删除数组的第一个元素，里面写啥都没用
a.concat([5, 6]);  // [2]      拼接数组，会返回新的数组，这里没接收返回的新数组 ，a没变
a.splice(0, 1, 2);   //  [2]     删除下标为0的元素，同时替换为 2 
```

```js
// 输出'catch Error'
new Promise((resolve, reject)=>{
    resolve('Success!')
}).then(()=>{
    throw Error('Error')
}).catch(error=>{
    return 'catch Error'
})
.catch(error => console.log(error.message))
```

```js
var a=1;
var b = 2;
let obj={
    a：3,
    b:4,
    getA: function(){
        var a=5;
        setTimeout(function(){console.log(this.a);}，0)
    },
    getB: function(){
        var b=6;
        return function(){console.log(this.b);}();
    }
}
obj.getA(); // 1
obj.getB(); // 2
```

```js
let target
async function func(){
    target = await 1173 
    return 935;
}
func().then((res)=>{console.log(res);},(err)=>{console.log(err)；}); // 935
target.then((res)=>{console.log(res);),(err)=>{console.log(err); }); // 1173
```

```js
var a = [1,,2]
var b ={
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021,
  like: 'frontend',
  weixin: 'frontJS'
};
console.log(JSON.stringify(a)) // [1,null,2]
console.log(JSON.stringify(b),['weixin'],4) // 过滤器 {    "weixin":"frontJS"}; 4为缩进

let json1 = {
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021,
  like: 'frontend',
  weixin: 'frontJS',
  toJSON: function () { // 在要序列化的对象中添加toJSON()方法，序列化时会基于这个方法返回适当的JSON表示。
    return this.author
  }
};
console.log(JSON.stringify(json1)); // ["浪里行舟"]

```

```js
<div class="container">
    <p>Paragraph 1</p >
    <p class="highlight">Paragraph 2</p >
    <div>
        <p>Paragraph 3</p >
        <p class="highlight">Paragraph 4</p >
    </div>
</div>
请问如何使用CSS选择内容为Paragraph 4的p标签
A div.highlight:nth-of-type(2) // 类名为highlight的第二个div元素(同类型)
B div.highlight:nth-child(2) // 类名为highlight的第二个div元素
C p.highlight:last-child // p的最后子元素
D div> p.highlight:last-of-type // div的直接子元素中类名为highlight的最后一个p元素
```

```js
console.log('1.Start');
setTimeout(()=>{
    console.log('2.setTimeout 1');},0);
Promise.resolve().then(() =>{
    console.log('3.Promise 1');
    setTimeout(() =>{
        console.log('4.setTimeout 2');
    },0);
})
Promise.resolve().then(()=>{
    console.log('5.Promise 2');
});
console.log('6.End');
// 1,6,3,5,4,2
```

## 手撕

小美定义一个数组a的权值计算如下:首先将a的每一对相邻两项求和，得到一个b数组。那么b数组的最大值减最小值即为a数组的权值。例如，若a = [2,1,3]，那么b = [3,4]，b数组的极差是1。因此a数组的权值为1。现在小美希望你能构造一个长度为n的排列，满足权值尽可能小。你能帮帮她吗?排列是指一个长度为n的数组，其中 1到n每个元素恰好出现一次。

```js
// 8 => a=[1,8,2,7,3,6,4,5]; b=[9,10,9,10,9,10,9]; min=1
function min(n){
    let res = []
    let left=1, right=n
    while(left<right){
        res.push(left)
        res.push(right)
        left++
        right++
    }
    if(left==right){
        res.push(left)
    }
    return res 
}
```

小美定义一个矩阵是好矩阵，当且仅当该矩阵满足:1.矩阵由'A'、B'、'C'三种字符组成。且三种字符都出现过。2.矩阵相邻的字符都不相等。现在给定一个n*m的矩阵，小美想知道有多少个3x3的子矩阵是好矩阵，你能帮帮她吗?

```js
/* 小美定义一个矩阵是好矩阵，当且仅当该矩阵满足:1.矩阵由'A'、B'、'C'三种字符组成。
且三种字符都出现过。2.矩阵相邻的字符都不相等。现在给定一个n*m的矩阵，小美想知道有
多少个3x3的子矩阵是好矩阵，你能帮帮她吗?*/

let matrix = [['A','B','C','C'],['C','A','B','D'],['B','C','A','C'],['A','B','A','C']]
function count(matrix){
    let res=0
    let n = matrix.length
    let m = matrix[0].length
    for(let i=0;i<n-2; i++){
        for(let j=0;j<m-2;j++){
            let submatrix=[matrix[i].slice(j,j+3),matrix[i+1].slice(j,j+3),matrix[i+2].slice(j,j+3)]
            console.log(submatrix)
            if(isGood(submatrix)){
                res++
            }
        }
    }
    return res
  
    function isGood(submatrix){
        for(let i =0;i<submatrix.length-1;i++){
            for(let j =0;j<submatrix[0].length-1;j++){
                if(submatrix[i][j]==submatrix[i+1][j]||submatrix[i][j]==submatrix[i][j+1]){
                    return false
                }
            }
        }
        let arr = submatrix.flat(Infinity)
    
        let set = new Set(arr)
        console.log(set)
        if(set.size==3&&set.has('A')&&set.has('B')&&set.has('C')){
            return true
        }
    
        return false
    }
}
console.log(count(matrix)) // 2
```

编写一个JavaScript函数，实现找出给定数组中的最长公共前缀。例如，输入数组["flower',"flow","flight"]，输出结果应为"fl"

```js
var longestCommonPrefix = function (strs) {
    if (strs.length == 0) {
        return ""
    }
    var tmp = strs[0] //取第一个元素
    for (let i = 1; i < strs.length; i++) { //从第二个开始遍历
        let j = 0; //j后面需要,提出来
        for (; j < tmp.length && j < strs[i].length; j++) {
            if (tmp[j] != strs[i][j]) { //对应字母不匹配break
                break;
            }
        }
        tmp = tmp.substr(0, j) //取出字符串
        if (tmp == "") {
            return tmp
        }
    }
    return tmp
};
```
