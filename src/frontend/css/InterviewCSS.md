---
icon: css3
date: 2024-03-04
category:
  - 前端
  - css
tag:
  - 基础
order: 2
excerpt: <p>css常见问题汇总</p>
editLink: false
---
# CSS常见问题汇总

## 1. 如何快速上下左右居中div

1. 父元素display:flex; div元素margin:0, auto;
2. 父元素display:flex; justify-content:center;align-items:center;
3. 相对定位和绝对定位结合
4. 子元素position：relative；transform：translateY（-50%）
5. 补充设置单行行内垂直居中：父组件的line-height设置为height一个值

## 2. padding和margin区别

padding为内边距，作用于元素内部，margin为外边距，作用于元素外部

## 3.  rem、em、px、vh、vw、百分比、vm的区别

**px**：绝对单位，页面按精确像素展示

**em**：相对单位，**当前对象内文本的字体尺寸**（当前div字体12px，div高度2em=24px），若当前元素未设置字体大小，则会**继承**父元素字体尺寸，如当前父元素的字体尺寸未设置，则相对于浏览器的默认字体尺寸（1em=16px）。整个页面内 `1em`不是一个固定的值。

如

```css
html{
    font-size: 1.5em; /* font-size：1.5*16=24px */
}
/* 其他元素，，继承，相对于父元素或root元素 */
.test{
    width: 10rem; // 10*24px
    height: 10rem;
    background-color: #ff7d42;
}
```

**rem**：相对单位，可理解为 `root em`, **相对根节点 `html`** 的字体大小来计算

**vh、vw**：相对于**设备视口**，主要用于页面视口大小布局，在页面布局上更加方便简单

**百分比**：相对于元素的**父元素**，具有继承性

**vm**：相对于视口的宽度或高度中较小的那个

## 4. 内联元素span和块级元素div的区别

**内联元素**：span em q label strong a input

**块级元素**：div p img section form nav ul li

**空元素**：br hr link meta

- 内联元素不独占一行，只占用自身需要的空间(**内联元素的高度是由行高决定的**)，不能修改其高度、宽度、上下边距
- 块级元素独占一行，大小可设置，未设置宽度默认为父元素宽度

所以，span元素宽度取决于内容宽度，设置其宽度无效，div元素默认占满一行

## 5.如何让浏览器支持小于12px的字体

css中设置字体

```css
  transform：scale(0.5);
 -webkit-transform:(0.5)
```

进行整体缩放

**扩展transform**

transform(scale, translate, rotate, skew) => 缩放 位移 旋转 倾斜

## 6. BFC（块级格式化上下文）

现象：**父盒子没有设置高度，其子盒子设置为浮动时，父盒子无法撑起自身，即父盒子高度为0，该父盒子没有形成BFC**

定义：BFC指一个独立的块级渲染区域，该区域有一套渲染规则来约束块级盒子的布局，且与区域外部无关。即BFC就是页面上的一个隔离的独立容器，因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。

父盒子形成BFC方法：

1. float值不为none；
2. position值为absolute、fixed；
3. display值为inline-block、table-cell、flex；
4. overflow值为hidden（最好的方法）

BFC其他作用：

1. **防止margin塌陷**

   在垂直方向：

   1. **两同级盒子**，一个margin-bottom:20px，一个margin-top:100px,实际俩个盒子间距为100px；解决方法：只对其中一个盒子设置margin。
   2. **两父子盒子**，子盒子margin-top:100px，实际父子盒子上边距都变成100px，两者之间上边重合，解决方法：父盒子设置overflow:hidden
2. **阻止元素被浮动元素覆盖**

   在元素上加overflow:hidden。应用：两栏布局

## 7. 盒子模型

标准盒子和ie盒子：content、padding、border、margin

区别：盒子的height和width，ie（怪异）盒子指的是height=content+padding+border，w3c（标准）盒子值content。在 CSS3 中引入了 box-sizing 属性，box-sizing:content;表示标准的盒子模型， box-sizing:border表示的是 IE 盒子模型

