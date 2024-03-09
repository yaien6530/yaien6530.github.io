import{_ as a,o as e,c as t,d as p,a as n,b as s,e as o}from"./app-4f9dbd97.js";const c={},i=n("h1",{id:"ddd-领域驱动设计模型",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ddd-领域驱动设计模型","aria-hidden":"true"},"#"),s(" DDD 领域驱动设计模型")],-1),l=n("p",null,[s("DDD（Domain-Driven Design 领域驱动设计）是由Eric Evans最先提出，目的是对软件所涉及到的领域进行建模，以应对系统规模过大时引起的软件复杂性的问题。整个过程大概是这样的，开发团队和领域专家一起通过 通用语言("),n("br"),s(" Ubiquitous Language)去理解和消化领域知识，从领域知识中提取和划分为一个一个的子领域（核心子域，通用子域，支撑子域），并在子领域上建立模型，再重复以上步骤，这样周而复始，构建出一套符合当前领域的模型。")],-1),u=o(`<h2 id="开发目标" tabindex="-1"><a class="header-anchor" href="#开发目标" aria-hidden="true">#</a> 开发目标</h2><p>依靠领域驱动设计的设计思想，通过事件风暴建立领域模型，合理划分领域逻辑和物理边界，建立领域对象及服务矩阵和服务架构图，定义符合DDD分层架构思想的代码结构模型，保证业务模型与代码模型的一致性。通过上述设计思想、方法和过程，指导团队按照DDD设计思想完成微服务设计和开发。1、拒绝泥球小单体、拒绝污染功能与服务、拒绝一加功能排期一个月2、架构出高可用极易符合互联网高速迭代的应用服务3、物料化、组装化、可编排的服务，提高人效</p><h3 id="服务架构" tabindex="-1"><a class="header-anchor" href="#服务架构" aria-hidden="true">#</a> 服务架构</h3><ul><li>应用层{application} <ul><li>应用服务位于应用层。用来表述应用和用户行为，负责服务的组合、编排和转发，负责处理业务用例的执行顺序以及结果的拼装。</li><li>应用层的服务包括应用服务和领域事件相关服务。</li><li>应用服务可对微服务内的领域服务以及微服务外的应用服务进行组合和编排，或者对基础层如文件、缓存等数据直接操作形成应用服务，对外提供粗粒度的服务。</li><li>领域事件服务包括两类：领域事件的发布和订阅。通过事件总线和消息队列实现异步数据传输，实现微服务之间的解耦。</li></ul></li><li>领域层{domain} <ul><li>领域服务位于领域层，为完成领域中跨实体或值对象的操作转换而封装的服务，领域服务以与实体和值对象相同的方式参与实施过程。</li><li>领域服务对同一个实体的一个或多个方法进行组合和封装，或对多个不同实体的操作进行组合或编排，对外暴露成领域服务。领域服务封装了核心的业务逻辑。实体自身的行为在实体类内部实现，向上封装成领域服务暴露。</li><li>为隐藏领域层的业务逻辑实现，所有领域方法和服务等均须通过领域服务对外暴露。</li><li>为实现微服务内聚合之间的解耦，原则上禁止跨聚合的领域服务调用和跨聚合的数据相互关联。</li></ul></li><li>基础层{infrastructrue} <ul><li>基础服务位于基础层。为各层提供资源服务（如数据库、缓存等），实现各层的解耦，降低外部资源变化对业务逻辑的影响。</li><li>基础服务主要为仓储服务，通过依赖反转的方式为各层提供基础资源服务，领域服务和应用服务调用仓储服务接口，利用仓储实现持久化数据对象或直接访问基础资源。</li></ul></li><li>接口层{interfaces} <ul><li>接口服务位于用户接口层，用于处理用户发送的Restful请求和解析用户输入的配置文件等，并将信息传递给应用层。</li></ul></li></ul><h2 id="开发环境" tabindex="-1"><a class="header-anchor" href="#开发环境" aria-hidden="true">#</a> 开发环境</h2><ul><li>jdk1.8【jdk1.7以下只能部分支持netty】</li><li>springboot 2.0.6.RELEASE</li><li>idea + maven</li></ul><h2 id="代码结构示例" tabindex="-1"><a class="header-anchor" href="#代码结构示例" aria-hidden="true">#</a> 代码结构示例</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>itstack<span class="token operator">-</span>demo<span class="token operator">-</span>ddd<span class="token operator">-</span><span class="token number">01</span>
└── src
    ├── main
    │   ├── java
    │   │   └── org<span class="token punctuation">.</span>itstack<span class="token punctuation">.</span>demo
    │   │       ├── application
    │   │       │    ├── event
    │   │       │    │   └── <span class="token class-name">ApplicationRunner</span><span class="token punctuation">.</span>java    
    │   │       │    └── service
    │   │       │        └── <span class="token class-name">UserService</span><span class="token punctuation">.</span>java    
    │   │       ├── domain
    │   │       │    ├── model
    │   │       │    │   ├── aggregates
    │   │       │    │   │   └── <span class="token class-name">UserRichInfo</span><span class="token punctuation">.</span>java    
    │   │       │    │   └── vo
    │   │       │    │       ├── <span class="token class-name">UserInfo</span><span class="token punctuation">.</span>java    
    │   │       │    │       └── <span class="token class-name">UserSchool</span><span class="token punctuation">.</span>java    
    │   │       │    ├── repository
    │   │       │    │   └── <span class="token class-name">IuserRepository</span><span class="token punctuation">.</span>java    
    │   │       │    └── service
    │   │       │        └── <span class="token class-name">UserServiceImpl</span><span class="token punctuation">.</span>java    
    │   │       ├── infrastructure
    │   │       │    ├── dao
    │   │       │    │   ├── impl
    │   │       │    │   │   └── <span class="token class-name">UserDaoImpl</span><span class="token punctuation">.</span>java    
    │   │       │    │   └── <span class="token class-name">UserDao</span><span class="token punctuation">.</span>java    
    │   │       │    ├── po
    │   │       │    │   └── <span class="token class-name">UserEntity</span><span class="token punctuation">.</span>java    
    │   │       │    ├── repository
    │   │       │    │   ├── mysql
    │   │       │    │   │   └── <span class="token class-name">UserMysqlRepository</span><span class="token punctuation">.</span>java
    │   │       │    │   ├── redis
    │   │       │    │   │   └── <span class="token class-name">UserRedisRepository</span><span class="token punctuation">.</span>java        
    │   │       │    │   └── <span class="token class-name">UserRepository</span><span class="token punctuation">.</span>java    
    │   │       │    └── util
    │   │       │        └── <span class="token class-name">RdisUtil</span><span class="token punctuation">.</span>java
    │   │       ├── interfaces
    │   │       │    ├── dto
    │   │       │    │    └── <span class="token class-name">UserInfoDto</span><span class="token punctuation">.</span>java    
    │   │       │    └── facade
    │   │       │        └── <span class="token class-name">DDDController</span><span class="token punctuation">.</span>java
    │   │       └── <span class="token class-name">DDDApplication</span><span class="token punctuation">.</span>java
    │   ├── resources    
    │   │   └── application<span class="token punctuation">.</span>yml
    │   └── webapp    
    │       └── <span class="token constant">WEB</span><span class="token operator">-</span><span class="token constant">INF</span>
    │            └── index<span class="token punctuation">.</span>jsp    
    └── test
         └── java
             └── org<span class="token punctuation">.</span>itstack<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>test
                 └── <span class="token class-name">ApiTest</span><span class="token punctuation">.</span>java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部分重点代码" tabindex="-1"><a class="header-anchor" href="#部分重点代码" aria-hidden="true">#</a> 部分重点代码</h3><blockquote><p>application/UserService.java | 应用层用户服务，领域层服务做具体实现</p></blockquote><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
*应用层用户服务
*/</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token class-name">UserRichInfo</span> <span class="token function">queryUserInfoById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>domain/repository/IUserRepository.java | 领域层资源库，由基础层实现</p></blockquote><div class="language-java" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IUserRepository</span> <span class="token punctuation">{</span>

    <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">UserEntity</span> userEntity<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">UserEntity</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>domain/service/UserServiceImpl.java | 应用层实现类，应用层是很薄的一层可以只做服务编排</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span><span class="token punctuation">(</span><span class="token string">&quot;userService&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;userRepository&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">IUserRepository</span> userRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserRichInfo</span> <span class="token function">queryUserInfoById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
        <span class="token comment">// 查询资源库</span>
        <span class="token class-name">UserEntity</span> userEntity <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">UserInfo</span> userInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userInfo<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>userEntity<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// TODO 查询学校信息，外部接口</span>
        <span class="token class-name">UserSchool</span> userSchool_01 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserSchool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userSchool_01<span class="token punctuation">.</span><span class="token function">setSchoolName</span><span class="token punctuation">(</span><span class="token string">&quot;振华高级实验中学&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">UserSchool</span> userSchool_02 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserSchool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userSchool_02<span class="token punctuation">.</span><span class="token function">setSchoolName</span><span class="token punctuation">(</span><span class="token string">&quot;东北电力大学&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserSchool</span><span class="token punctuation">&gt;</span></span> userSchoolList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userSchoolList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>userSchool_01<span class="token punctuation">)</span><span class="token punctuation">;</span>
        userSchoolList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>userSchool_02<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">UserRichInfo</span> userRichInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserRichInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userRichInfo<span class="token punctuation">.</span><span class="token function">setUserInfo</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
        userRichInfo<span class="token punctuation">.</span><span class="token function">setUserSchoolList</span><span class="token punctuation">(</span>userSchoolList<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> userRichInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>infrastructure/po/UserEntity.java | 数据库对象类</p></blockquote><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserEntity</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    get<span class="token operator">/</span>set <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>infrastructrue/repository/UserRepository.java | 领域层定义接口，基础层资源库实现</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;userRepository&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepository</span> <span class="token keyword">implements</span> <span class="token class-name">IUserRepository</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;userMysqlRepository&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">IUserRepository</span> userMysqlRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;userRedisRepository&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">IUserRepository</span> userRedisRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">UserEntity</span> userEntity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//保存到DB</span>
        userMysqlRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>userEntity<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//保存到Redis</span>
        userRedisRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>userEntity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserEntity</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">UserEntity</span> userEntityRedis <span class="token operator">=</span> userRedisRepository<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> userEntityRedis<span class="token punctuation">)</span> <span class="token keyword">return</span> userEntityRedis<span class="token punctuation">;</span>

        <span class="token class-name">UserEntity</span> userEntityMysql <span class="token operator">=</span> userMysqlRepository<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> userEntityMysql<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//保存到Redis</span>
            userRedisRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>userEntityMysql<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> userEntityMysql<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 查询为NULL</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>interfaces/dto/UserInfoDto.java | DTO对象类，隔离数据库类</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserInfoDto</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>        <span class="token comment">// ID</span>

    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>interfaces/facade/DDDController.java | 门面接口</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DDDController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;userService&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;index&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/user/queryUserInfo&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span> <span class="token function">queryUserInfo</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">UserInfoDto</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>userService<span class="token punctuation">.</span><span class="token function">queryUserInfoById</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ol><li>以上是基于DDD一个基本入门的结构演示完成，实际开发可以按照此模式进行调整。</li><li>目前这个架构分层还不能很好地进行分离，以及层级关系的引用还不利于扩展。</li><li>后续会持续完善以及可以组合搭建RPC框架等，让整个架构更利于互联网开发。</li></ol>`,25);function r(d,k){return e(),t("div",null,[i,l,p(" more "),u])}const m=a(c,[["render",r],["__file","2305090935.html.vue"]]);export{m as default};
