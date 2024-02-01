---
icon: list
date: 2024-01-11
category:
  - 数据结构
tag:
  - 基础
order: 1
excerpt: <p>《学习JavaScript数据结构与算法》阅读总结</p>
editLink: false
---
# js数据结构与算法

抽象数据类型ADT（Abstract Data Type）

## 1 数组Array

最简单的内存数据结构，数组在内存中为固定大小的连续的内存块（有些内存未被使用）

> **内存**：每个字节分配一个地址，内存块的地址是内存中第一个字节的地址

通过[增删改查](/frontend/js/01js.html#_9-数组array)实现动态列表

时间复杂度(大O表示法):

* 读-`O(1)`
* 增删-`O(n)`：n为数组长度，插入、删除、添加时可能的最大移动量为整个数组

### 1.1 JavaScript的数组方法参考

在 `ES5`就支持的数组核心方法

| 方法        | 描述                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------ |
| concat      | 连接2个或者更多数组，并返回结果                                                            |
| every       | 对数组中的每一个元素运行给定的函数，如果该函数对每一个元素都返回 `true`，则返回 `true` |
| filter      | 对数组中的每一个元素运行给定的函数，返回该函数会返回 `true`的元素组成的数组              |
| forEach     | 对数组中的每一个元素运行给定的函数                                                         |
| join        | 将所有的数组元素以指定的字符链接成一个字符串                                               |
| indexOf     | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1                                 |
| lastIndexOf | 从数组末尾开始搜索，并返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1           |
| map         | 对数组中的每一个元素运行给定的函数，返回每次函数调用的结果组成的数组                       |
| reverse     | 颠倒数组中元素的顺序                                                                       |
| slice       | 传入索引值，将数组里对应索引范围内的元素作为新数组返回                                     |
| some        | 对数组中的每个元素运行给定的函数，如果任一元素返回 `true`，则返回 `true`               |
| sort        | 按照元素的 `ASCII`值进行排序                                                             |
| reduce      | 逐个遍历数组元素，将当前元素的值与前一步的结果相加                                         |
| toString    | 将数组作为字符串返回                                                                       |
| valueOf     | 和 `toString`类似，将数组作为字符串返回                                                  |

`ES6`新增的数组方法：

| 方法       | 描述                                                                           |
| ---------- | ------------------------------------------------------------------------------ |
| @@iterator | 返回一个包含数组键值对的迭代器对象，可以通过同步调用的方式得到数组元素的键值对 |
| copyWhthin | 复制数组中的一系列元素到同一数组指定的起始位置                                 |
| entries    | 返回包含数组所有键值对的 `@@iterator`                                        |
| find       | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素                   |
| findIndex  | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素的索引             |
| fill       | 用静态值填充数组                                                               |
| from       | 将一个类数组转换为一个真正的数组                                               |
| of         | 根据传入的参数创建一个新数组                                                   |
| values     | 返回包含数组中所有值的 `@@iterator`                                          |

`ES7`新增的数组方法：

| 方法     | 描述                                                        |
| -------- | ----------------------------------------------------------- |
| includes | 如果数组中存在某个元素，则返回 `true`，否则返回 `false` |

## 2 链表LinkedList

链表为一次请求一个元素的内存大小，即非连续的内存块

其中每块内存分为两部分

* 前一部分为存储的数据
* 后一部分为下一个内存块的地址，最后一个地址为0或者null表示结尾

时间复杂度：

* 读、增、删-`O(n)`：链表必须从第一个节点开始访问

### 2.1 数组vs链表

1. 在数据量大时数组浪费的内存比链表多
2. 时间复杂度:
   * 访问一个数据时，数组为O(1)，链表为O(n)
   * 在开头插入一个数据时，数组为O(n)，链表为O(1)
   * 在末尾插入一个数据时，数组为O(1)，链表为O(n)
   * 在中间插入一个数据时，都为O(n)
3. 数组比链表更容易使用和实现，链表更容易出现问题，如段错误和内存泄漏

### 2.2 创建链表

实现 `LinkedList`类：

* `count`：记录链表中的总数
* `head`：第一个元素的引用

```javascript
class LinkedList {
  constructor () {
    this.count = 0
    this.head = null
  }
  //方法
}
```

要表示链表中的节点，需要另外一个 `Node`类，它表示想要添加到链表中的项，包含：

* `element`：要加入链表元素的值
* `next`：指向链表下一个元素的指针

```javascript
class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}
```

在搭建好 `LinkedList`类的骨架后，需要实现的方法如下：

* `append(element)`：向链表尾部添加一个新元素
* `insert(element,index)`：在链表指定位置插入一个新元素
* `getElementAt(index)`：返回链表中特定位置的元素，如果没有则返回 `undefined`
* `remove(element)`：从链表中移除一个元素
* `indexOf(element)`：返回元素在链表中的索引，如果没有则返回 `-1`
* `removeAt(index)`：从链表指定位置移除一个元素
* `isEmpty()`：如果链表中不包含任何元素，则返回 `true`，否则返回 `false`
* `size()`：返回链表包含的元素个数
* `getHead()`：返回链表的第一个元素
* `toString()`：返回表示整个链表的字符串

#### 2.2.1 向链表尾部添加元素

1. 链表为空，添加第一个元素
2. 链表不为空，向其追加元素

```javascript
append (element) {
  let current = null
  const node = new Node(element)
  if (this.head === null) {
    this.head = node
  } else {
    current = this.head
    while (current.next !== null) {
      current = current.next
    }
    current.next = node
  }
  this.count++
}
```

* 当 `head`为 `null`时，代表整个链表为空，因此我们要插入的元素就是第一个元素，直接赋值给 `head`即可
* 当 `head`不为 `null`时，代表链表有数据，即我们需要迭代链表一直到最后一个元素(`current.next=null`)，此时直接把要插入的元素赋值给 `current.next`即可

#### 2.2.2 查询链表目标位置的值

```javascript
getElementAt (index) {
  if (index >= 0 && index <= this.count) {
    let current = this.head
    for (let i = 0; i < index && current !== null; i++) {
      current = current.next
    }
    return current
  }
  return undefined
}
```

* 首先判断参数 `index`是否合法，不合法则直接返回 `false`

#### 2.2.3 从链表中移除指定位置元素

1. 移除第一个元素
2. 移除第一个元素之外的其它元素

```javascript
removeAt (index) {
  if (index >= 0 && index < this.count) {
    let current = this.head
    if (index === 0) {
      this.head = current.next
    } else {
      const previous = this.getElementAt(index - 1)
      current = previous.next
      previous.next = current.next
    }
    this.count--
    return current.element
  }
  return undefined
}
```

![链表移除元素逻辑](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240114160622.png)

#### 2.2.4 在任意位置插入元素

1. 在第一个位置插入元素
2. 在第一个位置之外的位置插入元素

```javascript
insert (element, index) {
  if (index >= 0 && index <= this.count) {
    const node = new Node(element)
    if (index === 0) {
      const current = this.head
      node.next = current
      this.head = node
    } else {
      const previous = this.getElementAt(index - 1)
      node.next = previous.next
      previous.next = node
    }
    this.count++
    return true
  }
  return false
}
```

![链表插入元素](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240114161746.png)

#### 2.2.5 返回一个元素的位置

`indexOf()`方法接受一个元素的值，如果在链表中找到了它，就返回元素的位置，否则返回 `-1`

```javascript
indexOf (element) {
  let current = this.head
  for (let index = 0; index < this.count && current !== null; index++) {
    if (element === current.element)) {
      return index
    }
    current = current.next
  }
  return -1
}
```

#### 2.2.6 从链表中移除指定值的元素

通过indexof()查找到元素位置后，通过removeAt()移除

```javascript
remove (element) {
  let index = this.indexOf(element)
  return this.removeAt(index)
}
```

#### 2.2.7 链表剩余方法

 `size()`、`isEmpty()`、`getHead()`和 `toString()`方法的实现代码如下：

```javascript
size () {
  return this.count
}
isEmpty() {
  return this.size() === 0
}
getHead () {
  return this.head === null ? undefined : this.head.element
}
toString () {
  if (this.isEmpty()) {
    return ''
  }
  let str = this.head.element
  let current = this.head
  
  while(current.next !== null) {
    current = current.next
    str = `${str},${current.element}`
  }
  return str
}
```

#### 2.2.8 使用链表

```javascript
const linkedList = new LinkedList()
console.log(linkedList.size()) 
```

### 2.3 双向链表

在双向链表中，一个链向下一个元素，另一个链向前一个元素

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240114164731.png)

