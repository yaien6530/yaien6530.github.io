import{_ as n,o as a,c as s,e}from"./app-450c3553.js";const t={},p=e(`<h1 id="zookeeper基本使用" tabindex="-1"><a class="header-anchor" href="#zookeeper基本使用" aria-hidden="true">#</a> zookeeper基本使用</h1><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><blockquote><p>通常情况下，单个物理节点很容易达到性能，计算或者容量的瓶颈，所以这个时候就需要多个物理节点来共同完成某项任务，一个分布式系统的本质是分布在不同网络或计算机上的程序组件，彼此通过信息传递来协同工作的系统，而Zookeeper正是一个分布式应用协调框架，在分布式系统架构中有广泛的应用场景。</p></blockquote><p>官方文档解释：zookeeper它是一个分布式协调框架，是ApacheHadoop的一个子项目，它主要是用来解决分布式应用中经常遇到的一些数据管理问题，如：统一命名服务、状态同步服务、集群管理、分布式应用配置项的管理等</p><h2 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h2><p>一个基于内存，用于存储少量数据的数据库。核心概念：文件系统存储结构、监听通知机制</p><h2 id="文件系统存储结构" tabindex="-1"><a class="header-anchor" href="#文件系统存储结构" aria-hidden="true">#</a> 文件系统存储结构</h2><p>Zookeeper维护一个了类似文件系统的数据结构，每个子目录项都被称作为<strong>znode</strong> (目录节点)，和文件系统类似，我们能够自由的增加、删除znode，在一个znode下增加、删除子znode。</p><p>zookeeper有以下几种类型的znode：</p><blockquote><p>1、PERSISTENT­持久化目录节点客户端与zookeeper断开连接后，该节点依旧存在，只要不手动删除该节点，他将永远存在</p><p>2、PERSISTENT_SEQUENTIAL­持久化顺序编号目录节点客户端与zookeeper断开连接后，该节点依旧存在，只是Zookeeper给该节点名称进行顺序编号</p><p>3、EPHEMERAL­临时目录节点客户端与zookeeper断开连接后，该节点被删除</p><p>4、EPHEMERAL_SEQUENTIAL­临时顺序编号目录节点客户端与zookeeper断开连接后，该节点被删除，只是Zookeeper给该节点名称进行顺序编号</p><p>5、Container节点（3.5.3版本新增，如果Container节点下面没有子节点，则Container节点在未来会被Zookeeper自动清除,定时任务默认60s检查一次）</p><p>6、TTL节点(默认禁用，只能通过系统配置zookeeper.extendedTypesEnabled=true开启，不稳定</p></blockquote><h2 id="监听通知机制" tabindex="-1"><a class="header-anchor" href="#监听通知机制" aria-hidden="true">#</a> 监听通知机制</h2><p>客户端注册监听它关心的任意节点，或者目录节点及递归子目录节点。</p><blockquote><p>1.如果注册的是对某个节点的监听，则当这个节点被删除，或者被修改时，对应的客户端将被通知。</p><p>2.如果注册的是对某个目录的监听，则当这个目录有子节点被创建，或者有子节点被删除，对应的客户端将被通知。</p><p>3.如果注册的是对某个目录的递归子节点进行监听，则当这个目录下面的任意子节点有目录结构的变化（有子节点被创建，或被删除）或者根节点有数据变化时，对应的客户端将被通知。</p></blockquote><p>注意：所有的通知都是 <strong>一次性</strong> 的，及无论是对节点还是对目录进行的监听，一旦触发，对应的监听即被移除。递归子节点，监听是对所有子节点的，所以，每个子节点下面的事件同样只会被 <strong>触发一次</strong>。</p><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2><ol><li>分布式配置中心</li><li>分布式注册中心</li><li>分布式锁</li><li>分布式队列</li><li>分布式屏障</li><li>集群选举</li><li>发布/订阅</li></ol><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><blockquote><p>Step1：配置JAVA环境，并检查环境（建议JDK1.8）以上版本</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-version</span>
</code></pre></div><p>Step2：下载并解压zookeeper</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://mirror.bit.edu.cn/apache/zookeeper/zookeeper‐3.5.8/apache‐zookeeper‐3.5.8‐bin.tar.gz
<span class="token comment"># 此处若报错  XXXX use ‘--no-check-certificate’. 则在 wget后加入 --no-check-certificate 跳过证书检查</span>

<span class="token function">tar</span> ‐zxvf apache‐zookeeper‐3.5.8‐bin.tar.gz

<span class="token builtin class-name">cd</span> apache‐zookeeper‐3.5.8‐bin
</code></pre></div><p>Step3：进入/conf目录下重命名zoo_sample.cfg配置文件</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cp</span> zoo_sample.cfg zoo.cfg
</code></pre></div><p>Step4：修改配置文件,将数据文件路径变更为自定义文件地址</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>dataDir<span class="token operator">=</span><span class="token operator">/</span>opt<span class="token operator">/</span>zookeeper<span class="token operator">/</span>apache<span class="token operator">-</span>zookeeper<span class="token operator">-</span><span class="token number">3.5</span><span class="token number">.8</span><span class="token operator">-</span>bin<span class="token operator">/</span>data
</code></pre></div><p>Step5：启动</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 可通过 bin/zkServer.sh 查看支持的参数</span>
bin<span class="token operator">/</span>zkServer<span class="token punctuation">.</span>sh start conf<span class="token operator">/</span>zoo<span class="token punctuation">.</span>cfg
</code></pre></div><p>Step6：链接服务器</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 如果服务器与客户端在同一台机器，则可以省略ip和端口</span>
bin<span class="token operator">/</span>zkCli<span class="token punctuation">.</span>sh <span class="token operator">-</span>server <span class="token number">192.168</span><span class="token number">.1</span><span class="token number">.2</span><span class="token operator">:</span><span class="token number">2181</span>
</code></pre></div></blockquote><p>如下图即表示zookeeper安装成功</p><figure><img src="https://qiniu.yanggl.cn/image/2305110857_1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="基础命令" tabindex="-1"><a class="header-anchor" href="#基础命令" aria-hidden="true">#</a> 基础命令</h2><h2 id="help-查看zookeeper所支持的所有命令" tabindex="-1"><a class="header-anchor" href="#help-查看zookeeper所支持的所有命令" aria-hidden="true">#</a> help ：查看zookeeper所支持的所有命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ZooKeeper <span class="token parameter variable">-server</span> host:port cmd args
        addauth scheme auth
        close 
        config <span class="token punctuation">[</span>-c<span class="token punctuation">]</span> <span class="token punctuation">[</span>-w<span class="token punctuation">]</span> <span class="token punctuation">[</span>-s<span class="token punctuation">]</span>
        connect host:port
        create <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-e<span class="token punctuation">]</span> <span class="token punctuation">[</span>-c<span class="token punctuation">]</span> <span class="token punctuation">[</span>-t ttl<span class="token punctuation">]</span> path <span class="token punctuation">[</span>data<span class="token punctuation">]</span> <span class="token punctuation">[</span>acl<span class="token punctuation">]</span>
        delete <span class="token punctuation">[</span>-v version<span class="token punctuation">]</span> path
        deleteall path
        delquota <span class="token punctuation">[</span>-n<span class="token operator">|</span>-b<span class="token punctuation">]</span> path
        get <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-w<span class="token punctuation">]</span> path
        getAcl <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> path
        <span class="token function">history</span> 
        listquota path
        <span class="token function">ls</span> <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-w<span class="token punctuation">]</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> path
        ls2 path <span class="token punctuation">[</span>watch<span class="token punctuation">]</span>
        printwatches on<span class="token operator">|</span>off
        quit 
        reconfig <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-v version<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>-file path<span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token punctuation">[</span>-members <span class="token assign-left variable">serverID</span><span class="token operator">=</span>host:port1:port2<span class="token punctuation">;</span>port3<span class="token punctuation">[</span>,<span class="token punctuation">..</span>.<span class="token punctuation">]</span>*<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token punctuation">[</span>-add <span class="token assign-left variable">serverId</span><span class="token operator">=</span>host:port1:port2<span class="token punctuation">;</span>port3<span class="token punctuation">[</span>,<span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span>* <span class="token punctuation">[</span>-remove serverId<span class="token punctuation">[</span>,<span class="token punctuation">..</span>.<span class="token punctuation">]</span>*<span class="token punctuation">]</span>
        redo cmdno
        removewatches path <span class="token punctuation">[</span>-c<span class="token operator">|</span>-d<span class="token operator">|</span>-a<span class="token punctuation">]</span> <span class="token punctuation">[</span>-l<span class="token punctuation">]</span>
        rmr path
        <span class="token builtin class-name">set</span> <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-v version<span class="token punctuation">]</span> path data
        setAcl <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-v version<span class="token punctuation">]</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> path acl
        setquota -n<span class="token operator">|</span>-b val path
        <span class="token function">stat</span> <span class="token punctuation">[</span>-w<span class="token punctuation">]</span> path
        <span class="token function">sync</span> path
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：中括号为可选选项，否则为必填</p></blockquote><h2 id="create-创建新节点" tabindex="-1"><a class="header-anchor" href="#create-创建新节点" aria-hidden="true">#</a> create ：创建新节点</h2><blockquote><p>create [-s] [-e] [-c] [-t ttl] path [data] [acl]</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code># <span class="token operator">-</span>s：顺序结点
# <span class="token operator">-</span>e：临时结点
# <span class="token operator">-</span>c：容器结点
# <span class="token operator">-</span>t：给结点添加过期时间，默认禁用

create <span class="token operator">/</span>test<span class="token operator">-</span>node some<span class="token operator">-</span>data #没有添加任何参数，默认创建的是持久化结点

# 注意：
# <span class="token number">1.</span>由于zookeeper是一结点组织数据的，没有相对路径，所以所有结点都是以 <span class="token operator">/</span> 开头
# <span class="token number">2.</span>临时结点下不允许创建子节点
# <span class="token number">3.</span>容器结点当所有子节点都被删除时，下一次轮训会将容器结点清除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="get-查看结点" tabindex="-1"><a class="header-anchor" href="#get-查看结点" aria-hidden="true">#</a> get ：查看结点</h2><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>get <span class="token operator">/</span>test<span class="token operator">-</span>node
</code></pre></div><h2 id="set-修改结点" tabindex="-1"><a class="header-anchor" href="#set-修改结点" aria-hidden="true">#</a> set ：修改结点</h2><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>set <span class="token operator">/</span>test<span class="token operator">-</span>node update<span class="token operator">-</span>data
</code></pre></div><h2 id="stat-查看结点状态" tabindex="-1"><a class="header-anchor" href="#stat-查看结点状态" aria-hidden="true">#</a> stat ：查看结点状态</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">stat</span> /test-node

<span class="token comment"># 展示如下信息</span>
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">4</span><span class="token punctuation">]</span> <span class="token function">stat</span> /test-node 
// 创建znode的事务ID
cZxid <span class="token operator">=</span> 0x9
// 创建时间
ctime <span class="token operator">=</span> Fri Jan <span class="token number">28</span> <span class="token number">12</span>:11:58 CST <span class="token number">2022</span>
// 最后修改znode的事务ID
mZxid <span class="token operator">=</span> 0x9
// 最近修改时间
mtime <span class="token operator">=</span> Fri Jan <span class="token number">28</span> <span class="token number">12</span>:11:58 CST <span class="token number">2022</span>
// 最后添加或删除子节点的事务ID（子结点列表发生变化才会发生变化）
pZxid <span class="token operator">=</span> 0x9
// znode的子节点结果集版本（子节点的变更会影响版本）
cversion <span class="token operator">=</span> <span class="token number">0</span>
// 数据的版本，当进行set时可以带上此版本号，若set之间版本号已经变更则set失败
dataVersion <span class="token operator">=</span> <span class="token number">0</span>
aclVersion <span class="token operator">=</span> <span class="token number">0</span>
// 如果是临时结点，所有者为sessionID，否则此字段为0
ephemeralOwner <span class="token operator">=</span> 0x0
// 数据字段的长度（字节）
dataLength <span class="token operator">=</span> <span class="token number">11</span>
numChildren <span class="token operator">=</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ls-查看子节点信息" tabindex="-1"><a class="header-anchor" href="#ls-查看子节点信息" aria-hidden="true">#</a> ls ：查看子节点信息</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看根目录下字节点</span>
<span class="token function">ls</span> /

/**  
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">5</span><span class="token punctuation">]</span> <span class="token function">ls</span> /
<span class="token punctuation">[</span>test, test-node, zookeeper<span class="token punctuation">]</span>
*/
  
<span class="token comment">#查看根目录下所有节点</span>
<span class="token function">ls</span> <span class="token parameter variable">-R</span> /
/**
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">6</span><span class="token punctuation">]</span> <span class="token function">ls</span> <span class="token parameter variable">-R</span> /
/
/test
/test-node
/zookeeper
/test/sub0
/zookeeper/config
/zookeeper/quota
*/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件监听机制" tabindex="-1"><a class="header-anchor" href="#事件监听机制" aria-hidden="true">#</a> 事件监听机制</h2><p>针对结点的监听，一定会触发事件，并且该事件立即被移除，所以事件监听是一次性的。</p><p>推送的信息不会将变更的数据一并推送，仅仅通知客户端有数据变更，变更的数据需要自己去获取。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 注册监听的同时获取数据
get <span class="token parameter variable">-w</span> /path 

// 注册监听的同时获取元数据信息
<span class="token function">stat</span> <span class="token parameter variable">-w</span> /path

<span class="token comment"># 效果展示</span>

// 为 /test 结点注册监听
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">30</span><span class="token punctuation">]</span> get <span class="token parameter variable">-w</span> /test
xxx

//修改 /test 结点数据
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">]</span> <span class="token builtin class-name">set</span> /test xxx

// 服务端推送的变更信息
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">31</span><span class="token punctuation">]</span> 
WATCHER::

WatchedEvent state:SyncConnected type:NodeDataChanged path:/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>针对目录的监听，目录的变化会触发事件，且对应的监听也会被移除，后序结点的创建、删除不会再次触发监听事件。</p><p>注册目录监听，不会监听结点数据的变更，只会监听当前目录下结点数量的变更</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 为目录注册监听事件
<span class="token function">ls</span> <span class="token parameter variable">-w</span> /test

<span class="token comment"># 效果展示</span>
// 注册监听事件
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">31</span><span class="token punctuation">]</span> <span class="token function">ls</span> <span class="token parameter variable">-w</span> /test
<span class="token punctuation">[</span><span class="token punctuation">]</span>

// 新增子节点
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">32</span><span class="token punctuation">]</span> create /test/sub0


// 服务端推送内容
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">33</span><span class="token punctuation">]</span> 
WATCHER::

WatchedEvent state:SyncConnected type:NodeChildrenChanged path:/test
Created /test/sub0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Zookeeper的时间类型：</p><blockquote><p>None：连接建立事件</p><p>NodeCreate：节点创建</p><p>NodeDeleted：节点删除</p><p>NodeDataChanged：节点数据变化</p><p>NodeChildrenChanged：子节点列表变化</p><p>DataWatchRemoved：结点监听被删除</p><p>ChildWatchRemoved：子节点监听被删除</p></blockquote><h2 id="acl权限控制" tabindex="-1"><a class="header-anchor" href="#acl权限控制" aria-hidden="true">#</a> ACL权限控制</h2><p>Zookeeper的ACL权限控制可以控制节点的读写操作，保障数据的安全性，Zookeeper ACL权限设置分为三部分组成：<strong>权限模式</strong>（Scheme）、<strong>授权对象</strong>（ID）、<strong>权限信息</strong>（Permission）。最终组成 <strong>&quot;scheme : id : permission&quot;</strong> 格式的ACL请求信息。</p><h2 id="scheme-权限模式" tabindex="-1"><a class="header-anchor" href="#scheme-权限模式" aria-hidden="true">#</a> Scheme（权限模式）</h2><blockquote><p>用来设置Zookeeper服务器进行权限验证的方式。</p></blockquote><p>Zookeeper的权限验证方法大体分为一下类型：</p><ol><li>**范围验证：**zookeeper可以针对一个IP或者一段IP地址授予某种权限。例如：让一个IP地址为 &quot;192.168.0.10&quot; 的机器对服务器上某个节点具有写入的权限，或者通过 &quot;192.168.0.1/32&quot; 对一段IP地址的机器授。</li><li>**口令验证：**即用户名密码方式。在Zookeeper中这种验证方式是 <strong>Digest</strong> 认证，而Digest这种任何智能方式受限在客户端传送 &quot;username : password&quot; 形式权限表示符后，Zookeeper 服务端会对密码部分使用 SHA-1 和 BASE64 算法进行加密。</li><li>**Super：**一种特殊的 <strong>Digest</strong> 认证，具有Super权限的客户端可以对Zookeeper上的人已数据节点进行任意操作。</li></ol><h2 id="id-授权对象" tabindex="-1"><a class="header-anchor" href="#id-授权对象" aria-hidden="true">#</a> ID(授权对象)</h2><p>授权对象就是我们需要把权限赋予哪一个对象。</p><p>对于4中不同的权限模式来说</p><ol><li>采用IP方式，使用的权限对象可以是一个IP地址或一段IP地址；</li><li>采用Digest或Super方式，则对应于一个用户名；</li><li>采用World模式，是授权所有用户；</li></ol><h2 id="permission-权限信息" tabindex="-1"><a class="header-anchor" href="#permission-权限信息" aria-hidden="true">#</a> Permission（权限信息）</h2><p>权限信息指可以在数据节点上执行的操作种类。</p><p>Zookeeper中已经定义好的权限有如下:</p><blockquote><p>数据节点（c : create）创建权限：授予权限的对象可以在数据节点下<strong>创建子节点</strong>；</p><p>数据节点（w : wirte）更新权限：授予权限的对象可以更新改数据节点；</p><p>数据节点（r : read）读取权限：授予权限的对象可以读取该节点的内容以及子节点的列表信息；</p><p>数据节点（d : delete）删除权限：授予权限的对象可以删除该节点下的<strong>子节点</strong>；</p><p>数据节点（a : admin）管理员权限：授予权限的对象可以对该节点体进行ACL权限设置；</p></blockquote><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取某个节点的ACL权限信息</span>
getAcl

<span class="token comment">// 设置某个节点的ACL权限信息</span>
setAcl

<span class="token comment">// 输入认证授权信息，相当于注册用户信息； 注册时输入明文密码，zk将以密文形式存储</span>
addauth


# 可以通过系统参数zookeeper<span class="token punctuation">.</span>skipACL<span class="token operator">=</span>yes进行配置，默认是no<span class="token punctuation">,</span>可以配置为<span class="token boolean">true</span><span class="token punctuation">,</span>则配置过的<span class="token constant">ACL</span>将不再进行权限检测
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成授权id的方式" tabindex="-1"><a class="header-anchor" href="#生成授权id的方式" aria-hidden="true">#</a> 生成授权ID的方式</h2><ol><li>使用Zookeeper源码包内的类进行生成</li></ol><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">generateSuperDigest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span> <span class="token punctuation">{</span>
		<span class="token class-name">String</span> sId <span class="token operator">=</span> <span class="token class-name">DigestAuthenticationProvider</span><span class="token punctuation">.</span><span class="token function">generateDigest</span><span class="token punctuation">(</span><span class="token string">&quot;yaien:test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sId<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//yaien:X/NSthOB0fD/OT6iilJ55WJVado=</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="2"><li>在XShell生成</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>password<span class="token operator">&gt;</span> <span class="token operator">|</span> openssl dgst <span class="token parameter variable">-binary</span> <span class="token parameter variable">-sha1</span> <span class="token operator">|</span> openssl base64
// +7K83PhyQ3ijGj0ADmljf0quVwQ<span class="token operator">=</span>
</code></pre></div><h2 id="设置acl的两种方式" tabindex="-1"><a class="header-anchor" href="#设置acl的两种方式" aria-hidden="true">#</a> 设置ACL的两种方式</h2><ol><li>节点创建的同时设置ACL</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>// 创建一个zknode节点并赋予 user1 用户读写的权限
create /zknode dddd digest:user1:+7K83PhyQ3ijGj0ADmljf0quVwQ<span class="token operator">=</span>:rw

// 修改zknode节点的权限
setAcl /zknode digest:user1:+7K83PhyQ3ijGj0ADmljf0quVwQ<span class="token operator">=</span>:acwrd
</code></pre></div><p>添加权限信息后的节点，不能直接访问，否则报错</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">3</span><span class="token punctuation">]</span> get /zknode 
// 异常信息
org.apache.zookeeper.KeeperException<span class="token variable">$NoAuthException</span><span class="token builtin class-name">:</span> KeeperErrorCode <span class="token operator">=</span> NoAuth <span class="token keyword">for</span> /zknode
</code></pre></div><p>访问前需要添加权限信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 添加访问权限信息
addauth digest user1:pass1

// 访问数据
get /zknode


<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">8</span><span class="token punctuation">]</span> addauth digest user1:pass1
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">9</span><span class="token punctuation">]</span> get /zknode 
dddd
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">10</span><span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>auth铭文授权</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>// 注册用户信息，后续可以直接使用铭文授权
addauth digest u100:p100

// 创建节点并赋予权限<span class="token punctuation">(</span>这时u100用户授权信息会被zk保存，可以认为当前的授权用户为u100<span class="token punctuation">)</span>
create /note-1 node1data auth:u100:p100:cawrd

// 访问数据
get /node-1
</code></pre></div><blockquote><p>注意：创建时授予权限时，节点数据不能为空</p></blockquote>`,75),o=[p];function i(c,l){return a(),s("div",null,o)}const u=n(t,[["render",i],["__file","2305110857.html.vue"]]);export{u as default};
