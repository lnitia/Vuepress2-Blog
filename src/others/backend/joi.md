---
icon: list
date: 2022-12-09
category:
  - nodejs
tag:
  - joi
excerpt: <p>joi与express-joi基本使用</p>
editLink: false
---
# 数据校验模块joi

## joi

[joi官方api]([https://joi.dev/api]())

Joi 是 JavaScript 对象的规则描述语言和验证器，可以帮助我们简单、直观和可读的方式来描述数据。

### 安装

`npm install joi`

### 用法

1. 引入 Joi 模块

```js
// 引入 Joi 模块
const Joi = require('joi')
```

2. 使用提供的类型和约束模式构建一个 Joi 约束模式对象。示例代码如下所示：

```js
// 定义验证规则
const schema = {
  // 约束username的类型为字符串类型。
  // Joi.string() 的返回值又是一个 Joi 对象，所以可以链式调用这个对象
  username: Joi.string().min(2).max(20) // 表示username为字符串类型最小长度为2最大长度为20
}
```

3. 通过 validate() 方法进行验证，语法结构如下所示：

`validate(value, schema)`

参数说明：

value: 表示要验证的值
schema : 表示验证架构

该方法是一个异步方法，如果校验成功则返回值为当前数据内容，否则返回一个 ValidationError 对象

示例代码如下所示：

```js
async function run() {
  try {
    // 实施验证
    let test = await Joi.validate({
      username: 'sweet'
    }, schema)
    console.log(test);
  } catch (e) {
    console.log(e);
    return;
  }
}
run()
```

调用 Joi.validate() 方法进行数据校验，如果验证成功则返回其数据内容，验证失败则进入 catch 语句。

### 验证规则

对一个字段的基本验证规则是：`类型 / 长度范围 / 取值范围 / 是否必填 / 与其它字段的关系 / 默认值 / 错误处理`

#### Joi 中的类型

在 Joi 中 any() 表示任意类型，指定类型如下所示：
array()	数组类型
boolean()	布尔类型
binary()	缓冲区数据类型
func()	函数类型
number()	数字类型
object()	对象类型
string()	字符串类型

#### 长度范围

规定长度范围的验证规则是 max() 和 min()。如果在数组中，这个长度就表示数组的长度，字符串中则表示字符串中的长度，数字则表示数字的大小。

示例代码如下所示：

```js
const s = {
  // 数组的最小长度为2， 最大长度为10
  arr: Joi.array().min(2).max(10),
  // 字符串的最小长度为2， 最大长度为10
  str: Joi.string().min(2).max(10),
  // 数字值的最小值是10，最大值是100
  num: Joi.number().min(10).max(100)
}
```

#### 取值范围

规定取值范围的是 valid() 表示必须在这个取值范围内，而 invaild() 则表示不能在这个取值范围内。示例代码如下所示：

```js
const s = {
  // 必须是数字1或者数字2否则抛出异常
  num1: Joi.any().valid(1, 2),
  // 不能是数字1或者数字2，否则抛出异常
  num2: Joi.any().invalid(1, 2)
}
```

#### 是否必填

required() 方法表示此选项为必填项。示例代码如下所示：

```js
const schema = Joi.any().required();
```

#### 与其它字段的关系

when() 用于灵活的转变类型，语法结构如下所示：

`any.when(condition, options)`

参数说明

condition： 表示键名称
options 具有三个参数
is: 所需的条件 joi 类型。
then: 如果条件为 true，则为备用架构类型。
otherwise: 如果条件为 false，则为备用架构类型。

示例代码如下所示：

```js
const Joi = require('joi')
// 定义验证规则
const s = {
  // 如果传入的数据 是 数字, 大，则数字必须是50-100，如果是 数字 小则数字必须是 0-50 之间
  num: Joi.number().min(0).max(100).when('size', {
    is: '大',
    then: Joi.number().min(50).max(100),
    otherwise: Joi.number().min(0).max(50)
  }),
  size: Joi.any().valid('大', '小')
}async function run() {
  try {
    // 实施验证
    let test = await Joi.validate({
      num: 80,
      size: '大'
    }, s)
    console.log(test);
  } catch (e) {
    console.log(e);
    return;
  }
}
run()
```

执行结构如下：

`{ num: 80, size: '大' }`

如果将大改为小则会抛出异常。

#### 默认值

在 Joi 中定义默认值使用 default() ，如果数据中存在 undefined 则校验之后会变成设置的默认值，这个值仅仅对 undefined 有效，对 null 没有效果

校对规则如下所示：

```js
async function run() {
  try {
    // 实施验证
    let test = await Joi.validate(undefined, Joi.string().default("没有值"))
    console.log(test);
  } catch (e) {
    console.log(e);
    return;
  }
}
run()
```

执行结果为 ：没有值

#### 错误处理

通过 error(err) 方法来自定义一个错误来覆盖 Joi 的错误

示例代码如下所示：

```js
async function run() {
  try {
    // 实施验证
    let test = await Joi.validate(null, Joi.string().default("没有值").error(new Error('传入的值为 null ')))
    console.log(test);
  } catch (e) {
    console.log(e.message);
    return;
  }
}
run()
```

执行结果为：传入的值为 null

## express-joi

用于验证表单数据的中间件

### 安装

`npm i@escook/express-joi`

### 用法

1. 引入

```js
// 导入验证中间件express-joi
const expressJoi = require('@escook/express-joi');
```

2. joi定义验证规则
3. 将验证模块注册为局部中间件

```js
server.post('/login', expressjoi(schema.reg_login_schema), (req, res) => {
  res.send({
    status: 0,
    message: 'ok'
  });
);
```
