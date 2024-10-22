---
icon: list
date: 2024-01-06
category:
  - nodejs
tag:
  - 基础
excerpt: <p>nodejs基础知识</p>
editLink: false
---
# Node.js基础

## 0. node作用

- 大部分情况，node作为中间层连接前后端（`node层`可以向 `server`层获取数据,再通过对数据的计算整合转换成符合前端 `UI`要求的数据格式）
- 快速小型项目可以用其来搭建后端
- js可以在node服务器上运行，跳出浏览器
- 构建客户端electron
- 前端工程化webpack
- 与Java相比，Nodejs的性能较低，但轻量级，可用于维护轻量级任务

## 1. 创建服务器

```js
var http = require("http");

http.createServer(function(req,res){
    res.writeHead(200, {'Content-type':'text/plain'});

    res.end('hello, new day!\n');
}).listen(8888);

console.log("http://127.0.0.1:8888/")
```

## 2. 读取文件

### 2.1 阻塞读取

```js
var fs = require('fs');

var context = fs.readFileSync('file.txt');

console.log(context.toString());
console.log('读取结束')
```

### 2.2 非阻塞读取

```js
var fs = require("fs");

//在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。
fs.readFile('file.txt',function(err,data){
    if(err) {
        console.error(err);
        return
        }
        console.log(data.toString());
});
console.log('jieshu')

// 实例我们不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能。

// 因此，阻塞是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内.
```

## 3. 事件驱动模型

Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

**当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。**

这个模型非常高效可扩展性非常强，**因为 webserver 一直接受请求而不等待任何读写操作。**（这也称之为非阻塞式IO或者事件驱动IO）

在事件驱动模型中，会**生成一个主循环来监听事件**，当检测到事件时触发回调函数。

```js
//引入events模块
var events = require('events');
//new eventEmitter实例
var eventEmitter = new events.EventEmitter();

//定义连接事件
var connectHandler = function connection(){
    console.log('connection success')
    //触发数据接收事件
    eventEmitter.emit('data_received')
}

//注册连接事件监听
eventEmitter.on('connection', connectHandler);
//注册数据接收事件监听+定义
eventEmitter.on('data_received', function (){
    console.log('data_receive finished')
})

//触发连接事件
eventEmitter.emit('connection')

console.log('all finished')

// 1.引入 events模块 var events = require('events')，eventEmitter = new events.EventEmitter()
// 2.定义事件 var xxx = function(){}
// 3.绑定事件 eventEmitter.on('事件别名', xxx)
// 4.执行事件 eventEmitter.emit('事件别名')
```

### 3.1 EventEmitter

对于每个事件，EventEmitter 支持 若干个事件监听器。当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

```js
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
```

## 4. Buffer

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，**定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。**

原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

```js
const buf = Buffer.from("runoob", "ascii"); //创建Buffer对象
console.log(buf.toString("hex")); // 输出 72756e6f6f62
console.log(buf.toString("base64")); // 输出 cnVub29i
```

## 5. Stream

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

Stream 有四种流类型：

- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。

```js
//1. 从流中读取数据
var fs = require('fs');
var data = '';

var readerStream = fs.createReadStream('file.txt'); //创建可读流
readerStream.setEncoding('utf8'); //设置编码
//处理流事件---data end error
readerStream.on('data', function(chunk){
    data += chunk;
})
readerStream.on('end', function(){
    console.log(data)
})
readerStream.on('error', function(err){
    console.log(err.stack)
})
console.log('finish')

//2. 写入流
var fs = require('fs');
var data2 = '写入数据';

var writeStream = fs.createWriteStream('output.txt'); //创建写入流
writeStream.write(data2, 'utf8'); //将data2用utf8编码写入
writeStream.end(); //标记文件末尾

// 处理流事件--finish error
writeStream.on('finish', function(){
    console.log("finished")
})

writeStream.on('error', function(err){
    console.log(err.stack)
})

console.log('jieshu ')

//3. 管道流：从一个流中获取数据并将数据传递到另外一个流中
var fs = require('fs');

var readerStream1 = fs.createReadStream('file.txt');
var writeStream1 = fs.createWriteStream('output1.txt'); 
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream1.pipe(writeStream1);
console.log('finished')

// 4. 链式流：通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作

// 用管道和链式来压缩文件:
var fs = require("fs");
var zlib = require('zlib');
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
console.log("文件压缩完成。");

//解压文件
var fs = require("fs");
var zlib = require('zlib');
// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");
```

## 6. moduleSystem

