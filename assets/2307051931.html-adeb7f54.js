const l=JSON.parse('{"key":"v-f0b271fa","path":"/note/other/2307051931.html","title":"K8S + Flannel 公网IP搭建笔记","lang":"zh-CN","frontmatter":{"isOriginal":true,"date":"2023-07-05T00:00:00.000Z","index":true,"category":["kubernetes"],"tag":["kubernetes"]},"headers":[{"level":2,"title":"版本简介","slug":"版本简介","link":"#版本简介","children":[{"level":3,"title":"软件版本信息","slug":"软件版本信息","link":"#软件版本信息","children":[]},{"level":3,"title":"集群角色规划","slug":"集群角色规划","link":"#集群角色规划","children":[]}]},{"level":2,"title":"准备工作","slug":"准备工作","link":"#准备工作","children":[{"level":3,"title":"修改服务器名称","slug":"修改服务器名称","link":"#修改服务器名称","children":[]},{"level":3,"title":"修改服务器hosts文件","slug":"修改服务器hosts文件","link":"#修改服务器hosts文件","children":[]},{"level":3,"title":"创建虚拟网卡","slug":"创建虚拟网卡","link":"#创建虚拟网卡","children":[]},{"level":3,"title":"云服务器安全组设置","slug":"云服务器安全组设置","link":"#云服务器安全组设置","children":[]}]},{"level":2,"title":"基础配置","slug":"基础配置","link":"#基础配置","children":[{"level":3,"title":"更新安装依赖","slug":"更新安装依赖","link":"#更新安装依赖","children":[]},{"level":3,"title":"关闭SELinux","slug":"关闭selinux","link":"#关闭selinux","children":[]},{"level":3,"title":"关闭swap","slug":"关闭swap","link":"#关闭swap","children":[]},{"level":3,"title":"配置iptables的ACCEPT规则","slug":"配置iptables的accept规则","link":"#配置iptables的accept规则","children":[]},{"level":3,"title":"设置系统参数","slug":"设置系统参数","link":"#设置系统参数","children":[]},{"level":3,"title":"重启服务器","slug":"重启服务器","link":"#重启服务器","children":[]}]},{"level":2,"title":"安装Docker","slug":"安装docker","link":"#安装docker","children":[{"level":3,"title":"配置阿里云镜像","slug":"配置阿里云镜像","link":"#配置阿里云镜像","children":[]},{"level":3,"title":"安装（指定20.10.21版本）","slug":"安装-指定20-10-21版本","link":"#安装-指定20-10-21版本","children":[]},{"level":3,"title":"启动","slug":"启动","link":"#启动","children":[]},{"level":3,"title":"开启自启动","slug":"开启自启动","link":"#开启自启动","children":[]},{"level":3,"title":"查看版本","slug":"查看版本","link":"#查看版本","children":[]}]},{"level":2,"title":"安装k8s及组件","slug":"安装k8s及组件","link":"#安装k8s及组件","children":[{"level":3,"title":"配置yum源","slug":"配置yum源","link":"#配置yum源","children":[]},{"level":3,"title":"安装（指定1.21.0-0版本）","slug":"安装-指定1-21-0-0版本","link":"#安装-指定1-21-0-0版本","children":[]},{"level":3,"title":"修改daemon.json文件","slug":"修改daemon-json文件","link":"#修改daemon-json文件","children":[]},{"level":3,"title":"修改 kubelet启动参数","slug":"修改-kubelet启动参数","link":"#修改-kubelet启动参数","children":[]},{"level":3,"title":"重新加载","slug":"重新加载","link":"#重新加载","children":[]},{"level":3,"title":"启动kubelet","slug":"启动kubelet","link":"#启动kubelet","children":[]},{"level":3,"title":"拉取镜像","slug":"拉取镜像","link":"#拉取镜像","children":[]}]},{"level":2,"title":"搭建集群（仅master节点执行）","slug":"搭建集群-仅master节点执行","link":"#搭建集群-仅master节点执行","children":[{"level":3,"title":"初始化master节点","slug":"初始化master节点","link":"#初始化master节点","children":[]},{"level":3,"title":"集群健康检查","slug":"集群健康检查","link":"#集群健康检查","children":[]},{"level":3,"title":"修改kube-apiserver.yaml配置","slug":"修改kube-apiserver-yaml配置","link":"#修改kube-apiserver-yaml配置","children":[]},{"level":3,"title":"检查集群状态","slug":"检查集群状态","link":"#检查集群状态","children":[]}]},{"level":2,"title":"安装flannel插件 (仅在master执行)","slug":"安装flannel插件-仅在master执行","link":"#安装flannel插件-仅在master执行","children":[{"level":3,"title":"安装flannel","slug":"安装flannel","link":"#安装flannel","children":[]},{"level":3,"title":"修改vim kube-flannel.yml文件","slug":"修改vim-kube-flannel-yml文件","link":"#修改vim-kube-flannel-yml文件","children":[]},{"level":3,"title":"安装","slug":"安装","link":"#安装","children":[]}]},{"level":2,"title":"从节点加入集群","slug":"从节点加入集群","link":"#从节点加入集群","children":[{"level":3,"title":"所有从节点执行上面保存的kubeadm join","slug":"所有从节点执行上面保存的kubeadm-join","link":"#所有从节点执行上面保存的kubeadm-join","children":[]},{"level":3,"title":"从新获取","slug":"从新获取","link":"#从新获取","children":[]}]},{"level":2,"title":"自定义Pod测试","slug":"自定义pod测试","link":"#自定义pod测试","children":[{"level":3,"title":"添加文件","slug":"添加文件","link":"#添加文件","children":[]},{"level":3,"title":"执行","slug":"执行","link":"#执行","children":[]},{"level":3,"title":"查看对外暴露的端口","slug":"查看对外暴露的端口","link":"#查看对外暴露的端口","children":[]},{"level":3,"title":"查看pod提供的服务","slug":"查看pod提供的服务","link":"#查看pod提供的服务","children":[]},{"level":3,"title":"访问","slug":"访问","link":"#访问","children":[]}]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1702364032000,"updatedTime":1702364032000,"contributors":[{"name":"yanggl","email":"2549597630@qq.com","commits":1}]},"readingTime":{"minutes":6.65,"words":1995},"filePathRelative":"note/other/2307051931.md","localizedDate":"2023年7月5日","excerpt":"","copyright":{"author":"Yaien","license":"MIT"}}');export{l as data};