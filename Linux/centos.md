## centos8安装nginx
## 下载压缩包方式
>创建nginx压缩包存放的目录和软件解压的路径

~~~
//用来存放下载的压缩包
sudo mkdir /usr/tarZip
//用来存放解压后的文件
sudo mkdir /usr/software
~~~

## 下载nginx并解压

~~~
//进入存放路径
cd /usr/tarZip
//下载nginx压缩包,可以选不同版本的nginx下载，这里我选择了nginx-1.17.6
wget  http://nginx.org/download/nginx-1.17.6.tar.gz
//解压nginx到上面创建的目录
tar -zxvf /usr/tarZip/nginx-1.17.6.tar.gz -C /usr/software/nginx
//或者在tarZip解压以后 复制到/usr/software/nginx 文件夹下面
~~~

## 下载nginx的依赖
~~~
//nginx依赖gcc环境,安装前先安装gcc 
yum -y install gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel
~~~

## 安装nginx
~~~
//进入到刚才解压的nginx目录nginx-1.17.6
cd /usr/local/software/nginx/nginx-1.17.6
//安装nginx
./configure && make && make install
~~~

## 启动
~~~
//nginx默认安装到/usr/local/nginx/下,进入sbin中启动nginx
cd  /usr/local/nginx/sbin/
//启动
./nginx
~~~