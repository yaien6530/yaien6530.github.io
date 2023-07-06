import{_ as a,Q as e,a2 as s,a6 as t}from"./framework-27238c07.js";const i={},r=t(`<h1 id="自动发布原理" tabindex="-1"><a class="header-anchor" href="#自动发布原理" aria-hidden="true">#</a> 自动发布原理</h1><h2 id="服务器创建秘钥" tabindex="-1"><a class="header-anchor" href="#服务器创建秘钥" aria-hidden="true">#</a> 服务器创建秘钥</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa
</code></pre></div><p>可以选择秘钥保存的位置，不需要可以一直Enter</p><blockquote><p>最终会生成公钥和秘钥文件，分别为id_rsa.pub（公钥）和id_rsa（私钥）</p></blockquote><p>打开公钥文件，复制公钥内容</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /root/.ssh/id_rsa.pub
</code></pre></div><p>git config --global --add safe.directory /www/wwwroot/blog</p><h2 id="github-项目添加配置" tabindex="-1"><a class="header-anchor" href="#github-项目添加配置" aria-hidden="true">#</a> github 项目添加配置</h2><h3 id="创建-github令牌" tabindex="-1"><a class="header-anchor" href="#创建-github令牌" aria-hidden="true">#</a> 创建 github令牌</h3><p>点击头像 -&gt; settings -&gt; Developer Settings -&gt; Personal access tokens -&gt; Tokens(classic) -&gt; 创建新的token</p><ul><li>打开settings -&gt; Secrets and variables -&gt; Actions</li><li></li></ul>`,12),n=[r];function c(d,o){return e(),s("div",null,n)}const l=a(i,[["render",c],["__file","2307062006.html.vue"]]);export{l as default};
