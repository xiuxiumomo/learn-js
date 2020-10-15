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


/usr/local/nginx/sbin/nginx -t //检查
/usr/local/nginx/sbin/nginx -s  reload //重启
~~~

## 更新命令
~~~
yum -y update
~~~

## 安装nodejs

~~~
curl -sL https://rpm.nodesource.com/setup_10.x | bash -
yum install -y nodejs
~~~

## 华为云安装openresty记录

```
1.cd /home
2.wget https://openresty.org/download/openresty-1.13.6.2.tar.gz 
3.yum install pcre-devel openssl-devel gcc curl
4.tar -zxvf openresty-1.13.6.2.tar.gz
5.cd openresty-1.13.6.2/
6. ./configure 
7. 等
8.报错了-->去 /home/openresty-1.13.6.2/build/nginx-1.13.6/src/os/unix/ngx_user.c中注释 current_salt 
9. make
10. make install 

11. PATH=/usr/local/openresty/nginx/sbin:$PATH

12. export PATH

13 sudo nginx -c /usr/local/openresty/nginx/conf/nginx.conf

14.nginx -s reload


```


## centos 安装jenkins以及自动化部署github
### 1.安装jenkins
~~~
1.yum install -y java //安装java环境
2.将jenkins 添加到yum库 
wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key

3.yum install -y jenkins //下载jenkins
4.vi /etc/sysconfig/jenkins //进入配置文件
5.JENKINS_user //这里默认是jenkins 需要修改为root 防止后面jenkins操作的权限问题
6.service jenkins start/stop/restart //启动jenkins
7.在浏览器地址栏输入ip+端口
8. 进入 /var/lib/jenkins/secrets/initialAdminPassword 查看默认密码
9. 选择推荐安装
10.设置用户 jack 123

~~~

### 2.部署代码
~~~
1.新建任务->输入任务名称->构建自由风格

2.源码管理->git 
3.地址: https://github.com/xiuxiumomo/vue-learn.git 
4.分支：vue-admin-tool

5.构建触发器->GitHub hook trigger for GITScm polling

6.构建环境-> Provide Node & npm bin/ folder to PATH

7.构建->
//构建的思路就是git拉取代码后如何操作的一个过程

cd /home/product/vue-learn/   //进入项目目录
rm -rf dist                   //删除dist
cp -r /var/lib/jenkins/workspace/vueweb/dist/ /home/product/vue-learn/  //从构建空间中复制dist到项目下面，注意这里自动拉取的代码在jenkins的空间中workspace

~~~

### 3.自动发布
> 每次git commit 后项目自动拉取代码并且发布的配置
~~~
1.系统管理->系统配置->github
~~~