## 安装node.js
```
yum -y update

1.curl -sL https://rpm.nodesource.com/setup_10.x | bash -
2.yum install -y nodejs
3.npm install pm2 -g
```

## 安装git

```
yum install -y git
```

## 本地生成ssh拉取代码

```
1.ssh-keygen -t rsa -C "2331396362@qq.com" 
2.三次回车直接使用默认值
3.cd ~/.ssh
4.cat  id_rsa.pub 复制内容到gitee上

```

## 部署项目

```
1.在项目的package.json中script加入 "pm2": "pm2 start npm --name 'pc_hhb' -- run start" //写自己的项目名字

2.npm run pm2 

3.pm2 save //保存列表防止重启后node服务丢失

4.pm2 satrtup //pm2加入开机自启动


```

## 修改hosts

```
1.vi /etc/hosts 写入对应的接口地址，保存退出
2./etc/init.d/network restart //重新读取配置
```

## nginx方面值得注意的地方
- 1.查看服务器允许的最大连接数
```
ulimit -a 查看open files 一般是65535


```
- 2.查看cpu核 
```
cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l cpu个数
cat /proc/cpuinfo| grep "processor"| wc -l cpu核数
```
- 2.nginx.conf配置

```
user root;
worker_processes  4; ##与cpu的核数一致 如果不写可以使用 auto
events {
    worker_connections  16300; ##这个值是根据 (65535/4)取整数出来的
    multi_accept on;  ## events区域下accept_mutex参数将使每个可用的worker进程逐个接受新连接
    accept_mutex_delay 500ms; ## 尝试获取互斥锁并开始接受新的连接
    accept_mutex on;   ##连接放到监听队列中,不开启则一条一条监听
}


http {
    # base config
	  server_tokens off;
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  120s; 
    keepalive_requests 8192;
    underscores_in_headers on;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    

	
	#
	fastcgi_connect_timeout 300;
	fastcgi_send_timeout 300;
	fastcgi_read_timeout 300;
	fastcgi_buffer_size 128k;
	fastcgi_buffers 4 128k;
	fastcgi_busy_buffers_size 256k;
	fastcgi_temp_file_write_size 256k;
	
	
	#
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
	

  # add conf here
  include vhost/www.cbi360.net_hhb.conf; 
}

```


