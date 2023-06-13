const n=JSON.parse('{"key":"v-04d59b7c","path":"/note/db/redis/2305091734.html","title":"Redis主从架构","lang":"zh-CN","frontmatter":{"isOriginal":true,"date":"2021-01-09T00:00:00.000Z","index":true,"order":3,"category":["DB"],"tag":["Redis"]},"headers":[{"level":2,"title":"搭建","slug":"搭建","link":"#搭建","children":[]},{"level":2,"title":"工作原理","slug":"工作原理","link":"#工作原理","children":[{"level":3,"title":"主从复制（全量复制）","slug":"主从复制-全量复制","link":"#主从复制-全量复制","children":[]},{"level":3,"title":"主从复制（部分复制）","slug":"主从复制-部分复制","link":"#主从复制-部分复制","children":[]}]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[{"level":3,"title":"主从复制风暴","slug":"主从复制风暴","link":"#主从复制风暴","children":[]}]}],"git":{"createdTime":1686619128000,"updatedTime":1686619128000,"contributors":[{"name":"yaien","email":"80998775+yaien6530@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.12,"words":937},"filePathRelative":"note/db/redis/2305091734.md","localizedDate":"2021年1月9日","excerpt":"<h1> Redis主从架构</h1>\\n<h2> 搭建</h2>\\n<ol>\\n<li>\\n<p>复制一份<strong>redis.cof</strong> 文件；</p>\\n</li>\\n<li>\\n<p>将相关配置修改为如下的值：</p>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code>port <span class=\\"token number\\">6380</span>\\npidfile <span class=\\"token operator\\">/</span><span class=\\"token keyword\\">var</span><span class=\\"token operator\\">/</span>run<span class=\\"token operator\\">/</span>redis_6380<span class=\\"token punctuation\\">.</span>pid #把pid进程号写入pidfile配置的文件\\nlogfile <span class=\\"token string\\">\\"6380\\"</span>\\ndir <span class=\\"token operator\\">/</span>usr<span class=\\"token operator\\">/</span>local<span class=\\"token operator\\">/</span>redis<span class=\\"token operator\\">-</span><span class=\\"token number\\">5.0</span><span class=\\"token number\\">.3</span><span class=\\"token operator\\">/</span>data<span class=\\"token operator\\">/</span><span class=\\"token number\\">6380</span> #指定数据存放目录\\n</code></pre></div></li>\\n<li>\\n<p>配置主从复制</p>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code>replicaof <span class=\\"token number\\">192.168</span><span class=\\"token number\\">.0</span><span class=\\"token number\\">.1</span> <span class=\\"token number\\">6379</span> # 从本季<span class=\\"token number\\">6379</span>端口的redis实例复制数据，redis5<span class=\\"token punctuation\\">.</span><span class=\\"token number\\">0</span>之前使用slaveof\\nreplica<span class=\\"token operator\\">-</span>read<span class=\\"token operator\\">-</span>omly yes # 配置从节点只读\\n</code></pre></div></li>\\n<li>\\n<p>启动从节点</p>\\n</li>\\n<li>\\n<p>客户端链接节点</p>\\n</li>\\n</ol>"}');export{n as data};
