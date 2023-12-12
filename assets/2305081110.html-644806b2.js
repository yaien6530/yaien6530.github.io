import{_ as c,r as l,o,c as p,d as r,a,b as n,f as e,e as t}from"./app-9a704562.js";const i={},u=a("h1",{id:"docker搭建nacos单机",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#docker搭建nacos单机","aria-hidden":"true"},"#"),n(" Docker搭建Nacos单机")],-1),d=a("p",null,"本文记录Docker容器安装Nacos单机环境的详细步骤",-1),v=t(`<h2 id="使用-docker-pull-nacos-nacos-server-拉取nacos镜像" tabindex="-1"><a class="header-anchor" href="#使用-docker-pull-nacos-nacos-server-拉取nacos镜像" aria-hidden="true">#</a> 使用 <code>docker pull nacos/nacos-server</code> 拉取nacos镜像</h2><p>我这里没有指定版本所以是拉取latest，你也可以使用 <code>docker pull nacos/nacos-server:版本号</code> 指定拉取的版本</p><figure><img src="https://img2020.cnblogs.com/blog/1543487/202109/1543487-20210924095204657-444502364.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="二、使用命令启动容器" tabindex="-1"><a class="header-anchor" href="#二、使用命令启动容器" aria-hidden="true">#</a> 二、使用命令启动容器</h2><p><strong>注意：如果只是简单的学习使用直接用下面的命令就好了。 但是nacos所有元数据都会保存在容器内部，如果容器迁移会导致nacos元数据不复存在，<br> 所以通常我们通常会将nacos元数据保存在mysql中，那么请不要用下面这个命令，继续从第三步接着操作。</strong></p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> nacos <span class="token parameter variable">-p</span> <span class="token number">8848</span>:8848 <span class="token parameter variable">-e</span> <span class="token assign-left variable">PREFER_HOST_MODE</span><span class="token operator">=</span>hostname <span class="token parameter variable">-e</span> <span class="token assign-left variable">MODE</span><span class="token operator">=</span>standalone nacos/nacos-server
</code></pre></div>`,6),m={href:"http://xn--ip-mn6c22jkc30cb73c:8848/nacos",target:"_blank",rel:"noopener noreferrer"},k=t(`<h2 id="三、创建nacos的挂载目录" tabindex="-1"><a class="header-anchor" href="#三、创建nacos的挂载目录" aria-hidden="true">#</a> 三、创建nacos的挂载目录</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/nacos/logs/
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/nacos/init.d/
</code></pre></div><h2 id="四、创建nacos配置文件" tabindex="-1"><a class="header-anchor" href="#四、创建nacos配置文件" aria-hidden="true">#</a> 四、创建nacos配置文件</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /home/nacos/init.d/custom.properties
</code></pre></div><p>如果出现提示没有vim命令可以把vim改为vi或者自己先安装一下vim</p><p>nacos需要的数据库创建sql</p><div class="language-text" data-ext="text"><pre class="language-text"><code>https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql
</code></pre></div><h2 id="五、在刚刚创建的配置文件中写入下面内容" tabindex="-1"><a class="header-anchor" href="#五、在刚刚创建的配置文件中写入下面内容" aria-hidden="true">#</a> 五、在刚刚创建的配置文件中写入下面内容</h2><p><strong>注意：请把下面内容中的db.url，db.user，db.pass改为你自己的mysql的信息</strong></p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token key attr-name">server.contextPath</span><span class="token punctuation">=</span><span class="token value attr-value">/nacos</span>
<span class="token key attr-name">server.servlet.contextPath</span><span class="token punctuation">=</span><span class="token value attr-value">/nacos</span>
<span class="token key attr-name">server.port</span><span class="token punctuation">=</span><span class="token value attr-value">8848</span>

<span class="token key attr-name">spring.datasource.platform</span><span class="token punctuation">=</span><span class="token value attr-value">mysql</span>

<span class="token key attr-name">db.num</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">db.url.0</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://xx.xx.xx.xx:3306/nacos?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true</span>
<span class="token key attr-name">db.user</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">db.password</span><span class="token punctuation">=</span><span class="token value attr-value">123456</span>

<span class="token key attr-name">nacos.cmdb.dumpTaskInterval</span><span class="token punctuation">=</span><span class="token value attr-value">3600</span>
<span class="token key attr-name">nacos.cmdb.eventTaskInterval</span><span class="token punctuation">=</span><span class="token value attr-value">10</span>
<span class="token key attr-name">nacos.cmdb.labelTaskInterval</span><span class="token punctuation">=</span><span class="token value attr-value">300</span>
<span class="token key attr-name">nacos.cmdb.loadDataAtStart</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>

<span class="token key attr-name">management.metrics.export.elastic.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">management.metrics.export.influx.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>

<span class="token key attr-name">server.tomcat.accesslog.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">server.tomcat.accesslog.pattern</span><span class="token punctuation">=</span><span class="token value attr-value">%h %l %u %t &quot;%r&quot; %s %b %D %{User-Agent}i</span>

<span class="token key attr-name">nacos.security.ignore.urls</span><span class="token punctuation">=</span><span class="token value attr-value">/,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/v1/auth/login,/v1/console/health/**,/v1/cs/**,/v1/ns/**,/v1/cmdb/**,/actuator/**,/v1/console/server/**</span>
<span class="token key attr-name">nacos.naming.distro.taskDispatchThreadCount</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">nacos.naming.distro.taskDispatchPeriod</span><span class="token punctuation">=</span><span class="token value attr-value">200</span>
<span class="token key attr-name">nacos.naming.distro.batchSyncKeyCount</span><span class="token punctuation">=</span><span class="token value attr-value">1000</span>
<span class="token key attr-name">nacos.naming.distro.initDataRatio</span><span class="token punctuation">=</span><span class="token value attr-value">0.9</span>
<span class="token key attr-name">nacos.naming.distro.syncRetryDelay</span><span class="token punctuation">=</span><span class="token value attr-value">5000</span>
<span class="token key attr-name">nacos.naming.data.warmup</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">nacos.naming.expireInstance</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、启动容器" tabindex="-1"><a class="header-anchor" href="#六、启动容器" aria-hidden="true">#</a> 六、启动容器</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span>  run <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> nacos <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">8848</span>:8848 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">JVM_XMS</span><span class="token operator">=</span>256m <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">JVM_XMX</span><span class="token operator">=</span>256m <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MODE</span><span class="token operator">=</span>standalone <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">PREFER_HOST_MODE</span><span class="token operator">=</span>hostname <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /home/nacos/logs:/home/nacos/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /home/nacos/init.d/custom.properties:/home/nacos/init.d/custom.properties <span class="token punctuation">\\</span>
nacos/nacos-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img2020.cnblogs.com/blog/1543487/202109/1543487-20210924100625266-208338167.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="七、访问nacos" tabindex="-1"><a class="header-anchor" href="#七、访问nacos" aria-hidden="true">#</a> 七、访问nacos</h2>`,14),b={href:"http://xn--ip-mn6c22jkc30cb73c:8848/nacos",target:"_blank",rel:"noopener noreferrer"};function h(g,f){const s=l("ExternalLinkIcon");return o(),p("div",null,[u,d,r(" more "),v,a("p",null,[a("strong",null,[n("然后访问地址:"),a("a",m,[n("http://域名或ip地址:8848/nacos"),e(s)]),n(" 账号:nacos 密码:nacos")])]),k,a("p",null,[a("strong",null,[n("访问地址:"),a("a",b,[n("http://域名或ip地址:8848/nacos"),e(s)]),n(" 账号:nacos 密码:nacos")])])])}const y=c(i,[["render",h],["__file","2305081110.html.vue"]]);export{y as default};