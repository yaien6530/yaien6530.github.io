import{_ as s,r as e,o as t,c as l,a,b as r,f as i,e as d}from"./app-9aa493f3.js";const c={},p=d(`<h1 id="k8s-flannel-公网ip搭建笔记" tabindex="-1"><a class="header-anchor" href="#k8s-flannel-公网ip搭建笔记" aria-hidden="true">#</a> K8S + Flannel 公网IP搭建笔记</h1><p>159.75.154.193 master 1.12.242.126 node1 139.159.219.202 node2 101.34.229.23 node3</p><h2 id="版本简介" tabindex="-1"><a class="header-anchor" href="#版本简介" aria-hidden="true">#</a> 版本简介</h2><h3 id="软件版本信息" tabindex="-1"><a class="header-anchor" href="#软件版本信息" aria-hidden="true">#</a> 软件版本信息</h3><table><thead><tr><th>名称</th><th>版本</th></tr></thead><tbody><tr><td>docker</td><td>10.10.21</td></tr><tr><td>kubernetes</td><td>1.21.0-0</td></tr><tr><td>Flannel</td><td>0.20.2</td></tr></tbody></table><h3 id="集群角色规划" tabindex="-1"><a class="header-anchor" href="#集群角色规划" aria-hidden="true">#</a> 集群角色规划</h3><table><thead><tr><th>服务商</th><th>内核</th><th>公网IP</th><th>节点</th></tr></thead><tbody><tr><td>腾讯云</td><td>centOS7.6</td><td>159.75.154.193</td><td>master</td></tr><tr><td>腾讯云</td><td>centOS7.6</td><td>1.12.242.126</td><td>node1</td></tr><tr><td>华为云</td><td>centOS7.6</td><td>139.159.219.202</td><td>node2</td></tr><tr><td>腾讯云</td><td>centOS7.6</td><td>101.34.229.23</td><td>node3</td></tr></tbody></table><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2><h3 id="修改服务器名称" tabindex="-1"><a class="header-anchor" href="#修改服务器名称" aria-hidden="true">#</a> 修改服务器名称</h3><p>修改所有的服务器名称，使用命令</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># instanceName 处填写每个服务器的名称</span>
<span class="token function">sudo</span> hostnamectl set-hostname <span class="token operator">&lt;</span>instanceName<span class="token operator">&gt;</span>
</code></pre></div><h3 id="修改服务器hosts文件" tabindex="-1"><a class="header-anchor" href="#修改服务器hosts文件" aria-hidden="true">#</a> 修改服务器hosts文件</h3><p>修改所有服务器的hosts文件内容，往hosts文件中添加我们的服务器公网ip和对应的服务器名称</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/hosts <span class="token operator">&lt;&lt;</span><span class="token string">EOF
159.75.154.193 master
1.12.242.126 node1
139.159.219.202 node2
101.34.229.23 node3
EOF</span>
</code></pre></div><h3 id="创建虚拟网卡" tabindex="-1"><a class="header-anchor" href="#创建虚拟网卡" aria-hidden="true">#</a> 创建虚拟网卡</h3><p>为所有服务器添加虚拟网卡，在{IP}处填写公网IP</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 创建临时虚拟网卡</span>
<span class="token function">ifconfig</span> eth0:1 <span class="token punctuation">{</span>IP<span class="token punctuation">}</span>
 
<span class="token comment"># 创建永久的虚拟网卡</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysconfig/network-scripts/ifcfg-eth0:1 <span class="token operator">&lt;&lt;</span><span class="token string">EOF
BOOTPROTO=static
DEVICE=eth0:1
IPADDR=&lt;IP&gt;
PREFIX=32
TYPE=Ethernet
USERCTL=no
ONBOOT=yes
EOF</span>

<span class="token comment"># 验证,如果多了一个 eth0:1 说明创还能成功</span>
<span class="token function">ifconfig</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="云服务器安全组设置" tabindex="-1"><a class="header-anchor" href="#云服务器安全组设置" aria-hidden="true">#</a> 云服务器安全组设置</h3><h4 id="master节点" tabindex="-1"><a class="header-anchor" href="#master节点" aria-hidden="true">#</a> master节点</h4><table><thead><tr><th>协议</th><th>端口</th><th>使用者</th></tr></thead><tbody><tr><td>TCP</td><td>2379～2380</td><td>kube-apiserver, etcd</td></tr><tr><td>TCP</td><td>6443</td><td>所有组件</td></tr><tr><td>UDP</td><td>8472</td><td>Flannel 网络插件</td></tr><tr><td>TCP</td><td>10250</td><td>kubelet, Control Plane 组件</td></tr><tr><td>TCP</td><td>10251</td><td>kube-scheduler</td></tr><tr><td>TCP</td><td>10252</td><td>kube-controller-manager</td></tr></tbody></table><h5 id="防火墙设置" tabindex="-1"><a class="header-anchor" href="#防火墙设置" aria-hidden="true">#</a> 防火墙设置</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开启防火墙</span>
systemctl start firewalld
<span class="token comment"># 添加端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">22</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">443</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">6443</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">8472</span>/udp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">10250</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">10251</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">10252</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">2379</span>-2380/tcp <span class="token parameter variable">--permanent</span>
<span class="token comment"># 刷新防火墙</span>
systemctl restart firewalld
<span class="token comment"># 查看所有开放的端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --list-ports
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="worker节点" tabindex="-1"><a class="header-anchor" href="#worker节点" aria-hidden="true">#</a> worker节点</h4><table><thead><tr><th>协议</th><th>端口</th><th>使用者</th></tr></thead><tbody><tr><td>UDP</td><td>8472</td><td>Flannel 网络插件</td></tr><tr><td>TCP</td><td>10250</td><td>kubelet, Control Plane 组件</td></tr><tr><td>TCP</td><td>30000~32767</td><td>所有组件</td></tr></tbody></table><h5 id="服务器防火墙设置" tabindex="-1"><a class="header-anchor" href="#服务器防火墙设置" aria-hidden="true">#</a> 服务器防火墙设置</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>systemctl start firewalld
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">22</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">443</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">8472</span>/udp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">10250</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">30000</span>-32767/tcp <span class="token parameter variable">--permanent</span>
systemctl restart firewalld
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --list-ports
</code></pre></div><h2 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h2><p>所有的服务器都要执行</p><h3 id="更新安装依赖" tabindex="-1"><a class="header-anchor" href="#更新安装依赖" aria-hidden="true">#</a> 更新安装依赖</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> update 
<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> conntrack ipvsadm ipset jq sysstat <span class="token function">curl</span> iptables libseccomp
<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
</code></pre></div><h3 id="关闭selinux" tabindex="-1"><a class="header-anchor" href="#关闭selinux" aria-hidden="true">#</a> 关闭SELinux</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 临时关闭</span>
<span class="token function">sudo</span> setenforce <span class="token number">0</span>
<span class="token comment"># 永久关闭</span>
<span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=enforcing$/SELINUX=permissive/&#39;</span> /etc/selinux/config
</code></pre></div><h3 id="关闭swap" tabindex="-1"><a class="header-anchor" href="#关闭swap" aria-hidden="true">#</a> 关闭swap</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 临时关闭</span>
swapoff <span class="token parameter variable">-a</span>  
<span class="token comment"># 永久关闭</span>
<span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> /etc/fstab
</code></pre></div><h3 id="配置iptables的accept规则" tabindex="-1"><a class="header-anchor" href="#配置iptables的accept规则" aria-hidden="true">#</a> 配置iptables的ACCEPT规则</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-F</span> <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-X</span> <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-F</span> <span class="token parameter variable">-t</span> nat <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-X</span> <span class="token parameter variable">-t</span> nat <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-P</span> FORWARD ACCEPT
</code></pre></div><h3 id="设置系统参数" tabindex="-1"><a class="header-anchor" href="#设置系统参数" aria-hidden="true">#</a> 设置系统参数</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF<span class="token operator">&gt;</span> /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables <span class="token operator">=</span> <span class="token number">1</span>
net.bridge.bridge-nf-call-iptables <span class="token operator">=</span> <span class="token number">1</span>
EOF
<span class="token function">sysctl</span> <span class="token parameter variable">--system</span>
</code></pre></div><h3 id="重启服务器" tabindex="-1"><a class="header-anchor" href="#重启服务器" aria-hidden="true">#</a> 重启服务器</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl <span class="token function">reboot</span>
</code></pre></div><h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装Docker</h2><p>所有服务器都要安装</p><h3 id="配置阿里云镜像" tabindex="-1"><a class="header-anchor" href="#配置阿里云镜像" aria-hidden="true">#</a> 配置阿里云镜像</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置镜像地址</span>
<span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span>
    --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment"># 查看 Docker-CE</span>
yum list <span class="token operator">|</span> <span class="token function">grep</span> docker-ce
<span class="token comment"># 更新 yum 缓存</span>
<span class="token function">sudo</span> yum makecache fast
</code></pre></div><h3 id="安装-指定20-10-21版本" tabindex="-1"><a class="header-anchor" href="#安装-指定20-10-21版本" aria-hidden="true">#</a> 安装（指定20.10.21版本）</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-20.10.21 docker-ce-cli-20.10.21 containerd.io
</code></pre></div><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl start <span class="token function">docker</span>
</code></pre></div><h3 id="开启自启动" tabindex="-1"><a class="header-anchor" href="#开启自启动" aria-hidden="true">#</a> 开启自启动</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre></div><h3 id="查看版本" tabindex="-1"><a class="header-anchor" href="#查看版本" aria-hidden="true">#</a> 查看版本</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token parameter variable">--version</span>
</code></pre></div><h2 id="安装k8s及组件" tabindex="-1"><a class="header-anchor" href="#安装k8s及组件" aria-hidden="true">#</a> 安装k8s及组件</h2><p>所有服务器都需要安装</p><h3 id="配置yum源" tabindex="-1"><a class="header-anchor" href="#配置yum源" aria-hidden="true">#</a> 配置yum源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF<span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo 
<span class="token punctuation">[</span>kubernetes<span class="token punctuation">]</span> 
<span class="token assign-left variable">name</span><span class="token operator">=</span>Kubernetes 
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64 
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span> 
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">0</span> 
<span class="token assign-left variable">repo_gpgcheck</span><span class="token operator">=</span><span class="token number">0</span> 
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg 
    http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg 
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-指定1-21-0-0版本" tabindex="-1"><a class="header-anchor" href="#安装-指定1-21-0-0版本" aria-hidden="true">#</a> 安装（指定1.21.0-0版本）</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 确认 yum 中是否有指定版本</span>
yum list kubeadm <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
 
<span class="token comment"># 安装</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubeadm-1.21.0-0 kubelet-1.21.0-0 kubectl-1.21.0-0
</code></pre></div><h3 id="修改daemon-json文件" tabindex="-1"><a class="header-anchor" href="#修改daemon-json文件" aria-hidden="true">#</a> 修改daemon.json文件</h3><h4 id="打开文件" tabindex="-1"><a class="header-anchor" href="#打开文件" aria-hidden="true">#</a> 打开文件</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/docker/daemon.json
</code></pre></div><h4 id="删除所有内容-然后复制保存" tabindex="-1"><a class="header-anchor" href="#删除所有内容-然后复制保存" aria-hidden="true">#</a> 删除所有内容，然后复制保存</h4><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;https://nmxk8hna.mirror.aliyuncs.com&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;exec-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;native.cgroupdriver=systemd&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="重启docker" tabindex="-1"><a class="header-anchor" href="#重启docker" aria-hidden="true">#</a> 重启docker</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>systemctl restart <span class="token function">docker</span>
</code></pre></div><h4 id="检查-kubelet-如果在输出信息中发现-no-such-file-or-directory-说明没问题" tabindex="-1"><a class="header-anchor" href="#检查-kubelet-如果在输出信息中发现-no-such-file-or-directory-说明没问题" aria-hidden="true">#</a> 检查 kubelet，如果在输出信息中发现 No such file or directory，说明没问题</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/cgroup-driver=systemd/cgroup-driver=cgroupfs/g&quot;</span> /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
</code></pre></div><h3 id="修改-kubelet启动参数" tabindex="-1"><a class="header-anchor" href="#修改-kubelet启动参数" aria-hidden="true">#</a> 修改 kubelet启动参数</h3><h4 id="打开文件-1" tabindex="-1"><a class="header-anchor" href="#打开文件-1" aria-hidden="true">#</a> 打开文件</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /usr/lib/systemd/system/kubelet.service.d/10-kubeadm.conf
</code></pre></div><p>在 KUBELET_KUBECONFIG_ARGS 后面追加 --node-ip={IP}</p><h3 id="重新加载" tabindex="-1"><a class="header-anchor" href="#重新加载" aria-hidden="true">#</a> 重新加载</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>systemctl daemon-reload
</code></pre></div><h3 id="启动kubelet" tabindex="-1"><a class="header-anchor" href="#启动kubelet" aria-hidden="true">#</a> 启动kubelet</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet
</code></pre></div><h4 id="重启kubectl" tabindex="-1"><a class="header-anchor" href="#重启kubectl" aria-hidden="true">#</a> 重启kubectl</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>systemctl restart kubectl
</code></pre></div><h3 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像" aria-hidden="true">#</a> 拉取镜像</h3><h4 id="查看kubeadm所需镜像" tabindex="-1"><a class="header-anchor" href="#查看kubeadm所需镜像" aria-hidden="true">#</a> 查看kubeadm所需镜像</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubeadm config images list
</code></pre></div><p>输出</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>k8s.gcr.io/kube-apiserver:v1.21.14
k8s.gcr.io/kube-controller-manager:v1.21.14
k8s.gcr.io/kube-scheduler:v1.21.14
k8s.gcr.io/kube-proxy:v1.21.14
k8s.gcr.io/pause:3.4.1
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns/coredns:v1.8.0
</code></pre></div><p>下载这些镜像需要魔法上网，尝试使用国内源进行下载</p><h4 id="国内源拉取镜像" tabindex="-1"><a class="header-anchor" href="#国内源拉取镜像" aria-hidden="true">#</a> 国内源拉取镜像</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 测试国内源是否可以拉取</span>
<span class="token function">docker</span> pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.21.14
</code></pre></div><p>发现可是拉取，添加脚本kubeadm_image.sh脚本将拉取的镜像切换到一个目录，现在假设文件在/var/local/k8s下创建</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/local/k8s
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF<span class="token operator">&gt;</span> /var/local/k8s/kubeadm_image.sh
<span class="token comment">#!/usr/bin/env bash</span>
 
<span class="token comment"># 镜像处理过程中，如果遇到错误，立即退出</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
 
<span class="token comment"># 版本定义</span>
<span class="token builtin class-name">readonly</span> <span class="token assign-left variable">KUBE_VERSION</span><span class="token operator">=</span>v1.21.0
<span class="token builtin class-name">readonly</span> <span class="token assign-left variable">PAUSE_VERSION</span><span class="token operator">=</span><span class="token number">3.4</span>.1
<span class="token builtin class-name">readonly</span> <span class="token assign-left variable">ETCD_VERSION</span><span class="token operator">=</span><span class="token number">3.4</span>.13-0
<span class="token builtin class-name">readonly</span> <span class="token assign-left variable">CORE_DNS_VERSION</span><span class="token operator">=</span>v1.8.0
<span class="token builtin class-name">readonly</span> <span class="token assign-left variable">OFFICIAL_URL</span><span class="token operator">=</span>k8s.gcr.io
<span class="token builtin class-name">readonly</span> <span class="token assign-left variable">ALIYUN_URL</span><span class="token operator">=</span>registry.cn-hangzhou.aliyuncs.com/google_containers
 
<span class="token comment"># 镜像列表</span>
<span class="token assign-left variable">imageList</span><span class="token operator">=</span><span class="token punctuation">(</span>kube-apiserver:<span class="token variable">\${KUBE_VERSION}</span> 
kube-controller-manager:<span class="token variable">\${KUBE_VERSION}</span> 
kube-scheduler:<span class="token variable">\${KUBE_VERSION}</span> 
kube-proxy:<span class="token variable">\${KUBE_VERSION}</span> 
pause:<span class="token variable">\${PAUSE_VERSION}</span> 
etcd:<span class="token variable">\${ETCD_VERSION}</span> 
coredns:<span class="token variable">\${CORE_DNS_VERSION}</span><span class="token punctuation">)</span>
 
<span class="token comment"># 镜像转换操作</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">imageItem</span> <span class="token keyword">in</span> <span class="token variable">\${imageList<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span> <span class="token punctuation">;</span> <span class="token keyword">do</span> 
  <span class="token comment"># 从国内镜像源拉取镜像</span>
  <span class="token function">docker</span> pull <span class="token variable">$ALIYUN_URL</span>/<span class="token variable">$imageItem</span>
  <span class="token comment"># 给镜像重新打一个标签，命名为 kubeadm 所需的镜像</span>
  <span class="token function">docker</span> tag <span class="token variable">$ALIYUN_URL</span>/<span class="token variable">$imageItem</span> <span class="token variable">$OFFICIAL_URL</span>/<span class="token variable">$imageItem</span>
  <span class="token comment"># 删除原有镜像</span>
  <span class="token function">docker</span> rmi <span class="token variable">$ALIYUN_URL</span>/<span class="token variable">$imageItem</span>
<span class="token keyword">done</span>
 
<span class="token comment"># coredns 的镜像比较特殊，单独处理</span>
<span class="token function">docker</span> tag <span class="token variable">\${OFFICIAL_URL}</span>/coredns:<span class="token variable">\${CORE_DNS_VERSION}</span> <span class="token variable">\${OFFICIAL_URL}</span>/coredns/coredns:<span class="token variable">\${CORE_DNS_VERSION}</span>
<span class="token function">docker</span> rmi <span class="token variable">\${OFFICIAL_URL}</span>/coredns:<span class="token variable">\${CORE_DNS_VERSION}</span>
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行脚本</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> /var/local/k8s/kubeadm_image.sh
</code></pre></div><h2 id="搭建集群-仅master节点执行" tabindex="-1"><a class="header-anchor" href="#搭建集群-仅master节点执行" aria-hidden="true">#</a> 搭建集群（仅master节点执行）</h2><h3 id="初始化master节点" tabindex="-1"><a class="header-anchor" href="#初始化master节点" aria-hidden="true">#</a> 初始化master节点</h3><p>替换公网IP</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubeadm init --kubernetes-version<span class="token operator">=</span><span class="token number">1.21</span>.0 <span class="token punctuation">\\</span>
  --apiserver-advertise-address<span class="token operator">=</span><span class="token punctuation">{</span>IP<span class="token punctuation">}</span> <span class="token punctuation">\\</span>
  --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span><span class="token operator">=</span><span class="token number">5</span>
</code></pre></div><p>如果出现</p><div class="language-text" data-ext="text"><pre class="language-text"><code>Your Kubernetes control-plane has initialized successfully! 
</code></pre></div><p>说明初始化成功，需要执行中间的命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
</code></pre></div><p>保存好最后的</p><div class="language-text" data-ext="text"><pre class="language-text"><code>kubeadm join 159.75.154.193:6443 --token 1b751g.6cbt5hjo7z6nopxx 
    --discovery-token-ca-cert-hash sha256:e6e99c36b3f99c782788e375fc6b86947531e73d78965863d86ad7f479f1e67e
</code></pre></div><h3 id="集群健康检查" tabindex="-1"><a class="header-anchor" href="#集群健康检查" aria-hidden="true">#</a> 集群健康检查</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查集群状态</span>
kubectl cluster-info
 
<span class="token comment"># 健康检查</span>
<span class="token function">curl</span> <span class="token parameter variable">-k</span> https://localhost:6443/healthz
</code></pre></div><h3 id="修改kube-apiserver-yaml配置" tabindex="-1"><a class="header-anchor" href="#修改kube-apiserver-yaml配置" aria-hidden="true">#</a> 修改kube-apiserver.yaml配置</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/kubernetes/manifests/kube-apiserver.yaml
</code></pre></div><ul><li>确定 --advertise-address=159.75.154.193 是公网的IP</li><li>添加 --bind-address=0.0.0.0</li></ul><p>最终修改后配置如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubeadm.kubernetes.io/kube-apiserver.advertise-address.endpoint: <span class="token number">159.75</span>.154.193:6443
  creationTimestamp: null
  labels:
    component: kube-apiserver
    tier: control-plane
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    <span class="token comment"># 确定是不是公网的IP</span>
    - --advertise-address<span class="token operator">=</span><span class="token number">159.75</span>.154.193
    <span class="token comment"># 添加下面一行</span>
    - --bind-address<span class="token operator">=</span><span class="token number">0.0</span>.0.0
    - --allow-privileged<span class="token operator">=</span>true
    - --authorization-mode<span class="token operator">=</span>Node,RBAC
    - --client-ca-file<span class="token operator">=</span>/etc/kubernetes/pki/ca.crt
 <span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检查集群状态" tabindex="-1"><a class="header-anchor" href="#检查集群状态" aria-hidden="true">#</a> 检查集群状态</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-n</span> kube-system
kubectl get nodes
</code></pre></div><p>会发现两个coredns还是Pending,并且master节点并没有Ready，这是因为缺少网络插件</p><h2 id="安装flannel插件-仅在master执行" tabindex="-1"><a class="header-anchor" href="#安装flannel插件-仅在master执行" aria-hidden="true">#</a> 安装flannel插件 (仅在master执行)</h2><h3 id="安装flannel" tabindex="-1"><a class="header-anchor" href="#安装flannel" aria-hidden="true">#</a> 安装flannel</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /var/local/k8s

<span class="token function">wget</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</code></pre></div><h3 id="修改vim-kube-flannel-yml文件" tabindex="-1"><a class="header-anchor" href="#修改vim-kube-flannel-yml文件" aria-hidden="true">#</a> 修改vim kube-flannel.yml文件</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> kube-flannel.yml
</code></pre></div><h4 id="第一处" tabindex="-1"><a class="header-anchor" href="#第一处" aria-hidden="true">#</a> 第一处</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>containers:
- name: kube-flannel
  <span class="token comment">#image: flannelcni/flannel:v0.20.2 #for ppc64le and mips64le (dockerhub limitations may apply)</span>
  image: docker.io/rancher/mirrored-flannelcni-flannel:v0.20.2
  command:
  - /opt/bin/flanneld
  args:
  <span class="token comment"># 添加</span>
  - --public-ip<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>PUBLIC_IP<span class="token variable">)</span></span>
  <span class="token comment"># 添加</span>
  - <span class="token parameter variable">--iface</span><span class="token operator">=</span>eth0
  - --ip-masq
  - --kube-subnet-mgr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="第二处" tabindex="-1"><a class="header-anchor" href="#第二处" aria-hidden="true">#</a> 第二处</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>env:
<span class="token comment"># 添加</span>
- name: PUBLIC_IP
  valueFrom:
    fieldRef:
      fieldPath: status.podIP
</code></pre></div><p>最综配置展示</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>      containers:
      - name: kube-flannel
        image: docker.io/flannel/flannel:v0.22.0
       <span class="token comment">#image: docker.io/rancher/mirrored-flannelcni-flannel:v0.22.0</span>
        command:
        - /opt/bin/flanneld
        args:
        <span class="token comment"># 添加</span>
        - --public-ip<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>PUBLIC_IP<span class="token variable">)</span></span>
        <span class="token comment"># 添加</span>
        - <span class="token parameter variable">--iface</span><span class="token operator">=</span>eth0
        - --ip-masq
        - --kube-subnet-mgr
        resources:
          requests:
            cpu: <span class="token string">&quot;100m&quot;</span>
            memory: <span class="token string">&quot;50Mi&quot;</span>
        securityContext:
          privileged: <span class="token boolean">false</span>
          capabilities:
            add: <span class="token punctuation">[</span><span class="token string">&quot;NET_ADMIN&quot;</span>, <span class="token string">&quot;NET_RAW&quot;</span><span class="token punctuation">]</span>
        env:
        <span class="token comment"># 添加</span>
        - name: PUBLIC_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: EVENT_QUEUE_DEPTH
          value: <span class="token string">&quot;5000&quot;</span>
        volumeMounts:
        - name: run
          mountPath: /run/flannel
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
        - name: xtables-lock
          mountPath: /run/xtables.lock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> kube-flannel.yml
</code></pre></div><h2 id="从节点加入集群" tabindex="-1"><a class="header-anchor" href="#从节点加入集群" aria-hidden="true">#</a> 从节点加入集群</h2><h3 id="所有从节点执行上面保存的kubeadm-join" tabindex="-1"><a class="header-anchor" href="#所有从节点执行上面保存的kubeadm-join" aria-hidden="true">#</a> 所有从节点执行上面保存的kubeadm join</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">159.75</span>.154.193:6443 <span class="token parameter variable">--token</span> 1b751g.6cbt5hjo7z6nopxx 
    --discovery-token-ca-cert-hash sha256:e6e99c36b3f99c782788e375fc6b86947531e73d78965863d86ad7f479f1e67e
</code></pre></div><p>如果出现 This node has joined the cluster 表示已经加入</p><h3 id="从新获取" tabindex="-1"><a class="header-anchor" href="#从新获取" aria-hidden="true">#</a> 从新获取</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 重新生成令牌</span>
kubeadm token create --print-join-command
</code></pre></div><h2 id="自定义pod测试" tabindex="-1"><a class="header-anchor" href="#自定义pod测试" aria-hidden="true">#</a> 自定义Pod测试</h2><h3 id="添加文件" tabindex="-1"><a class="header-anchor" href="#添加文件" aria-hidden="true">#</a> 添加文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF<span class="token operator">&gt;</span> /var/local/k8s/pod-nginx.yml 
apiVersion: apps/v1 
kind: ReplicaSet 
metadata: 
  name: my-nginx 
  labels: 
    tier: frontend 
spec: 
  replicas: <span class="token number">4</span> 
  selector: 
    matchLabels: 
      tier: frontend 
  template: 
    metadata: 
      name: my-nginx 
      labels: 
        tier: frontend 
    spec:
      containers: 
      - name: my-nginx 
        image: nginx 
        ports: 
        - containerPort: <span class="token number">80</span> 
---
apiVersion: v1
kind: Service
metadata:
  name: my-nginx-service
spec:
  type: NodePort
  ports:
  - port: <span class="token number">80</span>
    targetPort: <span class="token number">80</span>
    protocol: TCP
    nodePort: <span class="token number">30992</span>
  selector:
    tier: frontend 
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行" tabindex="-1"><a class="header-anchor" href="#执行" aria-hidden="true">#</a> 执行</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /var/local/k8s/
kubectl apply <span class="token parameter variable">-f</span> pod-nginx.yml
</code></pre></div><h3 id="查看对外暴露的端口" tabindex="-1"><a class="header-anchor" href="#查看对外暴露的端口" aria-hidden="true">#</a> 查看对外暴露的端口</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get services
</code></pre></div><h3 id="查看pod提供的服务" tabindex="-1"><a class="header-anchor" href="#查看pod提供的服务" aria-hidden="true">#</a> 查看pod提供的服务</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-o</span> wide
</code></pre></div><h3 id="访问" tabindex="-1"><a class="header-anchor" href="#访问" aria-hidden="true">#</a> 访问</h3><p>使用提供pod服务的公网ip+暴露的端口访问，假设是node1,则为</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token number">1.12</span>.242.126:30992
</code></pre></div><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h2>`,141),o={href:"https://blog.csdn.net/u013481793/article/details/128433729?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-4-128433729-blog-124992940.235%5Ev38%5Epc_relevant_sort_base2&spm=1001.2101.3001.4242.3&utm_relevant_index=7",target:"_blank",rel:"noopener noreferrer"};function u(b,v){const n=e("ExternalLinkIcon");return t(),l("div",null,[p,a("p",null,[a("a",o,[r("kubeadm+Flannel基于公网IP搭建k8s集群"),i(n)])])])}const h=s(c,[["render",u],["__file","2307051931.html.vue"]]);export{h as default};
