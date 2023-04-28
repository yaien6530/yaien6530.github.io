import{_ as a,p as e,q as s,a1 as n}from"./framework-5866ffd3.js";const r={},d=n(`<h1 id="centos-8-linux服务器防火墙常用命令" tabindex="-1"><a class="header-anchor" href="#centos-8-linux服务器防火墙常用命令" aria-hidden="true">#</a> CentOS 8 Linux服务器防火墙常用命令</h1><h3 id="查看防火墙某个端口是否开放" tabindex="-1"><a class="header-anchor" href="#查看防火墙某个端口是否开放" aria-hidden="true">#</a> 查看防火墙某个端口是否开放</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>firewall<span class="token operator">-</span>cmd <span class="token operator">--</span>query<span class="token operator">-</span>port<span class="token operator">=</span><span class="token number">3306</span><span class="token operator">/</span>tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="开放防火墙端口3306" tabindex="-1"><a class="header-anchor" href="#开放防火墙端口3306" aria-hidden="true">#</a> 开放防火墙端口3306</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code># 注意：开放端口后要重启防火墙生效
firewall<span class="token operator">-</span>cmd <span class="token operator">--</span>zone<span class="token operator">=</span><span class="token keyword">public</span> <span class="token operator">--</span>add<span class="token operator">-</span>port<span class="token operator">=</span><span class="token number">3306</span><span class="token operator">/</span>tcp <span class="token operator">--</span>permanent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重启防火墙" tabindex="-1"><a class="header-anchor" href="#重启防火墙" aria-hidden="true">#</a> 重启防火墙</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>systemctl restart firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="关闭防火墙端口" tabindex="-1"><a class="header-anchor" href="#关闭防火墙端口" aria-hidden="true">#</a> 关闭防火墙端口</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>firewall<span class="token operator">-</span>cmd <span class="token operator">--</span>remove<span class="token operator">-</span>port<span class="token operator">=</span><span class="token number">3306</span><span class="token operator">/</span>tcp <span class="token operator">--</span>permanent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看防火墙状态" tabindex="-1"><a class="header-anchor" href="#查看防火墙状态" aria-hidden="true">#</a> 查看防火墙状态</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>systemctl status firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="关闭防火墙" tabindex="-1"><a class="header-anchor" href="#关闭防火墙" aria-hidden="true">#</a> 关闭防火墙</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>systemctl stop firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="打开防火墙" tabindex="-1"><a class="header-anchor" href="#打开防火墙" aria-hidden="true">#</a> 打开防火墙</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>systemctl start firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="开放一段端口" tabindex="-1"><a class="header-anchor" href="#开放一段端口" aria-hidden="true">#</a> 开放一段端口</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>firewall<span class="token operator">-</span>cmd <span class="token operator">--</span>zone<span class="token operator">=</span><span class="token keyword">public</span> <span class="token operator">--</span>add<span class="token operator">-</span>port<span class="token operator">=</span><span class="token number">40000</span><span class="token operator">-</span><span class="token number">45000</span><span class="token operator">/</span>tcp <span class="token operator">--</span>permanent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看开放的端口列表" tabindex="-1"><a class="header-anchor" href="#查看开放的端口列表" aria-hidden="true">#</a> 查看开放的端口列表</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>firewall<span class="token operator">-</span>cmd <span class="token operator">--</span>zone<span class="token operator">=</span><span class="token keyword">public</span> <span class="token operator">--</span>list<span class="token operator">-</span>ports
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看被监听-listen-的端口" tabindex="-1"><a class="header-anchor" href="#查看被监听-listen-的端口" aria-hidden="true">#</a> 查看被监听(Listen)的端口</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>netstat <span class="token operator">-</span>lntp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="检查端口被哪个进程占用" tabindex="-1"><a class="header-anchor" href="#检查端口被哪个进程占用" aria-hidden="true">#</a> 检查端口被哪个进程占用</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>netstat <span class="token operator">-</span>lnp<span class="token operator">|</span>grep <span class="token number">3306</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,23),i=[d];function l(t,o){return e(),s("div",null,i)}const c=a(r,[["render",l],["__file","index.html.vue"]]);export{c as default};