```js
// 导出和引入模块
// 接下来我们就来创建 hello.js 文件，代码如下：

//1. 在以上示例中，hello.js 通过 exports 对象把 world 作为模块的访问接口，
//   在 main.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问 hello.js 中 exports 对象的成员函数了。

// 导出
// exports.world = function() {
//   console.log('Hello World');
// }
// exports.x = '123';

// 引入
// var hello = require('./hello');
// hello.world();
// hello.x;
```

## 7. router

```js
var http = require("http");
var url = require("url");
 
function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
 
    route(pathname);
 
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
 
exports.start = start;
```

## 8. global全局对象

### 8.1  _filename

当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径

```js
console.log( __filename ); //C:\Users\14495\Desktop\node\10_globalObject\globalObject.js
```

### 8.2 _dirname

表示当前执行脚本所在的目录。

```js
console.log( __dirname ); //C:\Users\14495\Desktop\node\10_globalObject
```

### 8.3 process

用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。

```js
// 输出到终端
process.stdout.write("Hello World!" + "\n"); //Hello World!

// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
}); //argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。

// 获取执行路径
console.log(process.execPath); //C:\Program Files\nodejs\node.exe

// 平台信息
console.log(process.platform); //win32

// 输出当前目录 
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());
```

## 9. util

提供常用函数的集合，用于弥补核心 JavaScript 的功能 过于精简的不足。

1. util.callbackify：相当于await
2. util.inherits：继承
3. util.inspect：将任意对象转换为字符串的方法
4. util.isArray(object)
5. util.isRegExp(object)
6. util.isDate(object)

### 9.1 os模块

```js
var os = require("os");
// CPU 的字节序
console.log('endianness : ' + os.endianness());
// 操作系统名
console.log('type : ' + os.type());
// 操作系统名
console.log('platform : ' + os.platform());
// 系统内存总量
console.log('total memory : ' + os.totalmem() + " bytes.");
// 操作系统空闲内存量
console.log('free memory : ' + os.freemem() + " bytes.");
```

### 9.2 Path 模块

```js
var path = require("path");
// 格式化路径
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));
// 连接路径
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
// 转换为绝对路径
console.log('resolve : ' + path.resolve('main.js'));
// 路径中文件的后缀名
console.log('ext name : ' + path.extname('main.js'));
```

### 9.3 net模块

```js
// server.js
var net = require('net');
var server = net.createServer(function(connection) { 
   console.log('client connected');
   connection.on('end', function() {
      console.log('客户端关闭连接');
   });
   connection.write('Hello World!\r\n');
   connection.pipe(connection);
});
server.listen(8080, function() { 
  console.log('server is listening');
});

// client.js
var net = require('net');
var client = net.connect({port: 8080}, function() {
   console.log('连接到服务器！');  
});
client.on('data', function(data) {   //当接收到数据时触发
   console.log(data.toString());
   client.end();
});
client.on('end', function() {        //当 socket 另一端发送 FIN 包时，触发该事件
   console.log('断开与服务器的连接');
});
```

### 9.4 DNS 模块：DNS 模块用于解析域名

```js
var dns = require('dns');

dns.lookup('www.github.com', function onLookup(err, address, family) { //将域名（比如 'runoob.com'）解析为第一条找到的记录 A （IPV4）或 AAAA(IPV6)。
   console.log('ip 地址:', address); //address: 192.30.252.130

   dns.reverse(address, function (err, hostnames) {  //反向解析 IP 地址，指向该 IP 地址的域名数组。
   if (err) {
      console.log(err.stack);
   }

   console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));  //反向解析192.30.252.130: ["github.com"]
});  
});
```

## 10. 文件系统

1. 读取：readFile、readFileSync
2. 打开：open
3. 写入：writeFile(file, data[, options], callback)
4. 关闭：close
5. 截取：ftruncate(fd, len, callback)
6. 删除：unlink(path, callback)
7. 创建目录：mkdir(path[, options], callback)
8. 读取目录：readdir(path, callback)

## 11. node请求

```js
// 1. 获取GET请求内容
// 由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
// node.js 中 url 模块中的 parse 函数提供了这个功能。
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
    // util.inspect对象转换成字符串
    // url.parse(req.url, true))解析 URL 中的参数
}).listen(3000);

//--------------------------------------
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
 
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
 
}).listen(3000);
```

```js
// 2. 获取 POST 请求内容
// POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
// 比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
var http = require('http');
var querystring = require('querystring');
var util = require('util');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';   
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){  
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){  
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);

// 实例--------------------------------
var http = require('http');
var querystring = require('querystring');
 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(3000);
```

## 12. express

对于前端程序员来说，最常见的两种服务器，分别是

- Web 网站服务器：专门对外提供 Web 网页资源的服务器
- API 接口服务器：专门对外提供 API 接口的服务器

