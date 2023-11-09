import{_ as n,o as s,c as e,e as a}from"./app-56ee31f8.js";const i={},l=a(`<h1 id="redis高可用集群-redis-cluster" tabindex="-1"><a class="header-anchor" href="#redis高可用集群-redis-cluster" aria-hidden="true">#</a> Redis高可用集群（Redis Cluster）</h1><p>redis集群是一个又多个<strong>主从节点群</strong>组成的<strong>分布式服务器群</strong>，它具有<strong>复制、高可用和分片</strong><br> 的特性。redis集群不需要sentinel哨兵也能完成节点移除和故障转移的功能。需要将每个节点设置成集群模式，这种集群模式没有中心节点，可水平扩展。根据官方文档称，可线性扩展到上万个节点（推荐不超过1W个节点）。redis集群的性能和高可用性均优于**<br> 哨兵模式**，且配置简单。</p><h2 id="搭建" tabindex="-1"><a class="header-anchor" href="#搭建" aria-hidden="true">#</a> 搭建</h2><p>redis集群搭建<strong>至少需要三个master</strong>节点，搭建的每个master再搭建一个或多个slave节点。每个主从节点之间会形成一个小的节点集群，小的节点集群也会进行主节点的选举。</p><blockquote><p>注意：集群的slave不支持读写，为了方便水平扩展，集群所有的读写都是通过master节点来完成的，slave节点仅用于备份数据，在master挂掉之后进行选举新的master节点</p></blockquote><p>搭建步骤：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#1.在第一台机器的 /usr/local目录下创建文件夹redis-cluster，然后在其下面分别创建2个文件夹</span>
<span class="token function">mkdir</span> -p/usr/local/redis-cluster
<span class="token function">mkdir</span> <span class="token number">8001</span> <span class="token number">8004</span>

<span class="token comment">#2.把redis-cof配置文件copy到8001下，并修改成以下内容：</span>
daemonize <span class="token function">yes</span>
<span class="token comment">#每台机器的端口号都要设置</span>
port <span class="token number">8001</span>
<span class="token comment">#指定数据文件存放位置，必须指定在不同目录位置</span>
<span class="token function">dir</span> /usr/local/redis-cluster/8001
<span class="token comment">#开启集群模式</span>
cluster-enabled <span class="token function">yes</span>
<span class="token comment">#集群节点信息文件，这里800x最好对应port</span>
cluster-config-file nodes-8001.config
<span class="token comment">#节点超时时间</span>
custer-node-timeout <span class="token number">5000</span>
<span class="token comment">#bind绑定的是自己机器的网卡ip，如果有多个网卡可以配置多个ip，代表允许客户端通过机器的哪些ip去访问，内网一般不配置bind，注释掉即可</span>
<span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1
<span class="token comment">#关闭保护模式</span>
protected-mode no

appendonly <span class="token function">yes</span>
<span class="token comment"># 设置redis访问密码</span>
requirepass xxx
<span class="token comment">#设置集群节点间访问密码</span>
masterauth xxx

<span class="token comment">#3.把修改好的配置文件，copy到8004，修改port、dir、clster-config-file里的端口</span>

<span class="token comment">#4.另外两台机器重复上面3步</span>

<span class="token comment">#5.分别启动6个redis实例</span>

<span class="token comment">#6.用reids-cli创建整个redis集群（以前的版本集群是依靠ruby脚本redis - trib.rb实现）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),c=[l];function d(r,t){return s(),e("div",null,c)}const m=n(i,[["render",d],["__file","2305091744.html.vue"]]);export{m as default};
