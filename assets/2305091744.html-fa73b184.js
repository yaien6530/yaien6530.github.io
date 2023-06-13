const e=JSON.parse('{"key":"v-327b6d83","path":"/note/db/redis/2305091744.html","title":"Redis高可用集群（Redis Cluster）","lang":"zh-CN","frontmatter":{"isOriginal":true,"date":"2021-01-20T00:00:00.000Z","index":true,"order":6,"category":["DB"],"tag":["Redis"]},"headers":[{"level":2,"title":"搭建","slug":"搭建","link":"#搭建","children":[]}],"git":{"createdTime":1686623190000,"updatedTime":1686623190000,"contributors":[{"name":"yanggl","email":"2549597630@qq.com","commits":1}]},"readingTime":{"minutes":2.03,"words":609},"filePathRelative":"note/db/redis/2305091744.md","localizedDate":"2021年1月20日","excerpt":"<h1> Redis高可用集群（Redis Cluster）</h1>\\n<p>redis集群是一个又多个<strong>主从节点群</strong>组成的<strong>分布式服务器群</strong>，它具有<strong>复制、高可用和分片</strong>\\n的特性。redis集群不需要sentinel哨兵也能完成节点移除和故障转移的功能。需要将每个节点设置成集群模式，这种集群模式没有中心节点，可水平扩展。根据官方文档称，可线性扩展到上万个节点（推荐不超过1W个节点）。redis集群的性能和高可用性均优于**\\n哨兵模式**，且配置简单。</p>\\n<h2> 搭建</h2>\\n<p>redis集群搭建<strong>至少需要三个master</strong>节点，搭建的每个master再搭建一个或多个slave节点。每个主从节点之间会形成一个小的节点集群，小的节点集群也会进行主节点的选举。</p>"}');export{e as data};
