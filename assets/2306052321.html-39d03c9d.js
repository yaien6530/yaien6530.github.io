import{_ as s,Q as a,a2 as e,a5 as t,a3 as n,a4 as p,a6 as o}from"./framework-8a5ffb50.js";const l={},c=n("h1",{id:"delayqueue详解",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#delayqueue详解","aria-hidden":"true"},"#"),p(" DelayQueue详解")],-1),i=n("p",null,"DelayQueue是Java并发包java.util.concurrent中的一个类，它实现了BlockingQueue接口。这是一个无界阻塞队列，用于放置实现了Delayed接口的对象，其中的对象只能在其到期时才能从队列中取走。",-1),u=o(`<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2><ol><li>使用优先级队列实现的无界阻塞队列</li><li>优先级队列（PriorityQueue）与PriorityBlockingQueue类似，不过没有阻塞功能</li><li>线程安全使用ReentrantLock来实现，通过Condition available控制阻塞条件</li><li>入队不阻塞，并且队列没有边界，与优先级队列入队相同</li><li>出队为空时阻塞，不为空时检查堆顶元素过期时间，小于等于0则出队，否则表示元素还未过期，阻塞</li><li>阻塞时先判断leader线程是否为空（为了保证优先级），不为空表示已经有线程阻塞了，为空则将当前线程设置为leader,并按照过期时间进行阻塞</li></ol><h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h2><ul><li>队列中的元素必须实现Delayed接口。在创建元素时，可以定义该元素的存活时间，当从队列获取元素时，只有满足该存活时间的元素才能被取出。</li><li>向队列中插入元素的操作（例如put和offer）永远不会被阻塞。只有当队列为空，或者队列中的元素没有到达其存活时间时，获取元素的操作（例如take和poll）才会被阻塞。</li></ul><h2 id="核心属性" tabindex="-1"><a class="header-anchor" href="#核心属性" aria-hidden="true">#</a> 核心属性</h2><ul><li><p><strong>final PriorityQueue q：</strong> 实际存储队列元素的数据结构。它是一个优先队列，队列中的元素按到期时间排序，最早到期的元素在队列的头部。</p></li><li><p><strong>Thread leader：</strong> 用于标记当前是否有线程在排队（仅用于取元素时） leader 指向的是第一个从队列获取元素阻塞的线程。</p></li><li><p><strong>final transient ReentrantLock lock：</strong> 锁，用于控制对队列的并发访问。</p></li><li><p><strong>final Condition available：</strong> 条件，用于表示现在是否有可取的元素 当新元素到达，或新线程可能需要成为leader时被通知。</p></li></ul><h2 id="入队源码" tabindex="-1"><a class="header-anchor" href="#入队源码" aria-hidden="true">#</a> 入队源码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">offer</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">offer</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lock<span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 入队</span>
        q<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>q<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 若入队的元素位于队列头部，说明当前元素延迟最小</span>
            <span class="token comment">// 将 leader 置空</span>
            leader <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token comment">// available条件队列转同步队列,准备唤醒阻塞在available上的线程</span>
            available<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 解锁，真正唤醒阻塞的线程</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="出队源码" tabindex="-1"><a class="header-anchor" href="#出队源码" aria-hidden="true">#</a> 出队源码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lock<span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">E</span> first <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 取出堆顶元素( 最早过期的元素，但是不弹出对象)   </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>first <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment">// 如果堆顶元素为空，说明队列中还没有元素，直接阻塞等待</span>
                available<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当前线程无限期等待，直到被唤醒，并且释放锁。</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">long</span> delay <span class="token operator">=</span> first<span class="token punctuation">.</span><span class="token function">getDelay</span><span class="token punctuation">(</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 堆顶元素的到期时间             </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>delay <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token comment">// 如果小于0说明已到期，直接调用poll()方法弹出堆顶元素</span>
                    <span class="token keyword">return</span> q<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                
                <span class="token comment">// 如果delay大于0 ，则下面要阻塞了</span>
                <span class="token comment">// 将first置为空方便gc</span>
                first <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> 
                <span class="token comment">// 如果有线程争抢的Leader线程，则进行无限期等待。</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>leader <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    available<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 如果leader为null，把当前线程赋值给它</span>
                    <span class="token class-name">Thread</span> thisThread <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    leader <span class="token operator">=</span> thisThread<span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 等待剩余等待时间</span>
                        available<span class="token punctuation">.</span><span class="token function">awaitNanos</span><span class="token punctuation">(</span>delay<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 如果leader还是当前线程就把它置为空，让其它线程有机会获取元素</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>leader <span class="token operator">==</span> thisThread<span class="token punctuation">)</span>
                            leader <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token comment">// 成功出队后，如果leader为空且堆顶还有元素，就唤醒下一个等待的线程</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>leader <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> q<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token comment">// available条件队列转同步队列,准备唤醒阻塞在available上的线程</span>
            available<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 解锁，真正唤醒阻塞的线程</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><ul><li><p><strong>任务调度：</strong> DelayQueue可以用于任务调度，例如一个任务需要在10分钟后执行，可以将这个任务放入DelayQueue，并设置延迟时间为10分钟，10分钟后这个任务就能从队列中取出，然后执行。Java的ScheduledThreadPoolExecutor就使用了DelayQueue进行任务的调度。</p></li><li><p><strong>缓存系统：</strong> 在一个缓存系统中，DelayQueue可以用于存储缓存项，缓存项在创建时设置一个到期时间，到期后缓存项就能从DelayQueue中取出，然后清除。这种方式可以避免需要定时扫描所有缓存项来查找并清除过期的缓存项。</p></li><li><p><strong>会话管理：</strong> 在网络编程中，可以使用DelayQueue来管理用户的会话，当用户的会话在一定时间内没有活动（例如没有发送或接收数据），那么这个会话就认为是过期的，可以从DelayQueue中取出并关闭。这种方式可以防止资源的浪费，提高服务器的处理能力。</p></li><li><p><strong>消息重发：</strong> 在消息队列中，如果消息没有被正确处理，可以将消息放入DelayQueue并设置一个延迟时间，延迟时间过后这个消息就能从DelayQueue中取出并重新发送。</p></li></ul><p>总的来说，其实只要是需要延迟处理的任务，都可以使用DelayQueue来实现。</p>`,13);function k(r,d){return a(),e("div",null,[c,i,t(" more "),u])}const m=s(l,[["render",k],["__file","2306052321.html.vue"]]);export{m as default};