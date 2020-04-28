## 乌班图服务器常用操作

## 1.安装node,npm
~~~
sudo apt-get install node
sudo apt-get install npm

//npm换源 
npm get registry //查看当前npm源 
npm config set registry  https://registry.npm.taobao.org/

~~~

## 2.安装git

~~~
sudo apt-get install git
~~~

## 3.安装mysql

~~~
sudo apt-get install mysql-server
sudo apt-get install mysql-client
sudo apt-get install libmysqlclient-dev
//设置mysql允许被外部访问
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
使用#号 注释 #bind-address = 127.0.0.1

mysql -u root -p 连接数据库
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option; //允许任何人连接
flush privileges; //刷新权限
quit //退出mysql环境
sudo service mysql restart //重启mysql
~~~

## 4.安装pm2
~~~
npm install -g pm2
//常用指令
pm2 start app.js    //启动node服务
pm2 list           //查看所有node服务

~~~

## 5.部署vue静态项目
~~~
 1. cd /app/nginx/conf.d
 2. touch vue_html.conf
 //写入配置
 server {
    listen 80;
    server_name momo.yyuexs.com;
    index index.php index.html index.htm;
    root /home/www/CMS/dist; //git 地址 记住这里一定要加/home
    location ~ .\*\.(php|php5)?\$
     
    #如果有接口
    location ^~ /api/  {
        proxy_redirect off;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://backend.yyuexs.com;

    }
 }
~~~
## 6.部署egg项目
~~~
## 在egg项目中加入文件pm2Server.js
{
    'use strict';
    const egg = require('egg');
    const workers = Number(process.argv[2] || require('os').cpus().length);
    egg.startCluster({
    workers,
    baseDir: __dirname,
    });
}
pm2 pm2Server.js 启动服务
~~~

## 7.删除文件或者文件夹
~~~
rm -rf dirName
~~~

## 8.重启mysql nginx
~~~
sudo nginx -s reload
sudo service mysql restart
sudo service mysql start
~~~

## 9.查看当前主机ip
~~~
ifconfig -a
~~~

## 10.编辑某个文件
~~~

1. i 进入编辑
2. esc 退出编辑
3. wq 保存退出
4.q! 不保存退出
5. wq! 强制保存退出
~~~

## 11.回到目录 home等
~~~
cd ~
ls //查看所有文件
~~~

## 12.给文件添加操作权限
~~~
chmod 777 filename 
su root //切换管理员
sudo //临时获取所有权限
~~~

## 13.关闭防火墙
~~~
ufw disable
~~~


## 14.nvm的安装
~~~
nvm -v // 查看nvm版本
nvm install 8.12.0 // 下载指定版本 nvm install latest安装最新版本
nvm use 8.12.0 // 使用指定版本
nvm ls // 查看已经安装的nodejs版本
node -v // 查看nodejs版本
~~~

## 15.pm2常用指令
~~~
pm2 list 查看所有指令
pm2 start file.name //启动文件
pm2 start file.name --name="koa_api"  --watch //设置服务名称
pm2 stop 0 //停止id 0的服务项目
pm2 delete 0 //删除 0 的服务项目
~~~