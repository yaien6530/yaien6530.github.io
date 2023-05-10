import{_ as s,X as a,Y as t,a0 as p,Z as n,$ as e,a2 as c}from"./framework-4115b8f2.js";const o={},l=n("h1",{id:"springmvc-基础-三",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#springmvc-基础-三","aria-hidden":"true"},"#"),e(" SpringMVC 基础（三）")],-1),i=n("p",null,"SpringMVC 基础笔记系列",-1),u=c(`<h2 id="springmvc中的拦截器-interceptor" tabindex="-1"><a class="header-anchor" href="#springmvc中的拦截器-interceptor" aria-hidden="true">#</a> SpringMVC中的拦截器(Interceptor)</h2><h3 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h3><p>在SpringMVC中的拦截器可以是运行在控制器(Controller)之前的组件，可以设置拦截器应用于哪些请求路径，当发生这些请求时，拦截器会自动执行，在执行过程中，可以对请求相关数据进行判断，选择阻止继续向后执行，或选择放行。</p><p><strong>注意：拦截器是一个若干种请求都会经历的执行过程，但是，并不一定需要阻止继续运行，只要是若干种请求都需要做相同的事情，也许每种请求的处理过程都是选择放行，也可以使用拦截器。</strong></p><h3 id="开发拦截器" tabindex="-1"><a class="header-anchor" href="#开发拦截器" aria-hidden="true">#</a> 开发拦截器</h3><p>首先，所有的拦截器类都必须实现<code>HandlerInterceptor</code>接口，可以自定义<code>LoginInterceptor</code>：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">HandlerInterceptor</span> <span class="token punctuation">{</span>
	
		<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span>
				<span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;LoginInterceptor.preHandle()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span>
				<span class="token class-name">ModelAndView</span> modelAndView<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;LoginInterceptor.postHandle()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterCompletion</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span> <span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
				<span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;LoginInterceptor.afterCompletion()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在拦截器的3个方法中，只有<code>preHandle()</code>方法是运行在控制器(Controller)之前的，另2个方法是运行在控制器之后的，所以，只有<code>preHandle()</code>具有真正意义的“拦截”功能，该方法的返回值是<code>boolean</code> 类型的，当返回<code>true</code>时表示放行，返回<code>false</code>时将阻止继续向后执行，即控制器并不会被执行：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span>
			<span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;LoginInterceptor.preHandle()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 获取Session</span>
		<span class="token class-name">HttpSession</span> session <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 检查Session中是否有登录信息</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;uid&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 没有登录信息，重定向到登录页</span>
			response<span class="token punctuation">.</span><span class="token function">sendRedirect</span><span class="token punctuation">(</span><span class="token string">&quot;../user/login.do&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 执行拦截</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> 
		<span class="token comment">// 放行</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：即使已经决定了重定向，还是需要return false;否则处理流程会继续向执行，控制器中的方法还是会被调用，达不到阻止运行的效果！</strong></p><p>所有的拦截器都需要在Spring的配置文件中进行配置，在SpringMVC框架中，允许使用若干个拦截器，形成拦截器链，即某个请求可能需要经过多个拦截器，仅当每个拦截器都放行时，才会执行控制器中的方法！在配置文件中，配置的先后顺序决定了多个拦截器的执行顺序：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>interceptors</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 配置第1个拦截器 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 拦截路径 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/main/index.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token comment">&lt;!-- 拦截器类 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cn.tedu.spring.LoginInterceptor<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 配置第2个拦截器 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">mvc:</span>interceptors</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置每个拦截器时，允许使用若干个<code>&lt;mvc:mapping&gt;</code>节点以配置若干个拦截路径，例如：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截路径 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/main/index.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/password.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/info.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/handle_password.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/handle_info.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截器类 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cn.tedu.spring.LoginInterceptor<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置路径，还可以使用<code>*</code>作为通配符，例如：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截路径 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/main/*<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截器类 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cn.tedu.spring.LoginInterceptor<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用<code>*</code>作为通配符时，需要注意，1个星号只能匹配1层路径，例如<code>/main/*</code>可以匹配上<code>/main/index.do</code>，也可以匹配<code>/main/hello.do</code>，但是，不可以匹配上<code>/main/a/index.do</code>！</p><p>如果一定要匹配若干层路径，必须使用2个星号，例如配置为<code>/main/**</code>，可以匹配上<code>/main/index.do</code>，也可以匹配<code>/main/a/hello.do</code>，甚至可以匹配<code>/main/a/b/c/d/hello.do</code> ，即无视路径中后续的层级。</p><p>所以，可以配置为：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截路径 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/main/**<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/**<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截器类 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cn.tedu.spring.LoginInterceptor<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果通配符匹配的路径过多，需要从中去除某些请求路径，还可以添加例外：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截路径：黑名单 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/main/**<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/**<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!-- 例外路径：白名单 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>exclude-mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/reg.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>exclude-mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/handle_reg.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>exclude-mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/login.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mvc:</span>exclude-mapping</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/user/handle_login.do<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!-- 拦截器类 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cn.tedu.spring.LoginInterceptor<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">mvc:</span>interceptor</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，凡<code>/user/</code>下的路径都会经过该拦截器，但是，<code>/user/login.do</code>是不被处理的！添加到“例外”中的路径，在请求时，并不是拦截器直接放行，而是拦截器根本就不执行！</p><h2 id="请求参数的乱码解决方案" tabindex="-1"><a class="header-anchor" href="#请求参数的乱码解决方案" aria-hidden="true">#</a> 请求参数的乱码解决方案</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>node</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter-name</span><span class="token punctuation">&gt;</span></span>CharacterEncodingFilter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter-name</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter-class</span><span class="token punctuation">&gt;</span></span>org.springframework.web.filter.CharacterEncodingFilter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter-class</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>init-param</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-name</span><span class="token punctuation">&gt;</span></span>encoding<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-name</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-value</span><span class="token punctuation">&gt;</span></span>utf-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-value</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>init-param</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter-mapping</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter-name</span><span class="token punctuation">&gt;</span></span>CharacterEncodingFilter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter-name</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url-pattern</span><span class="token punctuation">&gt;</span></span>/*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url-pattern</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter-mapping</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>node</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在springmvc中统一处理异常" tabindex="-1"><a class="header-anchor" href="#在springmvc中统一处理异常" aria-hidden="true">#</a> 在SpringMVC中统一处理异常</h2><p>在Java中，异常的体系结构：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Throwable</span>
		<span class="token class-name">Error</span>
			<span class="token class-name">OutOfMemoryError</span>
		<span class="token class-name">Exception</span>
			<span class="token class-name">SQLException</span>
			<span class="token class-name">IOException</span>
				<span class="token class-name">FileNotFoundException</span>
			<span class="token class-name">RuntimeException</span>
				<span class="token class-name">NullPointerException</span>
				<span class="token class-name">ClassCastException</span>
				<span class="token class-name">NumberFormatException</span>
				<span class="token class-name">IndexOutOfBoundsException</span>
					<span class="token class-name">ArrayIndexOutOfBoundsException</span>
					<span class="token class-name">StringIndexOutOfBoundsException</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>Exception</code>中，除了<code>RuntimeException</code>及其子孙类异常，其它的异常都是必须通过语法进行处理的！处理方式可以是<code>try...catch</code>进行捕获并处理，也可以是在方法的签名中添加<code>throws</code>声明抛出。</p><p>其实，处理异常的本质应该是：给予用户某些提示，告之操作失败的原因，避免用户再次提交错误的数据，另外，也可能在处理过程中，对已经发生的错误尽可能的补救，例如关闭某些已经打开的流对象。</p><p>某一种异常在项目的多个请求处理过程中，都可能出现，在SpringMVC中，提供了统一处理异常的做法：将<code>@ExceptionHandler</code>添加在自定义的用于处理异常的方法之前，该自定义方法应该：</p><ol><li><p>使用<code>public</code>权限；</p></li><li><p>返回值的设计原则与处理请求的方法的相同；</p></li><li><p>方法名称可以自由定义；</p></li><li><p>方法中必须添加异常类型的参数，另外还可以添加例如<code>HttpServletRequest</code>等参数，但不可以添加其它参数。</p></li></ol><p>例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">IndexOutOfBoundsException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">handleException</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">,</span> <span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">String</span> errorMessage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token keyword">instanceof</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			errorMessage <span class="token operator">=</span> <span class="token string">&quot;错误：请提交用户名！&quot;</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token keyword">instanceof</span> <span class="token class-name">IndexOutOfBoundsException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			errorMessage <span class="token operator">=</span> <span class="token string">&quot;错误：使用的索引超出了界限！&quot;</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span> errorMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token string">&quot;error&quot;</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>@ExceptionHandler</code>注解中，可以配置需要处理的异常的种类，当配置后，仅当指定的异常出现时，才会调用匹配的方法进行处理，而其它异常是不予处理的！如果没有配置需要处理哪些异常，则任何异常出现都会进行处理！</p><p>在处理时，<code>@ExceptionHandler</code>只能作用于当前控制器类！</p>`,36);function k(r,d){return a(),t("div",null,[l,i,p(" more "),u])}const v=s(o,[["render",k],["__file","2102202012.html.vue"]]);export{v as default};
