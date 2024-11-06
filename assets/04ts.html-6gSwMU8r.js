import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as e}from"./app-0mkQjek1.js";const p={},t=e(`<h1 id="typescript基础" tabindex="-1"><a class="header-anchor" href="#typescript基础" aria-hidden="true">#</a> TypeScript基础</h1><p>Typescript是强类型的Javascript超集，支持ES6语法，支持面向对象编程的概念，如类、接口、多态、抽象、封装、继承、泛型等。</p><h2 id="_1-typescript基础类型" tabindex="-1"><a class="header-anchor" href="#_1-typescript基础类型" aria-hidden="true">#</a> 1. Typescript基础类型</h2><p>1：number</p><p>2：string</p><p>3：boolean</p><p>4：Symbol</p><p>5：Array</p><p>6：Tuple(元组)</p><p>7：enum(枚举)</p><p>8：object</p><p>9：never</p><p>表示那些永不存在的值类型。如总是抛出异常或者根本不会有返回值的函数的返回值类型。</p><p>10：void</p><p>与any相反表示没有任何类型。函数没有返回值时用void。</p><p>11：null和undefined</p><p>它们是所有类型的子类型。当你指定structNullChecks时，它们只能赋值给void或者它们自己本身。</p><p>12：any</p><h2 id="_2-接口interface" tabindex="-1"><a class="header-anchor" href="#_2-接口interface" aria-hidden="true">#</a> 2. 接口interface</h2><p>接口: 是对象的状态(属性)和行为(方法)的抽象(描述)。</p><p>接口类型的对象，多了或者少了属性是不允许的。包括普通类型、可选属性: ?、只读属性: readonly、任意属性[propName:string]:any、函数属性（source: string，subvar: string）: boolean</p><p>接口多次定义，会合并多次定义的结果。</p><ul><li>一个类可以实现多个接口</li><li>一个接口可以继承多个接口</li></ul><h2 id="_3-泛型t" tabindex="-1"><a class="header-anchor" href="#_3-泛型t" aria-hidden="true">#</a> 3. 泛型T</h2><p>指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。</p><p>一个函数可以定义多个泛型参数</p><ul><li>在定义接口时, 为接口中的属性或方法定义泛型类型。</li><li>在使用接口时, 再指定具体的泛型类型。</li><li>泛型接口</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IbaseCRUD<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
    data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function-variable function">add</span><span class="token operator">:</span> <span class="token punctuation">(</span>t<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token function-variable function">getById</span><span class="token operator">:</span> <span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">UserCRUD</span> <span class="token keyword">implements</span> <span class="token class-name">IbaseCRUD<span class="token operator">&lt;</span>User<span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
    data<span class="token operator">:</span> User<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">add</span><span class="token punctuation">(</span>u<span class="token operator">:</span> User<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token operator">:</span> User<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>id <span class="token operator">===</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>泛型类</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">GenericData<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
    zeroValue<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
    <span class="token function-variable function">add</span><span class="token operator">:</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> genericNumber <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericData<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
genericNumber<span class="token punctuation">.</span>zeroValue <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
genericNumber<span class="token punctuation">.</span><span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>泛型约束</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Lengthwise</span> <span class="token punctuation">{</span>
    length<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 指定泛型约束</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">fn2</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> Lengthwise<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 我们需要传入符合约束类型的值，必须包含必须 length 属性：</span>
<span class="token function">fn2</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// fn2(123) // error number没有length属性</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>泛型工具</li></ul><p>T extends U ? X : Y</p><p>上述代码含义为：如果 T 包含的类型是 U 包含的类型的 &#39;子集&#39;，那么取结果 X，否则取结果 Y。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">WhatType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token keyword">null</span></span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span>

<span class="token keyword">let</span> typeString<span class="token operator">:</span> WhatType<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span> <span class="token comment">// string 类型</span>
<span class="token keyword">let</span> typeNull<span class="token operator">:</span> WhatType<span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">&gt;</span> <span class="token comment">// never 类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>typeof 操作符用来在类型上下文中获取变量或者属性的类型。示例代码如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> user<span class="token operator">:</span> IPerson <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&quot;jenny&quot;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">student</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> user<span class="token punctuation">;</span> <span class="token comment">// IPerson</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>keyof 操作符用来获取某种类型的所有 key 值，返回一个联合类型。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IPerson</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">allKey1</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> IPerson<span class="token punctuation">;</span> <span class="token comment">// &#39;name&#39; | &#39;age&#39;</span>

<span class="token keyword">type</span> <span class="token class-name">allKey2</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> IPerson<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// &#39;length | &#39;toString | &#39;pop&#39; | &#39;push&#39; | &#39;concat&#39; | &#39;join&#39; | ......</span>

<span class="token keyword">type</span> <span class="token class-name">allKey3</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> IPerson <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// string | number</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Required <code>&lt;T&gt;</code> 的作用就是将某个类型中的属性全部变为必选。</p><p>Readonly <code>&lt;T&gt;</code> 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。</p><p><strong>Omit 省略/剔除</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> Omit<span class="token operator">&lt;</span>UserObj<span class="token punctuation">,</span> <span class="token string">&quot;number&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;sex&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;address&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;weight&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Pick 采集</strong></p><p>可以采集已定义对象中，自己需要的一部分形成新的定义类型。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>UserObj<span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;id&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-类型别名type" tabindex="-1"><a class="header-anchor" href="#_4-类型别名type" aria-hidden="true">#</a> 4. 类型别名type</h2><p>type：类型别名，为类型创建一个新名称。它并不是一个类型，只是一个别名。</p><h2 id="_5-接口interface和类型别名type的区别" tabindex="-1"><a class="header-anchor" href="#_5-接口interface和类型别名type的区别" aria-hidden="true">#</a> 5. 接口interface和类型别名type的区别？</h2><p>几乎所有interface具有的功能，type都可以实现，主要区别在于type不能重新打开类型来添加新成员，而接口总是可以扩展的，即便这样官方还是建议我们尽量去使用接口代替类型别名。另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。</p><ul><li><p>他们很相似，type可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。</p></li><li><p>type并不会真的创建一个新的名字，当你在编译器上将鼠标悬停在定义为该类型别名定义的变量上时返回的是该类型别名引用的对象。相反，接口会创建一个新名字 ，当你把鼠标悬停在该接口定义的变量上时返回的是该接口名。</p></li><li><p>类型别名不能extends和implements，采用交叉类型&amp;实现。</p></li><li><p>type 能够<strong>表示非对象类型，</strong> 而 <code>interface</code> 则<strong>只能表示对象类型</strong>。</p><p>type</p><ul><li>可以定义基本类型别名，如type StringType = string</li><li>可以声明联合类型，如 type paramType = number | string;</li><li>可以声明元组类型，如type arrType = [string, string, number]</li></ul></li><li><p>interface可以重复声明，type定义后不能重复声明</p></li></ul><p>接口和type定义函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TSearchFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token keyword">interface</span> <span class="token class-name">ISearchFunc</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 类型别名函数</span>
<span class="token keyword">const</span> tSearchFunc<span class="token operator">:</span> <span class="token function-variable function">TSearchFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// 接口函数</span>
<span class="token keyword">const</span> iSearchFunc<span class="token operator">:</span> <span class="token function-variable function">ISearchFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-interface-与-type-混合使用" tabindex="-1"><a class="header-anchor" href="#_5-1-interface-与-type-混合使用" aria-hidden="true">#</a> 5.1 Interface 与 Type 混合使用</h3><ul><li>Interface extends Interface</li><li>Interface extends Type</li><li>Type 与 Type 交叉类型</li><li>Type 与 Interface 交叉类型</li><li>类可以实现Interface 以及 Type(除联合类型外)。class User1 implements IMan</li></ul>`,58),o=[t];function c(l,i){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","04ts.html.vue"]]);export{d as default};