```javascript
class DoublyLinkedList extends LinkedList {
  constructor () {
    super()
    this.tail = null
  }
}

class DoublyNode extends Node {
  constructor (element, next, prev) {
    super(element, next)
    this.prev = prev
  }
} 
```

* `DoublyLinkedList`类继承自 `LinkedList`类，新增变量 `tail`，用来表示指向双向链表的最后一个元素
* `DoublyNode`双线链表节点继承自 `LinkedList`链表的 `Node`节点，新增指向上一个元素的指针 `prev`

#### 2.3.1 在任意位置插入元素

```javascript
insert (element, index) {
  if (index >= 0 && index <= this.count) {
    const node = new DoublyNode(element)
    let current = this.head
    if (index === 0) { //1.在第一个位置插入
      if (this.head === null) { //第一个为空，直接新增，即设置head和tail
        this.head = node
        this.tail = node
      } else {  //第一个不为空，修改两条指针，设置head
        node.next = this.head
        current.prev = node
        this.head = node
      }
    } else if (index === this.count) { //2.最后一个位置插入，获取到最后一个元素后，修改两条指针，设置tail
      current = this.tail
      current.next = node
      node.prev = current
      this.tail = node
    } else {  //3.中间位置插入，修改四条指针
      const previous = this.getElementAt(index - 1)
      current = previous.next
      node.next = current
      previous.next = node
      current.prev = node
      node.prev = previous
    }
    this.count++
    return true
  }
  return false
}
```

在中间位置插入的图示：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240114170650.png)

 **注意** ：如果我们在双向链表 `insert()`插入新元素的时候，我们可以判断当 `index`大于 `length / 2`的时候，可以从双向链表的尾部开始迭代，而不是从头开始迭代，这样可在一定程度上提升性能。

#### 2.3.2 在任意位置移除元素

```javascript
removeAt (index) {
  if (index >= 0 && index < this.count) {
    let current = this.head
    if (index === 0) {  //1.移除第一项，设置head
      this.head = current.next
      if (this.count === 1) {
        this.tail = null //只有一项时，设置tail为空
      } else {
        this.head.prev = null //否则，设置修改后的第一项的prev为空
      }
    } else if (index === this.count - 1) {  //2.移除最后一项。设置tail为前一项，设置修改后最后一项的next为空
      current = this.tail
      this.tail = current.prev
      this.tail.next = null
    } else {  //3.移除中间项，修改前一项和后一项的指针使其连接
      current = this.getElementAt(index)
      const previous = current.prev
      previous.next = current.next
      current.next.prev = previous
    }
    this.count--
    return current.element
  }
  return undefined
}
```

#### 2.3.3 其它方法

```javascript
clear () {
  super.clear()
  this.tail = null
}

getTail () {
  return this.tail === null ? undefined : this.tail.element
}

inverseToString () {
  if (this.tail === null) {
    return ''
  }
  let str = `${this.tail.element}`
  let current = this.tail.prev
  for (let index = 0; index < this.count && current != null; index++) {
    str = `${str},${current.element}`
    current = current.prev
  }
  return str
}
```

### 2.4 循环链表

1. 循环链表可以像普通(单向)链表一样只有单向引用

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240114172216.png)

2. 也可以像双向链表一样有双向引用

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240114172232.png)

单向循环链表的创建如下：

```javascript
class CircularLinkedList extends LinkedList {
  constructor () {
    super()
  }
}
```

#### 2.4.1 在任意位置插入元素

循环链表中插入元素和普通(单向)链表的唯一的区别是需要维护最后一个元素的指针，将它设置为指向第一个元素

```javascript
insert (element, index) {
  if (index >= 0 && index <= this.count) {
    const node = new Node(element)
    let current = this.head
    if (index === 0) {  //1.在第一个位置插入
      if (this.head === null) { //没有元素时直接新增，设置head和next
        this.head = node
        node.next = this.head
      } else {  //第一个位置有元素时，设置新的head和next，获取最后一个元素设置next
        this.head = node
        node.next = current
        current = this.getElementAt(this.count - 1)
        current.next = node
      }
    } else {  //2.在其他位置插入，与普通链表相同
      const previous = this.getElementAt(index - 1)
      node.next = previous.next
      previous.next = node 
    }
    this.count++
    return true
  }
  return false
}
```

#### 2.4.2 在任意位置移除元素

```javascript
removeAt (index) {
  if (index >= 0 && index < this.count) {
    let current = this.head
    if (index === 0) {
      if (this.count === 1) {
        this.head = null
      } else {
        const removed = this.head
        this.head = this.head.next
        current = this.getElementAt(this.count - 1) //不同：获取最后一项并修改其next
        current.next = this.head
        current = removed //返回删除的值
      }
    } else {
      const previous = this.getElementAt(index - 1)
      current = previous.next
      previous.next = current.next
    }
    this.count--
    return current.element
  }
  return undefined
}
```

## 3 栈Stack

栈是一种遵从**后进先出**原则的有序集合

新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端叫栈底

### 3.1 创建栈

通过数组保存栈里的元素，并声明以下方法：

* `push()`：在栈顶添加一个或者多个元素
* `pop()`：移除栈顶的第一个元素，同时返回被移除的元素
* `peek()`：返回栈顶的元素
* `isEmpty()`：判断栈是否为空，是则返回 `true`，否则返回 `false`
* `clear()`：移除栈中的所有元素
* `size()`：返回栈中元素的个数

```javascript
class Stack {
  constructor () {
    this.items = []
  }
  push (element) {
    this.items.push(elememt)
  }
  pop () {
    return this.items.pop()
  }
  peek () {
    return this.items[this.size - 1]
  }
  isEmpty () {
    return this.size === 0
  }
  clear () {
    return this.items = []
  }
  size () {
    return this.items.length
  }
}
```

