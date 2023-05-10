const e=JSON.parse('{"key":"v-362b94c6","path":"/en/note/redis/2305091736.html","title":"管道（Pipeline）与 Lua脚本","lang":"en-US","frontmatter":{"isOriginal":true,"date":"2021-01-15T00:00:00.000Z","index":true,"category":["数据库"],"tag":["Redis"],"description":"管道（Pipeline）与 Lua脚本 管道 客户端可以一次性发送多个请求而不用等待服务器的响应，待所有命令都发送完成后再一次性读取服务器的响应，这样可以极大的降低多条命令执行的网络传输开销。管道执行多条命令的网络开销实际上只相当于一次命令执行的网络开销。需要注意的是用pipeline方式打包命令发送，redis必须处理完所有命令前先缓存起所有命令的处理结构。打包的命令越多，缓存消耗的内存也越多，所以并不是打包的命令越多越好。 pipeline中发送的每个command都会被server立即执行，如果执行失败，将会在此后的响应中得到信息；也就是pipeline并不是表达所有的命令一起成功的语义，管道中前面命令失败并不会影响到后面命令的执行，同时管道的操作并** 非原子**的。","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://blog/yanggl.cn/note/redis/2305091736.html"}],["meta",{"property":"og:url","content":"https://blog/yanggl.cn/en/note/redis/2305091736.html"}],["meta",{"property":"og:site_name","content":"Yaien Blog"}],["meta",{"property":"og:title","content":"管道（Pipeline）与 Lua脚本"}],["meta",{"property":"og:description","content":"管道（Pipeline）与 Lua脚本 管道 客户端可以一次性发送多个请求而不用等待服务器的响应，待所有命令都发送完成后再一次性读取服务器的响应，这样可以极大的降低多条命令执行的网络传输开销。管道执行多条命令的网络开销实际上只相当于一次命令执行的网络开销。需要注意的是用pipeline方式打包命令发送，redis必须处理完所有命令前先缓存起所有命令的处理结构。打包的命令越多，缓存消耗的内存也越多，所以并不是打包的命令越多越好。 pipeline中发送的每个command都会被server立即执行，如果执行失败，将会在此后的响应中得到信息；也就是pipeline并不是表达所有的命令一起成功的语义，管道中前面命令失败并不会影响到后面命令的执行，同时管道的操作并** 非原子**的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"article:author","content":"Yaien"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:published_time","content":"2021-01-15T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"管道（Pipeline）与 Lua脚本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-01-15T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yaien\\",\\"url\\":\\"https://yanggl.cn\\",\\"email\\":\\"yaien_6530@163.com\\"}]}"]]},"headers":[{"level":2,"title":"管道","slug":"管道","link":"#管道","children":[]},{"level":2,"title":"Lua脚本","slug":"lua脚本","link":"#lua脚本","children":[{"level":3,"title":"优势","slug":"优势","link":"#优势","children":[]}]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":2.73,"words":819},"filePathRelative":"en/note/redis/2305091736.md","localizedDate":"January 15, 2021","excerpt":"<h1> 管道（Pipeline）与 Lua脚本</h1>\\n<h2> 管道</h2>\\n<p>客户端可以一次性发送多个请求而不用等待服务器的响应，待所有命令都发送完成后再一次性读取服务器的响应，这样可以极大的降低多条命令执行的网络传输开销。管道执行多条命令的网络开销实际上只相当于一次命令执行的网络开销。需要注意的是用pipeline方式打包命令发送，redis必须处理完所有命令前先缓存起所有命令的处理结构。打包的命令越多，缓存消耗的内存也越多，所以并不是打包的命令越多越好。</p>\\n<p>pipeline中发送的每个command都会被server立即执行，如果执行失败，将会在此后的响应中得到信息；也就是pipeline并不是表达所有的命令一起成功的语义，管道中前面命令失败并不会影响到后面命令的执行，同时管道的操作并**\\n非原子**的。</p>","autoDesc":true}');export{e as data};
