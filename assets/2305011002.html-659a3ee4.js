import{_ as e,U as a,a5 as d,a8 as i}from"./framework-a4fc28af.js";const n={},l=i(`<h1 id="深入理解mysql索引底层数据结构与算法" tabindex="-1"><a class="header-anchor" href="#深入理解mysql索引底层数据结构与算法" aria-hidden="true">#</a> 深入理解mysql索引底层数据结构与算法</h1><p>mysql数据是存储在磁盘上的，数据表里相邻的两个数据并不一定在磁盘上也是相邻的， 每查询一条记录就会去执行一次磁盘IO,这是一个很耗时的操作。</p><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><p><code>索引</code>是帮助mysql高效获取数据的<code>排好序</code>的<code>数据结构</code>；</p><h2 id="索引的数据结构" tabindex="-1"><a class="header-anchor" href="#索引的数据结构" aria-hidden="true">#</a> 索引的数据结构</h2><h3 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树" aria-hidden="true">#</a> 二叉树</h3><p>二叉树的右子节点比父节点大，左子节点比父节点小。通过这一特点进行查询时，通过比对可以 快速定位节点位置。</p><blockquote><p>缺点：数据形成的是满二叉树或者完全二叉树的时候去查找才能很好的发挥索引的优势。在极端情况下， 例如形成的是一颗线型的二叉树，其实跟没有构建索引是一样的。</p></blockquote><h3 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h3><p>红黑树又称二叉平衡树，在新增节点时可以自动调整节点的位置。</p><blockquote><p>缺点：当数据的数据量大时，树的高度会变得很高，而且树的高度不可控。如果查询的数据恰好在叶子节点，而树的查询都是从 父节点开始的，执行的IO次数也会很多。</p></blockquote><h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> HASH</h3><p>构建一个HASH桶，将计算好HASH的元素以及地址放到桶的指定位置，再有相同的则追加在元素后面。 查询则先计算好在桶的哪个位置，再遍历链表。在某种情况下要比B+树更高效。</p><blockquote><p>缺点：对范围<code>IN</code>的查询不支持、hash冲突等问题</p></blockquote><h3 id="b树" tabindex="-1"><a class="header-anchor" href="#b树" aria-hidden="true">#</a> B树</h3><p>B树的结构是在一个节点里面放很多的小节点元素，通过节点的横向扩展来解决树的高度问题。小节点元素是从左到右递增排列的。</p><blockquote><p>B树相比B+树，在存储上有所不足。相比B+树，一个h=3可以存两千多万，而B数要存两千多万需要的h=6。使用B+树的结构， 将数据全部记录在叶子结点，非叶子结点就可以存储更多的索引，形成的树高度更小。</p></blockquote><h3 id="b-树-变种" tabindex="-1"><a class="header-anchor" href="#b-树-变种" aria-hidden="true">#</a> B+树（变种）</h3><p>B+树与B树的结构类似。 B+树只有叶子节点存储数据，其他节点只存储苏索引，且叶子节点包含所有的索引字段和数据。 B+树节点内的索引元素都是排好序的，同时，非叶子节点的子索引元素都是子节点的第一个索引元素(冗余)。 B+树两个叶子节点之间用指针相连，通过指针可以快速定位其他节点的元素，很好的支持范围查找。</p><p>查询过程：</p><ol><li>将节点加载到内存，在内存里比对待查询数据与索引字段，比对结果所指向的是叶子节点，则获取索引元素数据或数据地址；</li><li>不是指向叶子节点，再次进行操作1；</li></ol><blockquote><p>一个节点为一页，mysql默认设置的大小为16384（16KB） 按照mysql存储数据的大小，以bigint为例，占8B;指向子结点的索引节点为6B,则每一页可以存储 16384/(8+6)=1170个节点。以一个高度为3的B+树来算，叶子结点由于存储的是索引和数据，假设每一个节点存1K的数据,一页就是16K， 则总共可以记录 1170<em>1170</em>16=21902400.两千万个。</p></blockquote><h2 id="存储引擎" tabindex="-1"><a class="header-anchor" href="#存储引擎" aria-hidden="true">#</a> 存储引擎</h2><p>存储引擎描述的是数据表而不是数据库，真实起作用的是在表上。</p><h3 id="myisam" tabindex="-1"><a class="header-anchor" href="#myisam" aria-hidden="true">#</a> MyISAM</h3><p>myisam生成三个数据文件：</p><ol><li>以<code>.frm</code>结尾的是记录数据表相关信息的文件</li><li>以<code>.MYD</code>结尾的是记录真实数据信息的数据文件</li><li>以<code>.MYI</code>结尾的是记录索引信息的文件</li></ol><blockquote><p>myisam构建的索引，叶子结点存的是数据在文件中的地址，再通过地址去数据文件获取数据，又称<code>非聚集索引</code></p></blockquote><h3 id="innodb" tabindex="-1"><a class="header-anchor" href="#innodb" aria-hidden="true">#</a> InnoDB</h3><p>innodb生成二个数据文件：</p><ol><li>以<code>.frm</code>结尾的是记录数据表相关信息的文件</li><li>以<code>.idb</code>结尾的是记录数据和索引信息的文件</li></ol><blockquote><p>innodb构建的索引，叶子结点存的是完整的数据记录，又称<code>聚集索引</code></p></blockquote><p>补充：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>1. 建议建主键，且推荐使用整形自增主键的原因：
- 如果表没有建主键，mysql选择一列数据都不相等的或者自动建一列隐藏列作为数据的唯一标识，索引则通过该隐藏列来进行构建。为了节约资源，建议加上主键，
而不用mysql帮我们去创建
- 相比UUID等作为主键，推荐整形是比对方便，且节约空间
- 使用自增主键时，新插入的元素总是会加到最后一个节点，当节点元素满的时候会开新的节点去存，并不会影响已经构建好的索引，
如果是存在中间，就可能会破坏已经构建好的索引，重新调整索引元素

2. 主键索引与非主键索引的区别：
- 主键索引叶子节点存储完整的数据，非主键索引叶子节点存储的是主键值

3. 非主键索引叶子节点存主键值的原因：
- 节约存储空间
- 一致性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非主键索引查询数据时，需要先获取叶子节点存储的主键，再去主键索引里查完整的记录，这一操作又称为<code>回表</code>。</p><h2 id="联合索引" tabindex="-1"><a class="header-anchor" href="#联合索引" aria-hidden="true">#</a> 联合索引</h2><p>联合索引是根据构建索引的字段从左到右的顺序，通过比对字段数据进行排序，如果字段相同，则比对下一个字段的数据，以此来构成了联合索引。</p><blockquote><p>最左前缀原则：在使用联合索引查询数据时，需要按照索引字段从左到右的顺序去添加条件，否则可能会不走索引；</p></blockquote>`,38),c=[l];function o(r,h){return a(),d("div",null,c)}const t=e(n,[["render",o],["__file","2305011002.html.vue"]]);export{t as default};