使用 Express，我们可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器

### 12.1 Express 的基本使用

```js
// 1.1 在项目所处的目录中安装
// npm i express@4.17.1
//--------------------------------------------------------------------------------------------------------------------

// 1.2 创建基本的 Web 服务器
const express = require('express');	// 导入express                      
const app = express();							// 创建web服务器
app.listen(80, () => {							// 调用回调函数，listen() 启动服务器
	console.log('express server running at http://127.0.0.1')
});
//--------------------------------------------------------------------------------------------------------------------

// 1.3 处理请求
// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app3 = express()

// 4. 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app3.get('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个  JSON 对象
  res.send({ name: 'zs', age: 20, gender: '男' })
})
app3.post('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个  文本字符串
  res.send('请求成功')
})
app3.get('/', (req, res) => { 
  // 通过 req.query 可以获取到客户端发送过来的 ?name=zs&age=20 查询参数 ‘/’表示ip根目录
  // 注意：默认情况下，req.query 是一个空对象
  console.log(req.query)
  res.send(req.query)
})
// 注意：这里的 :id 是一个动态的参数
app3.get('/user/:id/:username', (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
  console.log(req.params)
  res.send(req.params)
})
// 3. 启动 web 服务器
app3.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
// 注意: ':id '是一个动态的参数,':'是固定的写法,可以有多个参数,其中id 是该参数名字,而req.params可以动态匹配该参数的值。
//--------------------------------------------------------------------------------------------------------------------

// 1.4 托管静态资源
// express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器，例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了
app3.use(express.static('public'))

//  现在，你就可以访问 public 目录中的所有文件了
//  http://localhost/images/bg.jpg
//  http://localhost/css/style.css
//  http://localhost/js/login.js

// 注意：Express 在指定的静态目录中查找文件，对外提供资源访问路径，目录名(public)不会出现在 URL 中

// 托管多个静态资源目录时express.static() 函数会根据目录的添加顺序查找所需的文件，如下同名先访问public文件夹：
app.use(express.static('public'))
app.use(express.static('files'))

// 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式
app.use('/public', express.static('public'))

//  现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了
//  http://localhost:3000/public/images/kitten.jpg
//  http://localhost:3000/public/css/style.css
//  http://localhost:3000/public/js/app.js


/*
    nodemon
在编写调试 Node.js 项目的时候，如果修改了项目的代码，需要频繁的手动重新启动服务，使用 nodemon https://www.npmjs.com/package/nodemon 工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动重启项目，极大方便了开发和调试。

     npm i -g nodemon

现在，我们可以将 node 命令替换为 nodemon 命令，使用 nodemon app.js 来启动项目。

     nodemon app.js
*/
```

### 12.2 Express 路由

```js
// 广义上来讲，路由就是映射关系。在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系
// Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下

app.method(path, handler())	// method 具体为 get post 等

// 路由的匹配过程
// 每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。
// 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。


const express = require('express')
const app2 = express()
// 挂载路由
app2.get('/', (req, res) => {res.send('hello world.')})
app2.post('/', (req, res) => {res.send('Post Request.')})
app2.listen(80, () => {console.log('express server running at http://127.0.0.1')})

// 模块化路由（用法见16文件夹）
// 为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。将路由抽离为单独模块的步骤如下：

// 1. 创建路由模块对应的 .js 文件
// 2. 调用 express.Router() 函数创建路由对象
// 3. 向路由对象上挂载具体的路由
// 4. 使用 module.exports 向外共享路由对象
// 5. 使用 app.use() 函数注册路由模块
```

### 12.3 Express 中间件: 特指业务流程的中间处理环节

Express 中间件的调用流程：当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理

Express 中间件的格式：

Express 的中间件，本质上就是一个 function 处理函数。
注意：中间件函数的形参列表中，必须包含 next 参数，而路由处理函数中只包含 req 和 res

next 函数的作用： next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由

```js
// 3.1 全局生效的中间件：是客户端发起的任何请求，达到服务器之后，都会触发的中间件
// 通过app.use(中间件函数)，即可定义一个全局生效的中间件

// 中间件的作用: 多个中间件之间，共享同一份 req和 res。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用

// 定义多个全局中间件，按照顺序先后调用

// 3.2 局部生效的中间件：不使用 app.use() 定义的中间件叫做局部生效的中间件


// 3.3 中间件的5个使用注意事项
//  1. 一定要在路由之前注册中间件，如果直接匹配到路由就会直接响应了。
//  2. 客户端发送过来的请求，可以连续调用多个中间件进行处理
//  3. 执行完中间件的业务代码之后，不要忘记调用 next() 函数
//  4. 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
//  5. 连续调用多个中间件时，多个中间件之间，共享req 和 res 对象
```

