import{_ as e,r as t,o,c as p,d as i,a as n,b as s,f as l,e as c}from"./app-25dff8a4.js";const r={},u=n("h1",{id:"索引优化实战",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#索引优化实战","aria-hidden":"true"},"#"),s(" 索引优化实战")],-1),d=n("p",null,"MYSQL 索引优化实战笔记",-1),k=c(`<h2 id="优化实战" tabindex="-1"><a class="header-anchor" href="#优化实战" aria-hidden="true">#</a> 优化实战</h2><h3 id="联合索引第一个字段用范围不会走索引" tabindex="-1"><a class="header-anchor" href="#联合索引第一个字段用范围不会走索引" aria-hidden="true">#</a> 联合索引第一个字段用范围不会走索引</h3><p>mysql内部优化规则可能会觉得第一个字段就用范围，结果集应该很大，回表效率不高，还不知直接全表扫</p><h3 id="强制走索引" tabindex="-1"><a class="header-anchor" href="#强制走索引" aria-hidden="true">#</a> 强制走索引</h3><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 语句</span>
<span class="token keyword">EXPLAIN</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> <span class="token keyword">user</span> <span class="token keyword">force</span> <span class="token keyword">index</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span>
</code></pre></div><p>添加强制索引可以让语句走索引，但是最总查找的效率不一定会比扫全表高，因为回表效率不高</p><h3 id="覆盖索引优化" tabindex="-1"><a class="header-anchor" href="#覆盖索引优化" aria-hidden="true">#</a> 覆盖索引优化</h3><p>对于不走索引的语句，可以尝试使用覆盖索引来进行优化</p><h3 id="in和or在表数据大会走索引-反之不会" tabindex="-1"><a class="header-anchor" href="#in和or在表数据大会走索引-反之不会" aria-hidden="true">#</a> in和or在表数据大会走索引，反之不会</h3><h3 id="like语句一般情况下都会走索引" tabindex="-1"><a class="header-anchor" href="#like语句一般情况下都会走索引" aria-hidden="true">#</a> like语句一般情况下都会走索引</h3><p>like语句看着其实跟大于小于号差不多，之所以会走索引是因为用到了索引下推</p><h2 id="索引下推" tabindex="-1"><a class="header-anchor" href="#索引下推" aria-hidden="true">#</a> 索引下推</h2><p>联合索引是按照最左前缀原则来进行匹配，正常情况下联合索引首个字段就使用like，那只会匹配到这个字段， 后面的因为不能确保是有序的就无法再利用索引。</p><p>5.6版本以前，首个字段就停止索引匹配，那就会拿这些对应索引的主键逐个回表找数据，再比对后序字段是否符合</p><p>5.6对此进行优化，在索引便利过程中，对索引中包含的字段先做判断，过滤掉不符合条件的记录之后再回表，可以有效的减少回表次数。这就是索引下推。</p><blockquote><p>索引下推回减少回表次数，对于innodb引擎只能适用于二级索引，对主键索引并不适用</p></blockquote><h2 id="trace工具" tabindex="-1"><a class="header-anchor" href="#trace工具" aria-hidden="true">#</a> trace工具</h2><p>trace</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
<span class="token comment">-- 开启trace</span>
<span class="token keyword">set</span> <span class="token keyword">session</span> optimizer_trace <span class="token operator">=</span> <span class="token string">&quot;enabled=on&quot;</span><span class="token punctuation">,</span>end_markers_in_json<span class="token operator">=</span><span class="token keyword">on</span><span class="token punctuation">;</span>

<span class="token comment">-- 一起执行查询</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> employees
<span class="token keyword">where</span> name <span class="token operator">&gt;</span> <span class="token string">&#39;a&#39;</span>
<span class="token keyword">order</span> <span class="token keyword">by</span> position<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span>OPTIMIZER_TRACE<span class="token punctuation">;</span>

<span class="token comment">-- 关闭 trace</span>
<span class="token keyword">set</span> <span class="token keyword">session</span> optimizer_trace <span class="token operator">=</span> <span class="token string">&quot;enabled=off&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果集</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;steps&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;join_preparation&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">/* 第一阶段：准备阶段，格式化SQL */</span>
        <span class="token property">&quot;select#&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;steps&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;expanded_query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/* select#1 */ select \`t_menu\`.\`menu_id\` AS \`menu_id\`,\`t_menu\`.\`menu_name\` AS \`menu_name\`,\`t_menu\`.\`menu_url\` AS \`menu_url\`,\`t_menu\`.\`parent_id\` AS \`parent_id\`,\`t_menu\`.\`level\` AS \`level\`,\`t_menu\`.\`icon\` AS \`icon\`,\`t_menu\`.\`order_by\` AS \`order_by\`,\`t_menu\`.\`hidden\` AS \`hidden\`,\`t_menu\`.\`remark\` AS \`remark\` from \`t_menu\` where (\`t_menu\`.\`menu_name\` &gt; &#39;a&#39;) order by \`t_menu\`.\`parent_id\`&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
        <span class="token comment">/* steps */</span>
      <span class="token punctuation">}</span>
      <span class="token comment">/* join_preparation */</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;join_optimization&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">/* 第二阶段：SQL优化阶段 */</span>
        <span class="token property">&quot;select#&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;steps&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;condition_processing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token comment">/* 条件处理 */</span>
              <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;WHERE&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;original_condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;(\`t_menu\`.\`menu_name\` &gt; &#39;a&#39;)&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;steps&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                  <span class="token property">&quot;transformation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;equality_propagation&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;resulting_condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;(\`t_menu\`.\`menu_name\` &gt; &#39;a&#39;)&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                  <span class="token property">&quot;transformation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;constant_propagation&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;resulting_condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;(\`t_menu\`.\`menu_name\` &gt; &#39;a&#39;)&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                  <span class="token property">&quot;transformation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;trivial_condition_removal&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;resulting_condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;(\`t_menu\`.\`menu_name\` &gt; &#39;a&#39;)&quot;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">]</span>
              <span class="token comment">/* steps */</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* condition_processing */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;substitute_generated_columns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* substitute_generated_columns */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;table_dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token comment">/* 表依赖详情 */</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;table&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;row_may_be_null&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                <span class="token property">&quot;map_bit&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">&quot;depends_on_map_bits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">]</span>
                <span class="token comment">/* depends_on_map_bits */</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
            <span class="token comment">/* table_dependencies */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;ref_optimizer_key_uses&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">]</span>
            <span class="token comment">/* ref_optimizer_key_uses */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;rows_estimation&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token comment">/* 预估表的访问成本 */</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;table&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;range_analysis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                  <span class="token property">&quot;table_scan&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token comment">/* 全表扫描情况 */</span>
                    <span class="token property">&quot;rows&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
                    <span class="token comment">/* 扫描行数 */</span>
                    <span class="token property">&quot;cost&quot;</span><span class="token operator">:</span> <span class="token number">6.1</span>
                    <span class="token comment">/* 扫描成本 */</span>
                  <span class="token punctuation">}</span>
                  <span class="token comment">/* table_scan */</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;potential_range_indexes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token comment">/* 查询可能使用的索引 */</span>
                    <span class="token punctuation">{</span>
                      <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PRIMARY&quot;</span><span class="token punctuation">,</span>
                      <span class="token comment">/* 主键索引 */</span>
                      <span class="token property">&quot;usable&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;cause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;not_applicable&quot;</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                      <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;idx_test&quot;</span><span class="token punctuation">,</span>
                      <span class="token comment">/* 二级索引 */</span>
                      <span class="token property">&quot;usable&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;key_parts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token string">&quot;menu_name&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;menu_url&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;parent_id&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;menu_id&quot;</span>
                      <span class="token punctuation">]</span>
                      <span class="token comment">/* key_parts */</span>
                    <span class="token punctuation">}</span>
                  <span class="token punctuation">]</span>
                  <span class="token comment">/* potential_range_indexes */</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;setup_range_conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                  <span class="token punctuation">]</span>
                  <span class="token comment">/* setup_range_conditions */</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;group_index_range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;chosen&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;cause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;not_group_by_or_distinct&quot;</span>
                  <span class="token punctuation">}</span>
                  <span class="token comment">/* group_index_range */</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;analyzing_range_alternatives&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token comment">/* 分析各个索引使用成本 */</span>
                    <span class="token property">&quot;range_scan_alternatives&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                      <span class="token punctuation">{</span>
                        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;idx_test&quot;</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;ranges&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                          <span class="token string">&quot;a &lt; menu_name&quot;</span>
                          <span class="token comment">/* 索引使用范围 */</span>
                        <span class="token punctuation">]</span>
                        <span class="token comment">/* ranges */</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;index_dives_for_eq_ranges&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;rowid_ordered&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                        <span class="token comment">/* 使用该索引获取的记录是否按照主键排序 */</span>
                        <span class="token property">&quot;using_mrr&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;index_only&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                        <span class="token comment">/* 是否使用覆盖索引 */</span>
                        <span class="token property">&quot;rows&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
                        <span class="token comment">/* 扫描行数 */</span>
                        <span class="token property">&quot;cost&quot;</span><span class="token operator">:</span> <span class="token number">19.01</span><span class="token punctuation">,</span>
                        <span class="token comment">/* 使用成本 */</span>
                        <span class="token property">&quot;chosen&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                        <span class="token comment">/* 是否选择 */</span>
                        <span class="token property">&quot;cause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cost&quot;</span>
                      <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                    <span class="token comment">/* range_scan_alternatives */</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;analyzing_roworder_intersect&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                      <span class="token property">&quot;usable&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;cause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;too_few_roworder_scans&quot;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">/* analyzing_roworder_intersect */</span>
                  <span class="token punctuation">}</span>
                  <span class="token comment">/* analyzing_range_alternatives */</span>
                <span class="token punctuation">}</span>
                <span class="token comment">/* range_analysis */</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
            <span class="token comment">/* rows_estimation */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;considered_execution_plans&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;plan_prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">]</span>
                <span class="token comment">/* plan_prefix */</span><span class="token punctuation">,</span>
                <span class="token property">&quot;table&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;best_access_path&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                  <span class="token comment">/* 最有访问路径 */</span>
                  <span class="token property">&quot;considered_access_paths&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token comment">/* 最终选择的访问路径 */</span>
                    <span class="token punctuation">{</span>
                      <span class="token property">&quot;rows_to_scan&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;access_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;scan&quot;</span><span class="token punctuation">,</span>
                      <span class="token comment">/* 访问类型：scan为全表扫描 */</span>
                      <span class="token property">&quot;resulting_rows&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;cost&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;chosen&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                      <span class="token property">&quot;use_tmp_table&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
                    <span class="token punctuation">}</span>
                  <span class="token punctuation">]</span>
                  <span class="token comment">/* considered_access_paths */</span>
                <span class="token punctuation">}</span>
                <span class="token comment">/* best_access_path */</span><span class="token punctuation">,</span>
                <span class="token property">&quot;condition_filtering_pct&quot;</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
                <span class="token property">&quot;rows_for_plan&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
                <span class="token property">&quot;cost_for_plan&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
                <span class="token property">&quot;sort_cost&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
                <span class="token property">&quot;new_cost_for_plan&quot;</span><span class="token operator">:</span> <span class="token number">19</span><span class="token punctuation">,</span>
                <span class="token property">&quot;chosen&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
            <span class="token comment">/* considered_execution_plans */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;attaching_conditions_to_tables&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;original_condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;(\`t_menu\`.\`menu_name\` &gt; &#39;a&#39;)&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;attached_conditions_computation&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">]</span>
              <span class="token comment">/* attached_conditions_computation */</span><span class="token punctuation">,</span>
              <span class="token property">&quot;attached_conditions_summary&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                  <span class="token property">&quot;table&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;attached&quot;</span><span class="token operator">:</span> <span class="token string">&quot;(\`t_menu\`.\`menu_name\` &gt; &#39;a&#39;)&quot;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">]</span>
              <span class="token comment">/* attached_conditions_summary */</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* attaching_conditions_to_tables */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;clause_processing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;clause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ORDER BY&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;original_clause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`.\`parent_id\`&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                  <span class="token property">&quot;item&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`.\`parent_id\`&quot;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">]</span>
              <span class="token comment">/* items */</span><span class="token punctuation">,</span>
              <span class="token property">&quot;resulting_clause_is_simple&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token property">&quot;resulting_clause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`.\`parent_id\`&quot;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* clause_processing */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;reconsidering_access_paths_for_index_ordering&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;clause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ORDER BY&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;steps&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">]</span>
              <span class="token comment">/* steps */</span><span class="token punctuation">,</span>
              <span class="token property">&quot;index_order_summary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;table&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;index_provides_order&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                <span class="token property">&quot;order_direction&quot;</span><span class="token operator">:</span> <span class="token string">&quot;undefined&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;unknown&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;plan_changed&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
              <span class="token punctuation">}</span>
              <span class="token comment">/* index_order_summary */</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* reconsidering_access_paths_for_index_ordering */</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;refine_plan&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;table&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
            <span class="token comment">/* refine_plan */</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
        <span class="token comment">/* steps */</span>
      <span class="token punctuation">}</span>
      <span class="token comment">/* join_optimization */</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;join_execution&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">/* 第三阶段：执行阶段 */</span>
        <span class="token property">&quot;select#&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;steps&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;filesort_information&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;direction&quot;</span><span class="token operator">:</span> <span class="token string">&quot;asc&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;table&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`t_menu\`&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;parent_id&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
            <span class="token comment">/* filesort_information */</span><span class="token punctuation">,</span>
            <span class="token property">&quot;filesort_priority_queue_optimization&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;usable&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
              <span class="token property">&quot;cause&quot;</span><span class="token operator">:</span> <span class="token string">&quot;not applicable (no LIMIT)&quot;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* filesort_priority_queue_optimization */</span><span class="token punctuation">,</span>
            <span class="token property">&quot;filesort_execution&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">]</span>
            <span class="token comment">/* filesort_execution */</span><span class="token punctuation">,</span>
            <span class="token property">&quot;filesort_summary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token comment">/* 文件排序信息 */</span>
              <span class="token property">&quot;rows&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
              <span class="token comment">/* 预计扫描行数 */</span>
              <span class="token property">&quot;examined_rows&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
              <span class="token comment">/* 参与排序行 */</span>
              <span class="token property">&quot;number_of_tmp_files&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
              <span class="token comment">/* 使用临时文件个数，如果为0表示全部用sort_puffer内存排序 */</span>
              <span class="token property">&quot;sort_buffer_size&quot;</span><span class="token operator">:</span> <span class="token number">14656</span><span class="token punctuation">,</span>
              <span class="token comment">/* 排序缓存大小 */</span>
              <span class="token property">&quot;sort_mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;sort_key, rowid&gt;&quot;</span>
              <span class="token comment">/* 排序方式，双路 &lt;sort_key, packed_additional_fields&gt;：单路排序*/</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* filesort_summary */</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
        <span class="token comment">/* steps */</span>
      <span class="token punctuation">}</span>
      <span class="token comment">/* join_execution */</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
  <span class="token comment">/* steps */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="order-by-与-group-by-优化" tabindex="-1"><a class="header-anchor" href="#order-by-与-group-by-优化" aria-hidden="true">#</a> ORDER BY 与 GROUP BY 优化</h2><p>order by排序的优化主要是利用索引已经排好序的规律来优化，如果没有使用到会通过文件进行排序消耗性能</p><ul><li>使用order by 联合索引，查询条件与排序条件中间字段不能断</li><li>order by 多个字段时，顺序要与索引字段一致</li><li>使用降序排序不会走索引排序</li><li>in 不会走索引排序，因为结果集不确定是否有序</li><li>使用 &gt; 条件的不会走索引排序，可能是数据量太大</li></ul><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><ol><li>MySQL支持两种方式的排序filesort和index，Using index是指MySQL扫描索引本身完成排序。index效率高，filesort效率低。</li><li>order by满足两种情况会使用Using index。 <ol><li>order by语句使用索引最左前列。</li><li>使用where子句与order by子句条件列组合满足索引最左前列。</li></ol></li><li>尽量在索引列上完成排序，遵循索引建立（索引创建的顺序）时的最左前缀法则。</li><li>如果order by的条件不在索引列上，就会产生Using filesort。</li><li>能用覆盖索引尽量用覆盖索引</li><li>group by与order by很类似，其实质是先排序后分组，遵照索引创建顺序的最左前缀法则。对于group by的优化如果不需要排序的可以加上order by<br> null禁止排序。注意，where高于having，能写在where中的限定条件就不要去having限定了。</li></ol><h2 id="文件排序原理" tabindex="-1"><a class="header-anchor" href="#文件排序原理" aria-hidden="true">#</a> 文件排序原理</h2><h3 id="排序方式" tabindex="-1"><a class="header-anchor" href="#排序方式" aria-hidden="true">#</a> 排序方式</h3><h4 id="单路排序" tabindex="-1"><a class="header-anchor" href="#单路排序" aria-hidden="true">#</a> 单路排序</h4><p>一次性取满足条件的数据的所有字段，然后在sort_buffer中进行排序。</p><p>trace工具的sort_mode显示&lt;sort_key, additional_fields&gt;或&lt;sort_key, packed_additional_fields&gt;</p><h4 id="双路排序" tabindex="-1"><a class="header-anchor" href="#双路排序" aria-hidden="true">#</a> 双路排序</h4><p>双路排序又称<code>回表</code>排序。首先根据条件查询出相应的字段，然后取排序字段和主键在sort_buffer中排序，拍完序再去主键索引取信息</p><p>trace工具的sort_mode显示&lt;sort_key, rowid&gt;.</p><blockquote><p>MySQL 通过比较系统变量 max_length_for_sort_data(默认1024字节)的大小和需要查询的字段总大小来 判断使用哪种排序模式。</p><ul><li>如果字段的总长度小于max_length_for_sort_data，那么使用单路排序模式；</li><li>如果字段的总长度大于max_length_for_sort_data，那么使用双路排序模式；</li></ul></blockquote><h3 id="排序过程" tabindex="-1"><a class="header-anchor" href="#排序过程" aria-hidden="true">#</a> 排序过程</h3><p>假设条件为 where name = &#39;a&#39;</p><h4 id="单路排序-1" tabindex="-1"><a class="header-anchor" href="#单路排序-1" aria-hidden="true">#</a> 单路排序</h4><ol><li>从索引中找到第一个符合条件的主键ID</li><li>根据ID取出<code>所有字段</code>存入sort_buffer中</li><li>查找下一个符合条件的ID</li><li>一直重复2,3直到没有符合的记录</li><li>排序</li><li>返回结果</li></ol><h4 id="双路排序-1" tabindex="-1"><a class="header-anchor" href="#双路排序-1" aria-hidden="true">#</a> 双路排序</h4><ol><li>从索引中找到第一个符合条件的主键ID</li><li>根据ID取出<code>ID和排序字段</code>存入sort_buffer中</li><li>查找下一个符合条件的ID</li><li>一直重复2,3直到没有符合的记录</li><li>排序</li><li>按照排序好的ID值回到<code>原表</code>取出所欲字段值然后返回</li></ol><p>其实对比两个排序模式，单路排序会把所有需要查询的字段都放到 sort buffer 中，而双路排序只会把主键和需要排序的字段放到 sort buffer<br> 中进行排序，然后再通过主键回到原表查询需要的字段。</p><p>如果 MySQL 排序内存 sort_buffer 配置的比较小并且没有条件继续增加了，可以适当把 max_length_for_sort_data<br> 配置小点，让优化器选择使用双路排序算法，可以在sort_buffer 中一次排序更多的行，只是需要再根据主键回到原表取数据。</p><p>如果 MySQL 排序内存有条件可以配置比较大，可以适当增大 max_length_for_sort_data 的值，让优化器优先选择全字段排序(单路排序)，把需要的字段放到 sort_buffer<br> 中，这样排序后就会直接从内存里返回查询结果了。</p><p>所以，MySQL通过 max_length_for_sort_data 这个参数来控制排序，在不同场景使用不同的排序模式，从而提升排序效率。</p><blockquote><p>注意：如果全部使用sort_buffer内存排序一般情况下效率会高于磁盘文件排序，但不能因为这个就随便增大sort_buffer(默认1M)，mysql很多参数设置都是做过优化的，不要轻易调整。</p></blockquote><h2 id="设计原则" tabindex="-1"><a class="header-anchor" href="#设计原则" aria-hidden="true">#</a> 设计原则</h2><h4 id="_1-代码先行-索引后上" tabindex="-1"><a class="header-anchor" href="#_1-代码先行-索引后上" aria-hidden="true">#</a> 1. 代码先行，索引后上</h4><p>不知大家一般是怎么给数据表建立索引的，是建完表马上就建立索引吗？ 这其实是不对的，一般应该等到主体业务功能开发完毕，把涉及到该表相关sql都要拿出来分析之后再建立索引。</p><h4 id="_2-联合索引尽量覆盖条件" tabindex="-1"><a class="header-anchor" href="#_2-联合索引尽量覆盖条件" aria-hidden="true">#</a> 2. 联合索引尽量覆盖条件</h4><p>比如可以设计一个或者两三个联合索引(尽量少建单值索引)，让每一个联合索引都尽量去包含sql语句里的where、order by、group<br> by的字段，还要确保这些联合索引的字段顺序尽量满足sql查询的最左前缀原则。</p><h4 id="_3-不要在小基数字段上建立索引" tabindex="-1"><a class="header-anchor" href="#_3-不要在小基数字段上建立索引" aria-hidden="true">#</a> 3. 不要在小基数字段上建立索引</h4><p>索引基数是指这个字段在表里总共有多少个不同的值，比如一张表总共100万行记录，其中有个性别字段，其值不是男就是女，那么该字段的基数就是2。<br> 如果对这种小基数字段建立索引的话，还不如全表扫描了，因为你的索引树里就包含男和女两种值，根本没法进行快速的二分查找，那用索引就没有太大的意义了。<br> 一般建立索引，尽量使用那些基数比较大的字段，就是值比较多的字段，那么才能发挥出B+树快速二分查找的优势来。</p><h4 id="_4-长字符串我们可以采用前缀索引" tabindex="-1"><a class="header-anchor" href="#_4-长字符串我们可以采用前缀索引" aria-hidden="true">#</a> 4. 长字符串我们可以采用前缀索引</h4><p>尽量对字段类型较小的列设计索引，比如说什么tinyint之类的，因为字段类型较小的话，占用磁盘空间也会比较小，此时你在搜索的时候性能也会比较好一点。<br> 当然，这个所谓的字段类型小一点的列，也不是绝对的，很多时候你就是要针对varchar(255)这种字段建立索引，哪怕多占用一些磁盘空间也是有必要的。 对于这种varchar(255)<br> 的大字段可能会比较占用磁盘空间，可以稍微优化下，比如针对这个字段的前20个字符建立索引，就是说，对这个字段里的每个值的前20个字符放在索引树里，类似于 KEY index(name(20)<br> ,age,position)。<br> 此时你在where条件里搜索的时候，如果是根据name字段来搜索，那么此时就会先到索引树里根据name字段的前20个字符去搜索，定位到之后前20个字符的前缀匹配的部分数据之后，再回到聚簇索引提取出来完整的name字段值进行比对。<br> 但是假如你要是order by name，那么此时你的name因为在索引树里仅仅包含了前20个字符，所以这个排序是没法用上索引的， group by也是同理。所以这里大家要对前缀索引有一个了解。</p><h4 id="_5-where与order-by冲突时优先where" tabindex="-1"><a class="header-anchor" href="#_5-where与order-by冲突时优先where" aria-hidden="true">#</a> 5. where与order by冲突时优先where</h4><p>在where和order by出现索引设计冲突时，到底是针对where去设计索引，还是针对order by设计索引？到底是让where去用上索引，还是让order by用上索引?<br> 一般这种时候往往都是让where条件去使用索引来快速筛选出来一部分指定的数据，接着再进行排序。<br> 因为大多数情况基于索引进行where筛选往往可以最快速度筛选出你要的少部分数据，然后做排序的成本可能会小很多。</p><h4 id="_6-基于慢sql查询做优化" tabindex="-1"><a class="header-anchor" href="#_6-基于慢sql查询做优化" aria-hidden="true">#</a> 6. 基于慢sql查询做优化</h4><p>可以根据监控后台的一些慢sql，针对这些慢sql查询做特定的索引优化。</p>`,59),v={href:"http://note.youdao.com/noteshare?id=c71f1e66b7f91dab989a9d3a7c8ceb8e&sub=0B91DF863FB846AA9A1CDDF431402C7B",target:"_blank",rel:"noopener noreferrer"};function m(b,q){const a=t("ExternalLinkIcon");return o(),p("div",null,[u,d,i(" more "),k,n("blockquote",null,[n("p",null,[s("慢sql查询查阅："),n("a",v,[s("http://note.youdao.com/noteshare?id=c71f1e66b7f91dab989a9d3a7c8ceb8e&sub=0B91DF863FB846AA9A1CDDF431402C7B"),l(a)])])])])}const h=e(r,[["render",m],["__file","2305032100.html.vue"]]);export{h as default};