#### 3.1.1使用Stack类

```javascript
const stack = new Stack()
console.log(stack.isEmpty())  // true
stack.push(1)
```

### 3.2 通用进制转换算法

要把十进制转换成其他进制，可以将该十进制除以其他进制数并对商取整，直到结果为0

```javascript
function baseConverter (decNumber, base) {
  if (base < 2 || base > 36) {
    return ''
  }
  const stack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseString = ''
  while (number > 0) {
    rem = Math.floor(number % base) //取余数
    number = Math.floor(number / base) //整除
    stack.push(rem)
  }
  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()] //转换十以上数字为字母
  }
  return baseString
}
console.log(baseConverter(100, 2))  // 1100100
console.log(baseConverter(100, 8))  // 144
console.log(baseConverter(100, 16)) // 64
console.log(baseConverter(100, 32)) // 34
```

## 4 队列Queue

队列是遵循先进先出原则的一组有序的项

队列在尾部添加新元素，并从顶部移除元素

### 4.1 创建队列

可以仿照栈的数据结构通过数组存储元素

为了写出一个在获取元素时更高效的数据结构，使用一个对象来存储元素

为队列声明以下可调用的方法：

* `enqueue()`：向队列的尾部添加元素
* `dequeue()`：在队列的开头移除第一个元素，并返回被移除的元素
* `peek()`：返回队列的第一个元素
* `isEmpty()`：判断队列是否为空
* `size()`：返回队列包含元素的个数
* `clear()`：清空队列
* `toString()`：将队列转换成字符串格式

```javascript
class Queue {
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  size () {
    return this.count - this.lowestCount
  }
  isEmpty () {
    return this.size() === 0
  }
  enqueue (element) {
    this.items[this.count] = element
    this.count++
  }
  dequeue () {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  peek () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  clear () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let objStr = this.items[this.lowestCount]
    for(let i = this.lowestCount + 1; i < this.count; i++) {
      objStr = `${objStr},${this.items[i]}`
    }
    return objStr
  }
}
```

### 4.2 循环队列

#### 4.2.1 击鼓传花

游戏规则：游戏参与者围成一个圈，并按固定的顺序传递给旁边的人，某一时刻传花结束，此时花在谁手里，谁就退出圆圈，结束游戏，重复这个过程，直到只剩最后一个孩子即为胜利者。

```javascript
function hotPotato (elementList, num) {
  const queue = new Queue()
  const eliminatedList = []
  for (let i = 0; i < elementList.length; i++) {
    queue.enqueue(elementList[i]) //队列中存入数据
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()) //将队列开头的元素删除后添加到队列末尾
    }
    eliminatedList.push(queue.dequeue()) //传递次数达到指定次数后，淘汰一人，从队列中移除
  }
  return {
    eliminated: eliminatedList, //淘汰列表
    winner: queue.dequeue() //胜利者
  }
}

const names = ['AA', 'BB', 'CC', 'DD', 'EE']
const result = hotPotato(names, 7)
for (let i = 0; i < result.eliminated.length; i++) {
  console.log(`${result.eliminated[i]}在击鼓传花游戏中被淘汰。`)
}
console.log(`胜利者：${result.winner}`)
```

## 5 集合Set

* 集合由一组无序且唯一的项组成
* 集合中的对象列表用 `{}`包围
* 空集即不包含任何元素的集合

### 5.1 创建集合

使用 `ES5`通过对象封装 `Set`类，并声明集合可用的方法：

* `add(element)`：向集合中添加新元素
* `delete(element)`：从集合移除一个元素
* `has(element)`：判断元素是否在集合中，如果是则返回 `true`，否则返回 `false`
* `clear()`：清空集合
* `size()`：返回集合所包含元素的数量
* `values()`：返回一个包含集合中所有值的数组

```javascript
class Set {
  constructor () {
    this.items = {}
  }
  has (element) {
    return element in this.items
  }
  add (element) {
    if (!this.has(element)) {
      this.items[element] = element //同时作为键和值保存，利于查找
      return true
    }
    return false
  }
  delete (element) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }
  clear () {
    this.items = {}
  }
  size () {
    return Object.keys(this.items).length
  }
  values () {
    return Object.values(this.items)
  }
}
```

* `has()`方法：要判断一个对象是否有某个属性，我们可以使用 `in`操作符来判断，但in会包含原型链上的属性，而 `hasOwnProperty`方法返回一个表明该对象（不包括原型链上）是否具有特定属性的布尔值，所以更好的做法是：

```javascript
has (element) {
  return Object.hasOwnProperty(element)
}
```

* `size()`：对于此方法我们有几种方式来实现，第一种是新增一个变量，当 `add`或者 `delete`时，来维护这个变量；第二种方发生直接使用内置的 `Object.keys()`方法；第三种是手动提取 `this.items`对象中的属性合计：

```javascript
size () {
  let count = 0
  for(let key in this.items) {
    if (this.items.hasOwnProperty(key)) {  //检查是否是对象自身的属性，排除继承自Object类的属性
      count++
    }
  }
  return count
}
```

* `values()`：对于此方法我们可以直接使用内置的 `Object.values()`，但这种在某些浏览器中可能无法使用，所以我们可以写如下的方法来替换：

```javascript
values () {
  let values = []
  for (let key in this.items) {
    if (this.items.hasOwnProperty(key)) {
      values.push(key)
    }
  }
  return values
}
```

### 5.2 集合运算

集合操作：

* **并集** ：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
* **交集** ：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
* **差集** ：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
* **子集** ：验证一个给定的集合是否是另一个集合的子集

#### 5.2.1 并集union

```javascript
union (otherSet) {
  const unionSet = new Set()
  this.values().forEach(item => {
    unionSet.add(item)
  })
  otherSet.values().forEach(item => {
    unionSet.add(item)
  })
  return unionSet
}
```

代码测试：

```javascript
const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
const setB = new Set()
setB.add(3)
setB.add(4)
setB.add(5)
setB.add(6)
const result = setA.union(setB)
console.log(result.values()) // [1, 2, 3, 4, 5, 6]
```

#### 5.2.2 交集intersection

```javascript
intersection (otherSet) {
  const intersectionSet = new Set()
  this.values().forEach(item => {
    if (otherSet.has(item)) {
      intersectionSet.add(item)
    }
  })
  return intersectionSet
}
```

代码测试：

```javascript
const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
const setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)
const result = setA.intersection(setB)
console.log(result.values()) // [2, 3]
```

 **注意** ：假设有如下两个集合，`setA = [1, 2, 3, 4, 5, 6, 7]`, `setB = [4, 6]`，创建的 `intersection()`方法需要迭代七次 `setA`，如果只需要迭代两次 `setB`就会有更少的过程消耗

代码优化：

```javascript
intersection (otherSet) {
  const intersectionSet = new Set()
  const values = this.values()
  const otherValues = otherSet.values()
  let biggerSet = values
  let smallerSet = otherValues
  if (biggerSet.length - smallerSet.length > 0) {
    biggerSet = otherValues
    smallerSet = values
  }
  smallerSet.forEach(item => {
    if (biggerSet.includes(item)) {
      intersectionSet.add(item)
    }
  })
  return intersectionSet
}
```

