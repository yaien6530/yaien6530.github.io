import{_ as n,o as e,c as a,d as i,a as s,b as l,e as c}from"./app-e0d227af.js";const d={},t=s("h1",{id:"redis主从-哨兵-集群架构搭建",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#redis主从-哨兵-集群架构搭建","aria-hidden":"true"},"#"),l(" Redis主从/哨兵/集群架构搭建")],-1),r=s("p",null,"记录Redis主从复制架构、哨兵架构以及集群（cluster）架构的搭建。本次搭建使用不同云服务器厂商公网ip搭建。",-1),o=c(`<h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><h3 id="服务器环境" tabindex="-1"><a class="header-anchor" href="#服务器环境" aria-hidden="true">#</a> 服务器环境</h3><table><thead><tr><th>服务器</th><th>IP</th><th>版本</th><th>节点</th></tr></thead><tbody><tr><td>腾讯云</td><td>159.159.159.159</td><td>CentOS 7.9</td><td>master</td></tr><tr><td>腾讯云</td><td>139.139.139.139</td><td>CentOS 7.9</td><td>slave</td></tr><tr><td>华为云</td><td>101.101.101.101</td><td>CentOS 7.9</td><td>slave</td></tr></tbody></table><h3 id="开放防火墙端口" tabindex="-1"><a class="header-anchor" href="#开放防火墙端口" aria-hidden="true">#</a> 开放防火墙端口</h3><ol><li>关闭服务器防火墙</li><li>开放云服务提供商服务器实例防火墙端口：6379、6380、6381、16379、16380、16381、26379、26380、26381</li></ol><h3 id="redis版本" tabindex="-1"><a class="header-anchor" href="#redis版本" aria-hidden="true">#</a> Redis版本</h3><p>redis-7.2.0</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装路径</span>
 <span class="token builtin class-name">cd</span> /usr/local/src/redis-7.2.0/
</code></pre></div><h2 id="主从复制搭建" tabindex="-1"><a class="header-anchor" href="#主从复制搭建" aria-hidden="true">#</a> 主从复制搭建</h2><ol><li><p>进入安装目录</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装路径</span>
<span class="token builtin class-name">cd</span> /usr/local/src/redis-7.2.0/
</code></pre></div></li><li><p>复制<strong>redis.conf</strong>配置文件</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 复制redis.conf -&gt; redis.conf.bak</span>
<span class="token function">cp</span> redis.conf redis.conf.bak
</code></pre></div></li><li><p>修改<strong>redis.conf</strong>配置文件</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>#./redis.conf

# 指定日志文件名称
logfile &quot;6379.log&quot;

#指定数据存放目录
dir /usr/local/src/redis-7.2.0/data

# 允许所有网卡访问
# bind 127.0.0.1 -::1

# 关闭安全模式，允许外网访问
protected-mode no

# 使用守护线程允许
daemonize yes

## slave 从节点还需要配置master地址（redis5.0之前使用slaveof）以及打开只读配置
replicaof 159.159.159.159 6379
# 配置从节点只读
replica-read-omly yes 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>通过配置文件启动各节点</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动redis服务端</span>
./src/redis-service ./redis.conf
</code></pre></div></li><li><p>查看服务允许状态</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> -ef<span class="token operator">|</span> <span class="token function">grep</span> redis

<span class="token comment">#[root@node2 ~]# ps -ef| grep redis</span>
<span class="token comment">#root     21574 18189  0 10:34 pts/1    00:00:00 grep --color=auto redis</span>
<span class="token comment">#root     32447     1  0 Dec21 ?        00:01:27 src/redis-server *:6379</span>
</code></pre></div></li><li><p>各节点启动完成后，master节点使用客户端连接redis</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动redis客户端</span>
./src/redis-cli
</code></pre></div></li><li><p>info查看主从复制节点信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> info

<span class="token comment">#  # Replication</span>
<span class="token comment"># role:master</span>
<span class="token comment"># connected_slaves:2</span>
<span class="token comment"># slave0:ip=139.139.139.139,port=6379,state=online,offset=87258,lag=1</span>
<span class="token comment"># slave1:ip=101.101.101.101,port=6379,state=online,offset=87258,lag=0</span>
<span class="token comment"># master_failover_state:no-failover</span>
<span class="token comment"># master_replid:a2ecc83726907a2c639fd8cfdb50c0b162637ff0</span>
<span class="token comment"># master_replid2:0000000000000000000000000000000000000000</span>
<span class="token comment"># master_repl_offset:87258</span>
<span class="token comment"># second_repl_offset:-1</span>
<span class="token comment"># repl_backlog_active:1</span>
<span class="token comment"># repl_backlog_size:1048576</span>
<span class="token comment"># repl_backlog_first_byte_offset:1</span>
<span class="token comment"># repl_backlog_histlen:87258</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>自此，Redis主从复制结构以搭建完成。</p><h2 id="哨兵架构搭建" tabindex="-1"><a class="header-anchor" href="#哨兵架构搭建" aria-hidden="true">#</a> 哨兵架构搭建</h2><p>哨兵模式搭建是在主从模式的基础上，添加一个哨兵集群，监听主从复制架构主节点的监控状态，在主节点不可用时选取子节点为主节点继续提供服务。</p><ol><li>进入安装目录<div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装路径</span>
<span class="token builtin class-name">cd</span> /usr/local/src/redis-7.2.0/
</code></pre></div></li><li>复制<strong>sentinel.conf</strong>配置文件<div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 复制sentinel.conf -&gt; sentinel.conf.bak</span>
<span class="token function">cp</span> sentinel.conf sentinel.conf.bak
</code></pre></div></li><li>修改<strong>sentinel.conf</strong>配置文件<div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># ./sentinel.conf

# 使用守护线程允许
daemonize yes

# 指定日志文件名称
logfile &quot;26379.log&quot;

#指定数据存放目录
dir /usr/local/src/redis-7.2.0/data

# 修改主节点地址 
# sentinel monitor &lt; master - name &gt; &lt; ip &gt; &lt; redis - port &gt; &lt; quorum &gt;
# quorum是一个数字，指明当有多少个sentinel认为一个master失效时（值一般为：sentinel / 2 + 1），master才算真正失效
sentinel monitor mymaster 159.159.159.159 6379 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>通过配置文件启动Sentinel<div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动sentinel</span>
./src/redis-sentinel ./sentinel.conf
</code></pre></div></li><li>各节点启动完成后，连接Sentinel<div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动redis客户端</span>
./src/redis-cli <span class="token parameter variable">-P</span> <span class="token number">26379</span>
</code></pre></div></li><li>info查看Sentinel集群状态<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:2637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> info sentinel

<span class="token comment"># # Sentinel</span>
<span class="token comment"># sentinel_masters:1</span>
<span class="token comment"># sentinel_tilt:0</span>
<span class="token comment"># sentinel_tilt_since_seconds:-1</span>
<span class="token comment"># sentinel_running_scripts:0</span>
<span class="token comment"># sentinel_scripts_queue_length:0</span>
<span class="token comment"># sentinel_simulate_failure_flags:0</span>
<span class="token comment"># master0:name=mymaster,status=ok,address=159.159.159.159:6379,slaves=2,sentinels=3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>验证Sentinel哨兵（下线master节点一段时间后）<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:2637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> info sentinel

<span class="token comment"># # Sentinel</span>
<span class="token comment"># sentinel_masters:1</span>
<span class="token comment"># sentinel_tilt:0</span>
<span class="token comment"># sentinel_tilt_since_seconds:-1</span>
<span class="token comment"># sentinel_running_scripts:0</span>
<span class="token comment"># sentinel_scripts_queue_length:0</span>
<span class="token comment"># sentinel_simulate_failure_flags:0</span>
<span class="token comment"># master0:name=mymaster,status=ok,address=139.139.139.139:6379,slaves=2,sentinels=3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>自此，Redis哨兵（Sentinel）集群结构搭建完成。</p><h2 id="集群架构搭建" tabindex="-1"><a class="header-anchor" href="#集群架构搭建" aria-hidden="true">#</a> 集群架构搭建</h2><ol><li><p>进入安装目录</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装路径</span>
<span class="token builtin class-name">cd</span> /usr/local/src/redis-7.2.0/
</code></pre></div></li><li><p>单机下创建主从复制集群文件夹</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建三个文件夹，分别保存三个redis节点实例数据</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> cluster/6379/data cluster/6380/data cluster/6381/data
</code></pre></div></li><li><p>复制redis.conf</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cp</span> redis.conf.bak cluster/6379/redis.conf
</code></pre></div></li><li><p>修改 <strong>./cluster/6379/redis.conf</strong> 文件</p><div class="language-log line-numbers-mode" data-ext="log"><pre class="language-log"><code><span class="token operator">#</span> <span class="token file-path string">./redis.conf</span>

<span class="token operator">#</span> 开启守护线程
daemonize yes

<span class="token operator">#</span> 设置端口号（各节点端口号不同）
port <span class="token number">6379</span>

<span class="token operator">#</span> 指定日志文件明（各节点位置不同）
logfile <span class="token string">&quot;6379.log&quot;</span>

<span class="token operator">#</span> 指定数据文件存放位置（各节点位置不同）
dir <span class="token file-path string">/usr/local/src/redis-7.2.0/cluster/6379/data</span>

<span class="token operator">#</span> 开启集群模式
cluster<span class="token operator">-</span>enabled yes

<span class="token operator">#</span> 集群节点信息文件 （各节点文件不同）
cluster<span class="token operator">-</span>config<span class="token operator">-</span>file <span class="token domain constant">nodes-6379.config</span>

<span class="token operator">#</span> 节点超时时间
custer<span class="token operator">-</span>node<span class="token operator">-</span>timeout <span class="token number">5000</span>

<span class="token operator">#</span> bind绑定的是自己机器的网卡ip，注释掉即可
<span class="token operator">#</span> bind <span class="token ip-address constant">127.0.0.1</span>

<span class="token operator">#</span> 关闭保护模式，允许外网访问
protected<span class="token operator">-</span>mode no

<span class="token operator">#</span> 开启aof持久化
appendonly yes

<span class="token operator">#</span> 设置redis访问密码
requirepass xxx

<span class="token operator">#</span> 设置集群节点间访问密码
masterauth xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>复制 <strong>./cluster/6379/redis.conf</strong> 文件到6380、6381目录，并修改配置</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cp</span> cluster/6379/redis.conf cluster/6380/redis.conf
<span class="token function">cp</span> cluster/6379/redis.conf cluster/6381/redis.conf
</code></pre></div></li><li><p>创建集群</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 每个master节点配置2个复制节点，最终形成 9/1+2 = 3 三个master节点的集群</span>
src/redis-cli <span class="token parameter variable">-a</span> yanggl123 <span class="token parameter variable">--cluster</span> create <span class="token number">159.159</span>.159.159:6379 <span class="token number">159.159</span>.159.159:6380 <span class="token number">159.159</span>.159.159:6381 <span class="token number">139.139</span>.139.139:6379 <span class="token number">139.139</span>.139.139:6380 <span class="token number">139.139</span>.139.139:6381 <span class="token number">101.101</span>.101.101:6379 <span class="token number">101.101</span>.101.101:6380 <span class="token number">101.101</span>.101.101:6381 --cluster-replicas <span class="token number">2</span>

<span class="token comment"># Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.</span>
<span class="token comment"># &gt;&gt;&gt; Performing hash slots allocation on 9 nodes...</span>
<span class="token comment"># Master[0] -&gt; Slots 0 - 5460</span>
<span class="token comment"># Master[1] -&gt; Slots 5461 - 10922</span>
<span class="token comment"># Master[2] -&gt; Slots 10923 - 16383</span>
<span class="token comment"># Adding replica 139.139.139.139:6380 to 159.159.159.159:6379</span>
<span class="token comment"># Adding replica 101.101.101.101:6380 to 159.159.159.159:6379</span>
<span class="token comment"># Adding replica 159.159.159.159:6381 to 139.139.139.139:6379</span>
<span class="token comment"># Adding replica 101.101.101.101:6381 to 139.139.139.139:6379</span>
<span class="token comment"># Adding replica 139.139.139.139:6381 to 101.101.101.101:6379</span>
<span class="token comment"># Adding replica 159.159.159.159:6380 to 101.101.101.101:6379</span>
<span class="token comment"># M: aed34372434119e9ea5fd9332ac6b13776da04f5 159.159.159.159:6379</span>
<span class="token comment"># slots:[0-5460] (5461 slots) master</span>
<span class="token comment"># S: 2c309fc808e3c8effab01d9b751fc650cfebd721 159.159.159.159:6380</span>
<span class="token comment"># replicates 9fcbba06ff95de4a5352591d81e0a57b52f7ebe2</span>
<span class="token comment"># S: 136ddf18be30a78b91b3a2234c51b6c48f701c7a 159.159.159.159:6381</span>
<span class="token comment"># replicates 24ace9daa23390120c6196f2bfd4a4fb012a25db</span>
<span class="token comment"># M: 24ace9daa23390120c6196f2bfd4a4fb012a25db 139.139.139.139:6379</span>
<span class="token comment"># slots:[5461-10922] (5462 slots) master</span>
<span class="token comment"># S: f5f98671523d33545a3a881fb0fb6352a1df4e03 139.139.139.139:6380</span>
<span class="token comment"># replicates aed34372434119e9ea5fd9332ac6b13776da04f5</span>
<span class="token comment"># S: d81b9ed97af9692bdcb2dc6b7245f53e7ffda0e5 139.139.139.139:6381</span>
<span class="token comment"># replicates 9fcbba06ff95de4a5352591d81e0a57b52f7ebe2</span>
<span class="token comment"># M: 9fcbba06ff95de4a5352591d81e0a57b52f7ebe2 101.101.101.101:6379</span>
<span class="token comment"># slots:[10923-16383] (5461 slots) master</span>
<span class="token comment"># S: f0ff1d8c32698edc7685033f927c14a96553f721 101.101.101.101:6380</span>
<span class="token comment"># replicates aed34372434119e9ea5fd9332ac6b13776da04f5</span>
<span class="token comment"># S: e910bddff6df93ef9cabd6156015c3e4a2b9a8db 101.101.101.101:6381</span>
<span class="token comment"># replicates 24ace9daa23390120c6196f2bfd4a4fb012a25db</span>
<span class="token comment"># Can I set the above configuration? (type &#39;yes&#39; to accept): yes</span>
<span class="token comment"># ... </span>
<span class="token comment"># [OK] All nodes agree about slots configuration.</span>
<span class="token comment"># &gt;&gt;&gt; Check for open slots...</span>
<span class="token comment"># &gt;&gt;&gt; Check slots coverage...</span>
<span class="token comment"># [OK] All 16384 slots covered.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>验证集群信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 连接任意节点</span>
src/redis-cli <span class="token parameter variable">-p</span> <span class="token number">6379</span>

<span class="token comment"># 查看集群信息</span>
cluster info

<span class="token comment"># cluster_state:ok</span>
<span class="token comment"># cluster_slots_assigned:16384</span>
<span class="token comment"># cluster_slots_ok:16384</span>
<span class="token comment"># cluster_slots_pfail:0</span>
<span class="token comment"># cluster_slots_fail:0</span>
<span class="token comment"># cluster_known_nodes:9</span>
<span class="token comment"># cluster_size:3</span>
<span class="token comment"># cluster_current_epoch:9</span>
<span class="token comment"># cluster_my_epoch:1</span>
<span class="token comment"># cluster_stats_messages_ping_sent:1282</span>
<span class="token comment"># cluster_stats_messages_pong_sent:1267</span>
<span class="token comment"># cluster_stats_messages_sent:2549</span>
<span class="token comment"># cluster_stats_messages_ping_received:1259</span>
<span class="token comment"># cluster_stats_messages_pong_received:1282</span>
<span class="token comment"># cluster_stats_messages_meet_received:8</span>
<span class="token comment"># cluster_stats_messages_received:2549</span>
<span class="token comment"># total_cluster_links_buffer_limit_exceeded:0</span>

<span class="token comment"># 查看集群节点</span>
cluster nodes

<span class="token comment"># 24ace9daa23390120c6196f2bfd4a4fb012a25db 139.139.139.139:6379@16379 master - 0 1703232221593 4 connected 5461-10922</span>
<span class="token comment"># aed34372434119e9ea5fd9332ac6b13776da04f5 159.159.159.159:6379@16379 myself,master - 0 1703232221000 1 connected 0-5460</span>
<span class="token comment"># e910bddff6df93ef9cabd6156015c3e4a2b9a8db 101.101.101.101:6381@16381 slave 24ace9daa23390120c6196f2bfd4a4fb012a25db 0 1703232222000 4 connected</span>
<span class="token comment"># f0ff1d8c32698edc7685033f927c14a96553f721 101.101.101.101:6380@16380 slave aed34372434119e9ea5fd9332ac6b13776da04f5 0 1703232221612 1 connected</span>
<span class="token comment"># 2c309fc808e3c8effab01d9b751fc650cfebd721 159.159.159.159:6380@16380 slave 9fcbba06ff95de4a5352591d81e0a57b52f7ebe2 0 1703232221000 7 connected</span>
<span class="token comment"># 9fcbba06ff95de4a5352591d81e0a57b52f7ebe2 101.101.101.101:6379@16379 master - 0 1703232220606 7 connected 10923-16383</span>
<span class="token comment"># f5f98671523d33545a3a881fb0fb6352a1df4e03 139.139.139.139:6380@16380 slave aed34372434119e9ea5fd9332ac6b13776da04f5 0 1703232222597 1 connected</span>
<span class="token comment"># 136ddf18be30a78b91b3a2234c51b6c48f701c7a 159.159.159.159:6381@16381 slave 24ace9daa23390120c6196f2bfd4a4fb012a25db 0 1703232221789 4 connected</span>
<span class="token comment"># d81b9ed97af9692bdcb2dc6b7245f53e7ffda0e5 139.139.139.139:6381@16381 slave 9fcbba06ff95de4a5352591d81e0a57b52f7ebe2 0 1703232221000 7 connected</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>自此，Redis集群结构搭建完成。</p>`,18);function p(m,v){return e(),a("div",null,[t,r,i(" more "),o])}const u=n(d,[["render",p],["__file","2312220952.html.vue"]]);export{u as default};
