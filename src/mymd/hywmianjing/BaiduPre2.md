---
icon: list
date: 2024-07-18
category:
  - 面经
order: 3
excerpt: <p>百度二面</p>
editLink: false
article: false
---
# 百度二面

## 1. 为什么选择前端

## 2. 讲讲你的毕业设计

## 3. 本硕专业和编程有什么关系

## 4. 怎么学的前端

## 5. 看过什么书

## 6. 研究方向主要研究啥

## 7. 手撕：两数组合并排序，复杂度n

计数排序

```js
function countSort(arr) {
  // 计算出原始数组的最大最小值
  let max = arr[0]
  let min = arr[0]
  const len = arr.length
  for(let i = 0; i< len; i++) {
    if(arr[i] > max) {
      max = arr[i]
    }
    if(arr[i] < min) {
      min = arr[i]
    }
  }
  // 计算计数数组的容量
  const countLen = max - min + 1
  let countArr = new Array(countLen).fill(0)  // 创建计数数组，并设置所有数的计数初始值为0
  
  // 遍历初始数组，给对应下标(arr[j] - min)计数加1
  for(let j = 0; j < len; j++ ) {
    countArr[arr[j] - min]++;
  }

  // 结果队列
  let res = []
  // 遍历结果队列的指针
  let resIndex = 0
  for(let k = 0; k < countLen; k++) {
    // 如果某数计数大于0，就循环取出值
    while(countArr[k] > 0) {
      // 将此数放入结果队列中
      res[resIndex] = k + min
      // 队列指针右移
      resIndex++;
      // 计数减1
      countArr[k]--;
    }
  }
  return res
}
//  使用console.time()和console.timeEnd()这一句语句，会输出中间程序执行的运行时间
console.time()
const arr = [544,522,522,533,511,522,551,552,553,510,557,555]
let res = countSort(arr)
console.log('res:', res); // [ 510, 511, 522, 522, 522, 533, 544, 551, 552, 553, 555, 557 ]
console.timeEnd()  // default: 4.135ms
```

桶排序

```js
function bucketSort(arr){
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let bucketNum = parseInt((max - min) / arr.length) + 1;

    let bucketArr = new Array(bucketNum);
    for(var i=0;i<bucketNum;i++){
        bucketArr[i] = new Array();
    }

    for(var i of arr){
        let num = parseInt((i-min) / arr.length);
        bucketArr[num].push(i);
    }
    for(var i of bucketArr){
        i.sort();
    }
    let k = 0;
    for(var i=0;i<bucketArr.length;i++){
        for(var j=0;j<bucketArr[i].length;j++){
            arr[k++] = bucketArr[i][j];
        }
    }
}


let arr = [1,20,31,58,46,5,6,7,21,32,44,59];
bucketSort(arr);
console.log(arr);
```

## 8. 熟悉的数据结构

## 9. 数组用什么数据结构存储

**数据结构的存储⽅式只有两种：数组（顺序存储）和链表（链式存储）**

[数据结构之存储方式 (zhihu.com)](https://www.zhihu.com/tardis/zm/art/242509740?source_id=1005)

## 10. 项目里遇到的难点

## 11. canvas和svg和应用

1. canvas基于位图，依赖分辨率；svg基于矢量，不依赖分辨率
2. canvas由js绘制，svg由html标签绘制
3. canvas不支持事件处理，绘制后无法改变；svg支持，可通过获取html标签进行操作
4. canvas支持的颜色比svg多
5. canvas适用于大型游戏，场景变化多的；svg适合于需要放大缩小的，如地图

## 12. 怎么用canvas实现矢量图

1. 在canvas中通过绘制路径path方式使用矢量图（api绘制各个形状的路径+填充颜色）
2. 使用svg矢量图作为canvas图像素材

## 13. react和vue的相同与不同

相同：1. 都是声明式编码；2. 都是组件式开发； 3. 都有生命周期函数； 4. 都是基于虚拟dom和diff算法； 5. 支持组件间通讯

不同：1. react单向数据流，vue双向绑定；2. 响应式原理不同；3. diff算法不同； 4. 写法不同，vue为template格式，react为jsx格式；

## 14. 编程习惯更喜欢用哪个，为什么

1. vue3>vue2：组合式api让代码更加集中；响应式原理更加健壮（捕捉到对象的属性访问和修改操作）；性能优化（diff算法）
2. 函数react>类react：代码更加集中，增加的hook更加方便，router6之后官方推荐
3. react>vue：vue封装很多api，指令，react相对更原生点，对js要求高，但是也更加灵活

## 15. react出现代码逻辑分离怎么办

1. 采用高阶函数或者render props进行公共逻辑抽离
2. 采用函数组件而不是类组件

## 17. 自定义hook和自定义函数的区别

1. 自定义hook里可以使用hook，比如useState等，普通自定义函数不能
2. 命名规范，自定义hook是useXXX，而普通函数没有限制
3. 提取公共逻辑，代码复用，逻辑复用
