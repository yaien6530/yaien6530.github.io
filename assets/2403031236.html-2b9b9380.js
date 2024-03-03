const e=JSON.parse('{"key":"v-366969d6","path":"/note/java/jvm/2403031236.html","title":"垃圾收集器及原理","lang":"zh-CN","frontmatter":{"isOriginal":true,"order":9,"date":"2024-03-03T00:00:00.000Z","index":true,"category":["Java"],"tag":["JVM","GC"]},"headers":[{"level":2,"title":"GC算法","slug":"gc算法","link":"#gc算法","children":[]},{"level":2,"title":"Serial收集器","slug":"serial收集器","link":"#serial收集器","children":[]},{"level":2,"title":"Parallel收集器","slug":"parallel收集器","link":"#parallel收集器","children":[]},{"level":2,"title":"ParNew收集器","slug":"parnew收集器","link":"#parnew收集器","children":[]}],"git":{"createdTime":1709466185000,"updatedTime":1709466185000,"contributors":[{"name":"yanggl","email":"yaien6530@gmail.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1133},"filePathRelative":"note/java/jvm/2403031236.md","localizedDate":"2024年3月3日","excerpt":"<h1> 垃圾收集器及原理</h1>\\n<p>JVM垃圾收集器负责回收无用对象，以防止内存泄漏。常见的收集器有<strong>Serial、Parallel Scavenge、ParNew、Serial Old、Parallel Old、CMS和G1及ZGC</strong>等。 本文主要简单记录垃圾收集器常用的垃圾收集算法、串行以及并行垃圾收集器的相关知识。</p>\\n<figure><img src=\\"https://qiniu.yanggl.cn/image/2403031236_1.png\\" alt=\\"垃圾收集器\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>垃圾收集器</figcaption></figure>\\n","copyright":{"author":"Yaien","license":"MIT"}}');export{e as data};
