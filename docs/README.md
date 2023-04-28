# CentOS 8 Linux服务器防火墙常用命令

### 查看防火墙某个端口是否开放
```java
firewall-cmd --query-port=3306/tcp
```

### 开放防火墙端口3306
```java
# 注意：开放端口后要重启防火墙生效
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```

### 重启防火墙
```java
systemctl restart firewalld
```

### 关闭防火墙端口
```java
firewall-cmd --remove-port=3306/tcp --permanent
```

### 查看防火墙状态
```java
systemctl status firewalld
```

### 关闭防火墙
```java
systemctl stop firewalld
```

### 打开防火墙
```java
systemctl start firewalld
```

### 开放一段端口
```java
firewall-cmd --zone=public --add-port=40000-45000/tcp --permanent
```

### 查看开放的端口列表
```java
firewall-cmd --zone=public --list-ports
```

### 查看被监听(Listen)的端口
```java
netstat -lntp
```

### 检查端口被哪个进程占用
```java
netstat -lnp|grep 3306
```