## 8. 画0.5px的线

浏览器不能直接渲染.5px

**transform：scale()**

```css
.scale-half {
    height: 1px;
    transform: scaleY(0.5);
    transform-origin: 50% 100%; /*为了防止线模糊*/
}
```

**border-image**

**meta viewport**

## 9. css3动画

CSS3动画效果包括三个部分：变形（transform）、过渡（transition）、动画（animation）

### 9.1 transition

**transition**

transition{ **transition-property  transition-duration  transition-timing-function  transition-delay**}

触发方式：:hover : focus :checked :active 类触发class

```css
/*鼠标滑入滑出都有过度效果*/
#box1 {
    height: 100px;       
    width: 100px;
    background: green;        
    transition: background 2s ease,transform 2s ease-in 1s;
}
#box1:hover{
    transform:rotate(180deg) scale(.5,.5);
    background:red;
}
```

```css
/*鼠标滑入有过渡，滑出没有，直接变*/
#box2 {
    height: 100px;       
    width: 100px;      
    background: green;    
}  
#box2:hover{
    transform:rotate(180deg) scale(.5,.5);
    background:red;
    transition: background 2s ease,transform 2s ease-in 1s;
}
```

### 9.2 **animation**

 animation属性结合@ keyframes使用， animation中的animation-name需要设置成@ keyframes的name一致。

```css
.box{
    height:100px;
    width:100px;
    border:15px solid black;
    animation: changebox 10s ease-in-out 3 alternate paused;
}
.box:hover{
    animation-play-state: running;
}
@keyframes changebox {
    10% {  background:red;  }
    50% {  width:80px;  }
    70% {  border:15px solid yellow;  }
    100% {  width:180px;  height:180px;  }
}
```

区别：transition设置两帧，即to和from；animation可设置多帧，按照百分比设置。transition需要事件触发，animation不需要。

### 9.3 transform

transform只是展现了一个结果.

- translate(x,y)、translateX(x)、translateY(y)、translateZ(z)、translate3d(x,y,z) 定义位置的移动距离
- scale(x,y)、scaleX(x)、scaleY(y)、scaleZ(z)、scale3d(x,yz) 定义元素的缩放比例
- rotate(angle)、rotateX(angle)、rotateY(angle)、rotateZ(angle)、rotate3d(x,y,z,angle) 定义元素的旋转度
- skew(x-angle,y-angle)、skewX(angle)、skewY(angle) 定义元素的倾斜度

### 9.1 transition回流

对于需要动画效果的元素，可以将其创建为单独图层，比如**使用绝对定位**，当它发生改变，不会引起其他元素的频繁回流。

**css3的一些属性**不会，因为 GPU 进程会为其开启一个新的复合图层，不会影响默认复合图层（就是普通文档流），所以并不会影响周边的 DOM 结构，而属性的改变也会交给 GPU 处理，不会进行重排。使 GPU 进程开启一个新的复合图层的方式还有 3D 动画，过渡动画，以及 opacity 属性（不透明度），还有一些标签，这些都可以创建新的复合图层。这些方式叫做硬件加速方式。

## 10. flex盒子

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 Flex 布局。设为 Flex 布局以后的盒子（容器），子元素（项目）的 `float`、`clear`和 `vertical-align`属性将失效。

容器的属性

```css
flex-direction: row | row-reverse | column | column-reverse; /*主轴的方向，即项目的排列方向*/
flex-wrap: nowrap | wrap | wrap-reverse; /*轴线方向放不下后是否换行*/
flex-flow: <flex-direction> || <flex-wrap>; /*上面两个的简写*/
justify-content: flex-start | flex-end | center | space-between | space-around; /*项目在主轴上的对齐方式*/
align-items: flex-start | flex-end | center | baseline | stretch; /*项目在交叉轴上的对齐方式*/
align-content: flex-start | flex-end | center | space-between | space-around | stretch; /*多条轴线的对齐方式*/
```

项目的属性