#### 5.2.3 差集difference

```javascript
difference (otherSet) {
  const differenceSet = new Set()
  this.values.forEach(item => {
    if (!otherSet.has(item)) {
      differenceSet.add(item)
    }
  })
  return differenceSet
}
```

代码测试：

```javascript
const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
const setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)
const result = setA.difference(setB)
console.log(result.values()) // [1]
```

 **注意** ：不能像优化交集 `intersection`一样优化差集 `difference`，因为 `setA`和 `setB`之间的差集可能和 `setB`和 `setA`之间的差集不同。

#### 5.2.4 子集subset

```javascript
subset (otherSet) {
  if (this.size() > otherSet.size()) {
    return false
  }
  let isSubSet = this.values().every(item => {
    return otherSet.has(item)
  })
  return isSubSet
}
```

### 5.3 ES6中的Set类

 `ES6`已经提供了 `Set`结构：

```javascript
const set = new Set()
set.add(1)
console.log(set.values()) // 返回一个新的集合迭代器对象@@iterator
console.log(set.has(1))   // true
console.log(set.size())   // 1
set.delete(1)
```

#### 5.3.1 ES6中使用扩展运算符进行集合运算

```javascript
const setA = new Set()
setA.add(1)
setA.add(2)
const setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)
// 并集
console.log(new Set([...setA, ...setB]))  // [1, 2, 3, 4]
// 交集
console.log(new Set([...setA].filter(value => setB.has(value))))  // [2]
// 差集
console.log(new Set([...setA].filter(value => !setB.has(value))))  // [1]
```

## 6 字典和散列表

集合、字典和散列表均存储不重复的值，但集合用 `[值,值]`形式存储数据，字典和散列表用 `[键,值]`形式存储数据

### 6.1 字典Dictionary - 映射Map(ES6)

#### 6.1.1 创建字典

```javascript
class Dictionary {
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }
}
```

还需要定义一个将字典键转成字符串的方法，因为 `ES5`中的对象的键只能是字符串：

```javascript
function defaultToString (item) {
  if (item === null) {
    return `NULL`
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}
```

声明一些映射/字典所能使用的方法：

* `set(key, value)`：向字典中添加新元素，如果 `key`已经存在，那么已存在的 `value`会被覆盖
* `remove(key)`：在字典中移除指定键的元素
* `hasKey(key)`：在字典中判断是否存在指定键的元素
* `get(key)`：在字典中获取指定键的元素
* `clear()`：清空字典
* `size()`：返回字典所包含元素的数量
* `isEmpty()`：判断字典是否为空
* `keys()`：将字典中所有的键以数组的形式返回
* `values()`：将字典中所有的值以数组的形式返回
* `keyValues()`：将字典中所有的 `[键,值]`对返回
* `forEach(callback)`：字典迭代方法

##### 6.1.1.1 hasKey()方法

```javascript
hasKey (key) {
  let value = this.table[this.toStrFn(key)]
  return value !== null && value != undefined
}
```

##### 6.1.1.2 set()方法

```javascript
set (key, value) {
  if (key != null && value != null) {
    const tableKey = this.toStrFn(key)
    this.table[tableKey] = new ValuePair(key, value)
    return true
  }
  return false
}
```

`set()`方法接受 `key`和 `value`

1. 判断 `key`和 `value`不能为 `null`或者 `undefined`，
2. 把传入的 `key`转换为一个字符串，再存储在字典中
3. 为了方便存储 `key`和 `value`，同时为了方便转换为字符串格式，定义 `ValuePair`类，并为其自定义 `toString()`方法：

