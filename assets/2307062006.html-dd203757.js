import{_ as s,Q as n,a3 as a,a7 as e}from"./framework-94ca7993.js";const i={},l=e(`<h1 id="博客整合github-actions实现自动发布记录" tabindex="-1"><a class="header-anchor" href="#博客整合github-actions实现自动发布记录" aria-hidden="true">#</a> 博客整合Github Actions实现自动发布记录</h1><p>博客网站结合git提供的快速博客实现，现记录提交文档时实现自动发布，并复制一份到自己的远程服务器，通过域名访问远程服务器进而访问博客</p><h2 id="服务器操作" tabindex="-1"><a class="header-anchor" href="#服务器操作" aria-hidden="true">#</a> 服务器操作</h2><h3 id="创建密钥" tabindex="-1"><a class="header-anchor" href="#创建密钥" aria-hidden="true">#</a> 创建密钥</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span>
</code></pre></div><blockquote><ul><li>密钥文件保存位置可以修改，如果不想修改可以直接Enter，默认的文件保存路径在 <strong>~/.ssh/</strong> 文件夹下</li><li>命令会生成两个文件，分别为id_rsa.pub（公钥）和id_rsa（私钥）</li></ul></blockquote><h3 id="开启ssh登录" tabindex="-1"><a class="header-anchor" href="#开启ssh登录" aria-hidden="true">#</a> 开启ssh登录</h3><ul><li>复制公钥内内容到~/.ssh/authorized_keys文件中</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/.ssh/
<span class="token function">cp</span> id_rsa.pub authorized_keys
</code></pre></div><ul><li>修改文件访问权限</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/authorized_keys
<span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/id_rsa
<span class="token function">chmod</span> <span class="token number">644</span> ~/.ssh/id_rsa.pub
</code></pre></div><h3 id="创建git仓库" tabindex="-1"><a class="header-anchor" href="#创建git仓库" aria-hidden="true">#</a> 创建git仓库</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /www/wwwroot/blog
<span class="token builtin class-name">cd</span> /www/wwwroot/blog
<span class="token function">git</span> init
</code></pre></div><blockquote><p>如果服务器还没有安装qit，需要先安装git</p></blockquote><h3 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置" aria-hidden="true">#</a> 修改配置</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--add</span> safe.directory /www/wwwroot/blog
</code></pre></div><h2 id="github操作" tabindex="-1"><a class="header-anchor" href="#github操作" aria-hidden="true">#</a> github操作</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /root/.ssh/id_rsa.pub
</code></pre></div><h2 id="github-项目添加配置" tabindex="-1"><a class="header-anchor" href="#github-项目添加配置" aria-hidden="true">#</a> github 项目添加配置</h2><h3 id="创建github账号访问令牌" tabindex="-1"><a class="header-anchor" href="#创建github账号访问令牌" aria-hidden="true">#</a> 创建github账号访问令牌</h3><ul><li>点击头像 -&gt; settings -&gt; Developer Settings -&gt; Personal access tokens -&gt; Tokens(classic) -&gt; 创建新的token</li><li>复制token保存</li></ul><h3 id="创建-github项目访问令牌" tabindex="-1"><a class="header-anchor" href="#创建-github项目访问令牌" aria-hidden="true">#</a> 创建 github项目访问令牌</h3><ul><li>打开博客项目</li><li>打开settings -&gt; Secrets and variables -&gt; Actions</li><li>创建ACCESS_TOKEN变量，值填上一步保存的github账号访问令牌</li><li>创建DEPLOY_KEY变量，值填写服务器私钥</li></ul><h2 id="博客" tabindex="-1"><a class="header-anchor" href="#博客" aria-hidden="true">#</a> 博客</h2><p>博客项目添加.github文件夹，在文件夹下创建一个yml文件，内容填写</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>name: Deploy blog

on:
  push:
    branches:
      - master

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          submodules: <span class="token boolean">true</span>
          fetch-depth: <span class="token number">0</span>
          persist-credentials: <span class="token boolean">false</span>

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: <span class="token number">16</span>

      - name: Build Blog
        run: <span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> run docs:build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          TOKEN: <span class="token variable">\${{ secrets.ACCESS_TOKEN }</span><span class="token punctuation">}</span>
          BRANCH: blog
          FOLDER: src/.vuepress/dist

  deploy-server:
    runs-on: ubuntu-latest
    needs: deploy-gh-pages
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          ref: blog
          fetch-depth: <span class="token number">0</span>

      - name: Configuration environment
        run: <span class="token operator">|</span>
          <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/.ssh/
          <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${{ secrets.DEPLOY_KEY }</span>}&quot;</span> <span class="token operator">&gt;</span> ~/.ssh/id_rsa
          <span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/id_rsa
          ssh-keyscan yanggl.cn <span class="token operator">&gt;&gt;</span> ~/.ssh/known_hosts
          <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&#39;yaien6530&#39;</span>
          <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&#39;yaien_6530@163.com&#39;</span>

      - name: Deploy
        run: <span class="token operator">|</span>
          <span class="token function">ssh</span> root@yanggl.cn <span class="token string">&quot;cd /www/wwwroot/blog/&quot;</span>
          <span class="token function">git</span> push <span class="token parameter variable">-f</span> root@yanggl.cn:/www/wwwroot/blog blog          
          <span class="token function">ssh</span> root@yanggl.cn <span class="token string">&quot;cd /www/wwwroot/blog &amp;&amp; git reset --hard HEAD&quot;</span>

      - name: Copy to dist
        run: <span class="token operator">|</span>
          <span class="token function">ssh</span> root@yanggl.cn <span class="token string">&quot;rsync -avz --delete /www/wwwroot/blog/ /usr/share/nginx/html/&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><ul><li><strong>deploy-gh-pages:</strong> 这个任务是编译博客项目，然后将编译好的内容推送到blog分支,</li><li><strong>deploy-server:</strong> 这个任务是将blog分支的内容推送到服务器git上，然后复制内容到/usr/share/nginx/html/文件夹下</li><li>利用nginx访问/usr/share/nginx/html/就可以直接访问博客静态页面</li></ul></blockquote>`,27),t=[l];function r(d,c){return n(),a("div",null,t)}const u=s(i,[["render",r],["__file","2307062006.html.vue"]]);export{u as default};