```css
order: <integer>; /*定义项目的排列顺序，数值越小越在前*/
flex-grow: <number>; /* 项目的放大比例，default 0 ，所以都是0，有剩余也不填满*/
flex-shrink: <number>; /* 项目的缩小比例，default 1 ，若所有都是1，等比缩小*/
flex-basis: <length> | auto; /* 计算主轴是否有多余空间，default auto 即项目的本来大小*/
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] /*none：0 0 auto，auto：1 1 auto*/
align-self: auto | flex-start | flex-end | center | baseline | stretch; /*允许单个项目有不同的对齐方式，覆盖容器的align-items*/
```

## 11. visibility：hidden、opacity=0、display：none区别

visibility：hidden可将其元素隐藏起来，但并不改变页面布局，其上的点击事件失效；

opacity=0可将其元素隐藏起来，但并不改变页面布局，其上的点击事件不失效，仍能触发；

display：none将元素从页面中删除，会改变其页面布局，点击事件失效；

## 12. position

固定定位 fixed： 元素的位置**相对于浏览器窗口**是固定位置，即使窗口是滚动的它也不会移动。Fixed 定位的元素和其他元素重叠。

相对定位 relative： 如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直 或水平位置，让这个元素**“相对于”它的起点**进行移动。 在使用相对定位时，无论是否进行移动，元素仍然占据原来的空间。因此，移动元素会导致它覆盖其它框。

绝对定位 absolute： 绝对定位的元素的位置**相对于最近的已定位父元素**（非static），如果元素没有已定位的父元素，那 么它的位置相对于html标签。absolute 定位使元素的位置与文档流无关，因此不占据空间。 absolute 定位的元素和其他元素重叠。

粘性定位 sticky：元素先按照普通文档流定位，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。而后，元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

默认定位 Static： 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声 明）。 inherit: 规定应该从父元素继承 position 属性的值。

## 13. 清除浮动

浮动布局：当元素浮动以后可以向左或向右移动，直到它的外边缘碰到包含它的框或者另外一 个浮动元素的边框为止。**元素浮动以后会脱离正常的文档流**，所以文档的普通流中的框就变现的好 像浮动元素不存在一样。

浮动元素一旦脱离了文档流，就无法撑起父元素，会造成父级元素高度塌陷。

当容器的高度为auto，且容器的内容中有浮动（float: left/right）的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的CSS处理，就叫CSS清除浮动。

方式一：利用 clear 属性，包括在浮动元素末尾添加一个带有 clear: both 属性的空 div 来闭合元素，其实利用 :after 伪元素的方法也是在元素末尾添加一个内容为一个点并带有 clear: both 属性的元素实现的。

```css
.news img {
  float: left;
  }
.news p {
  float: right;
  }

.clearfix:after{  /*类后面加一个伪元素*/
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }
.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }

<div class="news clearfix">
<img src="news-pic.jpg" />
<p>some text</p>
</div>
```

方式二：触发浮动元素父元素的 BFC (块级格式化上下文)，使到该父元素可以包含浮动元素

```css
.news {
  background-color: gray;
  border: solid 1px black;
  overflow: hidden; /*形成BFC*/
  *zoom: 1;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
</div>
```

## 14. 选择器

id选择器#、class选择器.、标签选择器a、伪元素选择器::、伪类选择器:、属性选择器a[..]

**优先级：**

同一类型选择器：排在后面优先级越高

不同类型选择器：id > class > 标签

样式来源不同：内联样式> 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式

!important优先级最高

### 14.1 伪元素选择器

往标记文本中加入全新的 HTML 元素一样，为双冒号：：

- ::after：匹配出现在原有元素的实际内容之后的一个可样式化元素。
- ::before：匹配出现在原有元素的实际内容之前的一个可样式化元素。
- ::first-letter：匹配元素的第一个字母。
- ::first-line：选中第一行
- ::selection：匹配文档中被选择的那部分。
- ::placeholder：自定义占位文本（input里面的提示文字）的样式

### 14.2 伪类选择器

用于选择处于特定状态的元素，为单冒号：