```javascript
class ValuePair {
  constructor (key, value) {
    this.key = key
    this.value = value
  }
  toString () {
    return `{#${this.key}}: ${this.value}`
  }
}
```

##### 6.1.1.3 remove()方法

```javascript
remove (key) {
  if (this.hasKey(key)) {
    delete this.table[this.toStrFn(key)]
    return true
  }
  return false
}
```

##### 6.1.1.4 get()方法

```javascript
get (key) {
  const valuePair = this.table[this.toStrFn(key)]
  return valuePair == null ? undefined : valuePair.value
}
```

##### 6.1.1.5 keys()、values()、keyValues()方法

```javascript
keyValues () {
  return Object.values(this.table)
}
keys () {
  return this.keyValues().map(valuePair => valuePair.key)
}
values () {
  return this.keyValues().map(valuePair => valuePair.value)
}
```

##### 6.1.1.6 forEach()方法

```javascript
forEach (callback) {
  const valuePairs = this.keyValues()
  for (let index = 0; index < valuePairs.length; index++) {
    const result = callback(valuePair.key, valuePair.value)
    if (result === false) {
      break
    }
  }
}
```

##### 6.1.1.7 其它方法

```javascript
size () {
  return this.keyValues(this.table).length
}
isEmpty () {
  return this.size() === 0
}
clear () {
  this.table = {}
}
toString () {
  if (this.isEmpty()) {
    return ''
  }
  const valuePairs = this.keyValues()
  let objStr = valuePairs[0].toString()
  for (let index = 1; index < valuePairs.length; index++) {
    objStr = `${objStr}, ${valuePairs[index].toString()}`
  }
  return objStr
}
```

### 6.2 散列表（哈希表）HashMap

 散列表也叫 `HashTable`类或者 `HashMap`类，是 `Dictionary`类的一种散列表实现方式

 **散列算法**（哈希算法）的作用是尽可能的快的在数据结构中找到一个值，即在创建一个新的表的同时创建一个索引来更快的查询到记录的 `key`

#### 6.2.1 创建散列表

```javascript
class HashTable {
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }
}
```

沿用了 `defaultToString()`方法：

```javascript
function defaultToString (item) {
  if (item === null) {
    return `NULL`
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}
```

为散列表添加一些方法：

* `put(key, value)`：向散列表中添加一个新的项
* `remove(key)`：根据键值从散列表中移除值
* `get(key)`：返回根据键值检索到的特定的值

##### 6.2.1.1 散列函数

给定一个key参数，根据组成key的每个字符的ASCII码值的和得到一个数字：

```javascript
loseloseHashCode (key) {
  if (typeof key === 'number') {
    return key
  }
  const tableKey = this.toStrFn(key)
  let hash = 0
  for (let index = 0; index < tableKey.length; index++) {
    hash += tableKey.charCodeAt(index)
  }
  return hash % 37
}
hashCode (key) {
  return this.loseloseHashCode(key)
}
```

1. 检测传递的 `key`是否为数字类型，如果是则直接返回，不是则将其转换为字符串形式
2. 把转换后的字符串的 `ASCII`值进行求和
3. 为了得到比较小的数值，使用 `hash`值和任意数做除法的余数，这可以规避操作数超过数值的表示范围

##### 6.2.1.2 put()方法

```javascript
put (key, value) {
  if (key != null && value != null) {
    const hashCode = this.hashCode(key)
    this.table[hashCode] = new ValuePair(key, value)
    return true
  }
  return false
}
```

##### 6.2.1.3 get()方法

```javascript
get (key) {
  const valuePair = this.table[this.hashCode(key)]
  return valuePair == null ? undefined : valuePair.value
}
```

##### 6.2.1.4 remove()方法

```javascript
remove (key) {
  const hashCode = this.hashCode(key)
  const valuePair = this.table[hashCode]
  if (valuePair != null) {
    delete this.table[hashCode]
    return true
  }
  return false
}
```

#### 6.2.2 处理散列表冲突

冲突：一些键有相同的散列值，即不同的值在散列表中对应相同位置

处理冲突有几种方法：分离链接、线性探查和双散列法

##### 6.2.2.1 分离链接

实现方法：为散列表的每一个位置创建一个链表并将元素存储在里面

是解决冲突的最简单的方法，但是在HashTable实例之外还需要额外的存储空间

##### 6.2.2.2 线性探查

实现方法：当想向表中某个位置加入一个新元素的时候，如果索引为index的位置已经被占据了，就尝试index+1的位置；如果index+1的位置也被占据了，就尝试index+2的位置，以此类推

#### 6.2.3 创建更好的散列函数

一个表现良好的散列函数由几个方面构成：插入和检索元素的时间（即性能），也包括较低的冲突可能性

```javascript
djb2HashCode (key) {
  const tableKey = this.toStrFn(key)
  let hash = 5381  //赋值一个质数，大多数都使用5381
  for (let index = 0; index < tableKey.length; index++) {
    hash =hash * 33 + tableKey.charCodeAt(index)
  }
  return hash % 1013  //与另一个随机质数相除，比散列表的大小更大
}
hashCode (key) {
  return this.djb2HashCode(key)
}
```

## 7 树

树是一种分层数据的抽象模型，适用于存储需要快速查找的数据

### 7.1 树结构

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116210317.png)

* 根节点：没有父节点
* 内部节点：至少有一个子节点
* 外部节点/叶节点：没有子节点
* 子树：由节点和它的后代构成
* 节点的深度：祖先节点的数量，如节点3的深度为3
* 树的高度：节点深度的最大值

### 7.2 二叉树

* 二叉树：节点最多只能有两个子节点
* 二叉搜索树(BST)：二叉树的一种，但只允许在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大（或者等于）的值

#### 7.2.1 创建BST类

二叉搜索树构建如下：

```javascript
class BinarySearchTree {
  constructor (compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }
}
class Node {
  constructor (key) {
    this.key = key
    this.left = null
    this.right = null
  }
}
```

和链表类似，通过指针来表示节点之间的关系，在二叉搜索树中，`left`代表左侧节点，`right`代码右侧节点

在 `BinarySearchTree`二叉搜索树的构造函数中，使用以下方法来比较节点：

```javascript
function defaultCompare (a, b) {
  if (a === b) {
    return 0
  }
  return a < b ? -1 : 1
}
```

二叉搜索树数据结构的组织方式如下：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116211922.png)

实现方法：

* `insert(key)`：向树中插入一个新的键
* `search(key)`：在树中查找一个键，如果节点存在，则返回 `true`；如果不存在，则返回 `false`
* `inOrderTraverse()`：通过中序遍历方式遍历所有节点
* `preOrderTraverse()`：通过先序遍历方式遍历所有节点
* `postOrderTraverse()`：通过后序遍历方式遍历所有节点
* `min()`：返回树中最小的值/键
* `max()`：返回树中最大的值/键
* `remove(key)`：从树中移除某个键

#### 7.2.2 向树中插入一个键 insert()

向 `BST`树中插入一个节点，使用到递归算法：

```javascript
insert (key) {
  if (this.root === null) {
    this.root = new Node(key)
  } else {
    this.insertNode(this.root, key)
  }
}
insertNode (node, key) {
  if (this.compareFn(key, node.key) === -1) {
    if (node.left === null) {
      node.left = new Node(key)
    } else {
      this.insertNode(node.left, key)
    }
  } else {
    if (node.right === null) {
      node.right = new Node(key)
    } else {
      this.insertNode(node.right, key)
    }
  }
}
```

1. 判断要插入的是否为树的顶部节点，如果是则插入；如果不是则调用 `insertNode()`方法
2. `insertNode()`方法判断当前要插入的 `key`和当前节点进行比较，如果小于，则插入在左侧；如果大于则插入在右侧

 **实例分析** ：

假设我们需要插入值为6的键，即执行如下代码：

```javascript
tree.insert(6)
```

其插入步骤分析如下：

1. 树非空，执行 `this.insertNode(this.root, key)`代码
2. 首先检测 `6 < 11`，在左侧继续查找，随后检测 `6 < 7`，继续在左侧查找，然后判断 `6 > 5`
3. 在值为 `5`的节点右侧搜索，判断其右侧节点没有节点，则要插入的键就是此节点右节点
4. 最后递归方法会依次出栈，代码执行过程结束

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116213728.png)

### 7.3 树的遍历

遍历一个树是指访问树的每个节点并对它们进行某种操作的过程，访问树的所有节点有三种方式：中序、先序和后序

#### 7.3.1 中序遍历

中序遍历是一种以上行顺序访问 `BST`所有节点的遍历方式，即以从最小到最大的顺序访问所有节点

```javascript
inOrderTraverse (callback) {
  this.inOrderTraverseNode(this.root, callback)
}
inOrderTraverseNode (node, callback) {
  if (node !== null) {
    this.inOrderTraverseNode(node.left, callback)
    callback(node.key)
    this.inOrderTraverseNode(node.right, callback)
  }
}
```

首先检查以参数形式传入的节点是否为 `null`，因为这就是停止递归函数的判断条件

通过递归的形式先对左侧子节点进行访问，接着对根节点进行访问，最后再访问右侧子节点

```javascript
const printNode = (value) => console.log(value)
tree.inOrderTraverse(printNode) // 依次输出：3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
```

其遍历过程如图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116215027.png)

#### 7.3.1 先序遍历

以优先于后代节点的顺序访问每个节点，即先访问节点本身，然后再访问它的左侧节点，最后访问右侧节点

```javascript
preOrderTraverse (callback) {
  this.preOrderTraverseNode(this.root, callback)
}
preOrderTraverseNode (node, callback) {
  if (node !== null) {
    callback (node.key)
    this.preOrderTraverseNode(node.left, callback)
    this.preOrderTraverseNode(node.right, callback)
  }
}
```

```javascript
const printNode = (value) => console.log(value)
tree.preOrderTraverse(printNode) // 依次输出：11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
```

其遍历过程如图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116215321.png)

#### 7.3.3 后序遍历

先访问节点的后代节点，再访问节点本身

```javascript
postOrderTraverse (callback) {
  this.postOrderTraverseNode(this.root, callback)
}
postOrderTraverseNode (node, callback) {
  if (node !== null) {
    this.postOrderTraverseNode(node.left, callback)
    this.postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }
}
```

```javascript
const printNode = (value) => console.log(value)
tree.postOrderTraverse(printNode) // 依次输出：3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
```

其遍历过程如图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116215618.png)

### 7.4 搜索树中的值

#### 7.4.1 搜索最小值和最大值

搜索最小值即遍历树的左边直到找到树的最左端节点

```javascript
min () {
  return this.minNode(this.root)
}
minNode (node) {
  let current = node
  while (current !== null && current.left !== null) {
    current = current.left
  }
  return current
}
```

搜素最大值即沿着树的右边进行遍历直到找到最右端的节点

```javascript
max () {
  return this.maxNode(this.root)
}
maxNode (node) {
  let current = node
  while (current !== null && current.right !== null) {
    current = current.right
  }
  return current
}
```

代码测试：

```javascript
const minNode = tree.min()
const maxNode = tree.max()
console.log(minNode.key)  // 3
console.log(maxNode.key)  // 25
```

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116223310.png)

#### 7.4.2 搜索特定的值

```javascript
search (key) {
  return this.searchNode(this.root, key)
}
searchNode (node, key) {
  if (node === null){
      return false
  }
  if (key < node.key) {
    return searchNode(node.left, key)
  } else if (key > node.key){
      return searchNode(node.right, key)
  }else{
      return true
  }
}
```

#### 7.4.3 移除一个节点

```javascript
remove (key) {
  this.root = this.removeNode(this.root, key)
}
removeNode (node, key) {
  if (node === null){
      return null
  }
  if (key < node.key) {
    node.left = removeNode(node.left, key)
    return node
  } else if (key > node.key){
      node.right = removeNode(node.right, key)
      return node
  }else{
      //第一种情况：只有一个叶节点
      if (node.left === null && node.right === null){
          node = null
          return node
      }
      //第二种情况：一个只有一个子节点的节点
      if (node.left === null) {
          node = node.right
          return node
      } else if (node.right === null){
          node = node.left
          return node
      }
      //第三种情况：一个有两个子节点的节点
      let aux = findMinNode(node.right)
      node.key = aux.key
      node.right = removeNode(node.right, aux.key)
      return node
  }
}
```

1. 移除一个叶节点

   给这个节点赋予null值来移除它，并通过返回null来将对应的父节点指针赋予null值

   ![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116222532.png)
2. 移除有一个子节点的节点

   需要跳过这个节点，直接将父节点指向它的指针指向的子节点

   ![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116222716.png)
3. 移除有两个子节点的节点

   * 当找到了需要移除的节点后，需要找到它右边子树中最小的节点，即它的继承者
   * 然后，用它右侧子树中最小节点的键去更新这个节点的值。这一步改变了这个节点的键，即它被移除了
   * 把右侧子树中的最小节点移除
   * 最后，向它的父节点返回更新后节点的引用

findMinNode方法的实现和min方法的实现方式是一样的。唯一不同之处在于，在min方法中只返回键，而在findMinNode中返回了节点

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240116223118.png)

### 7.5 其他二叉树

自平衡二叉搜索树：任何一个节点左右两侧子树的高度之差最多为1

红黑树：可以进行高效的中序遍历

堆积树

## 8 图

图是网络结构的抽象模型

图是一组由边连接的节点（或顶点）

### 8.1 图的相关术语

一个图 `G = (V, E)`由以下元素组成

* `V`：一组顶点
* `E`：一组边，连接 `V`中的顶点

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117195613.png)

* *相邻顶点*：由一条边连接在一起的顶点
* 顶点的*度*：相邻顶点的数量，如A的度为3
* *路径*：顶点 `v1, v2,…,vk`的一个连续序列
* *简单路径*：不包含重复顶点的路径，*环*也是简单路径
* 如果图中不存在环，则称该图是*无环的*
* 如果图中每两个顶点间都存在路径，则该图是*连通的*

图可以是无向的或是有向的，有向图如下：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117200256.png)

如果图中每两个顶点间在双向上都存在路径，则该图是*强连通的*。

图还可以是*加权的*：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117200612.png)

### 8.2 图的表示

#### 8.2.1 邻接矩阵

每个节点都和一个整数相关联，该整数将作为数组的索引

1. 用一个二维数组来表示顶点之间的连接
2. 如果索引为i的节点和索引为j的节点相邻，则array[i][j]=== 1，否则array[i][j] === 0

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117201000.png)

缺点：

1. 不是强连通的图（稀疏图）如果用邻接矩阵来表示，则矩阵中将会有很多0，即浪费了计算机存储空间来表示根本不存在的边
2. 图中顶点的数量可能会改变，而二维数组不太灵活

#### 8.2.2 邻接表

邻接表由图中每个顶点的相邻顶点列表所组成，可以用列表（数组）、链表，甚至是散列表或是字典来表示相邻顶点列表

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117201632.png)

#### 8.2.3 关联矩阵

1. 矩阵的行表示顶点，列表示边
2. 如果顶点v是边e的入射点，则array[v][e] === 1；否则，array[v][e] === 0

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117202059.png)

关联矩阵通常用于边的数量比顶点多的情况下，以节省空间和内存

### 8.3 创建图类

使用一个数组来存储图中所有顶点的名字，以及一个字典来存储邻接表

字典使用顶点的名字作为键，邻接顶点列表作为值

### 8.4 图的遍历

1. 图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。对于两种图遍历算法，都需要明确指出第一个被访问的顶点。
2. 完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。
3. 为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。
4. 当要标注已经访问过的顶点时，用三种颜色来反映它们的状态。
   白色：表示该顶点还没有被访问
   灰色：表示该顶点被访问过，但并未被探索过
   黑色：表示该顶点被访问过且被完全探索过

#### 8.4.1 广度优先搜索BFS

广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层（顶点存入队列种）

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117204729.png)

##### 使用BFS寻找最短路径

#### 8.4.2 深度优先搜索DFS

深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径（顶点存入栈中）

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240117204840.png)

可以通过该算法获取 发现时间 和 完成探索时间

##### 使用DFS拓扑排序

topological sorting，用于编排一些任务或步骤的执行顺序

## 9 排序和搜索算法

常用**排序算法**：冒泡排序、选择排序、插入排序、归并排序、快速排序、计数排序、希尔排序、桶排序、基数排序

常用**搜索算法**：顺序搜索、二分搜索、内插搜索

### 9.1 排序算法

#### 9.1.1 冒泡排序

* 冒泡排序是比较相邻的两个项，如果第一个比第二个大，则交换它们，使元素项向上移动至正确的顺序
* 冒泡排序可能是所有排序算法中最简单的，但从运行时间的角度而言，冒泡排序是最差的一个
* 时间复杂度：`O(n²)`

```javascript
function bubbleSort (array) {
  const { length } = array
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        //ES5中可以写成[array[j],array[j+1]] = [array[j+1],array[j]]
      }
    }
  }
  return array
}
const arr = bubbleSort([5, 4, 3, 2, 1])
console.log(arr) // [1, 2, 3, 4, 5]
```

冒泡排序算法的执行示意图：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122151001.png)

#### 9.1.2 选择排序

* 选择排序算法是一种原址比较排序算法
* 思路是找到数据结构中的最小值并将其放置在第二位，接着找到第二小的值将其放在第二位，以此类推
* 时间复杂度：`O(n²)`

```javascript
function selectSort (array) {
  const { length } = array
  let indexMin = 0
  for (let i = 0; i < length - 1; i++) {
    indexMin = i
    for (let j = i; j < length; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j
      }
    }
    if (i != indexMin) {
      const temp = array[i]
      array[i] = array[indexMin]
      array[indexMin] = temp
    }
  }
  return array
}
const arr = selectSort([5, 4, 3, 2, 1])
console.log(arr) // [1, 2, 3, 4, 5]
```

选择排序算法执行示意图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122151714.png)

#### 9.1.3 插入排序

* 分而治之算法
* 插入排序每次排一个数组项，即从第二项起单独与该项前面的数组项比较大小并排序
* 在排序小型数组时，此算法比选择排序和冒泡排序性能要好

```javascript
function insertSort (array) {
  const { length } = array
  for (let i = 1, temp = 0; i < length; i++) {
    let j = i
    temp = array[i]
    while (j > 0 && (array[j - 1] > temp)) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }
  return array
}
const arr = insertSort([3, 5, 1, 4, 2])
console.log(arr) // [1, 2, 3, 4, 5]
```

插入排序算法执行示意图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122152502.png)

#### 9.1.4 归并排序

归并排序是第一个可以实际使用的排序算法，相比前三种算法来说性能不错

> 在 `JavaScript`中，定义了 `Array.prototype.sort()`方法用于排序，`ECMAScript`并没有定义使用哪种排序算法，而是交给浏览器厂商自己去实现，谷歌 `V8引擎`使用了快速排序的变体， `Firefox`浏览器中使用了归并排序。

* 归并排序的思想是将原始数组切分为较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组
* 时间复杂度：`O(n log(n))`

```javascript
function mergeSort(array) {
  if (array.length > 1) {
    const { length } = array
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle))
    const right = mergeSort(array.slice(middle, length))
    array = merge(left, right)
  }
  return array
}
function merge(left, right) {
  let i = 0
  let j = 0
  const result = []
  while (i < left.length && j < right.length) {
    const item = left[i] < right[j] ? left[i++] : right[j++]
    result.push(item)
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}
const result = mergeSort([8, 7, 6, 5, 4, 3, 2, 1])
console.log(result) // [1, 2, 3, 4, 5, 6, 7, 8]
```

归并排序算法执行示意图：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122154820.png)

#### 9.1.5 快速排序

* 快速排序也使用分而治之的方法，将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）
  1. 从数组中选择一个值作为主元（pivot），也就是数组中间的那个值
  2. 创建两个指针（引用），左边一个指向数组第一个值，右边一个指向数组最后一个值
  3. 移动左指针直到找到一个比主元大的值，移动右指针直到找到一个比主元小的值，然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后
  4. 上一步最后的左指针位置左右划分成两个数组重复之前的步骤，直至数组已完全排序
* 时间复杂度：`O(n log(n))`

```javascript
function quickSort(array) {
  return quick(array, 0, array.length -1)
}

function quick(arr, left, right) {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right);
    if (left < index - 1) {
       quick(arr, left, index-1);
    }
    if (right > index) {
       quick(arr, index, right);
    }
  }
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left+right)/2)],
  let i = left,
  let j = right;
  while(i <= j) {
    while(arr[i] < pivot) {
      i++;
    }
    while(arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}
```

快速排序算法执行示意图：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122194239.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122194326.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122195105.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/1705924279669.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/1705924290233.png)

#### 9.1.6 计数排序

* 一种分布式排序：使用已组织好的辅助数据结构（称为桶），然后进行合并，得到排好序的数组
* 计数排序使用一个用来存储每个元素在原始数组中出现次数的临时数组，在所有元素都计数完完成后，临时数组已排好序并可迭代已构建排序后的结果数组
* 计数排序是一种用来**排序整数**优秀的算法，它的时间复杂度非常简单，但其额外引入了辅助数据结构从而需要更多的内存空间
* 时间复杂度：`O(n+k)`，k为临时计数数组大小

```javascript
function countingSort(array) {
  if (array.length < 2) {
    return array
  }
  const maxValue = findMaxValue(array)
  const counts = new Array(maxValue + 1) //计数数组，从0到最大值
  array.forEach(item => {
    if (!counts[item]) {
      counts[item] = 0
    }
    counts[item]++
  })  //计数
  let sortIndex = 0
  counts.forEach((item, index) => {
    while (item > 0) {
      array[sortIndex++] = index
      item--
    }
  })  //按照计数结果依次填充array
  return array
}

function findMaxValue(array) {
  let max = array[0]
  for (let i = 1; index < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
  }
  return max
}

const result = countingSort([5, 4, 3, 2, 1])
console.log(result) // [1, 2, 3, 4, 5]
```

计数排序算法执行示意图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122202704.png)

#### 9.1.7 桶排序

* 分布式排序算法
* 将元素分为不同的桶（较小的数组）；再使用一个简单的排序算法，例如插入排序，来对每个桶进行排序；最后将所有的桶合并为结果数组
* 时间复杂度：`O(n+k)`

```javascript
function bucketSort(array, bucketSize = 5) { //默认使用5个桶
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize);  //创建桶并将元素分布到不同桶中
  return sortBuckets(buckets);  //对每个桶执行插入排序算法，将所有桶合并为排序后的结果数组
}

function createBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; //计算每个桶中需要分布的元素个数
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) { // 初始化每个桶（多维数组）
    buckets[i] = [];
  }
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); //计算要将元素放到哪个桶中
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

function sortBuckets(buckets) {
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      insertSort(buckets[i]); //通过插入排序算法对每个桶内数据进行排序
      sortedArray.push(...buckets[i]);
    }
  }
  return sortedArray;
}
```

桶排序算法执行示意图：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122203143.png)

#### 9.1.8 基数排序

* 分布式排序算法
* 根据数字的有效位或基数将**整数**分布到桶中
  比如，对于十进制数，使用的基数是10。因此，算法将会使用10个桶用来分布元素并且首先基于个位数字进行排序，然后基于十位数字，然后基于百位数字，以此类推
* 时间复杂度：：`O(nk)`

```javascript
function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array;
  }
  const minValue = findMinValue(array);
  const maxValue = findMaxValue(array);
  let significantDigit = 1; // 从最后一位有效位开始排序所有的数
  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue); // {3}
    significantDigit *= radixBase; //，在下次迭代时，基于第二个有效位进行排序（十位数字），以此类推
  }
  return array;
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
  let bucketsIndex;
  const buckets = [];
  const aux = [];
  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0;
  }
  for (let i = 0; i < array.length; i++) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); //计算各个桶的数据数量
    buckets[bucketsIndex]++;
  }
  for (let i = 1; i < radixBase; i++) { //相加后用于确定数据存放的index
    buckets[i] += buckets[i - 1];
  }
  for (let i = array.length - 1; i >= 0; i--) { //从后往前遍历
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    aux[--buckets[bucketsIndex]] = array[i]; //存放到相应位置并减掉一个计数值
  }
  for (let i = 0; i < array.length; i++) { //可选
    array[i] = aux[i];
  }
  return array;
}
```

基数排序算法执行示意图：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240122205644.png)

### 9.2 搜索算法

#### 9.2.1 顺序搜索

* 顺序搜索(线性搜索)是最基本的搜索算法
* 它的机制是，将每一个数据结构中的元素和要找的元素做比较，直到找到位置
* 是最低效的一种搜索算法
* 时间复杂度：：`O(n)`

```javascript
function sequentSearch (array, value) {
  let result = -1
  for(let index = 0; index < array.length; index++) {
    if (array[index] === value) {
      result = index
      return
    }
  }
}
```

#### 9.2.2 二分搜索

二分搜索算法要求被搜索的数据结构已排序，并遵守以下步骤：

1. 首先选择数组的中间值
2. 如果选中的值是待搜索的值，就停止搜索
3. 如果待搜索的值比选中的值要小，则返回步骤1并在选中值左边的子数组中查找
4. 如果待搜索的值比选中的值要大，则返回步骤1并在选中值的右边的子数组中查找

时间复杂度：`O(log(n))`

```javascript
function binarySearch (array, value) {
  array.sort()
  let low = 0
  let high = array.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = array[mid]
    if (value === element) {
      return true
    } else if (value < element) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return false
}

