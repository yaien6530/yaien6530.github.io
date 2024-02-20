import{_ as s,o as a,c as t,d as p,a as n,b as e,e as o}from"./app-f39fbfe2.js";const c={},i=n("h1",{id:"栈-stack",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#栈-stack","aria-hidden":"true"},"#"),e(" 栈（Stack）")],-1),l=n("p",null,"栈（Stack）是一种线性数据结构，它具有后进先出（Last-In-First-Out，LIFO）的特性。这意味着最后一个进入栈中的元素是第一个被弹出的，而最先进入栈中的元素是最后一个被弹出的。",-1),u=o(`<h2 id="图形分析" tabindex="-1"><a class="header-anchor" href="#图形分析" aria-hidden="true">#</a> 图形分析</h2><figure><img src="https://qiniu.yanggl.cn/image/2301101200_1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="思路分析" tabindex="-1"><a class="header-anchor" href="#思路分析" aria-hidden="true">#</a> 思路分析</h2><ol><li>定义一个top来表示入栈的数量（栈顶），当添加一个数据时top会指向新添加的数据；</li><li>设置top = -1；（初始值）默认栈为空，当 top == stack.size() 时表示栈满；</li><li>定义一个数组 stack 模拟栈，保存需要入栈的值；</li><li>入栈：接收一个值，将值保存到 stack 中，并将 top 的位置上移 ；</li><li>出栈：将栈顶top的值取出，并将top下移，重新标记栈顶的位置；</li></ol><h2 id="实现代码" tabindex="-1"><a class="header-anchor" href="#实现代码" aria-hidden="true">#</a> 实现代码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//定义一个 ArrayStack 表示栈结构</span>
<span class="token keyword">class</span> <span class="token class-name">ArrayStack</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> maxSize<span class="token punctuation">;</span> <span class="token comment">// 栈的大小</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> stack<span class="token punctuation">;</span> <span class="token comment">// 数组，模拟一个栈，用于存放</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> top <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 表示栈顶，初始为-1</span>

	<span class="token keyword">public</span> <span class="token class-name">ArrayStack</span><span class="token punctuation">(</span><span class="token keyword">int</span> maxSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>maxSize <span class="token operator">=</span> maxSize<span class="token punctuation">;</span>
		stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>maxSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 栈满</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> top <span class="token operator">==</span> maxSize <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 栈空</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> top <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 入栈</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 判断是否栈满</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;栈满~~&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		top<span class="token operator">++</span><span class="token punctuation">;</span>
		stack<span class="token punctuation">[</span>top<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 出栈-将栈顶的数据返回</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 判断是否栈空</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;栈空，没有数据~~&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">int</span> value <span class="token operator">=</span> stack<span class="token punctuation">[</span>top<span class="token punctuation">]</span><span class="token punctuation">;</span>
		top<span class="token operator">--</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> value<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 显示栈中的数据-从栈顶开始显示</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 判断是否栈空</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;栈空~~&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//从栈顶开始展示数据</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> top<span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;stack[%d]=%d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> stack<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>栈是一种简单但强大的数据结构，它可以用于许多不同的场景，特别是那些需要后进先出顺序的场景。</p>`,8);function k(r,d){return a(),t("div",null,[i,l,p(" more "),u])}const m=s(c,[["render",k],["__file","2301101200.html.vue"]]);export{m as default};
