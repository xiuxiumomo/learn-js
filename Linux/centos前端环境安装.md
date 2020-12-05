## 1.磁盘挂载
> 许多朋友不清楚自己是否有数据盘需要挂载（虽然购买时自己买没买你应该知道的，但还是有人不知道啊），那么你应该在linux服务器上使用使用“fdisk -l”命令查看。如下图：若您执行fdisk -l命令，发现没有 /dev/xvdb 标明您的云服务无数据盘，那么您无需进行挂载，此时该教程对您不适用

- 如果上一步你看到了/dev/xvdb，那么就执行“fdisk -S 56 /dev/xvdb”命令，对数据盘进行分区；根据提示，依次输入“n”，“p”，“1”，两次回车，人后输入“wq”退出。分区就开始了，很快就会完成。

- 此时再使用“fdisk -l”命令可以看到，新的分区xvdb1已经建立完成了。

- 这时候需要注意，有两种情况。第一种，你这个数据盘是新购买的，以前没有用过（没有存储过数据），那么就要对其进行格式化，使用“mkfs.ext3 /dev/xvdb1”命令。第二种，如果你之前就有数据盘，只是你把系统盘重置了，需要将数据盘再次挂载到重置后的系统上，那么就不要对其格式化（跳过此步骤），直接执行后面的步骤挂载就可以了。

- 在继续下面的命令前，你需要知道的是，下面那行命令的“/mnt”就是你要把数据盘挂载到的文件夹，如果你想挂载到别的文件夹，比如你自己建立的/mydata那么就把/mnt改成/mydata，前提是你已经创建了这个目录（创建目录的命令是mkdir）。使用“echo '/dev/xvdb1  /mnt ext3    defaults    0  0' >> /etc/fstab”（不含引号）命令写入新分区信息。然后使用“cat /etc/fstab”命令查看，出现以下信息就表示写入成功。

- 最后，使用“mount -a”命令挂载新分区，然后用“df -h”命令查看，出现以下信息就说明挂载成功，可以开始使用新的分区了。

## 2.安装Centos相关 openresty
> yum -y update更新相关安装包

### 2.1 mnt目录新建相关文件夹

  - 1、logs (访问日志文件夹) 
  - 2、project(项目文件夹)
  - 3、ssl443 (https证书文件夹)
  - 4、openresty (nginx文件夹)
  - 5、tools (工具包文件夹)
### 2.2 安装依赖
  - 1、为编译程序做准备，执行如下命令
```
yum install pcre-devel openssl-devel gcc curl postgresql-dev  
```

### 2.3安装openresty

- 1.openresty-1.15.8.3.tar.gz放到tools文件夹下
- 2.解压源码包openresty-1.15.8.3.tar.gz 在tools目录下
```
tar -zxvf openresty-1.15.8.3.tar.gz
```
- 3.cd 到openresty-1.15.8.3目录下
```
cd /mnt/tools/openresty-1.15.8.3
```
- 4.配置openresty选项
```
./configure --prefix=/mnt/openresty --with-luajit --with-http_iconv_module --with-http_postgres_module
说明：/mnt/openresty 是openresty安装目录
```
- 5.接下来编译并安装源码(都是在tools目录openresty-1.15.8.3目录下)
```
make && make install 
```

- 6.配置nginx环境变量，打开/etc/profile文件加入如下信息
export PATH=$PATH:/mnt/openresty/nginx/sbin 然后执行命令
```
source  /etc/profile (使修改的环境变量生效)
```

## 2.4 Centos 开机启动Openresty之中的Nginx

- 1.在系统服务目录(/usr/lib/systemd/system/)里创建nginx.service文件。nginx.service内容如下
```
[Unit]
Description=nginx
After=network.target
 
[Service]
Type=forking
ExecStart=/mnt/openresty/nginx/sbin/nginx
ExecReload=/mnt/openresty/nginx/sbin/nginx -s reload
ExecStop=/mnt/openresty/nginx/sbin/nginx -s quit
PrivateTmp=true
 
[Install]
WantedBy=multi-user.target
```
```
参数说明
Description:描述服务
After:描述服务类别
 
[Service]服务运行参数的设置
Type=forking是后台运行的形式
ExecStart为服务的具体运行命令
ExecReload为重启命令
ExecStop为停止命令
PrivateTmp=True表示给服务分配独立的临时空间
注意：[Service]的启动、重启、停止命令全部要求使用绝对路径
 
[Install]运行级别下服务安装的相关设置，可设置为多用户，即系统运行级别为3
```

- 2.设置开机启动，执行命令

```
systemctl enable nginx.service(开机启动)
systemctl disable nginx.service (开机禁用)
```

### 2.5 nginx 命令 
> 检查配置文件nginx.conf文件的正确性命令 nginx -t检测正确性

- 1.nginx -s reload
- 2.nginx -s stop

## 3.linux其他配置
### 3.1 安装node.js和pm2

```
yum -y update
1.curl -sL https://rpm.nodesource.com/setup_10.x | bash -
2.yum install -y nodejs
3.npm install pm2 -g
```

### 3.2 安装git


```
yum install -y git
```

