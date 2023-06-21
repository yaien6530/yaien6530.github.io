import{_ as a,Q as t,a2 as e,a5 as p,a3 as n,a4 as s,a6 as o}from"./framework-27238c07.js";const c={},l=n("h1",{id:"linkedblockingqueue详解",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#linkedblockingqueue详解","aria-hidden":"true"},"#"),s(" LinkedBlockingQueue详解")],-1),i=n("p",null,[s("LinkedBlockingQueue是java.util.concurrent包中的一个类，它实现了BlockingQueue接口，是一个基于"),n("strong",null,"链表结构的阻塞队列"),s(" ，按FIFO（先进先出）排序元素，也是一种典型的生产者和消费者模型的阻塞队列。")],-1),u=o(`<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2><ol><li>实现的是无界阻塞队列，可以指定容量，默认Integer.MAX_VALUE，先进先出，存取互不干扰</li><li>数据结构选用链表，可指定容量，内存存粗Node元素</li><li>实现两把锁，存取互不干扰，存取操作的是不同的Node对象，但是删除元素时存取元素都会加锁</li><li>入队是从队尾入队，有last指针记录</li><li>出队从队首出，有head指针记录</li></ol><h2 id="核心属性" tabindex="-1"><a class="header-anchor" href="#核心属性" aria-hidden="true">#</a> 核心属性</h2><ul><li><p><strong>Node[] items：</strong> 链表实现，用来存储队列中的元素。每个节点包含一个元素和指向下一个节点的链接。</p></li><li><p><strong>ReentrantLock takeLock：</strong> 可重入锁，用于控制元素的移除操作。当多个线程试图移除队列中的元素时，这个锁确保了只有一个线程可以执行该操作。</p></li><li><p><strong>ReentrantLock putLock：</strong> 可重入锁，用于控制元素的插入操作。当多个线程试图向队列中插入元素时，这个锁确保了只有一个线程可以执行该操作。</p></li><li><p><strong>Condition notEmpty：</strong> 用于协调消费者线程。当队列为空，消费者线程试图移除元素时，它们会等待这个条件变量。</p></li><li><p><strong>Condition notFull：</strong> 用于协调生产者线程。当队列已满，生产者线程试图插入元素时，它们会等待这个条件变量。</p></li><li><p><strong>AtomicInteger count：</strong> 用来记录队列中当前的元素数量。</p></li><li><p><strong>capacity (int)：</strong> 队列的容量，如果在创建队列时没有指定容量，那么容量将等于 Integer.MAX_VALUE。</p></li></ul><h2 id="入队源码" tabindex="-1"><a class="header-anchor" href="#入队源码" aria-hidden="true">#</a> 入队源码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token comment">// 添加元素</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Note: convention in all put/take/etc is to preset local var</span>
        <span class="token comment">// holding count negative to indicate failure unless set.</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 将元素封装到Node对象中</span>
        <span class="token class-name">LinkedBlockingQueue<span class="token punctuation">.</span>Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue<span class="token punctuation">.</span>Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取插入锁</span>
        <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> putLock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>putLock<span class="token punctuation">;</span>
        <span class="token comment">// 获取队列元素数量</span>
        <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> count <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">;</span>
        <span class="token comment">// 加锁</span>
        putLock<span class="token punctuation">.</span><span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">/*
             * Note that count is used in wait guard even though it is
             * not protected by lock. This works because count can
             * only decrease at this point (all other puts are shut
             * out by lock), and we (or some other waiting put) are
             * signalled if it ever changes from capacity. Similarly
             * for all other uses of count in other wait guards.
             */</span>
            <span class="token comment">// 队列满了，阻塞生产者线程到等待队列</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>count<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                notFull<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 入队</span>
            <span class="token function">enqueue</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 队列元素数量+1</span>
            c <span class="token operator">=</span> count<span class="token punctuation">.</span><span class="token function">getAndIncrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 队列中还有位置，将notFull移到同步队列等待唤醒</span>
                notFull<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 解锁，唤醒阻塞的线程</span>
            putLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 唤醒消费者消费</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">signalNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="出队源码" tabindex="-1"><a class="header-anchor" href="#出队源码" aria-hidden="true">#</a> 出队源码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token comment">// 元素出队</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">E</span> x<span class="token punctuation">;</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取队列元素数量</span>
        <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> count <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">;</span>
        <span class="token comment">// 获取出队锁</span>
        <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> takeLock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>takeLock<span class="token punctuation">;</span>
        <span class="token comment">// 加锁</span>
        takeLock<span class="token punctuation">.</span><span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 队列中元素数量为0，表示没有元素了，阻塞消费者线程</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>count<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                notEmpty<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 出队</span>
            x <span class="token operator">=</span> <span class="token function">dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 队列元素数量-1</span>
            c <span class="token operator">=</span> count<span class="token punctuation">.</span><span class="token function">getAndDecrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token comment">// 消费者线程转到等待队列，等待唤醒</span>
                notEmpty<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 解锁</span>
            takeLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> capacity<span class="token punctuation">)</span>
            <span class="token comment">// 唤醒生产者线程</span>
            <span class="token function">signalNotFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><ul><li><p><strong>任务队列：</strong> 在多线程编程中，常常需要使用一个任务队列来存储待处理的任务。例如，在一个网页爬虫程序中，可以创建一个LinkedBlockingQueue，用于存储待爬取的网页URL。一个或多个生产者线程负责从网络上发现新的URL并将它们添加到队列中，一个或多个消费者线程负责从队列中取出URL并下载网页内容。</p></li><li><p><strong>日志处理：</strong> 在服务器应用中，可能需要处理大量的日志消息。可以创建一个LinkedBlockingQueue，用于存储待处理的日志消息。一个或多个生产者线程负责生成日志消息并将它们添加到队列中，一个或多个消费者线程负责从队列中取出日志消息并写入日志文件或发送到日志服务器。</p></li><li><p><strong>资源池：</strong> LinkedBlockingQueue也可以用于创建资源池，例如数据库连接池、线程池等。当需要一个资源时，可以从队列中取出，当不再需要这个资源时，可以将它放回队列。这样可以有效地复用资源，提高系统的效率。</p></li></ul><blockquote><p>思考：线程池为什么使用<strong>LinkedBlockingQueue</strong>而不是<strong>ArrayBlockingQueue</strong>呢？ 因为LinkedBlockingQueue的入队和出队是两把锁，存取元素互不干扰。 ArrayBlockingQueue则是使用的同一把锁，存取元素时相互排斥。 LinkedBlockingQueue这种锁分离的方式可以有效地减少锁竞争，从而提高线程池的并发性能。</p></blockquote>`,11);function k(r,d){return t(),e("div",null,[l,i,p(" more "),u])}const m=a(c,[["render",k],["__file","2306051101.html.vue"]]);export{m as default};