const e=JSON.parse('{"key":"v-55cc2415","path":"/note/java/concurrency/atomic/2305252031.html","title":"ThreadLocal","lang":"zh-CN","frontmatter":{"isOriginal":true,"date":"2023-05-25T00:00:00.000Z","order":1,"category":["并发"],"tag":["ThreadLocal"]},"headers":[{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[]},{"level":2,"title":"作用","slug":"作用","link":"#作用","children":[]},{"level":2,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]},{"level":2,"title":"方法","slug":"方法","link":"#方法","children":[]},{"level":2,"title":"实现","slug":"实现","link":"#实现","children":[{"level":3,"title":"开放地址法","slug":"开放地址法","link":"#开放地址法","children":[]}]},{"level":2,"title":"内存泄露问题","slug":"内存泄露问题","link":"#内存泄露问题","children":[]}],"git":{"createdTime":1709218840000,"updatedTime":1709218840000,"contributors":[{"name":"yanggl","email":"yaien6530@gmail.com","commits":1}]},"readingTime":{"minutes":11.25,"words":3375},"filePathRelative":"note/java/concurrency/atomic/2305252031.md","localizedDate":"2023年5月25日","excerpt":"<h1> ThreadLocal</h1>\\n<p>ThreadLocal是Java中的一个线程局部变量，它允许每个线程独立地存储和获取数据，保证线程之间的数据互相独立，避免并发访问带来的竞争条件。</p>\\n<p>ThreadLocal不是用来解决共享数据的问题，而是为了实现线程隔离的目的。它在某些场景下非常有用，如Web应用中的用户身份信息、数据库连接、事务管理等。</p>\\n<p>使用ThreadLocal需要注意内存泄漏的问题，因为ThreadLocal会持有线程的引用，如果线程不正确地被管理，可能会导致内存泄漏。在使用完ThreadLocal后，应该及时调用remove()方法清除数据，避免不必要的资源占用。</p>\\n","copyright":{"author":"Yaien","license":"MIT"}}');export{e as data};
