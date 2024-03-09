const e=JSON.parse('{"key":"v-53a68847","path":"/note/java/concurrency/lock/2306021924.html","title":"StampedLock（读写锁）","lang":"zh-CN","frontmatter":{"isOriginal":true,"date":"2023-06-02T00:00:00.000Z","order":4,"category":["并发"],"tag":["线程安全","Lock"]},"headers":[{"level":2,"title":"特性","slug":"特性","link":"#特性","children":[{"level":3,"title":"三种锁模式","slug":"三种锁模式","link":"#三种锁模式","children":[]},{"level":3,"title":"不支持重入","slug":"不支持重入","link":"#不支持重入","children":[]},{"level":3,"title":"不支持锁升级","slug":"不支持锁升级","link":"#不支持锁升级","children":[]},{"level":3,"title":"支持锁降级","slug":"支持锁降级","link":"#支持锁降级","children":[]}]},{"level":2,"title":"乐观读","slug":"乐观读","link":"#乐观读","children":[{"level":3,"title":"基本思想","slug":"基本思想","link":"#基本思想","children":[]},{"level":3,"title":"优缺点","slug":"优缺点","link":"#优缺点","children":[]}]},{"level":2,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]}],"git":{"createdTime":1709982690000,"updatedTime":1709982690000,"contributors":[{"name":"yanggl","email":"yaien6530@gmail.com","commits":1}]},"readingTime":{"minutes":3.48,"words":1043},"filePathRelative":"note/java/concurrency/lock/2306021924.md","localizedDate":"2023年6月2日","excerpt":"<h1> StampedLock（读写锁）</h1>\\n<p>StampedLock 是 Java 8 引入的一个新的读写锁，其设计目标是为了解决 ReentrantReadWriteLock 的一些性能问题，提供了乐观读锁的机制。</p>\\n","copyright":{"author":"Yaien","license":"MIT"}}');export{e as data};