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
//mysql8
mysql > alter user 'root'@'localhost' identified with mysql_native_password by 'jack123'
mysql > flush privileges;
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

## 2.安装mongo步骤

- 1.创建 .repo 文件，生成 mongodb 的源
``` vi /etc/yum.repos.d/mongodb-org-4.0.repo ```

- 2.添加以下配置信息：
```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

### 2.1使用 yum 安装 MongoDB
```
sudo yum install -y mongodb-org
```
- 1.启动 MongoDB 服务
```
systemctl start mongod.service
```
- 2.常用命令
```
# 1、开启 MongoDB
sudo service mongod start  # 或者 systemctl start mongod.service  # 开启 MongoDB
sudo chkconfig mongod on  # 加入开机启动
sudo service mongod restart # 重启 MongoDB

# 2、关闭 MongoDB
sudo service mongod stop  # 关闭 MongoDB

# 3、卸载MongoDB
sudo yum erase $(rpm -qa | grep mongodb-org)    # 卸载 MongoDB
sudo rm -r /var/log/mongodb  # 删除日志文件
sudo rm -r /var/lib/mongo    # 删除数据文件
```

- 3.配置远程连接 MongoDB
```
vi /etc/mongod.conf

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.
```

- 4.重启服务
```
sudo service mongod restart
```

- 5.对外开放端口号
```
systemctl status firewalld  # 查看防火墙状态
firewall-cmd --zone=public --add-port=27017/tcp --permanent # mongodb默认端口号
firewall-cmd --reload  # 重新加载防火墙

firewall-cmd --zone=public --query-port=27017/tcp # 查看端口号是否开放成功，输出yes开放成功，no则失败
```

- 6.测试远程连接
```
mongo 95.169.7.64:27017
db.version()
```


### 2.2添加用户名和密码

- 1.为 admin 数据库创建用户，设置用户名、密码和权限
```
show dbs # 显示所有的数据库
use admin # 切换到 admin 数据库
db.createUser({user:'root',pwd:'999888',roles:['root']})
db.auth('root','999888')
# 其他常用命令
# db.changeUserPassword("test", "test")     # 修改密码
# db.updateUser("test",{roles:[ {role:"read",db:"testDB"} ]}) # 更新用户权限
# db.dropUser('test') # 删除用户
# db.createUser({user:'cjx',pwd:'999888',roles:['userAdminAnyDatabase']}) # 赋予用户所有数据库的userAdmin权限
```

- 2.为其他数据库创建用户，设置用户名、密码和权限
```
use test
db.createUser({ user:"cjx", pwd:"999888", roles:["readWrite", "dbAdmin"] })
db.auth('cjx','999888')
```

- 3.启用密码
```
# vi /etc/mongod.conf

#security:
  authorization: enabled   # disable or enabled

# sudo service mongod restart

#测试密码连接
mongo 192.168.1.132:27017:27017/database -u username -p password
```