中间件的分类

为了方便大家理解和记忆中间件的使用，Express 官方把常见的中间件用法，分成了 5 大类:应用级别的中间件 路由级别的中间件 错误级别的中间件 Express 内置的中间件 第三方的中间件

```js
// 1. 应用级别的中间件（就是一种叫法，没啥用）
// 通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件

// 2. 路由级别的中间件
// 绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上

// 3. 错误级别的中间件

// 错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。
// 注意：错误级别的中间件，必须注册在所有路由之后！

const express = require('express')
const app1 = express()
// 1. 定义路由
app1.get('/', (req, res) => {
  // 1.人为的制造错误
  throw new Error('服务器内部发生了错误！')
  res.send('Home page.')
})
// 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app1.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})
app1.listen(80, function () {console.log('Express server running at http://127.0.0.1')})

// 4. Express内置的中间件

// express.static() 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性，任何版本都能用）
// express.json() 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
// express.urlencoded(option) 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）



// 3.5 第三方的中间件

// 非 Express 官方内置的，由第三方开发出来的中间件。项目中，可以按需下载并配置第三方中间件，从而提高项目的开发效率

// 如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下
// 1. 运行 npm install body-parser安装中间件
// 2. 使用 require导入中间件
// 3. 调用 app.use() 注册并使用中间件
// 注意：Express 内置的 express.urlencoded，就是基于 body-parser 这个第三方中间件进一步封装出来的

// 3.6 自定义中间件
// 自己手动模拟一个类似于 express.urlencoded这样的中间件，来解析 POST 提交到服务器的表单数据，实现步骤：

// 1. 定义中间件

// 2. 监听 req 的 data 事件
// 来获取客户端发送到服务器的数据。如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以 data 事件可能会触发多次，每一次触发 data 事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接。

// 3. 监听 req 的 end 事件
// 当请求体数据接收完毕之后，会自动触发 req 的 end 事件，可以在 req 的 end 事件中，拿到并处理完整的请求体数据
// Node.js 内置了一个 querystring 模块，专门用来处理查询字符串。通过这个模块提供的 parse() 函数，可以轻松把查询字符串，解析成对象的格式

// 4. 使用 querystring模块解析请求体数据
// 将解析出来的数据对象挂载为 req.body

// 5. 将自定义中间件封装为模块
```

### 12.4 使用 Express 写接口

4.1 接口的跨域问题(浏览器从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同，都是跨域)

 刚才编写的 GET 和 POST接口，存在一个很严重的问题：不支持跨域请求，解决接口跨域问题的方案主要有两种

4.2 CORS（主流解决方案，推荐）

使用 CORS 中间件解决跨域问题

CORS（Cross-Origin Resource Sharing，跨域资源共享）是 Express 的一个第三方中间件，由一系列 HTTP 响应头组成，这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源。在路由之前调用 app.use(cors()) 配置中间件。

4.3 JSONP（有缺陷：只支持 GET 请求）

概念：浏览器端通过script标签的src属性，请求服务器上的数据，同时，服务器返回一个函数的调用。

实现 JSONP 接口的步骤：

1. 获取客户端发送过来的回调函数的名字
2. 得到要通过 JSONP 形式发送给客户端的数据
3. 根据前两步得到的数据，拼接出一个函数调用的字符串
4. 把上一步拼接得到的字符串，响应给客户端的script标签进行解析执行

5. 响应头：

5.1 Access-Control-Allow-Origin：

响应头部可以携带一个Access-Control-Allow-Origin字段，语法如下： `Access-Control-Allow-Origin: `

Origin指定了允许访问该资源的外域 URL，可以控制哪些网页可以请求该服务器，而*表示所有网页均可.

如：`res.setHeader('Access-Control-Allow-Origin', 'http....')`

5.2 Access-Control-Allow-Headers：

默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded）

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！

如：`res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-custom-Header')`

5.3 Access-Control-Allow-Methods：（更多的请求方式）

默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。

如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods来指明实际请求所允许使用的 HTTP 方法

`res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')`

`res.setHeader('Access-Control-Allow-Methods', '*')`  // 支持所有请求

6.CROS请求分类

6.1 简单请求

同时满足以下两大条件的请求，就属于简单请求

请求方式：GET、POST、HEAD 三者之一

HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）

6.2 预检请求

只要符合以下任何一个条件的请求，都需要进行预检请求

1. 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
2. 请求头中包含自定义头部字段
3. 向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，这一次的 OPTION 请求称为预检请求。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

简单请求的特点：客户端与服务器之间只会发生一次请求

预检请求的特点：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求
