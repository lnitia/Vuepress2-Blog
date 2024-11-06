import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as e}from"./app-0SoiKzJB.js";const t={},o=e(`<h1 id="滴滴一面" tabindex="-1"><a class="header-anchor" href="#滴滴一面" aria-hidden="true">#</a> 滴滴一面</h1><h2 id="_1-自我介绍" tabindex="-1"><a class="header-anchor" href="#_1-自我介绍" aria-hidden="true">#</a> 1 自我介绍</h2><h2 id="_2-在开发中比较有挑战性的内容-展开说说" tabindex="-1"><a class="header-anchor" href="#_2-在开发中比较有挑战性的内容-展开说说" aria-hidden="true">#</a> 2 在开发中比较有挑战性的内容，展开说说</h2><h2 id="_3-css盒模型" tabindex="-1"><a class="header-anchor" href="#_3-css盒模型" aria-hidden="true">#</a> 3 css盒模型</h2><h2 id="_4-flex布局的基本概念-flex属性有哪些子属性-解释flex-1" tabindex="-1"><a class="header-anchor" href="#_4-flex布局的基本概念-flex属性有哪些子属性-解释flex-1" aria-hidden="true">#</a> 4 flex布局的基本概念，flex属性有哪些子属性，解释flex：1</h2><p>容器内的子元素可以自动调整大小和顺序以适应不同的屏幕尺寸和容器尺寸。</p><p><strong><code>flex: 1</code></strong> 是 <code>flex-grow: 1; flex-shrink: 1; flex-basis: 0</code> 的简写，表示子元素会在容器内均分剩余空间，并且会随容器缩小而缩小</p><h2 id="_5-浏览器多个tab页面进行通信的实现方式有哪些" tabindex="-1"><a class="header-anchor" href="#_5-浏览器多个tab页面进行通信的实现方式有哪些" aria-hidden="true">#</a> 5 浏览器多个tab页面进行通信的实现方式有哪些</h2><ul><li><strong>LocalStorage</strong> ：通过监听 <code>storage</code> 事件在不同的标签页之间同步数据。</li><li><strong>SharedWorker</strong> ：通过共享 Worker 实现多个 Tab 页之间的通信。</li><li><strong>BroadcastChannel API</strong> ：专门用于多标签页之间的消息广播。</li><li><strong>Service Worker</strong> ：可以拦截网络请求，进行数据共享。</li><li><strong>WebSocket</strong> ：通过服务器中转消息，实现多页面实时通信。</li></ul><h2 id="_6-es6-语法" tabindex="-1"><a class="header-anchor" href="#_6-es6-语法" aria-hidden="true">#</a> 6 es6+语法</h2><ul><li><strong>箭头函数</strong> ：简化函数定义，<code>this</code> 绑定到函数定义时的上下文。</li><li><strong><code>let</code> 和 <code>const</code></strong> ：块级作用域的变量定义方式。</li><li><strong>模板字符串</strong> ：使用反引号（\`\`\`）包裹字符串，支持变量嵌入和多行字符串。</li><li><strong>解构赋值</strong> ：快速从对象或数组中提取值。</li><li><strong>扩展运算符</strong> ：用于展开数组或对象，或者合并对象。</li><li><strong><code>Promise</code></strong> ：用于异步编程，简化回调地狱。</li><li><strong><code>async/await</code></strong> ：基于 Promise 的异步操作的更简洁写法。</li><li><strong>模块导入导出</strong> ：通过 <code>import</code> 和 <code>export</code> 实现模块化。</li><li><code>class</code> : 声明类</li></ul><h2 id="_7-promise-all和promise-race的区别" tabindex="-1"><a class="header-anchor" href="#_7-promise-all和promise-race的区别" aria-hidden="true">#</a> 7 promise.all和promise.race的区别</h2><h2 id="_8-对象继承实现方式" tabindex="-1"><a class="header-anchor" href="#_8-对象继承实现方式" aria-hidden="true">#</a> 8 对象继承实现方式</h2><p>class ：extends</p><p>function ：1. 直接拷贝方法和属性； 2. 组合式继承</p><h2 id="_9-深拷贝和浅拷贝区别" tabindex="-1"><a class="header-anchor" href="#_9-深拷贝和浅拷贝区别" aria-hidden="true">#</a> 9 深拷贝和浅拷贝区别</h2><ul><li><strong>浅拷贝</strong> ：拷贝对象的引用，修改拷贝后的对象会影响原对象。常见的浅拷贝方法有 <code>Object.assign</code>、数组的 <code>slice</code>、<code>concat</code> 等。</li><li><strong>深拷贝</strong> ：拷贝对象的值，生成完全独立的对象，修改拷贝后的对象不会影响原对象。常见的深拷贝方法有 <code>JSON.parse(JSON.stringify(object))</code>（但不支持函数、<code>undefined</code>、<code>Symbol</code> 等特殊值）以及递归遍历实现深拷贝。</li></ul><h2 id="_10-react还是vue-react版本" tabindex="-1"><a class="header-anchor" href="#_10-react还是vue-react版本" aria-hidden="true">#</a> 10 react还是vue，react版本</h2><p>react 17.x</p><h2 id="_11-useeffect第二个参数不传和传-的区别" tabindex="-1"><a class="header-anchor" href="#_11-useeffect第二个参数不传和传-的区别" aria-hidden="true">#</a> 11 useEffect第二个参数不传和传[]的区别</h2><p>不传 - 每次数据改变都会执行</p><p>[] - 只有初始化执行一次</p><h2 id="_12-高阶组件主要用在什么场合" tabindex="-1"><a class="header-anchor" href="#_12-高阶组件主要用在什么场合" aria-hidden="true">#</a> 12 高阶组件主要用在什么场合</h2><p>高阶组件是一个函数，接受一个<strong>组件</strong>作为参数并返回一个新<strong>组件</strong>。它主要用于<strong>代码复用</strong>、跨组件共享逻辑（如状态管理、权限控制、日志记录等）。</p><h2 id="_13-render-props有了解过吗" tabindex="-1"><a class="header-anchor" href="#_13-render-props有了解过吗" aria-hidden="true">#</a> 13 render props有了解过吗</h2><p>Render Props 是一种在 React 组件间<strong>代码复用</strong>的技术。组件接收一个<strong>函数</strong>作为 <code>props</code>，并通过这个函数返回要渲染的内容。</p><h2 id="_14-react-component和purecomponent区别" tabindex="-1"><a class="header-anchor" href="#_14-react-component和purecomponent区别" aria-hidden="true">#</a> 14 react component和purecomponent区别</h2><ul><li><strong>Component</strong> ：每次父组件更新时，无论 <code>props</code> 是否改变，子组件都会重新渲染。</li><li><strong>PureComponent</strong> ：通过浅比较 <code>props</code> 和 <code>state</code> 来决定是否重新渲染，避免不必要的渲染以提升性能。</li></ul><h2 id="_15-webpack如何初始化项目" tabindex="-1"><a class="header-anchor" href="#_15-webpack如何初始化项目" aria-hidden="true">#</a> 15 webpack如何初始化项目</h2><ul><li>创建一个空文件夹，进入文件夹后运行 <code>npm init -y</code> 初始化 <code>package.json</code> 文件。</li><li>安装 Webpack 及其 CLI 工具：<code>npm install --save-dev webpack webpack-cli</code>。</li><li>创建 Webpack 配置文件 <code>webpack.config.js</code>，配置入口、输出、加载器和插件等。</li><li>在 <code>package.json</code> 中添加构建脚本 <code>&quot;build&quot;: &quot;webpack&quot;</code>，通过 <code>npm run build</code> 进行构建。</li></ul><h2 id="_16-常用的loader和plugins" tabindex="-1"><a class="header-anchor" href="#_16-常用的loader和plugins" aria-hidden="true">#</a> 16 常用的loader和plugins</h2><p>loader:</p><ul><li><code>babel-loader</code>：将 ES6+ 代码转译为 ES5。</li><li><code>css-loader</code>：解析 <code>@import</code> 和 <code>url()</code> 语法，实现 <code>CSS</code> 模块化。</li><li><code>style-loader</code>：将 CSS 插入到 DOM 中。</li><li><code>file-loader</code>：处理文件导入，例如图片和字体。</li><li><code>url-loader</code>：类似于 <code>file-loader</code>，但可将小文件转化为 base64 数据 URL。</li></ul><p>plugins：</p><ul><li><code>HtmlWebpackPlugin</code>：自动生成 <code>index.html</code> 文件，并自动引入打包后的文件。</li><li><code>MiniCssExtractPlugin</code>：将 CSS 从 JS 文件中分离出来，生成独立的 CSS 文件。</li><li><code>CleanWebpackPlugin</code>：每次构建前清理输出目录。</li><li><code>DefinePlugin</code>：定义全局常量，例如环境变量。</li><li><code>HotModuleReplacementPlugin</code>：启用热模块替换（HMR）功能，实时更新页面内容。</li></ul><h2 id="_17-事件循环代码分析" tabindex="-1"><a class="header-anchor" href="#_17-事件循环代码分析" aria-hidden="true">#</a> 17 事件循环代码分析</h2><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">async</span> <span class="token function">functionasync1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;async1 start&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;async1 end&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token function">functionasync2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;async2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;script start&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;setTimeout&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;promise1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;promise2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;script end&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//结果：</span>
<span class="token comment">//script start</span>
<span class="token comment">//async1 start</span>
<span class="token comment">//async2</span>
<span class="token comment">//promise1</span>
<span class="token comment">//script end</span>
<span class="token comment">//async1 end</span>
<span class="token comment">//promise2</span>
<span class="token comment">//setTimeout</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_18-手撕" tabindex="-1"><a class="header-anchor" href="#_18-手撕" aria-hidden="true">#</a> 18 手撕</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">remoteAdd</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">resolve</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//方法1</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 用reduce函数链式调用remoteAdd</span>
  <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">promise<span class="token punctuation">,</span> current</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">result</span> <span class="token operator">=&gt;</span> <span class="token function">remoteAdd</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> current<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 初始值为Promise.resolve(0)</span>
<span class="token punctuation">}</span>
<span class="token comment">//方法2</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> num <span class="token keyword">of</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">remoteAdd</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//方法3</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> promise <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  args<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    promise <span class="token operator">=</span> promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">remoteAdd</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// case</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>log<span class="token punctuation">)</span> <span class="token comment">//Promise&lt;3&gt;</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>log<span class="token punctuation">)</span> <span class="token comment">//Promise&lt;7&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_19-为什么选择前端方向" tabindex="-1"><a class="header-anchor" href="#_19-为什么选择前端方向" aria-hidden="true">#</a> 19 为什么选择前端方向</h2><h2 id="_20-平时怎么学习前端" tabindex="-1"><a class="header-anchor" href="#_20-平时怎么学习前端" aria-hidden="true">#</a> 20 平时怎么学习前端</h2><h2 id="_21-反问" tabindex="-1"><a class="header-anchor" href="#_21-反问" aria-hidden="true">#</a> 21 反问</h2><p>技术栈：vue和react都有，vue比较多，跨端-和vue2语法差不多，内部实现的框架，react也有类似RN的</p><p>工作年限、发展方向：7年，先深度、广度-转ios、服务端、api层，兴趣为导向</p>`,44),p=[o];function c(i,l){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","didi1.html.vue"]]);export{d as default};
