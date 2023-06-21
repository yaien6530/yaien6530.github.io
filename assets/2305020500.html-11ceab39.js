import{_ as a,Q as t,a2 as n,a3 as e,a4 as l,V as r,a5 as o,a6 as d,C as s}from"./framework-27238c07.js";const c={},h=e("h1",{id:"explain详解与索引最佳实践",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#explain详解与索引最佳实践","aria-hidden":"true"},"#"),l(" Explain详解与索引最佳实践")],-1),u=e("p",null,"Explain可以模拟优化器执行SQL语句，分析你的查询语句或是结构的性能瓶颈。在select之前加上explain关键字，Mysql会在查询上设置 一个标记，执行查询时就不是执行这条SQL而是会返回执行计划的信息。",-1),p=e("p",null,"如果from中包含子查询，仍然会执行子查询，并将结果放入临时表中。",-1),f=e("p",null,"在查询中，每个表会输出一行，如果有两个表通过join连接查询，则会输出两行。",-1),b=e("p",null,"紧随Explain的语句后，通过show warnings命令可以得到优化后的查询语句，从而看出优化器优化了什么。",-1),x={href:"https://dev.mysql.com/doc/refman/5.7/en/explain-output.html",target:"_blank",rel:"noopener noreferrer"},m=d('<h3 id="字段详解" tabindex="-1"><a class="header-anchor" href="#字段详解" aria-hidden="true">#</a> 字段详解</h3><figure><img src="https://public/assets/images/mysql/20230505.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="id" tabindex="-1"><a class="header-anchor" href="#id" aria-hidden="true">#</a> id</h4><p>属于select的编号，有几个select就会有几个id,与select出现的顺序一致。</p><blockquote><p>id值越大，执行优先级越高；相同则从上往下执行；为null最后执行。</p></blockquote><h4 id="select-type" tabindex="-1"><a class="header-anchor" href="#select-type" aria-hidden="true">#</a> select_type</h4><p>标识对应行使简单查询还是复杂查询。</p><ol><li>simple:简单查询，查询中不含有子查询和union</li><li>primary:复杂查询中最外层select</li><li>subquery:包含在select中的子查询（不在from子句中）</li><li>derived:包含在from子句中的子查询。Mysql会讲结果存在临时表中。</li></ol><h4 id="table" tabindex="-1"><a class="header-anchor" href="#table" aria-hidden="true">#</a> table</h4><p>表示行正在访问的表。</p><p>当from子句中有子查询，table展示<code>&lt;derivenN&gt;</code>,表示当前查询依赖id = N的查询</p><p>当有union时，table展示<code>&lt;union1,2&gt;</code>,1和2表示参与union的行id</p><h4 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> type</h4><p>表示<code>关联类型</code>或<code>访问类型</code>，即mysql决定如何查找表中的行，查找数据行记录的大概范围</p><blockquote><p>从优到劣依次为：system &gt; const &gt; eq_ref &gt; ref &gt; range &gt; index &gt; All</p></blockquote><ul><li>null：能够在优化阶段分解查询语句，在执行阶段不需要再访问表或索引</li><li>system：是const的特例，表里只有一条元组匹配时为system</li><li>const：mysql能对查询的某部分进行优化并转化为一个常量，用于主键索引或唯一索引 的所有列与常数比较时，所以表最多有一个匹配行</li><li>eq_ref：主键索引或唯一索引的所有部分都被连接使用，最多只会返回一条符合的记录。</li><li>ref：与eq_ref类型，使用的是普通索引或唯一索引部分前缀，索引要和某个值比较，可能会找到多个符合条件的行</li><li>range：通常出现在 IN、between、&gt;、&lt;等操作中。使用一个索引来检索给定范围</li><li>index：扫描全索引就能拿到结果，一般扫描某个二级索引，这种扫描是直接扫叶子节点，速度较慢，称为<code>覆盖索引</code></li><li>all：全表扫描，扫描聚集索引所有叶子节点，数据大，比index更慢</li></ul><blockquote><p>一般得保证查询达到range,最好能达到ref</p></blockquote><h4 id="partitions" tabindex="-1"><a class="header-anchor" href="#partitions" aria-hidden="true">#</a> partitions</h4><p>如果查询是基于分区表的话，会显示查询将访问的分区</p><blockquote><p>此字段与在5.7以前还需要再加上 partitions 关键字才会展示</p></blockquote><h4 id="possible-keys" tabindex="-1"><a class="header-anchor" href="#possible-keys" aria-hidden="true">#</a> possible_keys</h4><p>显示本次查询可能会使用哪些索引来完成。</p><h4 id="key" tabindex="-1"><a class="header-anchor" href="#key" aria-hidden="true">#</a> key</h4><p>显示实际采用的索引</p><h4 id="key-len" tabindex="-1"><a class="header-anchor" href="#key-len" aria-hidden="true">#</a> key_len</h4><p>显示索引里使用的字节数，通过这个值可以算出具体使用了索引中的那些列</p><p>计算规则如下：</p><blockquote><ul><li>字符串,char(n)和varchar(n)，5.0.3以后版本中，n均代表字符数,而不是字节数，如果是utf-8，一个数字或字母占1个字节， 一个汉字占3个字节 <ul><li>char(n)：如果存汉字长度就是<code>3n</code>字节</li></ul></li></ul></blockquote><ul><li>varchar(n)：如果存汉字则长度是<code>3n+2</code>字节，加的2字节用来存储字符串长度，因为varchar是变长字符串</li></ul><blockquote><ul><li>数值类型 <ul><li>tinyint:1字节</li></ul></li></ul></blockquote><ul><li>smallint:1字节</li></ul><blockquote><ul><li>int:4字节 <ul><li>bigint:8字节</li></ul></li><li>时间类型 <ul><li>data:3字节</li></ul></li></ul></blockquote><ul><li>timestamp:4字节</li></ul><blockquote><ul><li>datetime:8字节</li><li>如果字段允许为null,需要1字节记录是否为null</li></ul></blockquote><h4 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> ref</h4><p>显示在key列记录的索引中，表查找所用到的列或常量</p><h4 id="rows" tabindex="-1"><a class="header-anchor" href="#rows" aria-hidden="true">#</a> rows</h4><p>显示本行查询估计要读取并检测的行数，不是结果集里的行数</p><h4 id="filtered" tabindex="-1"><a class="header-anchor" href="#filtered" aria-hidden="true">#</a> filtered</h4><p>filtered是一个半分比的值.<code>rows*filtered/100</code>可以估算出将要和explain中前一个表进行连接的行数（id值比当前表id值小的表）</p><blockquote><p>此字段与在5.7以前还需要再加上 <code>extended</code> 关键字才会展示</p></blockquote><h4 id="extra" tabindex="-1"><a class="header-anchor" href="#extra" aria-hidden="true">#</a> Extra</h4><p>展示额外信息，重要值如下：</p><ol><li>Using index：使用了覆盖索引</li><li>Using where：使用where语句来处理结果，并且查询的列未被索引覆盖</li><li>Using index condition：查询的列不完全被覆盖，where条件中是一个前导列的范围</li><li>Using temporary：mysql建了一张临时表来处理查询</li><li>Using filesort：使用外部排序而不是索引排序，数据较小时从内存排，否则需要在磁盘完成</li><li>Select tables optimized way：使用了某些聚合函数（min()、max()等）来访问存在索引的某个字段</li></ol><h3 id="索引最佳实践" tabindex="-1"><a class="header-anchor" href="#索引最佳实践" aria-hidden="true">#</a> 索引最佳实践</h3><ul><li>全值匹配</li><li>最左前缀原则</li><li>在索引列上做操作（计算、函数、自动或手动类型转换）会导致索引失效</li><li>存储引擎不能使用索引中范围条件右边的列</li><li>尽量使用覆盖索引，减少select * 的语句</li><li>使用不等于（!=或&lt;&gt;）、not in、not exists会导致索引失效</li><li>大于、小于、大于等于、小于等于会根据检索比例、表大小等因素整体评估是否使用索引</li><li>is null 、 is not null 一般情况下也会导致索引失效</li><li>like 以通配符开头（&#39;%xa&#39;）也会导致索引失效</li></ul>',46);function _(k,y){const i=s("ExternalLinkIcon");return t(),n("div",null,[h,u,p,f,b,e("blockquote",null,[e("p",null,[l("官方地址："),e("a",x,[l("https://dev.mysql.com/doc/refman/5.7/en/explain-output.html"),r(i)])])]),o(" more "),m])}const g=a(c,[["render",_],["__file","2305020500.html.vue"]]);export{g as default};