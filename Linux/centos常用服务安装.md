## 1.安装mysql的步骤

### 1.1检测是否安装mysql
```
rpm -qa | grep mysql ##如果没有任何东西 说明没有安装mysql
```

### 1.2下载mysql repo源并且安装mysql

- wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm

- sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm

- sudo yum install mysql-server

### 1.3检查安装状态
```
rpm -qa | grep mysql ##如果报错执行

yum install glibc.i686
yum list libstdc++*
```

### 1.4mysql权限和修改面膜
```
//赋权
chown root /var/lib/mysql/

//重启
service mysqld restart

//第一次登录在输入密码的时候直接回车
mysql -u root -p

//进入mysql修改密码

mysql > use mysql;
mysql > update user set password=password('jack123') where user='root';
mysql > exit;

//重新启动
service mysqld restart
//输入密码jack123
mysql -u root -p

//为了远程navicate添加权限 账号密码 root root
GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "root";

//开放mysql端口号
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload　
```