### 3.3 本地生成ssh并且写入gitee为了服务器上每次git pull重复输入密码
```
1.ssh-keygen -t rsa -C "2331396362@qq.com"
2.三次回车直接使用默认值
3.cd ~/.ssh
4.cat  id_rsa.pub 复制内容到gitee上

```
### 3.4  部署项目
```
1.在项目的package.json中script加入 "pm2": "pm2 start npm --name 'pc_hhb' -- run start"

2.npm run pm2 


```

### 3.5 修改hosts
- 1.vi /etc/hosts进入host添加自己的api
- 2./etc/init.d/network restart 重新启动 


## 4.nginx开发部署
### 4.1新建conf文件
> 以hhb的前端项目为例子，进入/mnt/openresty/nginx/conf/ 新加入 vhost文件夹，所有的新的配置都放在这里。

```
## www.cbi360.net_hhb.conf内容 
server {	
        listen       80;

        listen      443 ssl;

        server_name  www.cbi360.net;

        #添加https配置

        include vhost/ssl.conf;

        #lua脚本可以不使用

        access_by_lua_file   /mnt/openresty/nginx/conf/lua/access_by_mns.lua;

        #自定义头部这里一定要加上

        underscores_in_headers on;

        #自定义日志位置和格式

	      if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})") {
            set $year $1;
            set $month $2;
            set $day $3;
        }
        access_log  /mnt/logs/www.cbi360.net_hhb/$year-$month-$day-access.log;
        error_log  /mnt/logs/www.cbi360.net_hhb/error.log    error;
        include vhost/ua.conf;

	      #location ~* \.(png|jpg|jpeg|gif|js|css|bmp|flv|ico)$ {
	      #        access_log off;
	      #        proxy_pass         http://127.0.0.1:3002;
        #    proxy_http_version 1.1;
        #    proxy_set_header   Upgrade $http_upgrade;
        #    proxy_set_header   Connection keep-alive;
        #    proxy_set_header   Host $host;
        #    proxy_cache_bypass $http_upgrade;
        #    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        #    proxy_set_header   X-Forwarded-Proto $scheme;
	      #}
		
	      location ~* ^/hhb/sg_([0-9]+)/gs/? {
            if ($http_user_agent ~* "(baiduspider|baiduspider/2.0)") {
		            return  404;
            }
            proxy_pass         http://127.0.0.1:9527;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
	      }

	      #添加蜘蛛重定向	
        location ^~ /hhb {
            proxy_pass         http://127.0.0.1:9527;
            include vhost/www.cbi360.net_hhb_spider_proxy.conf;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }
       		
        location / {
            proxy_pass         http://127.0.0.1:9527;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }
        #添加健康检测
        include vhost/www.cbi360.net_hhb_monitor.conf;

    }


```
### 4.2再nginx.conf中引入相关
> 进入/mnt/openresty/nginx/conf/ 找到nginx.conf

```
#这里一定要加root 不然自定义日志不会生效
user root;
worker_processes  4;

events {
    worker_connections  10240;
}


http {
    # 隐藏Nginx版本信息
	server_tokens off;
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
	#代理的相关参数设置
	fastcgi_connect_timeout 300;
	fastcgi_send_timeout 300;
	fastcgi_read_timeout 300;
	fastcgi_buffer_size 128k;
	fastcgi_buffers 4 128k;
	fastcgi_busy_buffers_size 256k;
	fastcgi_temp_file_write_size 256k;
	
	
	# 启用gzip压缩,提高用户访问速度
	gzip on;
	gzip_min_length 1k;
	gzip_buffers 4 32k;
	gzip_http_version 1.1;
	gzip_comp_level 2;
	gzip_types text/plain application/x-javascript text/css application/xml;
	gzip_vary on;
	gzip_disable "MSIE [1-6].";
	
	
	server_names_hash_bucket_size 128;
	client_max_body_size 100m;
	client_header_buffer_size 256k;
	large_client_header_buffers 4 256k;
	
	
	proxy_redirect off;
	proxy_set_header Host $http_host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	
	resolver 8.8.8.8;
	
  #增加虚拟主机   
  include vhost/www.cbi360.net_hhb.conf;
 
 
}

```

## 防火墙方面

- 1.设置开机启用防火墙：systemctl enable firewalld.service
- 2.设置开机禁用防火墙：systemctl disable firewalld.service
- 3.启动防火墙：systemctl start firewalld
- 4.关闭防火墙：systemctl stop firewalld
- 5.检查防火墙状态：systemctl status firewalld 

### 1.开放指定端口

- 1.查看防火墙状态：firewall-cmd --state
- 2.重新加载配置：firewall-cmd --reload
- 3.查看开放的端口：firewall-cmd --list-ports
- 4.开启防火墙端口：firewall-cmd --zone=public --add-port=9200/tcp --permanent
- 5.关闭防火墙端口：firewall-cmd --zone=public --remove-port=9200/tcp --permanent

### 2.开启对外端口号

> 添加端口 返回 success 代表成功（--permanent永久生效，没有此参数重启后失效）

```
//单个开放
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent

//批量开放
firewall-cmd --zone=public --add-port=80-85/tcp --permanent


//关闭端口
firewall-cmd --zone=public --remove-port=443/tcp --permanent

//重载
firewall-cmd --reload
```

