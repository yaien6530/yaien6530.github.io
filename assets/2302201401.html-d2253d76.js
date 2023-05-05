import{_ as o,X as e,Y as c,a0 as u,Z as s,$ as n,a1 as t,a2 as p,C as i}from"./framework-1502171d.js";const l={},k=s("h1",{id:"微信服务号推送服务模板消息",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#微信服务号推送服务模板消息","aria-hidden":"true"},"#"),n(" 微信服务号推送服务模板消息")],-1),r=s("p",null,"记录通过微信服务号推送服务模版消息的实现",-1),d=s("h2",{id:"业务需求",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#业务需求","aria-hidden":"true"},"#"),n(" 业务需求")],-1),m={href:"https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Operation_Specifications.html",target:"_blank",rel:"noopener noreferrer"},b=p('<h2 id="认证的服务号" tabindex="-1"><a class="header-anchor" href="#认证的服务号" aria-hidden="true">#</a> 认证的服务号</h2><p>要使用模板功能，该服务号必须是认证的，且接收的对象必须关注此服务号，否则无法推送</p><h2 id="服务号中添加模板" tabindex="-1"><a class="header-anchor" href="#服务号中添加模板" aria-hidden="true">#</a> 服务号中添加模板</h2><p>在添加模板之前，需要开通模板消息接口服务，可使用的接口以及限制可在最地下的接口权限查看。</p><figure><img src="https://img-blog.csdnimg.cn/20201104180022925.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEwNDA5OQ==,size_16,color_FFFFFF,t_70#pic_center" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="获取access-token" tabindex="-1"><a class="header-anchor" href="#获取access-token" aria-hidden="true">#</a> 获取access_token</h2>',6),g={href:"https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html",target:"_blank",rel:"noopener noreferrer"},q={href:"https://mp.weixin.qq.com/debug?token=2007817736&lang=zh_CN",target:"_blank",rel:"noopener noreferrer"},_=s("img",{src:"https://img-blog.csdnimg.cn/2020110418101428.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEwNDA5OQ==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述",loading:"lazy"},null,-1),h=p(`<h2 id="调用后台代码-发送模板消息" tabindex="-1"><a class="header-anchor" href="#调用后台代码-发送模板消息" aria-hidden="true">#</a> 调用后台代码，发送模板消息</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">httpTest2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RestTemplate</span> restTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> <span class="token constant">ACCESS_TOKEN</span> <span class="token operator">=</span> <span class="token string">&quot;ACCESS_TOKEN &quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> uri <span class="token operator">=</span> <span class="token string">&quot;https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=&quot;</span> <span class="token operator">+</span> <span class="token constant">ACCESS_TOKEN</span><span class="token punctuation">;</span>
        <span class="token class-name">HttpHeaders</span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        headers<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON_UTF8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> entity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> strbody <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">postForObject</span><span class="token punctuation">(</span>uri<span class="token punctuation">,</span> <span class="token function">getJsonParas</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>strbody<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>


    <span class="token keyword">private</span> <span class="token class-name">JSONObject</span> <span class="token function">getJsonParas</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JSONObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// openid</span>
        jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;touser&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ocC-bdsdsdsdsdsdsu1_dOA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
        <span class="token comment">// 模板id </span>
        jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;template_id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;zoL2ZADT0Apaaalq4khHFdLjRszwUemR0Iu8TFihC_k&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// url</span>
        jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;url&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://weixin.qq.com/download&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">JSONObject</span> miniprogram <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        miniprogram<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;appid&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;wx79740f85108e5502&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        miniprogram<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;pagepath&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;pages/homeTab/homeTab&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;miniprogram&quot;</span><span class="token punctuation">,</span>miniprogram<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">JSONObject</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JSONObject</span> first <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        first<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;您有一笔待支付费用，请尽快支付！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JSONObject</span> keyword1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyword1<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;AAA43434&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyword1<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;color&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#173177&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JSONObject</span> keyword2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyword2<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;66666 元&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyword2<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;color&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#173177&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JSONObject</span> keyword3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyword3<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;产品月付&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyword3<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;color&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#173177&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JSONObject</span> keyword4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyword4<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;请尽快支付！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JSONObject</span> remark <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        remark<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;感谢您的使用!!！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> first<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;keyword1&quot;</span><span class="token punctuation">,</span> keyword1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;keyword2&quot;</span><span class="token punctuation">,</span> keyword2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;keyword3&quot;</span><span class="token punctuation">,</span> keyword3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;keyword4&quot;</span><span class="token punctuation">,</span> keyword4<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;remark&quot;</span><span class="token punctuation">,</span> remark<span class="token punctuation">)</span><span class="token punctuation">;</span>

        jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> jsonObject<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，我们就可以在微信上收到一条服务通知</p><figure><img src="https://img-blog.csdnimg.cn/20201104181715231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEwNDA5OQ==,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>`,4);function f(w,O){const a=i("ExternalLinkIcon");return e(),c("div",null,[k,r,u(" more "),d,s("p",null,[n("项目中存在金额待支付，需要实时提醒微信用户；小程序的服务推送是一次性的，且需要用户点击授权才能推送，授权一次可发送一条，不符合业务需求；在查看官方文档后发现服务号的模板推送是可以实现的，具体可查看 "),s("a",m,[n("接口实现"),t(a)]),n(" 以及 "),s("a",v,[n("模板消息运营规范"),t(a)]),n("。")]),b,s("p",null,[n("发送模板，需要用到 "),s("a",g,[n("access_token"),t(a)]),n(" ，access_token 的获取需要用到 服务号的 appid 及开发者密码 secret，根据文档调用 GET 接口即可获取到；")]),s("p",null,[n("也可以前往 "),s("a",q,[n("服务号接口调试"),t(a)]),n("，填写对应信息获取测试token "),_,n(" 在使用是可能会报错 ip 无效，将该ip添加到白名单中即可")]),h])}const N=o(l,[["render",f],["__file","2302201401.html.vue"]]);export{N as default};
