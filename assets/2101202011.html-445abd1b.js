import{_ as a,o as t,c as s,d as e,a as n,b as o,e as p}from"./app-e0d227af.js";const c={},l=n("h1",{id:"spring-基础-二",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#spring-基础-二","aria-hidden":"true"},"#"),o(" Spring 基础（二）")],-1),i=n("p",null,"Spring 基础笔记系列",-1),u=p(`<h2 id="对象的作用域与生命周期-不常用" tabindex="-1"><a class="header-anchor" href="#对象的作用域与生命周期-不常用" aria-hidden="true">#</a> 对象的作用域与生命周期（不常用）</h2><p>由Spring管理的对象，默认都是单例的！并且，都是饿汉式的单例模式。</p><p>在配置<code>&lt;bean&gt;</code>节点时，可以添加<code>scope</code>属性其是否单例，当取值为<code>singleton</code>时表示单例，该值也是默认值，当取值为<code>prototype</code>时表示非单例：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;bean id=&quot;user&quot; class=&quot;cn.tedu.spring.User&quot; scope=&quot;prototype&quot;/&gt;
</code></pre></div><p>在单例模式的基础之上，还可以通过<code>lazy-init</code>属性配置它是否为懒汉式的单例模式，默认值为<code>false</code>，即非懒汉式，也就是饿汉式的单例模式，当取值为<code>true</code>时，表示懒汉式的单例模式：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;bean id=&quot;user&quot;
      class=&quot;cn.tedu.spring.User&quot;
      scope=&quot;singleton&quot;
      lazy-init=&quot;true&quot;/&gt;
</code></pre></div><p>如果某个类被配置为单例模式，还可以配置它的生命周期方法：首先，在类中声明2个方法，这2个方法都应该是<code>public</code>方法，返回值都是<code>void</code>，方法名称可以自由定义，方法必须没有参数，例如：</p><div class="language-java" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;User.init()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;User.destroy()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre></div><p>然后，在Spring的配置文件中，在<code>&lt;bean&gt;</code>节点中配置<code>init-method</code>和<code>destroy-method</code>属性，即可配置初始化方法和销毁方法，这2个属性的取值都是需要调用的方法的名称：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;bean id=&quot;user&quot;
      class=&quot;cn.tedu.spring.User&quot;
      scope=&quot;singleton&quot;
      lazy-init=&quot;true&quot;
      init-method=&quot;init&quot;
      destroy-method=&quot;destroy&quot;/&gt;
</code></pre></div><h2 id="spring的ioc" tabindex="-1"><a class="header-anchor" href="#spring的ioc" aria-hidden="true">#</a> Spring的IoC</h2><h3 id="什么是ioc" tabindex="-1"><a class="header-anchor" href="#什么是ioc" aria-hidden="true">#</a> 什么是IoC</h3><p>IoC表示Inversion of control，即“控制反转”。传统模式下，对象的创建与管理都是由开发人员编写代码直接完成的，而使用Spring后，将创建与管理交给了框架，则称之为控制反转。</p><p>其中，比较重要的环节是为对象的某些属性进行赋值，称之为DI，即Dependency Injection，表示“依赖注入”，通俗的来说，是为其属性赋值，也称之为“为其属性注入值”。</p><p>Spring通过DI实现了IoC，即DI是实现手段，而IoC是需要实现的目标。</p><h3 id="通过set方式注入属性的值" tabindex="-1"><a class="header-anchor" href="#通过set方式注入属性的值" aria-hidden="true">#</a> 通过SET方式注入属性的值</h3><p>假设<code>User</code>类中有名为<code>name</code>的属性，需要为该属性注入值，首先，需要为该属性添加SET/GET方法(其实只有SET方法是必须的)：</p><div class="language-java" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre></div><p>然后，在<code>&lt;bean&gt;</code>节点子级添加<code>&lt;property&gt;</code>节点进行配置：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;bean id=&quot;user&quot;
      class=&quot;cn.tedu.spring.User&quot;&gt;
    &lt;!-- 使用property节点为属性注入值 --&gt;
    &lt;!-- name：属性名 --&gt;
    &lt;!-- value：属性值 --&gt;
    &lt;property name=&quot;name&quot; value=&quot;Kitty&quot;&gt;&lt;/property&gt;
&lt;/bean&gt;
</code></pre></div><p>其实，框架在处理时，发现有<code>&lt;property&gt;</code>节点，就会尝试为属性赋值，它会基于该节点的<code>name</code>属性值得到SET方法的名称，规则就是<code>set</code>加上属性名且首字母改为大写，得到SET方法名称，如果属性名称是<code>name</code><br> ，则框架将调用的方法就是<code>setName</code>，如果属性名称是<code>password</code>，则框架将调用的方法已经<code>setPassword</code>，然后，将<code>value</code><br> 属性对应的值，作为将调用的方法的参数，以上示例代码中的配置，使得框架将调用<code>对象.setName(&quot;Kityy&quot;);</code>语句。</p><p>所以，在<code>&lt;property&gt;</code>节点中，<code>name</code>属性配置的其实是SET方法的方法名右侧的部分，且首字母改为小写！</p><p>但是，在实际使用时，SET方法都是由开发工具自动生成，生成规则与Spring框架处理时的规则是完全相同的，所以，也可以<strong>简单的认为</strong><code>&lt;property&gt;</code>节点中配置的<code>name</code>就是属性的名称！</p><p>在某些情况下，需要注入的属性值并不是基本值(可以直接书写的值，例如数值、字符串等)，而是另一个类的对象时，可以先使得Spring也管理另一个类的对象，然后，注入值时，通过<code>ref</code>属性引用那个<code>&lt;bean&gt;</code>即可：</p><h3 id="通过构造方法注入属性的值-不常用" tabindex="-1"><a class="header-anchor" href="#通过构造方法注入属性的值-不常用" aria-hidden="true">#</a> 通过构造方法注入属性的值（不常用）</h3><p>如果某个属性是通过构造方法设置值的，例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
	
		<span class="token comment">// 25</span>
		<span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
	
		<span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	
		<span class="token annotation punctuation">@Override</span>
		<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token string">&quot;Person [age=&quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则在配置时，应该使用<code>&lt;constructor-arg&gt;</code>节点进行配置：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;bean id=&quot;person&quot; class=&quot;cn.tedu.spring.Person&quot;&gt;
    &lt;constructor-arg index=&quot;0&quot; value=&quot;25&quot;/&gt;
&lt;/bean&gt;
</code></pre></div><p>以上属性的配置中，<code>index</code>表示第几个参数，从0开始顺序编号，然后，根据值的类型选择使用<code>value</code>或<code>ref</code>属性进行配置即可！</p><h3 id="注入集合类型的值" tabindex="-1"><a class="header-anchor" href="#注入集合类型的值" aria-hidden="true">#</a> 注入集合类型的值</h3><p>如果某个类中的属性是<code>List</code>集合类型的，并需要注入值：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SampleBean</span> <span class="token punctuation">{</span>
		
		<span class="token comment">// Alex, Lucy, Kitty, Henry</span>
		<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> names<span class="token punctuation">;</span>
	
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setNames</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> names<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>names <span class="token operator">=</span> names<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在Spring的配置文件中：</p><div class="language-xm line-numbers-mode" data-ext="xm"><pre class="language-xm"><code>&lt;bean id=&quot;sampleBean&quot;
      class=&quot;cn.tedu.spring.SampleBean&quot;&gt;
    &lt;property name=&quot;names&quot;&gt;
        &lt;list&gt;
            &lt;value&gt;Alex&lt;/value&gt;
            &lt;value&gt;Lucy&lt;/value&gt;
            &lt;value&gt;Kitty&lt;/value&gt;
            &lt;value&gt;Henry&lt;/value&gt;
        &lt;/list&gt;
    &lt;/property&gt;
&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要注入<code>Set</code>类型的值，例如：</p><div class="language-java" data-ext="java"><pre class="language-java"><code>	<span class="token comment">// Beijing, Shanghai, Guangzhou, Shenzhen</span>
	<span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> cities<span class="token punctuation">;</span>
</code></pre></div><p>在配置注入时，使用<code>&lt;set&gt;</code>节点即可：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;property name=&quot;cities&quot;&gt;
    &lt;set&gt;
        &lt;value&gt;Beijing&lt;/value&gt;
        &lt;value&gt;Shanghai&lt;/value&gt;
        &lt;value&gt;Guangzhou&lt;/value&gt;
        &lt;value&gt;Shenzhen&lt;/value&gt;
    &lt;/set&gt;
&lt;/property&gt;
</code></pre></div><p>另外，关于<code>Map</code>类型集合的配置例如：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;property name=&quot;session&quot;&gt;
    &lt;map&gt;
        &lt;entry key=&quot;username&quot; value=&quot;Jack&quot;/&gt;
        &lt;entry key=&quot;password&quot; value=&quot;1234&quot;/&gt;
        &lt;entry key=&quot;from&quot; value=&quot;Nanjing&quot;/&gt;
    &lt;/map&gt;
&lt;/property&gt;
</code></pre></div><p>关于数组类型集合的配置例如：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;property name=&quot;numbers&quot;&gt;
    &lt;array&gt;
        &lt;value&gt;9&lt;/value&gt;
        &lt;value&gt;5&lt;/value&gt;
        &lt;value&gt;2&lt;/value&gt;
        &lt;value&gt;7&lt;/value&gt;
    &lt;/array&gt;
&lt;/property&gt;
</code></pre></div><blockquote><p>在配置数组时，也可以使用<code>&lt;list&gt;</code>节点，反之，在配置<code>List</code>集合时，也可以使用<code>&lt;array&gt;</code>节点，但是，推荐使用匹配的节点进行配置。</p></blockquote><p>关于<code>Properties</code>类型的配置：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;property name=&quot;config&quot;&gt;
    &lt;props&gt;
        &lt;prop key=&quot;driver&quot;&gt;com.mysql.jdbc.Driver&lt;/prop&gt;
        &lt;prop key=&quot;username&quot;&gt;root&lt;/prop&gt;
        &lt;prop key=&quot;password&quot;&gt;root&lt;/prop&gt;
    &lt;/props&gt;
&lt;/property&gt;
</code></pre></div><p>在配置以上集合类型的值时，也可以事先使用例如<code>&lt;util:list&gt;</code>这类节点先将值配置好：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;util:list id=&quot;names&quot;&gt;
    &lt;value&gt;Tom&lt;/value&gt;
    &lt;value&gt;Alex&lt;/value&gt;
    &lt;value&gt;Lucy&lt;/value&gt;
    &lt;value&gt;Kitty&lt;/value&gt;
    &lt;value&gt;Henry&lt;/value&gt;
&lt;/util:list&gt;
</code></pre></div><p>然后再注入到属性中：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;property name=&quot;names&quot; ref=&quot;names&quot;/&gt;
</code></pre></div><p>比较特殊的是读取<code>Properties</code>类型的数据，在Spring中，可以通过<code>&lt;util:properties&gt;</code>节点的<code>location</code>属性指定需要读取的文件：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;util:properties id=&quot;config&quot;
                 location=&quot;classpath:db.properties&quot;/&gt;
</code></pre></div><p>然后，就可以注入到相应的属性中：</p><div class="language-xm" data-ext="xm"><pre class="language-xm"><code>&lt;property name=&quot;config&quot; ref=&quot;config&quot;/&gt;
</code></pre></div>`,54);function d(r,g){return t(),s("div",null,[l,i,e(" more "),u])}const m=a(c,[["render",d],["__file","2101202011.html.vue"]]);export{m as default};
