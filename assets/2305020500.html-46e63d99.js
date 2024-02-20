const e=JSON.parse('{"key":"v-753dfaa7","path":"/note/db/mysql/further/2305020500.html","title":"Explain详解与索引最佳实践","lang":"zh-CN","frontmatter":{"isOriginal":true,"date":"2023-05-06T00:00:00.000Z","index":true,"order":3,"category":["DB"],"tag":["MySQL","索引"]},"headers":[{"level":3,"title":"字段详解","slug":"字段详解","link":"#字段详解","children":[]},{"level":3,"title":"索引最佳实践","slug":"索引最佳实践","link":"#索引最佳实践","children":[]}],"git":{"createdTime":1708408812000,"updatedTime":1708408812000,"contributors":[{"name":"Yaien","email":"yaien@YaiendeMacBook-Pro.local","commits":1}]},"readingTime":{"minutes":4.85,"words":1455},"filePathRelative":"note/db/mysql/further/2305020500.md","localizedDate":"2023年5月6日","excerpt":"<h1> Explain详解与索引最佳实践</h1>\\n<p>Explain可以模拟优化器执行SQL语句，分析你的查询语句或是结构的性能瓶颈。在select之前加上explain关键字，Mysql会在查询上设置<br>\\n一个标记，执行查询时就不是执行这条SQL而是会返回执行计划的信息。</p>\\n<p>如果from中包含子查询，仍然会执行子查询，并将结果放入临时表中。在查询中，每个表会输出一行，如果有两个表通过join连接查询，则会输出两行。紧随Explain的语句后，通过show warnings命令可以得到优化后的查询语句，从而看出优化器优化了什么。</p>\\n<blockquote>\\n<p>官方地址：<a href=\\"https://dev.mysql.com/doc/refman/5.7/en/explain-output.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://dev.mysql.com/doc/refman/5.7/en/explain-output.html</a></p>\\n</blockquote>\\n","copyright":{"author":"Yaien","license":"MIT"}}');export{e as data};
