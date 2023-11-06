import{_ as e,o as n,c as l,d as t,a as i,b as a,e as r}from"./app-e8f9dac7.js";const o={},g=i("h1",{id:"mysql索引",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#mysql索引","aria-hidden":"true"},"#"),a(" MySQL索引")],-1),h=i("p",null,[a("索引"),i("strong",null,"是一种单独的、物理的对数据库表中一列或多列的值进行排序的存储结构"),a("，简单讲就是"),i("strong",null,"一种排好序的数据结构"),a("。")],-1),d=i("p",null,"在千万级别的表中，有索引跟没有索引查询耗时差别是好几个数量级，好的索引设计可以帮助快速的在数据表中找到想要的数据。",-1),p=r(`<h2 id="处理问题" tabindex="-1"><a class="header-anchor" href="#处理问题" aria-hidden="true">#</a> 处理问题</h2><p>MySQL存储数据是存储在磁盘上的，而且两个相邻数据之间所处的磁盘位置不一定连续，让一条查询sql执行的时候，是需要去磁盘中一条条数据进行加载比较，每一次的加载都是一次磁盘IO，这是非常消耗性能的。处理这个问题的解决方案就是减少磁盘IO，尽可能控制读取次数。索引就是帮我们去整理这些数据，通过建立合适的数据结构，方便查询的时候减少对磁盘的IO。</p><h2 id="数据结构对比" tabindex="-1"><a class="header-anchor" href="#数据结构对比" aria-hidden="true">#</a> 数据结构对比</h2><h3 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树" aria-hidden="true">#</a> 二叉树</h3><figure><img src="https://qiniu.yanggl.cn/image/20230511091310.png" alt="索引" tabindex="0" loading="lazy"><figcaption>索引</figcaption></figure><p>如果现在要查询一条语句，条件是<strong>Col2 = 25</strong>，如果没有使用索引，顺序一条条的去查找比对，需要进行5次磁盘IO才能找到，而通过二叉树构成的索引，只需要两次就可以定位到数据，效率会高一些。</p><p>如果现在要查询一条<strong>Col1 = 6</strong>的语句，此时构成的二叉树就有可能是线性的，虽然都是查询6，但其实查找都是执行了六次，索引并没有对查询有任何帮助，索引mysql并不使用二叉树作为底层数据结构。</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091401.png" alt="二叉树" tabindex="0" loading="lazy"><figcaption>二叉树</figcaption></figure><h3 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h3><p>红黑树其实也是一棵二叉数，又叫二叉平衡树。红黑树可以对新增的元素做平衡处理，比如上面1-6的元素，如果用红黑树实现就会是这样的情况。</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091420.png" alt="红黑树" tabindex="0" loading="lazy"><figcaption>红黑树</figcaption></figure><p>虽然红黑树解决了二叉数线性树的弊端，但是在某些场景下对sql的查询仍然不是很友好，比如：当插入几百万行数据时，树的高度已经达到十几，如果刚好查找的数据在叶子节点，那至少需要遍历十几次才可以查找到。</p><p>我们要解决的本质是减少查询次数，如果我们控制了树的高度，就可以很好的解决查询的问题。</p><h3 id="b树" tabindex="-1"><a class="header-anchor" href="#b树" aria-hidden="true">#</a> B树</h3><p>B树的特点就是一个节点不在只存一个数据，而是一页数据，一页数据里面存放多个数据节点以及子节点地址，子节点又存储一页数据，这就可以实现将数据横向存储，控制了树的高度，减少了IO次数。</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091507.png" alt="B树" tabindex="0" loading="lazy"><figcaption>B树</figcaption></figure><p>B树做索引的特点：</p><ul><li>叶节点具有相同的深度，叶节点的指针为空</li><li>所有索引元素不重复</li><li>节点中的数据索引从左到右递增排序</li><li>data里面存储的是索引数据所在行所处磁盘文件的地址</li></ul><p>虽然B树解决接红黑树高度的问题，但其实mysql也不是用b树结构做索引，而是使用变种的B+树。</p><h3 id="b-树" tabindex="-1"><a class="header-anchor" href="#b-树" aria-hidden="true">#</a> B+树</h3><p>B+树可以算是B树的进阶版，其数据结构类似，节点都是存储一页数据，并且节点中的索引也是从左到右递增排好序。</p><p>B+树与B树的差异：</p><ol><li>非叶子节点不存储data数据，只存储索引，而且是冗余存储，这样处理可以放更多的索引</li><li>所有的data数据都放在叶子节点，并且叶子节点包含所有的索引字段</li><li>叶子节点之间用指针连接，mysql变种后的是实现双指针，这样可以提高区间的访问性能</li></ol><figure><img src="https://qiniu.yanggl.cn/image/20230511091537.png" alt="B+树" tabindex="0" loading="lazy"><figcaption>B+树</figcaption></figure><p>假设现在要通过索引树查找Col = 35的数据，步骤如下：</p><ul><li>从根节点出发</li><li>将节点整页的数据加载到内存里</li><li>如果是非叶子节点，通过查找算法进行数据比对找到35所在的子节点数据页磁盘地址，再次执行操作2</li><li>如果是叶子节点，通过匹配到的索引记录的磁盘文件地址去加载所需数据</li></ul><h4 id="树高度问题如何解决" tabindex="-1"><a class="header-anchor" href="#树高度问题如何解决" aria-hidden="true">#</a> 树高度问题如何解决？</h4><p>mysql一页在磁盘上默认分配的大小为16kb，通过语句**SHOW GLOBAL STATUS LIKE &#39;Innodb_page_size&#39;**可以查到这个值。</p><p>对于非叶子节点，假设我们使用bigint做主键，占用的是8Byte，记录叶子节点的元素指针在mysql设置的是6Byte，那一页就可以存放 16x1024/(8+6)个元素，计算后为<strong>1170</strong>个元素。</p><p>对于叶子节点，不仅仅存索引还存储data数据，这个data可能存储的是索引所在行的磁盘文件的地址，也有可能存储的是索引所在行的所有列数据。现假设叶子节点存放data为所有列数据，一个元素记录了1K数据，那一页就可以<strong>16</strong>个元素。</p><p>此时如果构建一个 <strong>h=3</strong> 的B+树，那叶子节点就可以存放 1170x1170x16 个元素，计算后为<strong>21902400</strong>个元素。</p><p>两千多万的数据，高度仅仅是3，查找一个元素的IO次数只用了3次，而如果没有走索引，那有可能扫几百万甚至千万次才可以找到元素，查找效率差的是好几个数量级，这也是索引为什么那么高效的原因。</p><p>对于Mysql来说，有可能根节点或者所有非叶子节点常驻内存，对于千万数据级别的表进行查找，直接在内存进行匹配获取索引行数据或者磁盘文件地址，只需要一次IO去获取数据就可以获取到需要的数据，查找的效率更高了。</p><blockquote><p>如果使用B树存储，因为data是跟随索引元素下的，假设还是1kb，那一页数据就存16个元素，如果存储两千万的数据，树的高度大约为7，跟B+树没得比。</p></blockquote><h4 id="b-three-和-b-three的区别" tabindex="-1"><a class="header-anchor" href="#b-three-和-b-three的区别" aria-hidden="true">#</a> B Three 和 B+ Three的区别</h4><ol><li>B Three的数据是放在节点元素上的，而且所有索引元素都不重复；B+ Three是将数据存放在叶子节点的元素上，并且非叶子节点冗余子节点的首个索引元素，叶子节点记录所有索引元素记录。</li><li>B Three 叶子节点之间没有指针相连，当进行范围查询时，获取下一个叶子节点的数据又要从根节点再次检索；B+ Three叶子节点之间记录了双向指针，当进行范围查找时就可以通过这个双向指针快速定位下一个节点的数据。</li></ol><h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> HASH</h3><p>mysql还有一种索引结构就是Hash索引，通过一个Hash桶（数组）还有链表形成，通过计算索引行的Hash值确定是在表的哪一个位置，再形成链表去存储数据，当查询的时候只需要对数据进行一次hash计算就可以定位出数据存储的位置，在很多时候Hash索引要比B+树索引更高效。</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091617.png" alt="HASH" tabindex="0" loading="lazy"><figcaption>HASH</figcaption></figure><p>Hash虽然很高效，但是更多时候依旧选择B+树作为索引结构，原因主要有：</p><ol><li>Hash冲突问题</li><li>只能满足 <strong>=</strong> 的条件，对于范围查询 <strong>IN、大于、小于</strong> 等不支持，B+树通过叶子节点的双向指针可以很好的支持范围查询</li></ol><h2 id="存储引擎索引实现" tabindex="-1"><a class="header-anchor" href="#存储引擎索引实现" aria-hidden="true">#</a> 存储引擎索引实现</h2><p>Mysql中有很多的存储引擎实现，存储引擎描述的是数据库表的，真实作用是在表上而不是数据库。早期使用的是MyISAM，现在流行的是InnoDB，现在看看这两个的的实现。</p><h3 id="myisam" tabindex="-1"><a class="header-anchor" href="#myisam" aria-hidden="true">#</a> MyISAM</h3><p>MyISAM存储引擎生成的数据文件是三个</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091657.png" alt="MyISAM数据文件" tabindex="0" loading="lazy"><figcaption>MyISAM数据文件</figcaption></figure><ol><li>以.frm结尾的是记录数据表相关信息的文件</li><li>以.MYD结尾的是记录真实数据信息的数据文件</li><li>以.MYI结尾的是记录索引信息的文件</li></ol><p>这就意味着MyISAM存储引擎的主键索引实现是讲数据与索引树分开的，通过两个文件分别存储索引树和数据信息，又叫非聚集索引，MyISAM主键、非主键索引都是非聚集索引</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091707.png" alt="MyISAM" tabindex="0" loading="lazy"><figcaption>MyISAM</figcaption></figure><p>MyISAM如果要查找数据，通过MYI索引树文件，先定位到查找的数据，再通过叶子节点记录的行磁盘文件地址，再去MYD文件获取具体的数据信息。</p><h3 id="innodb" tabindex="-1"><a class="header-anchor" href="#innodb" aria-hidden="true">#</a> InnoDB</h3><p>InnoDB存储引擎生成的数据文件是两个</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091727.png" alt="InnoDB数据文件" tabindex="0" loading="lazy"><figcaption>InnoDB数据文件</figcaption></figure><ol><li>以.frm结尾的是记录数据表相关信息的文件</li><li>以.idb结尾的是记录数据和索引信息的文件</li></ol><p>与MyISAM不同，InnoDB主键索引是将索引树和数据写在同一个同一个文件，叶子节点包含了完整列数据，又叫聚集索引，而对于非主键索引，叶子节点记录的是主键索引的主键值而不是完整的列数据，又称非聚集索引</p><figure><img src="https://qiniu.yanggl.cn/image/20230511091738.png" alt="InnoDB" tabindex="0" loading="lazy"><figcaption>InnoDB</figcaption></figure><blockquote><p>问题：</p><ol><li><p>为什么建议InnoDB表要建主键？</p><p>答：如果表没有建主键，mysql选择一列数据都不相等的或者自动建一列隐藏列作为数据的唯一标识，主键索引则通过该隐藏列来进行构建。为了节约资源，建议加上主键，而不用mysql帮我们去创建。</p></li><li><p>为什么推荐使用整形的自增主键？</p></li></ol></blockquote><pre><code> 答：相比UUID等作为主键，推荐整形是比对方便，且节约空间。使用自增主键时，新插入的元素总是会加到最后一个节点，当节点元素满的时候会开新的节点去存，并不会影响已经构建好的索引，如果是存在中间，就可能会破坏已经构建好的索引，重新调整索引元素。
</code></pre><blockquote><ol start="3"><li>为什么非主键索引叶子节点存储的是主键值？</li></ol></blockquote><pre><code> 答：InnoDB引擎每一张表都会有一个主键索引，如果我们建表时有指定列为主键，则使用主键去构建主键索引，如果没有指定主键，那会选择一列数据不重复的列或者建一列隐藏列作为主键再去构建主键索引。而非主键索引之所以只记录主键索引的主键值，主要是为了节约存储空间，还有一个就是为了保证插入数据时非主键索引与主键索引的一致性。
</code></pre>`,60);function s(c,f){return n(),l("div",null,[g,h,d,t(" more "),p])}const y=e(o,[["render",s],["__file","2305012001.html.vue"]]);export{y as default};
