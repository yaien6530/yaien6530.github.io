import{_ as n,r as i,o as a,c as d,d as s,a as t,b as e,f as l,e as c}from"./app-450c3553.js";const h={},o=t("h1",{id:"redis核心数据结构",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#redis核心数据结构","aria-hidden":"true"},"#"),e(" Redis核心数据结构")],-1),y=t("p",null,"Redis 是一种开源（BSD 许可）、内存中数据结构存储，用作数据库、缓存和消息代理。底层使用c语言进行实现。Redis 提供了诸如字符串、散列、列表、集合、带范围查询的排序集合、位图、超级日志、地理空间索引和流等数据结构。",-1),g=t("p",null,"Redis内置复制、Lua 脚本、LRU 驱逐、事务和不同级别的磁盘持久化，并通过 Redis Sentinel 和 Redis Cluster 自动分区提供高可用性。",-1),x=t("h2",{id:"地址",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#地址","aria-hidden":"true"},"#"),e(" 地址")],-1),k={href:"https://redis.io/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/redis/redis",target:"_blank",rel:"noopener noreferrer"},b={href:"https://redis.io/topics/data-types-intro",target:"_blank",rel:"noopener noreferrer"},p={href:"https://redis.io/commands",target:"_blank",rel:"noopener noreferrer"},f={href:"https://redis.io/documentation",target:"_blank",rel:"noopener noreferrer"},S=c('<h2 id="基本特性" tabindex="-1"><a class="header-anchor" href="#基本特性" aria-hidden="true">#</a> 基本特性</h2><ul><li>非关系型的<strong>键值对</strong>数据库，可以根据键以O（1）的时间复杂度取出或插入关联值；</li><li>数据是存储在内存中的；</li><li>键值对中键的类型可以是字符串、整形、浮点型等，且键是唯一的，相同的键会覆盖值；</li><li>键值对中值类型可以是：String、Hash、List、Set、ZSet等 ；</li><li>内置了复制、磁盘持久化、LUA脚本、事务、SSL、ACLS、客户端缓存、客户端代理等功能；</li><li>提供了Redis哨兵、Redis cluster等高可用性的模式；</li></ul><h2 id="核心数据结构" tabindex="-1"><a class="header-anchor" href="#核心数据结构" aria-hidden="true">#</a> 核心数据结构</h2><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String</h3><p>String类型的结构对应JAVA的Map，key-val的存储形式</p><h5 id="常用操作" tabindex="-1"><a class="header-anchor" href="#常用操作" aria-hidden="true">#</a> 常用操作</h5><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">描述</th></tr></thead><tbody><tr><td style="text-align:center;">SET key value</td><td style="text-align:center;">存入字符串</td></tr><tr><td style="text-align:center;">MSET [key val ...]</td><td style="text-align:center;">批量存入字符串</td></tr><tr><td style="text-align:center;">GET key</td><td style="text-align:center;">获取值</td></tr><tr><td style="text-align:center;">MGET [key ...]</td><td style="text-align:center;">批量获取值</td></tr><tr><td style="text-align:center;">DEL [key ...]</td><td style="text-align:center;">删除一个或多个键</td></tr><tr><td style="text-align:center;">EXPIRE key seconds</td><td style="text-align:center;">设置一个键过期时间（s）</td></tr><tr><td style="text-align:center;">SETNX key val</td><td style="text-align:center;">key不存在且保存成功返回1，失败返回0，可用做分布式锁</td></tr><tr><td style="text-align:center;">incrby key val</td><td style="text-align:center;">批量生产序列号</td></tr><tr><td style="text-align:center;">SET key val EX 10 NX</td><td style="text-align:center;">防止程序意外终止导致死锁</td></tr></tbody></table><h5 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h5><ol><li>单值缓存</li><li>对象缓存</li><li>分布式锁</li><li>计数器</li><li>Web集群session共享</li><li>分布式系统全局系列号等</li></ol><h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h3><p>Hash类型的结构，存储一个类型的key-val</p><h5 id="常用操作-1" tabindex="-1"><a class="header-anchor" href="#常用操作-1" aria-hidden="true">#</a> 常用操作</h5><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">简述</th></tr></thead><tbody><tr><td style="text-align:center;">HASH key field value</td><td style="text-align:center;">存储一个哈希表key的键值</td></tr><tr><td style="text-align:center;">HASHNX key field value</td><td style="text-align:center;">存储一个不存在的哈希表key的键值</td></tr><tr><td style="text-align:center;">HMSET key field</td><td style="text-align:center;">获取哈希表key对应的field键值</td></tr><tr><td style="text-align:center;">HMGET key [field ...]</td><td style="text-align:center;">批量获取field键值</td></tr><tr><td style="text-align:center;">HDEL key [field ...]</td><td style="text-align:center;">批量删除</td></tr><tr><td style="text-align:center;">HLEN key</td><td style="text-align:center;">返回哈希表key中field的数量</td></tr><tr><td style="text-align:center;">HGETALL key</td><td style="text-align:center;">返回哈希表key中所有的键值</td></tr><tr><td style="text-align:center;">HINCRBY key field increment</td><td style="text-align:center;">为哈希表key中field键的值加上增量</td></tr></tbody></table><h5 id="应用场景-1" tabindex="-1"><a class="header-anchor" href="#应用场景-1" aria-hidden="true">#</a> 应用场景</h5><ol><li>对象缓存</li><li>电商购物车等</li></ol><h5 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h5><ul><li>优点 <ol><li>同类数据归类整合储存，方便数据管理</li><li>相比String操作小号的内存与cpu更小</li><li>相比Stirng更节约存储空间</li></ol></li><li>缺点 <ol><li>过期功能不能使用在field上，只能使用在key上</li><li>Redis集群架构下不适合大规模使用</li></ol></li></ul><h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h3><p>List，列表结构，跟JAVA中的List基本相似</p><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">描述</th></tr></thead><tbody><tr><td style="text-align:center;">LPUSH key [value ...]</td><td style="text-align:center;">将一个或多个value值插入到key列表的表头</td></tr><tr><td style="text-align:center;">RPUSH key [value ...]</td><td style="text-align:center;">将一个或多value值插入多key列表表尾</td></tr><tr><td style="text-align:center;">LPOP key</td><td style="text-align:center;">返回并移除key列表的头元素</td></tr><tr><td style="text-align:center;">RPOP key</td><td style="text-align:center;">返回并移除key列表的尾元素</td></tr><tr><td style="text-align:center;">LRANGE key start stop</td><td style="text-align:center;">返回列表key中制定区域内的元素，区间则以start和stop指定</td></tr><tr><td style="text-align:center;">BLPOP [key...] timeot</td><td style="text-align:center;">从key列表表头弹出元素，若列表为空则阻塞等待，若timeout=0则一直阻塞</td></tr><tr><td style="text-align:center;">BRPOP [key...] timeout</td><td style="text-align:center;">从key列表尾部弹出元素，若列表为空则阻塞等待，若timeout=0则一直阻塞</td></tr></tbody></table><h5 id="应用场景-2" tabindex="-1"><a class="header-anchor" href="#应用场景-2" aria-hidden="true">#</a> 应用场景</h5><ol><li>stack（栈） LPUSH + LPOP</li><li>Queue (队列) LPUSH + RPOP</li><li>Blocking MQ（阻塞队列）LPUSH + BRPOP</li></ol><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h3><p>Set集合，val中存储多个不重复的元素</p><h5 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h5><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">描述</th></tr></thead><tbody><tr><td style="text-align:center;">SADD key [momber ...]</td><td style="text-align:center;">往集合key中存入元素，元素存在则忽略</td></tr><tr><td style="text-align:center;">SREM key [momber ...]</td><td style="text-align:center;">从集合key中删除元素</td></tr><tr><td style="text-align:center;">SMEMBERS key</td><td style="text-align:center;">获取集合key中所有元素</td></tr><tr><td style="text-align:center;">SCARD key</td><td style="text-align:center;">获取集合key的元素个数</td></tr><tr><td style="text-align:center;">SISMEMBER key momber</td><td style="text-align:center;">判断val元素是否存在于key集合中</td></tr><tr><td style="text-align:center;">SRANDMENMBER key [count]</td><td style="text-align:center;">从集合key中选出count个元素，元素不移除</td></tr><tr><td style="text-align:center;">SPOP key [count]</td><td style="text-align:center;">从集合key中选出count个元素并移除元素</td></tr><tr><td style="text-align:center;">SINTER [key ..]</td><td style="text-align:center;">交集运算</td></tr><tr><td style="text-align:center;">SINTERSTORE newSet [key ...]</td><td style="text-align:center;">将交集结果存入新集合newSet中</td></tr><tr><td style="text-align:center;">SUNION [key ...]</td><td style="text-align:center;">并集运算</td></tr><tr><td style="text-align:center;">SUNIONSTORE newSet [key ...]</td><td style="text-align:center;">将并集结果存入新集合newSet中</td></tr><tr><td style="text-align:center;">SDIFF [key ... ]</td><td style="text-align:center;">差集运算</td></tr><tr><td style="text-align:center;">SDIFFSTORE newSet [key ...]</td><td style="text-align:center;">将差集结果存入新集合newSet中</td></tr></tbody></table><h5 id="应用场景-3" tabindex="-1"><a class="header-anchor" href="#应用场景-3" aria-hidden="true">#</a> 应用场景</h5><ol><li>抽奖</li><li>去重</li><li>点赞/取消点赞</li><li>集合操作实现关注模型等</li><li>集合操作实现商品赛选等</li></ol><h3 id="zset" tabindex="-1"><a class="header-anchor" href="#zset" aria-hidden="true">#</a> ZSet</h3><p>与Set集合类似，ZSet集合是有序的</p><table><thead><tr><th style="text-align:center;">命令</th><th style="text-align:center;">描述</th></tr></thead><tbody><tr><td style="text-align:center;">ZADD key [[score member] ...]</td><td style="text-align:center;">往有序集合key中加入带分值元素</td></tr><tr><td style="text-align:center;">ZREM key [member ...]</td><td style="text-align:center;">从有序集合key中删除元素</td></tr><tr><td style="text-align:center;">ZSCORE key member</td><td style="text-align:center;">返回有序集合key中member元素的分值</td></tr><tr><td style="text-align:center;">ZINCRBY key increment member</td><td style="text-align:center;">为key中元素member的分值加上increment</td></tr><tr><td style="text-align:center;">ZCARD key</td><td style="text-align:center;">返回key中的元素个数</td></tr><tr><td style="text-align:center;">ZRANGE key start stop [withscores]</td><td style="text-align:center;">正序获取key中start到stop的元素</td></tr><tr><td style="text-align:center;">ZREVRANGE key start stop [withscores]</td><td style="text-align:center;">倒序获取key中start到stop的元素</td></tr></tbody></table><h5 id="应用场景-4" tabindex="-1"><a class="header-anchor" href="#应用场景-4" aria-hidden="true">#</a> 应用场景</h5><ol><li>微博排行榜</li><li>七日排行榜单等</li></ol><h3 id="redis的单线程和高性能" tabindex="-1"><a class="header-anchor" href="#redis的单线程和高性能" aria-hidden="true">#</a> Redis的单线程和高性能</h3><ol><li>Redis的单线程并非是真正意义上的单线程。单线程主要是指<strong>网络IO</strong>和<strong>键值对读写</strong>是由一个线程来完成，而这也是Redis对外提供键值存储服务的主要流程。Redis内部的其他功能，例如持久化、 异步删除、数据同步等等是会有额外的线程去执行的。</li><li>单个线程访问之所以还会那么快，是因为数据都存在<strong>内存</strong>中，所有的运算都是内存级别的运算，单线程同时避免了多线程所带来的<strong>上下文切换</strong>问题。</li><li>单线程的任务我们需要注意访问的命令，对于那些耗时的命令以及当访问一个<strong>bigkey</strong>的时候可能会导致Redis卡顿。</li><li>对于客户端的并发连接，Redis底层利用<strong>epoll模型来实现IO多路复用</strong>，将链接信息和时间放到队列中，依次放到文件事件分派器，事件分派器将事件分发给对应的事件处理器。</li></ol><figure><img src="https://qiniu.yanggl.cn/image/2304010120_1.png" alt="IO多路复用" tabindex="0" loading="lazy"><figcaption>IO多路复用</figcaption></figure><h3 id="其他高级命令" tabindex="-1"><a class="header-anchor" href="#其他高级命令" aria-hidden="true">#</a> 其他高级命令</h3><h5 id="keys" tabindex="-1"><a class="header-anchor" href="#keys" aria-hidden="true">#</a> keys</h5><p>全局遍历所有的key，用来列出所有满足特定正则字符串规则的key，当Redis数据量较大时，性能会有所下降，应避免使用</p><h5 id="scan" tabindex="-1"><a class="header-anchor" href="#scan" aria-hidden="true">#</a> scan</h5><blockquote><p>SCAN cursor [MATCH pattern] [COUNT count] 渐进式便利所有的键，相对于keys性能消耗更小，安全性更低</p></blockquote><p>scan 参数提供了三个参数，第一个是 cursor 整数值(hash桶的索引值)，第二个是 key 的正则模式，第三个是一次遍历的key的数量(参考值，底层遍历的数量不一定)，并不是符合条件的结果数量。第一次遍历时，cursor 值为 0，然后将返回结果中第一个整数值作为下一次遍历的 cursor。一直遍历到返回的 cursor 值为 0 时结束。</p><blockquote><p>⚠️注意：scan并非完美无瑕，如果在scan的过程中如果有键的变化（增加、 删除、 修改），那么遍历效果可能会碰到如下问题：<br> 新增的键可能没有遍历到，遍历出了重复的键等情况，也就是说scan并不能保证完整的遍历出来所有的键，这些是我们在开发时需要考虑的。</p></blockquote><h5 id="info" tabindex="-1"><a class="header-anchor" href="#info" aria-hidden="true">#</a> info</h5><p>查看Redis服务运行信息，分为以下9大块：</p><ul><li><strong>Server：</strong> 服务器运行的环境参数</li><li><strong>Clients：</strong> 客户端相关信息</li><li><strong>Memory：</strong> 服务器运行内存统计数据</li><li><strong>Persistence：</strong> 持久化信息</li><li><strong>Stats：</strong> 通用统计数据</li><li><strong>Replication：</strong> 主从复制相关信息</li><li><strong>CPU：</strong> CPU使用情况</li><li><strong>Cluster：</strong> 集群情况</li><li><strong>KeySpace：</strong> 键值对统计数量信息</li></ul>',46);function m(R,_){const r=i("ExternalLinkIcon");return a(),d("div",null,[o,y,g,s(" more "),x,t("p",null,[e("官网："),t("a",k,[e("https://redis.io/"),l(r)])]),t("p",null,[e("GitHub:"),t("a",u,[e("https://github.com/redis/redis"),l(r)])]),t("p",null,[e("Redis数据类型简介："),t("a",b,[e("https://redis.io/topics/data-types-intro"),l(r)])]),t("p",null,[e("命令完整列表："),t("a",p,[e("https://redis.io/commands"),l(r)])]),t("p",null,[e("完整文档地址："),t("a",f,[e("https://redis.io/documentation"),l(r)])]),S])}const P=n(h,[["render",m],["__file","2304010120.html.vue"]]);export{P as default};