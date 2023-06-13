import{_ as n,Q as s,a2 as a,a6 as e}from"./framework-8a5ffb50.js";const i={},t=e(`<h1 id="管道-pipeline-与-lua脚本" tabindex="-1"><a class="header-anchor" href="#管道-pipeline-与-lua脚本" aria-hidden="true">#</a> 管道（Pipeline）与 Lua脚本</h1><h2 id="管道" tabindex="-1"><a class="header-anchor" href="#管道" aria-hidden="true">#</a> 管道</h2><p>客户端可以一次性发送多个请求而不用等待服务器的响应，待所有命令都发送完成后再一次性读取服务器的响应，这样可以极大的降低多条命令执行的网络传输开销。管道执行多条命令的网络开销实际上只相当于一次命令执行的网络开销。需要注意的是用pipeline方式打包命令发送，redis必须处理完所有命令前先缓存起所有命令的处理结构。打包的命令越多，缓存消耗的内存也越多，所以并不是打包的命令越多越好。</p><p>pipeline中发送的每个command都会被server立即执行，如果执行失败，将会在此后的响应中得到信息；也就是pipeline并不是表达所有的命令一起成功的语义，管道中前面命令失败并不会影响到后面命令的执行，同时管道的操作并** 非原子**的。</p><h2 id="lua脚本" tabindex="-1"><a class="header-anchor" href="#lua脚本" aria-hidden="true">#</a> Lua脚本</h2><p>reids 在2.6版本推出的脚本功能，允许开发者使用lua语言编写脚本传到redis中执行。通过内置的Lua解释器，可以使用EVAL命令对Lua脚本进行求值。EVAL命令格式如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>EVAL script numkeys key <span class="token punctuation">[</span>key<span class="token punctuation">..</span><span class="token punctuation">]</span> arg <span class="token punctuation">[</span>arg<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 1.script参数是一段Lua脚本程序，它会被运行在redis服务器上下文中，这段脚本不必（也不应该）定义为一个Lua函数。</span>
<span class="token comment"># 2.numkeys参数用于指定键名参数的个数。</span>
<span class="token comment"># 3.键名参数key [key ...]，从EVAL第三个参数开始算起，表示在脚本中所用到的那些redis键，这些键名参数可以在Lua中通过全局变量KEYS数组，用1/2/3形式访问</span>
<span class="token comment"># 4.在命令的最后，那些不是键名参数的附加参数 arg [arg ...] ，可以在Lua中通过全局变量ARGV数组访问，访问的形式和KEYS变量类似( ARGV[1] 、 ARGV[2] ，诸如此类)</span>

<span class="token comment"># 例如 </span>
<span class="token number">127.0</span>.0.1:6379 <span class="token operator">&gt;</span> <span class="token builtin class-name">eval</span><span class="token string">&quot;return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}&quot;</span> <span class="token number">2</span>
key1
key2
first
second
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;key1&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;key2&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;first&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;second&quot;</span>

<span class="token comment">#  其中 &quot;return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}&quot; 是被求值的Lua脚本，数字2指定了键名参数的数量， key1和key2是键名参数，分别使用 KEYS[1] 和 //KEYS[2] 访问，而最后的 first 和 second 则是附加参数，可以通过 ARGV[1] 和 ARGV[2] 访问它们。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：redis时单进程、单线程执行脚本，因此不要在Lua脚本中出现死循环和耗时的运算，否则redis会阻塞，将不接受其他的命令，所以使用时要注意不能出现死循环、耗时运算</p></blockquote><h3 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势</h3><ol><li><strong>减少网络开销</strong>：这点跟管道类似，使用脚本也可以减少网络往返时间；</li><li><strong>原子操作</strong>：redis会将脚本作为一个整体去执行，中间不会被其他命令所影响；</li><li><strong>替代redis事务</strong>：redis自带事务很鸡肋，而lua脚本几乎实现了常规的事务功能，同时官方也推荐使用lua脚本替代redis本身的事务功能；</li></ol>`,10),l=[t];function c(r,o){return s(),a("div",null,l)}const u=n(i,[["render",c],["__file","2305091736.html.vue"]]);export{u as default};
