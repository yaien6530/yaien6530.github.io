import{_ as s,Q as a,a3 as t,a6 as e,a4 as n,a5 as p,a7 as o}from"./framework-94ca7993.js";const i={},c=n("h1",{id:"服务导出-服务注册",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#服务导出-服务注册","aria-hidden":"true"},"#"),p(" 服务导出（服务注册）")],-1),l=n("p",null,"本文主要记录学习Dubbo 整合 Spring 的源码笔记。记录服务导出（注册源码）的学习笔记。",-1),u=o(`<p>服务导出（服务注册）的核心方法是ServiceBean对象中监听器里的export();调用时机是在Spring容器启动完成之后发布的完成事件， ServiceBean通过监听该事件然后去进行服务导出（服务注册）。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onApplicationEvent</span><span class="token punctuation">(</span><span class="token class-name">ContextRefreshedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前服务没有被导出并且没有卸载，才导出服务</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isExported</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isUnexported</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isInfoEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;The service ready on spring started. service: &quot;</span> <span class="token operator">+</span> <span class="token function">getInterface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 服务导出（服务注册）</span>
            <span class="token function">export</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="大体流程" tabindex="-1"><a class="header-anchor" href="#大体流程" aria-hidden="true">#</a> 大体流程</h2><p>主要做三件事</p><ol><li>读取配置 <blockquote><p>读取配置其实就是要获取dubbo服务在启动时的一些配置信息，例如@Service注解、config文件等。 其实这些在服务注册前就已经有一些配置解析好保存到ServiceBean中了，而读取配置真正意义上来说是读取当前服务 <strong>最新（优先级最高的）、最全</strong>的配置。</p></blockquote></li><li>服务注册（导出） <blockquote><p>获取注册中心地址，生成服务提供者服务地址，注将服务地址注册到注册中心</p></blockquote></li><li>启动Netty/Tomcat <blockquote><p>如果是dubbo协议，启动的是Netty，Rest启动的是Tomcat</p></blockquote></li><li>服务提供者监听配置更新 <blockquote><p>服务提供者会监听配置中心配置的变更，修改本地配置</p></blockquote></li></ol><h2 id="checkandupdatesubconfigs" tabindex="-1"><a class="header-anchor" href="#checkandupdatesubconfigs" aria-hidden="true">#</a> checkAndUpdateSubConfigs()</h2><ul><li>补全配置，ServiceConfig中的某些属性如果是空的，那么就从ProviderConfig、ModuleConfig、ApplicationConfig中获取并补全</li><li>连接配置中心 <ul><li>获取配置中心数据，包括全局和应用配置,放到externalConfigurationMap和appExternalConfigurationMap中</li><li>刷新所有的xxxConfig中的属性（除了ServiceCOnfig），即覆盖掉对象里面的属性值</li></ul></li><li>进行一系列的检查</li><li>判断protocol是不是只有injvm协议，不是即服务调用不只是在本机jvm里调用，需要用到注册中心，然后会校验是否有配置了注册中心的地址</li><li>刷新ServiceConfig，刷新某个服务的配置 <ul><li>创建一个Configuration列表，用compositeConfiguration进行封装。用来存各个位置的配置 <ul><li>（JVM环境变量、操作系统环境变量、配置中心APP配置、配置中心Global配置、dubbo中的properties文件配置）</li></ul></li><li>校验configCenterFirst配置，是否配置中心配置优先，默认true，根据这个来处理配置优先级 <ul><li>true ：SystemConfiguration -&gt; AppExternalConfiguration -&gt; ExternalConfiguration -&gt; AbstractConfig -&gt; PropertiesConfiguration</li><li>false ：SystemConfiguration -&gt; AbstractConfig -&gt; AppExternalConfiguration -&gt; ExternalConfiguration -&gt; PropertiesConfiguration</li><li>按照以上顺序存到Configuration列表中</li></ul></li><li>覆盖ServiceBean中的配置 <ul><li>便利ServiceBean中的方法</li><li>是set方法 <ul><li>截取方法名，获取属性名</li><li>通过属性名从compositeConfiguration按优先级获取，获取到覆盖ServiceBean中的属性值并返回</li></ul></li><li>是setParameters方法 <ul><li>获取parameter配置项的value</li><li>覆盖ServiceBean中的属性值并返回</li></ul></li></ul></li></ul></li></ul><h3 id="刷新serviceconfig配置的源码" tabindex="-1"><a class="header-anchor" href="#刷新serviceconfig配置的源码" aria-hidden="true">#</a> 刷新ServiceConfig配置的源码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">CompositeConfiguration</span> compositeConfiguration <span class="token operator">=</span> <span class="token class-name">Environment</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getConfiguration</span><span class="token punctuation">(</span><span class="token function">getPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 表示XxConfig对象本身- AbstractConfig</span>
            <span class="token class-name">Configuration</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConfigConfigurationAdapter</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// ServiceConfig</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Environment</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isConfigCenterFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// The sequence would be: SystemConfiguration -&gt; AppExternalConfiguration -&gt; ExternalConfiguration -&gt; AbstractConfig -&gt; PropertiesConfiguration</span>
                compositeConfiguration<span class="token punctuation">.</span><span class="token function">addConfiguration</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// The sequence would be: SystemConfiguration -&gt; AbstractConfig -&gt; AppExternalConfiguration -&gt; ExternalConfiguration -&gt; PropertiesConfiguration</span>
                compositeConfiguration<span class="token punctuation">.</span><span class="token function">addConfiguration</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// loop methods, get override value and set the new value back to method</span>
            <span class="token class-name">Method</span><span class="token punctuation">[</span><span class="token punctuation">]</span> methods <span class="token operator">=</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//ServiceBean</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Method</span> method <span class="token operator">:</span> methods<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 是不是setXX()方法</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">MethodUtils</span><span class="token punctuation">.</span><span class="token function">isSetter</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 获取xx配置项的value</span>
                    <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span>compositeConfiguration<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token function">extractPropertyName</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> method<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// isTypeMatch() is called to avoid duplicate and incorrect update, for example, we have two &#39;setGeneric&#39; methods in ReferenceConfig.</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">ClassUtils</span><span class="token punctuation">.</span><span class="token function">isTypeMatch</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getParameterTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        method<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token class-name">ClassUtils</span><span class="token punctuation">.</span><span class="token function">convertPrimitive</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getParameterTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                  <span class="token comment">// 是不是setParameters()方法</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isParametersSetter</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 获取parameter配置项的value</span>
                    <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span>compositeConfiguration<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token function">extractPropertyName</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> method<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token function">invokeGetParameters</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        map <span class="token operator">=</span> map <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> map<span class="token punctuation">;</span>
                        map<span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span><span class="token function">convert</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">parseParameters</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token function">invokeSetParameters</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to override &quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="export" tabindex="-1"><a class="header-anchor" href="#export" aria-hidden="true">#</a> export</h3><p>校验是否执行服务导出，通过属性可进行配置，默认true</p><h3 id="delay" tabindex="-1"><a class="header-anchor" href="#delay" aria-hidden="true">#</a> delay</h3><p>校验是否延迟导出，通过delay属性可进行配置，默认0不延迟（毫秒）</p><h2 id="doexport" tabindex="-1"><a class="header-anchor" href="#doexport" aria-hidden="true">#</a> doExport()</h2><p>调用doExport方法进行服务导出</p><h3 id="loadregistries" tabindex="-1"><a class="header-anchor" href="#loadregistries" aria-hidden="true">#</a> loadRegistries()</h3><p>loadRegistries方法主要做的事情就是获取配置用户配置的注册中心，最终会返回一个URL列表，一个URL就代表一个注册中心地址，URL的内容如下：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>registry://1.12.242.126:2181/org.apache.dubbo.registry.RegistryService?application=dubbo-demo-provider1-application&amp;dubbo=2.0.2&amp;logger=log4j&amp;pid=93947&amp;registry=zookeeper&amp;release=2.7.0&amp;timeout=3000&amp;timestamp=1684854503882
</code></pre></div><blockquote><p>此时URL并没有标识是使用zookeeper或者nacos，而是先试用<strong>registry</strong>进行标识</p></blockquote><h3 id="doexporturlsfor1protocol" tabindex="-1"><a class="header-anchor" href="#doexporturlsfor1protocol" aria-hidden="true">#</a> doExportUrlsFor1Protocol()</h3><p>这个方法主要做的事情就是为每一个协议，都导出一个服务。例如提供者提供了一个UserService服务，但是我配置了两个协议，那此时就会生成两个UserService服务地址，并且都会注册到所有的注册中心上。</p><p>具体实现流程</p><ul><li>获取协议名称，没有默认就是dubbo</li><li>构建一个map，用来存服务url的参数，并往map中填值</li><li>构建Token，Token是为了防止服务被消费者直接调用（伪造http请求） <ul><li>token生成规则：如果没有配则没有，配置true或者default自动通过uuid生成，否者使用配置的字符做token</li></ul></li><li>构建服务URL</li><li>生成一个当前服务接口的代理对象，使用代理对象生成一个Invoker，Invoker表示服务提供者的代理，可以使用Invoker的invoke方法执行服务</li><li>封装DelegateProviderMetaDataInvoker,包括了Invoker和服务的配置</li><li>导出服务&amp;服务注册 <ul><li>从invoker种获取注册中心URL（registerUrl）和服务提供者URL（providerUrl）</li><li>在providerUrl的基础上生成overrideSubscribeUrl，这个是老版本的动态配置监听url，表示了需要监听的服务以及监听的类型（configurators， 这是老版本上的动态配置）s</li><li>创建OverrideListener监听器，用来监听overrideSubscribeUrl配置变更（老版本）</li><li>添加两个监听器（新版本的监听器） <ul><li>providerConfigurationListener：表示应用级别的动态配置监听器，属于RegistyProtocol的一个属性</li><li>serviceConfigurationListener：表示服务级别的动态配置监听器，每暴露一个服务时就会生成一个</li></ul></li><li>通过两个监听器，重写providerUrl</li><li>使用重写过后的providerUrl，调用doLocalExport()进行服务导出</li><li>获取注册中心（通过SPI扩展点机制）</li><li>简化服务URL并注册到注册中心</li></ul></li></ul><h3 id="dolocalexport" tabindex="-1"><a class="header-anchor" href="#dolocalexport" aria-hidden="true">#</a> doLocalExport()</h3><p>此方法就是真正去执行服务导出的逻辑，里面会调用protocol.export(invokerDelegate)去导出服务</p><p>具体实现</p><ul><li>获取服务URL</li><li>通过URL生成一个key</li><li>构造一个Exporter进行服务导出</li><li>存到exporterMap中</li><li>调用openServer启动Netty/Tomcat</li></ul><h2 id="服务提供者监听配置更新" tabindex="-1"><a class="header-anchor" href="#服务提供者监听配置更新" aria-hidden="true">#</a> 服务提供者监听配置更新</h2><p>服务提供者主要监听动态配置，在服务运行是时可以动态修改服务配置，会监听三个节点，一个是老版本的节点以及两个新节点</p><h2 id="补充" tabindex="-1"><a class="header-anchor" href="#补充" aria-hidden="true">#</a> 补充</h2><p>当dubbo的某一个服务导出完了之后，会发布一个Spring的时间，如果想知道某个服务是否已经导出完毕，可以监听ServiceBeanExportedEvent实现。</p>`,31);function r(k,d){return a(),t("div",null,[c,l,e(" more "),u])}const m=s(i,[["render",r],["__file","2305191622.html.vue"]]);export{m as default};