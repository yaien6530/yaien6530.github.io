import{_ as s,o as n,c as a,e}from"./app-aefb116a.js";const i={},l=e(`<h1 id="博客整合github-actions实现自动发布记录" tabindex="-1"><a class="header-anchor" href="#博客整合github-actions实现自动发布记录" aria-hidden="true">#</a> 博客整合Github Actions实现自动发布记录</h1><p>博客网站结合git提供的快速博客实现，现记录提交文档时实现自动发布，并复制一份到自己的远程服务器，通过域名访问远程服务器进而访问博客</p><h2 id="服务器操作" tabindex="-1"><a class="header-anchor" href="#服务器操作" aria-hidden="true">#</a> 服务器操作</h2><h3 id="创建密钥" tabindex="-1"><a class="header-anchor" href="#创建密钥" aria-hidden="true">#</a> 创建密钥</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span>
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
</code></pre></div><h2 id="github-项目添加配置" tabindex="-1"><a class="header-anchor" href="#github-项目添加配置" aria-hidden="true">#</a> github 项目添加配置</h2><h3 id="创建github账号访问令牌" tabindex="-1"><a class="header-anchor" href="#创建github账号访问令牌" aria-hidden="true">#</a> 创建github账号访问令牌</h3><ul><li>点击头像 -&gt; settings -&gt; Developer Settings -&gt; Personal access tokens -&gt; Tokens(classic) -&gt; 创建新的token</li><li>复制token保存</li></ul><h3 id="创建-github-项目访问令牌" tabindex="-1"><a class="header-anchor" href="#创建-github-项目访问令牌" aria-hidden="true">#</a> 创建 github 项目访问令牌</h3><ul><li>打开博客项目</li><li>打开settings -&gt; Secrets and variables -&gt; Actions</li><li>创建ACCESS_TOKEN变量，值填上一步保存的github账号访问令牌</li><li>创建DEPLOY_KEY变量，值填写服务器私钥</li><li>创建SERVER_HOST变量，值填写服务器公网IP</li><li>创建SERVER_USERNAME变量，值填写服务器访问用户名</li><li>创建SERVER_PASSWORD变量，值填写服务器访问密码</li></ul><h2 id="博客" tabindex="-1"><a class="header-anchor" href="#博客" aria-hidden="true">#</a> 博客</h2><p>博客项目添加.github文件夹，在文件夹下创建一个yml文件，内容填写</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 工作流名称</span>
name: Deploy blog

<span class="token comment"># 监听分支提交</span>
on:
  push:
    branches:
      - master

<span class="token comment"># 执行的工作</span>
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          persist-credentials: <span class="token boolean">false</span>

      <span class="token comment"># 设置使用的node</span>
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: <span class="token string">&quot;16.15.1&quot;</span>

      <span class="token comment"># 拉取依赖并编译</span>
      - name: Install and Build
        run: <span class="token operator">|</span>
          <span class="token function">yarn</span> <span class="token function">install</span>
          <span class="token function">yarn</span> docs:build
          
      <span class="token comment"># 将编译好的文件提交到服务器</span>
      - name: Upload to Deploy Server
        uses: appleboy/scp-action@master
        with:
          host: <span class="token variable">\${{ secrets.SERVER_HOST }</span><span class="token punctuation">}</span>
          username: <span class="token variable">\${{ secrets.SERVER_USERNAME }</span><span class="token punctuation">}</span>
          password: <span class="token variable">\${{ secrets.SERVER_PASSWORD }</span><span class="token punctuation">}</span>
          source: <span class="token string">&#39;./dist/*&#39;</span>
          target: <span class="token string">&#39;/www/wwwroot/dist&#39;</span>
          overwrite: <span class="token boolean">true</span>

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          TOKEN: <span class="token variable">\${{ secrets.ACCESS_TOKEN }</span><span class="token punctuation">}</span>
          BRANCH: blog
          FOLDER: src/.vuepress/dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上配置需要根据项目调整node版本<strong>node-version</strong>的值以及本地编译后的路径<strong>source</strong>和要上传到服务器的路径<strong>target</strong>的值！</p></blockquote>`,27),t=[l];function d(c,r){return n(),a("div",null,t)}const u=s(i,[["render",d],["__file","2307062006.html.vue"]]);export{u as default};
