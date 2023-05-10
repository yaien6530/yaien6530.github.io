import{_ as s,X as a,Y as t,a0 as p,Z as n,$ as e,a2 as o}from"./framework-1502171d.js";const c={},i=n("h1",{id:"归并排序",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#归并排序","aria-hidden":"true"},"#"),e(" 归并排序")],-1),l=n("p",null,"归并排序是利用归并的思想实现的排序方法，该算法采用经典的分治策略（分治法将问题分成一些小问题然后递归求解，而治的阶段则将分的阶段得到的各个答案“修补”在一起）。",-1),u=o(`<h2 id="基本思想" tabindex="-1"><a class="header-anchor" href="#基本思想" aria-hidden="true">#</a> 基本思想</h2><p>将一个需要排序的数组通过递归进行拆分，当每一个元素都是一个个体的时候，再进行合并，合并时将合并的数据保存到一个临时开辟的空间中，这意味着需要额外的空间来保存数据；这个算法主要分为三步： （一）：拆分 将一个初始的数组递归拆分，将每一个元素拆分至单个个体独立存在（这里并不对数据进行操作） （二）：合并（核心） 将拆分的当个个体元素进行合并，合并的过程中进行排序，并保存到临时创建的空间内（需要对数据进行排序操作） （三）：拷贝 将临时空间内的数据拷贝到原数组中 <img src="https://img-blog.csdnimg.cn/20191008163202897.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEwNDA5OQ==,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p><h2 id="合并的实现图解如下" tabindex="-1"><a class="header-anchor" href="#合并的实现图解如下" aria-hidden="true">#</a> 合并的实现图解如下</h2><p><img src="https://img-blog.csdnimg.cn/20191008164202611.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEwNDA5OQ==,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"><img src="https://img-blog.csdnimg.cn/20191008164215964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEwNDA5OQ==,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>ygl<span class="token punctuation">.</span>sort</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 归并排序算法
 * 
 * <span class="token keyword">@author</span> Administrator
 * 
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MergetSort</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> arr<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
		<span class="token function">mergeSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">arr</span> 原始数组
	 * <span class="token keyword">@param</span> <span class="token parameter">left</span> 左边的初始索引
	 * <span class="token keyword">@param</span> <span class="token parameter">right</span>	右边的初始索引
	 * <span class="token keyword">@param</span> <span class="token parameter">temp</span> 暂时保存数据的数组
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span><span class="token keyword">int</span> left<span class="token punctuation">,</span><span class="token keyword">int</span> right<span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> temp<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>left<span class="token operator">&lt;</span>right<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">//中间索引</span>
			<span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>left<span class="token operator">+</span>right<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>	
			<span class="token comment">//像左递归进行分解</span>
			<span class="token function">mergeSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">//像右递归进行分解</span>
			<span class="token function">mergeSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> mid<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">//调用合并的方法</span>
			<span class="token function">merge</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> right<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
	<span class="token doc-comment comment">/**
	 * 合并的方法
	 * <span class="token keyword">@param</span> <span class="token parameter">arr</span> 原始数组
	 * <span class="token keyword">@param</span> <span class="token parameter">left</span> 左边有序序列的初始索引
	 * <span class="token keyword">@param</span> <span class="token parameter">mid</span> 中间索引
	 * <span class="token keyword">@param</span> <span class="token parameter">right</span> 右边索引
	 * <span class="token keyword">@param</span> <span class="token parameter">temp</span> 暂时保存数据的数组
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> mid<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">,</span>
			<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> temp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> i <span class="token operator">=</span> left<span class="token punctuation">;</span> <span class="token comment">// 初始化i，左边的有序序列的初始索引</span>
		<span class="token keyword">int</span> j <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 初始化j，右边有序序列的初始索引</span>
		<span class="token keyword">int</span> t <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 指向temp数组的当前索引</span>

		<span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> mid <span class="token operator">&amp;&amp;</span> j <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">/*
			 * 如果左边的元素小于等于右边的元素，将左边的元素填充到temp数组中； 
			 * 反之将右边的元素填充到temp数组中
			 */</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				temp<span class="token punctuation">[</span>t<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
				t <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
				i <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				temp<span class="token punctuation">[</span>t<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
				t <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
				j <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 当左边的有序序列还有剩余元素，则全部填充到temp中</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			temp<span class="token punctuation">[</span>t<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
			t <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
			i <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 当右边的有序序列还有剩余元素，则全部填充到temp中</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			temp<span class="token punctuation">[</span>t<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
			t <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
			j <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">//将temp数组的元素拷贝到arr(每一次合并都会拷贝)</span>
		t <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">int</span> tempLeft <span class="token operator">=</span> left<span class="token punctuation">;</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>tempLeft <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			arr<span class="token punctuation">[</span>tempLeft<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">[</span>t<span class="token punctuation">]</span><span class="token punctuation">;</span>
			t <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
			tempLeft <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>归并算法的核心在于合并的过程，合并的次数为arr.length()-1次，因此时间复杂度表达式为O(n log n)，是一种线性对数阶，处理数据的时间相对快；</p>`,8);function r(k,d){return a(),t("div",null,[i,l,p(" more "),u])}const v=s(c,[["render",r],["__file","2301101204.html.vue"]]);export{v as default};