- :checked：匹配处于选中状态的单选或者复选框
- :focus：匹配处于选中状态的单选或者复选框
- :hover：鼠标悬浮到一个元素之上的时候匹配
- :active：在用户激活（例如点击）元素的时候匹配
- :last-child：**兄弟元素**中最末的那个元素
- :last-of-type：**兄弟元素**中最后一个某种类型的元素
- :link：匹配**未曾访问**的链接
- :nth-child：兄弟元素中的元素
- :visited：已访问链接

link与visit的位置是随意的。但hover，focus，active则必须按照**focus–hover–active**这个顺序

### 14.3 属性选择器

基于一个元素自身是否存在某属性来匹配

a[class]：匹配所有a标签有class的元素

a[href="...."]：匹配所有a标签中，href为..的元素

## 15. 禁止文本内容溢出

```css
white-space:nowrap;/*禁止空格、换行符等换行,为text-overflow作准备*/
overflow:hidden; /*禁止文本溢出显示,为text-overflow作准备*/
text-overflow:ellipsis;/*文本溢出时显示省略标记（...）*/
```

## 16. 三栏布局

[布局：三栏布局（7种方法）_Ying（英子）的博客-CSDN博客](https://blog.csdn.net/ganyingxie123456/article/details/77054124)

绝对定位布局：两边position: absolute+中间margin

浮动布局：两边float: left/right+中间margin

flex布局：容器display: flex，中间flex=1

table布局：容器display: table、三栏display: table-cell

grid布局：grid-template-columns：100px auto 200px

[CSS之圣杯布局与双飞翼布局 - 掘金 (juejin.cn)](https://juejin.cn/post/6973562604581027853)

圣杯布局：容器float:left+positions:relative+左右margin-left+中间padding留左右位置

双飞翼布局：容器float:left+左右margin-left+中间padding撑开内容

## 17. z-index

设置元素的堆叠顺序。

1）只有position为relative/absolute/fixed的元素，z-index属性才起作用。注意，是该元素本身。

2）z-index遵循从父原则，即如果父元素和子元素同时设置了z-index,以父元素的z-index为准。

3）有负有正，值越大，越在上

## 18. display

| 值                     | 描述                                                                  |
| :--------------------- | :-------------------------------------------------------------------- |
| **none**         | 此元素不会被显示。                                                    |
| **block**        | 此元素将显示为块级元素，此元素前后会带有换行符。                      |
| **inline**       | 默认。此元素会被显示为内联元素，元素前后没有换行符。                  |
| **inline-block** | 行内块元素。（CSS2.1 新增的值）                                       |
| list-item              | 此元素会作为列表显示。                                                |
| run-in                 | 此元素会根据上下文作为块级元素或内联元素显示。                        |
| compact                | CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。      |
| marker                 | CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。       |
| **table**        | 此元素会作为块级表格来显示（类似 ` <table>`），表格前后带有换行符。 |
| inline-table           | 此元素会作为内联表格来显示（类似 `<table>`），表格前后没有换行符。  |
| table-row-group        | 此元素会作为一个或多个行的分组来显示（类似 ` <tbody>`）。           |
| table-header-group     | 此元素会作为一个或多个行的分组来显示（类似 `<thead>`）。            |
| table-footer-group     | 此元素会作为一个或多个行的分组来显示（类似 `<tfoot>`）。            |
| table-row              | 此元素会作为一个表格行显示（类似 `<tr>`）。                         |
| table-column-group     | 此元素会作为一个或多个列的分组来显示（类似 `<colgroup>`）。         |
| table-column           | 此元素会作为一个单元格列显示（类似 ` <col>`）                       |
| **table-cell**   | 此元素会作为一个表格单元格显示（类似 `<td> `和 ` <th>`）          |
| table-caption          | 此元素会作为一个表格标题显示（类似 `<caption>`）                    |
| **inherit**      | 规定应该从父元素继承 display 属性的值。                               |

**block、inline、inline-block的区别：**

block：将元素以块级元素显示，即独占一行，可设置宽高；

inline：将元素以内联元素显示，宽度由内容决定，不换行，不可设置宽高；

inline-block：元素以内联元素显示，元素里的内容以块级元素显示，不换行，可设置宽高。两个inline-block如果中间有空格、换行符，会显示。解决方案第一个结尾标签和第二个头标签放在一排

## 19. overflow

规定当内容溢出元素框时发生的事情。

| visible | 默认值。内容不会被修剪，会呈现在元素框之外。             |
| ------- | -------------------------------------------------------- |
| hidden  | 内容会被修剪，并且被裁剪内容是不可见的。                 |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
| auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |
| inherit | 规定应该从父元素继承 overflow 属性的值。                 |

## 20. box-sizing

box-sizing：content-box =>  标准盒子

box-sizing：border-box =>怪异盒子

## 21. css预处理器

**scss/sass预处理器（嵌套、变量等）、less预处理器（嵌套、变量等）、Stylus预处理器**

**1.scss:**

**定义变量**：$temp=200px

**运算**：加减乘除

**嵌套**：选择器嵌套、属性嵌套

&代替父元素

```scss
.container {
   & > p {   //可以编译成CSS的 .container>p {} 效果
      color : purple ;
   }
}
```

**继承**：@extend .className

```scss
.container {
   color : purple ;
   border : 2px dashed purple ;
}
.myText {
   @extend .container; //这里将继承.container类的所有样式
   font-size : 22px ;
}
```

**混用**：@mixin定义，@include使用（可传参）

```scss
@mixin normalStyle {
   //使用@mixin命令定义可重复使用的代码块
   width : 300px ;
   height : 100px ;
   color : black ;
   background-color : lightblue ;
}
.container {
   @include normalStyle ;
   //使用@include 命令引用@mixin定义的代码块
}
```

高级：@if、@else、@for、@while、@each、@function（自定义函数）

**2.Less：**

 声明变量用 @ 开头

没有条件、循环语句

**3.Stylus：**

与scss相似但更简洁，可省略大括号和分号

## 22. css选择符

A>B表示的是选择A元素里的所以**第一代**B子元素

A~B表示的是选择A元素之后的所有B元素（A、B在同一父元素里）

A+B表示的是选择A元素紧邻其后的B元素（A、B在同一父元素里）

A B表示的是选择A元素里的所有B子元素

A，B表示的是A和B元素同用后面{}的设置

## 23. 响应式布局

**1.百分比布局**：通过对属性设置百分比来适应不同的屏幕

**font-size为62.5%：** 主流浏览器的font-size默认值为16px,此时1rem=16px。如果此时将rem与px进行换算很麻烦 => 1rem=10px => 10/16

**2.rem布局**：相对于根元素的字体大小的单位

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title> %和rem 布局</title>
    <style>
      html {
        font-size: 30px;
      }
      .box2 {
        width: 10rem;
        height: 10rem;
        background-color: plum;
      }
      .box {
        width: 80%;
        height: 200px;
        background-color: aquamarine;
      }
      .part {
        width: 80%;
        height: 80%;
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="part"></div>
    </div>
    <div class="box2"></div>
  </body>
</html>
```

**3.媒体查询@media screen**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@media screen</title>
    <style>
      .box {
        width: 10rem;
        height: 10rem;
        background-color: pink;
        margin-left: 20rem;
      }
      @media screen and (min-width: 1200px) {
        html {
          font-size: 20px;
        }
      }
      @media screen and (max-width: 1200px) {
        html {
          font-size: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

**4.flex弹性布局**

使用display：flex使盒子模型变为弹性盒子，使用弹性盒子可以很轻松的**创建自适应浏览器窗口的流动布局或自适应字体大小的弹性布局**。

**5.vw和vh布局**：将页面分为 100 份，1vw = device-width/100

**meta标签viewport：**`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

代码复制

其中，content 参数有以下几种：

- width viewport ：宽度(数值/device-width)
- height viewport ：高度(数值/device-height)
- initial-scale ：初始缩放比例
- maximum-scale ：最大缩放比例
- minimum-scale ：最小缩放比例
- user-scalable ：是否允许用户缩放(yes/no）

**补充：与响应式布局相对的还有：**

**流式布局：**页面元素的**宽度**按照屏幕分辨率进行适配调整，但整体布局不变。使用**%百分比定义宽度**，**高度都是用px**来固定住，可以根据可视区域 (viewport) 和父元素的实时尺寸进行调整，尽可能的适应各种分辨率。往往配合 **max-width/min-width** 等属性控制尺寸流动范围以免过大或者过小影响阅读。

**自适应布局：** 分别为不同的屏幕分辨率定义布局，即创建多个静态布局，每个静态布局对应一个屏幕分辨率范围。使用 @media 媒体查询给不同尺寸和介质的设备切换不同的样式。

**静态布局：** 所有元素的尺寸一律使用px作为单位。

## 24. css hack

不同厂商的浏览器，对CSS的解析和认识不完全一样，因此会导致生成的页面效果不一样

CSS Hack的目的，就是使你的CSS代码兼容不同的浏览器。当然，我们也可以反过来利用CSS Hack为不同版本的浏览器定制编写不同的CSS效果。

## 25. css3新特性

### 25.1 css3文本属性

- text-shadow：2px 2px 8px #000; （向右的偏移量，向左的偏移量，渐变的像素，渐变的颜⾊）
- text-overflow：规定当⽂本溢出包含元素时发⽣的事情，text-overflow:ellipsis(省略号)
- text-wrap：规定⽂本换⾏的规则
- word-break：规定⾮中⽇韩⽂本的换⾏规则
- word-wrap：对⻓的不可分割的单词进⾏分割并换⾏到下⼀⾏
- white-space：规定如何处理元素中的空⽩，white-space:nowrap 规定段落中的⽂本不进⾏换⾏

### 25.2 css3边框属性

- border-raduis：边框的圆⻆
- border-image：边框图⽚
- box-shadow: 盒子阴影

### 25.3 css3背景属性

- rgba
- backgrounnd-size:cover/contain ，其中background-size：cover，会使“最⼤”边进⾏缩放，另⼀边同⽐缩放，铺满容器，超出部分会溢出。background-size:contain，会使“最⼩”边 进⾏缩放，另⼀边同⽐缩放，不⼀定铺满容器，会完整显示图⽚

### 25.4 **渐变**

- linear-gradient
- radial-gradient

### 25.5 **多列布局**

- column-count
- column-width
- column-gap
- column-rule

### 25.6 **过渡**

- transition
- transition-property:width //property为定义过渡的css属性列表，列表以逗号分隔
- transition-duration:2s; //过渡持续的时间
- transition-timing-function:ease;
- transition-delay:5s //过渡延迟5s进⾏

### 25.7 **动画旋转**

- animation
- transform ：translate（x,y) rotate(deg) scale(x,y)
- translate
- scale
- rotate
- skew（倾斜）

**flex布局**

**@media查询**

## 26. 设备分辨率dpr

**显示设备的*物理像素*分辨率与*CSS 像素*分辨率之比。它告诉浏览器应使用多少屏幕实际像素来绘制单个 CSS 像素。window.devicePixelRatio**，当 `dpr`为3，那么 `1px`的 `CSS`像素宽度对应 `3px`的物理像素的宽度，1px的 `CSS`像素高度对应 `3px`的物理像素高度。

css像素：px

设备像素：显示最小物理单位，pt

设备独立像素：虚拟像素单位，调节屏幕分辨率后

## 27. padding和margin百分比

不管是水平还是垂直的padding和margin都是由父辈的content宽度来决定。

- 如果子元素position 属性为 static 、 relative 或 sticky，包含块就是该元素最近的祖先块级元素的 content 决定
- 如果子元素 position 属性为 absolute、fixed，包含块还要额外算上 padding，即 content + padding。

## 28. div高度为宽度一半

1. 子 padding-bottom：50%；父 height：0
2. 子 width: calc(100vw - 20px);  height: calc(50vw - 10px)
