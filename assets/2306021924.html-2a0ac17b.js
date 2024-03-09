import{_ as a,o as s,c as t,d as p,a as n,b as e,e as o}from"./app-4f9dbd97.js";const c={},l=n("h1",{id:"stampedlock-读写锁",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#stampedlock-读写锁","aria-hidden":"true"},"#"),e(" StampedLock（读写锁）")],-1),i=n("p",null,"StampedLock 是 Java 8 引入的一个新的读写锁，其设计目标是为了解决 ReentrantReadWriteLock 的一些性能问题，提供了乐观读锁的机制。",-1),u=o(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">StampedLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">StampedLock</span> sl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StampedLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 写操作</span>
    <span class="token keyword">void</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token keyword">double</span> deltaX<span class="token punctuation">,</span> <span class="token keyword">double</span> deltaY<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">long</span> stamp <span class="token operator">=</span> sl<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            x <span class="token operator">+=</span> deltaX<span class="token punctuation">;</span>
            y <span class="token operator">+=</span> deltaY<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            sl<span class="token punctuation">.</span><span class="token function">unlockWrite</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 读操作</span>
    <span class="token keyword">double</span> <span class="token function">distanceFromOrigin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> stamp <span class="token operator">=</span> sl<span class="token punctuation">.</span><span class="token function">tryOptimisticRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 尝试乐观读</span>
        <span class="token keyword">double</span> currentX <span class="token operator">=</span> x<span class="token punctuation">,</span> currentY <span class="token operator">=</span> y<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>sl<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 验证 stamp 是否有效</span>
            stamp <span class="token operator">=</span> sl<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 如果无效，退化为读锁</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                currentX <span class="token operator">=</span> x<span class="token punctuation">;</span>
                currentY <span class="token operator">=</span> y<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                sl<span class="token punctuation">.</span><span class="token function">unlockRead</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>currentX <span class="token operator">*</span> currentX <span class="token operator">+</span> currentY <span class="token operator">*</span> currentY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>上面是一个StampedLock的简单例子，在这个例子中，Point类使用 StampedLock 来同步对 x 和 y 的访问。move 方法使用写锁，确保对 x<br> 和 y 的修改是原子的。distanceFromOrigin 方法首先尝试使用乐观读锁来计算距离，如果在读取过程中 x 和 y 被修改了，那么它会退化为使用读锁。</p></blockquote><h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h2><h3 id="三种锁模式" tabindex="-1"><a class="header-anchor" href="#三种锁模式" aria-hidden="true">#</a> 三种锁模式</h3><p>StampedLock提供了三种锁模式：读锁、写锁、乐观读。</p><p>写锁和读锁与ReentrantReadWriteLock 的写锁和读锁类似，乐观读是新实现的一种锁。</p><h3 id="不支持重入" tabindex="-1"><a class="header-anchor" href="#不支持重入" aria-hidden="true">#</a> 不支持重入</h3><p>不支持可重入可能是出于性能考虑。要实现重入功能，锁内部需要保存更多的信息，比如持有锁的线程，以及它获取锁的次数等。这将使得锁的实现更为复杂，也会带来更多的性能开销。</p><p>StampedLock 的设计目标是提供一个比 ReentrantReadWriteLock 更高性能的读写锁，因此它选择了放弃重入功能，以换取更高的性能。</p><h3 id="不支持锁升级" tabindex="-1"><a class="header-anchor" href="#不支持锁升级" aria-hidden="true">#</a> 不支持锁升级</h3><p>既不支持从读锁升级到写锁，尝试这样做会导致阻塞。这也是为了避免潜在的死锁问题。</p><h3 id="支持锁降级" tabindex="-1"><a class="header-anchor" href="#支持锁降级" aria-hidden="true">#</a> 支持锁降级</h3><p>既可以从写锁降级到读锁，也可以在持有写锁的情况下获取乐观读锁。</p><h2 id="乐观读" tabindex="-1"><a class="header-anchor" href="#乐观读" aria-hidden="true">#</a> 乐观读</h2><p>乐观读（Optimistic Read）是一种非阻塞的读锁，它在获取锁的时候不会阻塞写线程，这个特性使得乐观读在并发读操作远大于写操作的场景中能够提高性能。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">distanceFromOrigin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">long</span> stamp <span class="token operator">=</span> sl<span class="token punctuation">.</span><span class="token function">tryOptimisticRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 乐观读</span>
    <span class="token keyword">double</span> currentX <span class="token operator">=</span> x<span class="token punctuation">,</span> currentY <span class="token operator">=</span> y<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>sl<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 检查在读取过程中是否有写操作</span>
        stamp <span class="token operator">=</span> sl<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 如果有，我们重新获取一个读锁</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            currentX <span class="token operator">=</span> x<span class="token punctuation">;</span>
            currentY <span class="token operator">=</span> y<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            sl<span class="token punctuation">.</span><span class="token function">unlockRead</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>currentX <span class="token operator">*</span> currentX <span class="token operator">+</span> currentY <span class="token operator">*</span> currentY<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码是一个乐观读的例子，在这个例子中，首先尝试获取一个乐观读锁，然后读取数据。如果在读取数据的过程中，有其他线程获取到了写锁，我们就重新获取一个读锁，然后再次读取数据。</p></blockquote><h3 id="基本思想" tabindex="-1"><a class="header-anchor" href="#基本思想" aria-hidden="true">#</a> 基本思想</h3><p>如果一个线程去读取数据，它假设在读数据过程中不会被其他线程进行写操作，因此他并不会去真正的获取一把锁，而是获取一个stamp时间戳，然后直接读取数据。<br> 读取完成后，这个线程会使用 validate()方法检查在它读取数据的过程中，是否有其他线程获取到了写锁。</p><ul><li>如果没有，那么它就可以确信读到的数据是有效的。</li><li>如果有其他线程获取到了写锁，那么它就需要使用一种回退策略，通常是尝试重新获取一个读锁或写锁。</li></ul><h3 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h3><p>优点：性能高。乐观读是进行了假设，直接获取值后再去判断获取值是否有变更，并不阻塞写线程<br> 缺点：如果数据频繁发生变更，乐观读可能需要多次回退重试才能读取到有效的数据，这可能就会导致实际性能低于普通读锁</p><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><p>StampedLock的使用场景通常在需要高并发读写操作的情况下，而且读操作远大于写操作，这时候使用 StampedLock 可以提高性能。</p><p>StampedLock特别适合在数据结构中，如哈希映射和并发数组等。</p>`,25);function r(d,k){return s(),t("div",null,[l,i,p(" more "),u])}const v=a(c,[["render",r],["__file","2306021924.html.vue"]]);export{v as default};