console.log(binarySearch([8, 7, 6, 5, 4, 3, 2, 1], 2))  // true
```

> BinarySearchTree类有一个search方法，和这个二分搜索完全一样，只不过前者是针对树数据结构的

二分搜索算法的搜索示意图：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123102441.png)

#### 9.2.3 内插搜索

* 内插搜索是改良版的二分搜索：二分搜索总是检查mid位置上的值，而内插搜索可能会根据要搜索的值检查数组中的不同地方
* 这个算法要求被搜索的数据结构已排序，并遵循以下步骤：
  1. 使用position公式选中一个值（与二分搜索不同之处，通过公式计算值可能在的位置）
  2. 如果这个值是待搜索值，那么算法执行完毕
  3. 如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找
  4. 如果待搜索值比选中值要大，则返回步骤1并在选种值右边的子数组中寻找
* 时间复杂度：`O(n)`

```javascript
function interpolationSearch(array, value) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;
  while (low <= high && value >= array[low] && value <= array[high]) {
    delta = (value - array[low]) / (array[high] - array[low]);
    position = low + Math.floor((high - low) * delta);
    if (array[position] === value) {
      return position;
    }
    if (array[position] < value) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return DOES_NOT_EXIST;
}
```

内插搜索算法的搜索示意图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123104854.png)

### 9.3 随机算法

#### 9.3.1 Fisher-Yates随机

* 迭代数组，从最后一位开始并将当前位置和一个随机位置进行交换
* 这个随机位置比当前位置小，可以保证随机过的位置不会再被随机一次

```javascript
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }
  return array;
}
```

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123105446.png)

## 10 算法补充

### 10.1 分而治之

分而治之算法可以分成三个部分：

1. **分解**原问题为多个子问题（原问题的多个小实例）
2. **解决**子问题，用返回解决子问题的方式的**递归**算法。递归算法的基本情形可以用来解决子问题
3. **组合**这些子问题的解决方式，得到原问题的解

实例：归并排序、快速排序、分治版二分搜索

```javascript
function binarySearchRecursive( array, value, low, high) {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];
    if (element < value) {
      return binarySearchRecursive(array, value, mid + 1, high);
    } else if (element > value) {
      return binarySearchRecursive(array, value, low, mid - 1);
    } else {
      return mid;
    }
  }
  return DOES_NOT_EXIST;
}

