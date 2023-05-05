import{_ as a,X as i,Y as l,a0 as r,Z as e,$ as s,a2 as d}from"./framework-1502171d.js";const t={},n=e("h1",{id:"sql底层执行原理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#sql底层执行原理","aria-hidden":"true"},"#"),s(" SQL底层执行原理")],-1),o=e("p",null,"介绍SQL底层执行原理以及流程",-1),c=d(`<h2 id="mysql结构" tabindex="-1"><a class="header-anchor" href="#mysql结构" aria-hidden="true">#</a> Mysql结构</h2><p>大体来说，可以分为Server层和引擎层两部分</p><h3 id="server层" tabindex="-1"><a class="header-anchor" href="#server层" aria-hidden="true">#</a> server层</h3><p>server层主要包括<strong>连接器、查询缓存、分析器、优化器、执行器</strong>等。这些基本涵盖了mysql的大多数核心 服务功能，以及所有的内置函数，所有跨存储引擎的功能都在这一层实现，比如存储过程、触发器、视图等。</p><h4 id="连接器" tabindex="-1"><a class="header-anchor" href="#连接器" aria-hidden="true">#</a> 连接器</h4><p>连接器是用来建立Mysql客户端与服务端之间通信的，客户端要想发起通信都必须先跟服务端建立通信连接</p><p>连接命令中的 mysql 是客户端工具，用来跟服务端建立连接。在完成经典的 TCP 握手后，连接器就要开始认证身份，这个时候用的就是你输入的用户名和密码来进行认证。</p><blockquote><ul><li>如果用户名或密码不对，你就会收到一个&quot;Access denied for user&quot;的错误，然后客户端程序结束执行。</li><li>如果用户名密码认证通过，连接器会到权限表里面查出你拥有的权限。之后，这个连接里面的权限判断逻辑，都将依赖于此时读到的权限。</li></ul></blockquote><p>一个用户成功建立连接后，即使你用管理员账号对这个用户的权限做了修改，也不会影响已经存在连接的权限。修改完成后，只有再新建的连接才会使用新的权限设置。</p><p>接完成后，如果你没有后续的动作，这个连接就处于空闲状态，你可以在 show processlist 命令中看到它。文本中这个图是 show processlist 的结果，其中的 Command 列显示为“Sleep”的这一行，就表示现在系统里面有一个空闲连接，关闭连接 <code>kill &lt;id&gt;</code>。</p><p>客户端如果长时间不发送command到Server端，连接器就会自动将它断开。这个时间是由参数 <code>wait_timeout</code> 控制的，默认值是 8 小时。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 查看wait_timeout
show global variables like &#39;wait_timeout&#39;;

-- 设置全局服务器关闭非交互连接之前等待活动的秒数
set global wait_timeout = 28800; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据库里面，长连接是指连接成功后，如果客户端持续有请求，则一直使用同一个连接。短连接则是指每次执行完很少的几次查询就断开连接，下次查询再重新建立一个。</p><blockquote><p>开发当中我们大多数时候用的都是长连接,把连接放在Pool内进行管理，但是长连接有些时候会导致 MySQL 占用内存涨得特别快，这是因为 MySQL 在执行过程中临时使用的内存是管理在连接对象里面的。这些资源会在连接断开的时候才释放。所以如果长连接累积下来，可能导致内存占用太大，被系统强行杀掉（OOM），从现象看就是 MySQL 异常重启了。</p><ul><li>定期断开长连接。使用一段时间，或者程序里面判断执行过一个占用内存的大查询后，断开连接，之后要查询再重连。</li><li>如果你用的是 MySQL 5.7 或更新版本，可以在每次执行一个比较大的操作后，通过执行 mysql_reset_connection 来重新初始化连接资源。这个过程不需要重连和重新做权限验证，但是会将连接恢复到刚刚创建完时的状态。</li></ul></blockquote><h4 id="查询缓存" tabindex="-1"><a class="header-anchor" href="#查询缓存" aria-hidden="true">#</a> 查询缓存</h4><p>连接建立完成后就是写sql然后执行。MySQL 拿到一个查询请求后，会先到查询缓存看看，之前是不是执行过这条语句。之前执行过的语句及其结果可能会以 key-value 对的形式，被直接缓存在内存中。key 是查询的语句，value 是查询的结果。如果你的查询能够直接在这个缓存中找到 key，那么这个 value 就会被直接返回给客户端。</p><p>如果语句不在查询缓存中，就会继续后面的执行阶段。执行完成后，执行结果会被存入查询缓存中。你可以看到，如果查询命中缓存，MySQL 不需要执行后面的复杂操作，就可以直接返回结果，这个效率会很高。</p><blockquote><p>大多数情况下查询缓存就是个鸡肋</p><ul><li>查询缓存往往弊大于利。查询缓存的失效非常频繁，只要有对一个表的更新，这个表上所有的查询缓存都会被清空。因此很可能你费劲地把结果存起来，还没使用呢，就被一个更新全清空了。对于更新压力大的数据库来说，查询缓存的命中率会非常低。</li><li>一般建议大家在静态表里使用查询缓存，什么叫静态表呢？就是一般我们极少更新的表。比如，一个系统配置表、字典表，那这张表上的查询才适合使用查询缓存。好在 MySQL 也提供了这种“按需使用”的方式。你可以将my.cnf参数 query_cache_type 设置成 DEMAND。</li><li>mysql8.0已经移除了查询缓存功能</li></ul></blockquote><h4 id="分析器" tabindex="-1"><a class="header-anchor" href="#分析器" aria-hidden="true">#</a> 分析器</h4><p>分析器先会做“词法分析”。你输入的是由多个字符串和空格组成的一条 SQL 语句，MySQL 需要识别出里面的字符串分别是什么，代表什么。</p><p>MySQL 从你输入的&quot;select&quot;这个关键字识别出来，这是一个查询语句。它也要把字符串“T”识别成“表名 T”，把字符串“ID”识别成“列 ID”。</p><p>做完了这些识别以后，就要做“语法分析”。根据词法分析的结果，语法分析器会根据语法规则，判断你输入的这个 SQL 语句是否满足 MySQL 语法。</p><h4 id="优化器" tabindex="-1"><a class="header-anchor" href="#优化器" aria-hidden="true">#</a> 优化器</h4><p>优化器是在表里面有多个索引的时候，决定使用哪个索引；或者在一个语句有多表关联（join）的时候，决定各个表的连接顺序。</p><h4 id="执行器" tabindex="-1"><a class="header-anchor" href="#执行器" aria-hidden="true">#</a> 执行器</h4><p>开始执行的时候，要先判断一下你对这个表 T 有没有执行查询的权限，如果没有，就会返回没有权限的错误；如果有权限，就打开表继续执行。打开表的时候，执行器就会根据表的引擎定义，去使用这个引擎提供的接口。</p><h3 id="引擎层" tabindex="-1"><a class="header-anchor" href="#引擎层" aria-hidden="true">#</a> 引擎层</h3><p>存储引擎层负责数据的存储和提取。其架构模式是插件式的，支持 InnoDB、MyISAM、Memory 等多个存储引擎。现在最常用的存储引擎是 InnoDB，它从 MySQL 5.5.5 版本开始成为了默认存储引擎。也就是说如果我们在create table时不指定表的存储引擎类型,默认会给你设置存储引擎为InnoDB。</p>`,28);function h(u,p){return i(),l("div",null,[n,o,r(" more "),c])}const y=a(t,[["render",h],["__file","2305020501.html.vue"]]);export{y as default};
