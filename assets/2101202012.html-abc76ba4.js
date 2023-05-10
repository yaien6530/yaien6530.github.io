import{_ as a,X as s,Y as e,a0 as t,Z as n,$ as p,a2 as o}from"./framework-4115b8f2.js";const c={},i=n("h1",{id:"spring-基础-三",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#spring-基础-三","aria-hidden":"true"},"#"),p(" Spring 基础（三）")],-1),l=n("p",null,"Spring 基础笔记系列",-1),u=o(`<h2 id="spring表达式" tabindex="-1"><a class="header-anchor" href="#spring表达式" aria-hidden="true">#</a> Spring表达式</h2><p>当某个Bean的某些属性值来自于另一个Bean的某些属性，则可以使用Spring表达式，例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ValueBean</span> <span class="token punctuation">{</span>
	
		<span class="token comment">// SampleBean中names的第3个值</span>
		<span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
		<span class="token comment">// SampleBean中session的from</span>
		<span class="token keyword">public</span> <span class="token class-name">String</span> from<span class="token punctuation">;</span>
		<span class="token comment">// SampleBean中config的driver</span>
		<span class="token keyword">public</span> <span class="token class-name">String</span> driver<span class="token punctuation">;</span>

		<span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则，首先，需要确定注入值的方式，例如通过SET方式注入，则需要为这些属性添加SET方法：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setFrom</span><span class="token punctuation">(</span><span class="token class-name">String</span> from<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>from <span class="token operator">=</span> from<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setDriver</span><span class="token punctuation">(</span><span class="token class-name">String</span> driver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>driver <span class="token operator">=</span> driver<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在Spring的配置文件中进行配置：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>valueBean<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cn.tedu.spring.ValueBean<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span>
              <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#{sampleBean.names[2]}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>from<span class="token punctuation">&quot;</span></span>
              <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#{sampleBean.session.from}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>driver<span class="token punctuation">&quot;</span></span>
              <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#{sampleBean.config.driver}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring表达式的基本语法格式是使用<code>#{}</code>，其内部的编写方式取决于获取哪些值。</p><p>如果需要获取数组或List集合中的某个元素：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	#<span class="token punctuation">{</span>bean<span class="token operator">-</span>id<span class="token punctuation">.</span>数组或list集合名称<span class="token punctuation">[</span>下标<span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果需要获取Map或Properites中的某个元素：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	#<span class="token punctuation">{</span>bean<span class="token operator">-</span><span class="token class-name"><span class="token namespace">id<span class="token punctuation">.</span></span>Map</span>或<span class="token class-name">Properties</span>名<span class="token punctuation">.</span>属性名<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以是：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	#<span class="token punctuation">{</span>bean<span class="token operator">-</span><span class="token class-name"><span class="token namespace">id<span class="token punctuation">.</span></span>Map</span>或<span class="token class-name">Properties</span>名<span class="token punctuation">[</span><span class="token char">&#39;属性名&#39;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="spring自动装配-不推荐" tabindex="-1"><a class="header-anchor" href="#spring自动装配-不推荐" aria-hidden="true">#</a> Spring自动装配（不推荐）</h2><p>可以配置Spring中的<code>&lt;bean&gt;</code>节点中的<code>autowire</code>属性，使之尝试自动为其属性注入值，而不再需要使用<code>&lt;property&gt;</code>节点进行配置，减少配置的代码量。</p><p>该属性的取值可以是<code>byName</code>，表示将根据名称实现自动装配，要求被装配的属性有SET方法，且SET方法名称右侧的部分与某个bean的id是匹配的！</p><p>该属性的取值还可以是<code>byType</code>，表示将根据类型实现自动装配，即Spring会在容器管理范围之内查找类型匹配的对象，并尝试实现装配。</p><p>使用<code>byType</code>实现自动装配时，必须保证在Spring管理的范围之内，匹配类型的对象只有1个，如果超过1个，则程序会报错！</p><p>关于<code>autowire</code>属性还可以配置其它值，一般不关心这些问题。</p><p>并且，这种自动装配的做法其实是不推荐的！因为仅仅只使用<code>autowire</code>属性进行配置，某个类的哪些属性已装配、哪些属性未装配是不明确的！另外，自动装配会尝试为所有属性装配值，但是，也许某些属性是不希望被装配值的！</p><h2 id="spring注解" tabindex="-1"><a class="header-anchor" href="#spring注解" aria-hidden="true">#</a> Spring注解</h2><h3 id="通用注解" tabindex="-1"><a class="header-anchor" href="#通用注解" aria-hidden="true">#</a> 通用注解</h3><p>如果某个类需要被Spring创建对象并进行管理，首先，应该在Spring的配置文件中添加组件扫描的配置，告诉Spring框架需要扫描哪个包中的类：</p><div class="language-xml&lt;!-- line-numbers-mode" data-ext="xml&lt;!--"><pre class="language-xml&lt;!--"><code>&lt;context:component-scan base-package=&quot;cn.tedu.spring&quot;/&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，确保那些需要被Spring创建对象并进行管理的类在这个包中，并在类的声明之前添加<code>@Component</code>注解即可：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>tedu<span class="token punctuation">.</span>spring</span><span class="token punctuation">;</span>
	
	<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>
	
	<span class="token annotation punctuation">@Component</span>
	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServlet</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在单元测试中：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tests</span> <span class="token punctuation">{</span>
	
		<span class="token annotation punctuation">@Test</span>
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">ClassPathXmlApplicationContext</span> ac
				<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span>
					<span class="token string">&quot;spring.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			
			<span class="token class-name">UserServlet</span> userServlet
				<span class="token operator">=</span> ac<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;userServlet&quot;</span><span class="token punctuation">,</span> <span class="token class-name">UserServlet</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userServlet<span class="token punctuation">)</span><span class="token punctuation">;</span>

			ac<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上组件扫描的配置中，配置的是需要扫描的<strong>根包</strong>，例如配置为<code>cn.tedu.spring</code>，则其子包<code>cn.tedu.spring.dao</code>也会在扫描范围之内！</p><p>被Spring管理的对象，默认使用的bean-id就是将类名的首字母转为小写的名称，例如类名是<code>UserSerlvet</code>，则它的bean-id就是<code>userServlet</code>，也可以在<code>@Component</code>注解中显式的配置bean-id：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">&quot;servlet&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServlet</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与<code>@Component</code>相关的注解还有：<code>@Controller</code>通常添加在控制器类之前，<code>@Service</code>通常添加在业务类之前的，<code>@Repository</code> 通常添加在处理持久层的类之前，它们的作用和使用方式是相同的！另外，<code>@Component</code>通常添加在其它定位的类之前。</p><h3 id="关于作用域和生命周期的注解" tabindex="-1"><a class="header-anchor" href="#关于作用域和生命周期的注解" aria-hidden="true">#</a> 关于作用域和生命周期的注解</h3><p>通过<code>@Scope</code>注解可以配置某个类的对象是否为单例，如果需要配置为非单例的，可以在类的声明之前：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">&quot;prototype&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果需要是单例的，可以是<code>@Scope(&quot;singleton&quot;)</code>，或者<code>@Scope</code>，甚至完全不配置这个注解！</p><p>在类之前添加<code>@Lazy</code>注解可以设置为单例模式的懒汉单例。在<code>@Lazy</code>中也可以配置布尔值，例如<code>@Lazy(false)</code>表示非懒汉式，而<code>@Lazy(true)</code>表示懒汉式，但是，没有必要添加详细配置。</p><p>还可以通过<code>@PostConstruct</code>和<code>@PreDestroy</code>配置生命周期方法：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token annotation punctuation">@PostConstruct</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UserDao.init()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token annotation punctuation">@PreDestroy</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;UserDao.destroy()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：这2个注解是JavaEE中的注解，并不是Spring的注解，在使用之前，需要添加Tomcat运行环境，以导入JavaEE相关的jar包，才可以使用。</strong></p>`,41);function d(r,k){return s(),e("div",null,[i,l,t(" more "),u])}const m=a(c,[["render",d],["__file","2101202012.html.vue"]]);export{m as default};
