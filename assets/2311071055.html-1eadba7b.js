import{_ as a,o as e,c as i,d as o,a as n,b as s,e as c}from"./app-7b144a51.js";const t={},d=n("h1",{id:"深入理解synchronized",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#深入理解synchronized","aria-hidden":"true"},"#"),s(" 深入理解Synchronized")],-1),r=n("p",null,[n("strong",null,"synchronized"),s("关键字是为了处理在Java编程中多线程环境下的数据一致性和安全性的重要问题。"),n("br"),n("strong",null,"synchronized"),s("关键字可以用于方法或代码块，以确保在同一时刻只有一个线程可以访问被保护的资源（临界资源）。")],-1),l=c(`<h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><h3 id="临界资源" tabindex="-1"><a class="header-anchor" href="#临界资源" aria-hidden="true">#</a> 临界资源</h3><p>一段代码块内如果存在对共享资源的多线程读写操作，称这段代码块为<strong>临界区</strong>，其共享资源为<strong>临界资源</strong>。</p><p>多个线程在临界区内执行，由于代码的执行序列不同而导致结果无法预测，称之为发生了<strong>竞态条件</strong>。</p><h3 id="synchronized" tabindex="-1"><a class="header-anchor" href="#synchronized" aria-hidden="true">#</a> Synchronized</h3><p>在Java中，所有的对象都有一个内置的锁。当一个线程进入一个synchronized方法或代码块时，它会获取这个锁，并在执行完毕后释放这个锁。其他任何尝试进入这个方法或代码块的线程都会被阻塞，直到当前线程释放锁。</p><p>synchronized关键字可以应用于实例方法、静态方法以及代码块。当它应用于实例方法时，锁是与当前对象实例关联的。当它应用于静态方法时，锁是与当前类关联的。当它应用于代码块时，锁是与当前对象实例或类关联的。</p><h2 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h2><h3 id="synchronized方法" tabindex="-1"><a class="header-anchor" href="#synchronized方法" aria-hidden="true">#</a> Synchronized方法</h3><p>当你声明一个方法为synchronized时，这个方法在同一时刻只能被一个线程访问。例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
* 实例方法，锁的是该类的实例对象
*/</span>
<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">synchronizedMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    <span class="token comment">// 执行代码...  </span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
* 静态方法，锁的是类对象
*/</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">synchronizedMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    <span class="token comment">// 执行代码...  </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="synchronized代码块" tabindex="-1"><a class="header-anchor" href="#synchronized代码块" aria-hidden="true">#</a> Synchronized代码块</h3><p>除了synchronized方法，你还可以使用synchronized关键字来保护一个代码块。例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  

    <span class="token doc-comment comment">/**
    * 同步代码块，锁的是该类的实例对象
    */</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
        <span class="token comment">// 执行代码...  </span>
    <span class="token punctuation">}</span>  
    
    <span class="token doc-comment comment">/**
    * 同步代码块，锁的是该类的类对象
    */</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Demo</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
        <span class="token comment">// 执行代码...  </span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 锁对象</span>
    <span class="token class-name">String</span> lock <span class="token operator">=</span> <span class="token string">&quot;lock&quot;</span>
    <span class="token doc-comment comment">/**
    * 同步代码块，锁的是配置的实例对象
    */</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
        <span class="token comment">// 执行代码...  </span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="深入理解" tabindex="-1"><a class="header-anchor" href="#深入理解" aria-hidden="true">#</a> 深入理解</h2><p><strong>synchronized</strong>是JVM的内置锁，基于<strong>Monitor</strong>机制实现，依赖底层操作系统的互斥原语<strong>Mutex（互斥量）</strong>，是一个重量级锁，性能较低。</p><p>JVM在1.5版本后做了许多的优化，例如偏向锁（Biased Locking）、轻量级锁（Biased Locking）、自适应自旋（Adaptive Spinning）、锁消除（Lock<br> Elimination）、锁粗化（Lock Coarsening）等技术来减少锁操作的性能开销，目前来讲synchronized的并发性能已经基本与Lock持平。</p><h3 id="字节码层面的实现" tabindex="-1"><a class="header-anchor" href="#字节码层面的实现" aria-hidden="true">#</a> 字节码层面的实现</h3><p>在使用synchronized关键字进行加锁操作时</p><ul><li>如果是在同步方法上加，是通过方法中的<strong>access_flag</strong>设置<strong>ACC_SYNCHRONIZED</strong>标志来实现</li><li>如果是在同步代码块上加，是通过<strong>monitorenter</strong>和<strong>monitorexit</strong>来实现</li></ul><h3 id="monitor-管程-监视器-机制" tabindex="-1"><a class="header-anchor" href="#monitor-管程-监视器-机制" aria-hidden="true">#</a> Monitor（管程/监视器）机制</h3><p><strong>Monitor</strong>直译为“监视器”，而操作系统领域一般翻译为“管程”。</p><p><strong>管程</strong>是指管理共享变量以及对共享变量操作的过程，让它们支持并发。在java1.5之前，java语言提供的唯一并发语言就是管程，1.5之后提供的SDK并发包也是以管程为基础的。</p><blockquote><p>synchronized关键字以及wait()、notify()、notifyAll()这三个方法就是java中实现管程技术的组成部分。</p></blockquote><h4 id="monitor设计思路" tabindex="-1"><a class="header-anchor" href="#monitor设计思路" aria-hidden="true">#</a> Monitor设计思路</h4><p>在管程的发展史上，先后出现过三种不同的管程模型，分别是<strong>Hasen</strong>模型、<strong>Hoare</strong>模型和<strong>MESA</strong>模型。现在正在广泛使用的是MESA模型。</p><figure><img src="https://qiniu.yanggl.cn/image/202311071601112.png" alt="MESA模型" tabindex="0" loading="lazy"><figcaption>MESA模型</figcaption></figure><blockquote><p>管程中引入了条件变量的概念，每一个条件变量都对应又一个等待队列。条件变量和等待队列的作用就是解决线程之间的同步问题。</p></blockquote>`,28);function p(u,h){return e(),i("div",null,[d,r,o(" more "),l])}const m=a(t,[["render",p],["__file","2311071055.html.vue"]]);export{m as default};