export function binarySearch(array, value) {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;
  return binarySearchRecursive(array, value, low, high);
}
```

#### 10.1.1 递归

* 递归是一种解决问题的方法，它解决问题的各个小部分，直到解决最初的大问题。通常涉及函数调用自身
* ECMAScript 6有尾调用优化（tail call optimization）。如果函数内最后一个操作是调用函数，会通过“跳转指令” 而不是“子程序调用”来控制
* 递归并不比普通版本更快，反倒更慢。但递归更容易理解，并且它所需的代码量更少，更容易解决问题

> ECMAScript 6中，因为尾调用优化的缘故，递归并不会更慢。但是在其他语言中，递归通常更慢

##### 斐波那契数列

斐波那契数列的定义如下：

* 1和2的斐波那契数是 1
* n（n>2）的斐波那契数是 n-1 的斐波那契数加上 n-2 的斐波那契数

```javascript
function fibonacci(num){
  if (num === 1 || num === 2){
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

### 10.2 动态规划

动态规划（dynamic programming，DP）是一种将复杂问题分解成更小的子问题来解决的优化技术

> 分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题。

用动态规划解决问题时，要遵循三个重要步骤：

1. 定义子问题
2. 实现要反复执行来解决子问题的部分（参考递归的步骤）
3. 识别并求解出基线条件

可解决的问题：

* 背包问题：给出一组项，各自有值和容量，目标是找出总值最大的项的集合，同时限制总容量必须小于等于“背包”的容量
* 最长公共子序列：找出一组序列的最长公共子序列（可由另一序列删除元素但不改变余下元素的顺序而得到）
* 矩阵链相乘：给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法（计算次数尽可能少）。相乘操作不会进行，解决方案是找到这些矩阵各自相乘的顺序
* 硬币找零：给出面额为d1…dn的一定数量的硬币和要找零的钱数，找出有多少种找零的方法
* 图的全源最短路径：对所有顶点对(u, v)，找出从顶点u到顶点v的最短路

### 10.3 贪心算法

贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择，从而达到全局的最优

### 10.4 回溯算法

* 回溯是一种渐进式寻找并构建问题解决方式的策略。
* 从一个可能的动作开始并试着用这个动作解决问题。如果不能解决，就回溯并选择另一个动作直到将问题解决。

可用回溯解决的著名问题：

* 骑士巡逻问题
* N皇后问题
* 迷宫老鼠问题
* 数独解题器

## 11 算法复杂度

### 11.1 大O表示法

* 用于描述算法的性能和复杂程度
* 将算法按照消耗的时间进行分类，依据随输入增大所需要的空间/内存

> 如何衡量算法的效率？
>
> 通常是用资源，例如CPU（时间）占用、内存占用、硬盘占用和网络占用。当讨论大O表示法时，一般考虑的是CPU（时间）占用

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123152748.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123154558.png)

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123154621.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/1705996122898.png)

### 11.2 NP完全理论

* 多项式算法：如果一个算法的复杂度为 `O(nⁱ)`，其中i(k)是常数，我们就认为这个算法是高效的
* P：对于给定的问题，如果存在多项式算法，则计为P（polynomial，多项式）
* NP：如果一个问题可以在多项式时间内验证解是否正确，则计为NP（nondeterministic polynomial，非确定性多项式）算法
* NP完全问题：如果满足以下两个条件，则称决策问题L是NP完全的：
  1. L是NP问题，也就是说，可以在多项式时间内验证解，但还没有找到多项式算法
  2. 所有的NP问题都能在多项式时间内归约为L
* NP困难问题：只需满足NP完全问题的第二个条件

P、NP、NP完全和NP困难问题的欧拉图：

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123161007.png)
