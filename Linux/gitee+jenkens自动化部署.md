## 0.认识jenkin

>  Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。

### 0.1我们为什么需要做？

> 目前我们的前端项目部署在三台linux服务器上，每一次版本升级，需要逐一登录每一台服务器，到指定的目录下-> git pull -> npm install -> pm2 restart project_name,一台服务器上可能需要1-2min,发布效率非常低，发布过程对线上环境可能有短暂的影响。如果使用自动化发布，只要提交代码，触发构建条件，让jenkins自动帮我们发布，整个发布的过程基本上能做到秒发(42s),对线上几乎没有影响，在用户无感知的情况下，线上环境得到更新。能够修复人为发布过程带来的错误，解放开发人员的双手。

### 0.2jenkins构建原理概述
- 在代码仓库创建webhook（web钩子）用于链接jenkins服务器

- 研发push代码到g仓库后，仓库会通过设置好的web钩子推送一个json数据到jenkins服务器

- jenkins服务器在接受到这个信息后，根据配置设置的内容进行判断，是否启用自动构建。如：是否是指定的分支push的代码等

- Jenkins通过设置好的判断后，启用自动构建，进行相关的打包操作，jenkins有一个工作区，一般在root/.jenkins/workspace下，里面存放着拉取下来的源代码和打包好的包文件。Jenkins在同一任务重复构建时，是会先清理掉旧的项目文件，所以不用担心垃圾文件越来越多。只有项目越多文件越多

- Jenkins一般是通过ssh将打包好的文件发送到目标服务器（部署服务器）的指定目录，或者在远程服务器执行commond

[![sXFr60.png](https://s3.ax1x.com/2021/01/26/sXFr60.png)](https://imgchr.com/i/sXFr60)




## 1.jenkens的安装

>执行以下指令安装

- 1.yum install -y java 安装java环境

- 2.wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo

- 3.sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

- 4.yum install -y jenkins

- 5.vi /etc/sysconfig/jenkins  修改JENKINS_USER,这里默认是jenkins 需要修改为root 防止后面jenkins操作的权限问题导致构建失败

- 6.service jenkins start/stop/restart //重启

- 6.1 cat /var/lib/jenkins/secrets/initialAdminPassword //获取安装密码

- 7.在浏览器地址栏输入ip+端口(8080)

- 8.输入6.1的密码到安装界面

- 9.在安装界面选择->推荐安装

- 10.设置用户 username password

[![sTUjpT.png](https://s3.ax1x.com/2021/01/23/sTUjpT.png)](https://imgchr.com/i/sTUjpT)

## 2.jenkens服务器配置(gitee)

### 2.0基本的插件 

- jenkens->插件管理-> 搜索且添加  Publish Over SSH,Nodejs,gitee，钉钉四个插件，安装完后重启。
- 全局工具配置->NodeJS->添加别名(node_js)-> 使用默认配置->保存

### 2.1配置钉钉机器人

- 系统配置->钉钉配置

- 从钉钉群里添加一个机器人，复制出hooks代码

[![sTJwrR.png](https://s3.ax1x.com/2021/01/23/sTJwrR.png)](https://imgchr.com/i/sTJwrR)
### 2.2配置gitee

- 1.系统配置-> git配置

- 2.添加证书令牌和gitee地址
```
链接名：gitee
Gitee域名URL: https://gitee.com
证书令牌:  https://gitee.com/profile/personal_access_tokens 证书令牌的私人地址生成后请保存，因为只显示一次

```
[![sTYKJO.png](https://s3.ax1x.com/2021/01/23/sTYKJO.png)](https://imgchr.com/i/sTYKJO)

### 2.3 Publish over SSH(如果没有负载的项目可以不需要操作这一步)
> 这个的作用是用来远程连接其他服务器的,如一个git项目同时部署在三台服务器上，构建时通过连接其他远程服务，拉取gitee代码，使得各个服务器代码保持同步的更新，如果项目只放在一个服务器上，这一步没有必要配置了！！！

- 系统配置->Publish over SSH

- 新增一台服务信息

```
	SSH Servers:
    name: 95.169.7.64 //远程服务叫什么，一般取ip地址方便使用
    Hostname: 95.169.7.64 //远程服务器的ip
    Username: root  //登录远程服务器的用户名
 	Remote Directory: /  //登录远程服务器后默认的目录在哪一般写"/",且是必填
    Passphrase / Password  //勾选使用账号密码，填写远程服务器的账号密码。
    Port: 连接远程服务器的端口号(默认是22)
```

[![DJ6EEd.md.png](https://s3.ax1x.com/2020/11/23/DJ6EEd.md.png)](https://imgchr.com/i/DJ6EEd)


### 2.4构建项目

- 1.jenkens->新建->项目名称：nuxt-ci 自己取

- 2.构建一个自由风格的项目

- 3.General项目的基本信息

- 4.设置源码管理

- 
```
1.Repository URL：https://gitee.com/xiuxiumomo/nuxt-ci.git
2.Credentials：xiuxiumomo/***  //这里是开发者信息如果，没有，请点击右边的添加按钮->用户名密码方式创建->输入自己的gitee账号秘密
3.指定分支：master-build  //nuxt项目只需要构建打包后的文件即可
```

[![DJ6VUA.md.png](https://s3.ax1x.com/2020/11/23/DJ6VUA.md.png)](https://imgchr.com/i/DJ6VUA)



- 5.配置构建触发器选Gitee 

> 触发器，顾名思义就是在什么条件下，需要让jenkins去构建项目
1.勾选 需要在 Gitee webhook 中填写 URL: http://193.112.176.177:8080/gitee-project/nuxt-ci，其他的使用默认值无需改动

2.允许触发构建的分支，勾选根据分支名过滤，指定master-build，因为项目分支很多，不希望任何分支提交都触发构建。

3.点击生成webhook密码，这个密码就是仓库和服务器连接的关键所在

4.在gitee该项目下添加webhook密码

[![sTN5ZR.png](https://s3.ax1x.com/2021/01/23/sTN5ZR.png)](https://imgchr.com/i/sTN5ZR)



[![DJ6FDe.md.png](https://s3.ax1x.com/2020/11/23/DJ6FDe.md.png)](https://imgchr.com/i/DJ6FDe)

- 6.构建环境 直接选：Provide Node & npm bin/ folder to PATH

> 该node环境就是上面添加的全局环境


[![DJ6CjO.md.png](https://s3.ax1x.com/2020/11/23/DJ6CjO.md.png)](https://imgchr.com/i/DJ6CjO)

- 7.执行构建

1.执行shell 

```
cd /mnt/project/xxx

git pull

npm install 

pm2 restart all
```

2.如果项目在多台服务器，还需要添加多个构建步骤


[![DJ6kHH.md.png](https://s3.ax1x.com/2020/11/23/DJ6kHH.md.png)](https://imgchr.com/i/DJ6kHH)



## 3.注意事项目

- 如果服务器开启防火墙，需要开发jenkins的端口号这里是(8080)

- firewall-cmd --zone=public --add-port=8080/tcp --permanent

- firewall-cmd --reload

## 4.卸载jenkins

- 1、rpm卸载 rpm -e jenkins

- 2、检查是否卸载成功 rpm -ql jenkins 

- 3、彻底删除 find / -iname jenkins | xargs -n 1000 rm -rf

