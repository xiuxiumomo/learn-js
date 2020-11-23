## 1.jenkens的安装


## 2.jenkens服务器配置(gitee)

### 2.1基本的插件 

- jenkens->插件管理-> 添加Gitee Plugin  Publish Over SSH

### 2.2配置gitee

- jenkens->系统配置

```
	链接名：gitee
 	Gitee域名URL: https://gitee.com
  证书令牌: (ca4fc7d0c5c45779146b5edbc48143ef)  
  // https://gitee.com/profile/personal_access_tokens 证书令牌的私人地址生成后请保存，因为只显示一次

```
详细的图片：[![DJ6VUA.md.png](https://s3.ax1x.com/2020/11/23/DJ6VUA.md.png)](https://imgchr.com/i/DJ6VUA)

### 2.3Publish over SSH
> 这个的作用是用来远程连接其他服务器的,如一个git项目同时部署在三台服务器上，构建时通过连接其他远程服务，拉取gitee代码，使得各个服务器代码保持同步的更新
```
	SSH Servers:
    name: 95.169.7.64 //远程服务叫什么，一般取ip地址方便使用
    Hostname: 95.169.7.64 //远程服务器的ip
    Username: root  //登录远程服务器的用户名
 	  Remote Directory: /  //登录远程服务器后默认的目录在哪一般写"/",且是必填

    Passphrase / Password  //远程服务器的密码
    Port: 连接远程服务器的端口号(默认是22)
```
<p>详细的图片</p>

<p>
[![DJ6EEd.md.png](https://s3.ax1x.com/2020/11/23/DJ6EEd.md.png)](https://imgchr.com/i/DJ6EEd)
</p>


### 2.4构建项目
- 1.jenkens->新建->项目名称：nuxt-ci(一般和gitee项目一致)

- 2.构建一个自由风格的项目

- 3.General项目的基本信息

- 4.源代码
```
	Repository URL：https://gitee.com/xiuxiumomo/nuxt-ci.git
  Credentials：xiuxiumomo/***
  //这里是开发者个人信息如果没有，点击右边的添加按钮->用户名密码方式创建
  指定分支：master-build  //nuxt项目只需要构建打包后的文件即可
```
示意图：


[![DJ6VUA.md.png](https://s3.ax1x.com/2020/11/23/DJ6VUA.md.png)](https://imgchr.com/i/DJ6VUA)



- 5.构建触发器选Gitee webhook 触发构建
```
1.需要在 Gitee webhook 中填写 URL: http://193.112.176.177:8080/gitee-project/nuxt-ci（在gitee的项目管理找到webhook填入信息，包括下面的密码）
2.生成 gitee webhook密码
```
图片连接



[![DJ6FDe.md.png](https://s3.ax1x.com/2020/11/23/DJ6FDe.md.png)](https://imgchr.com/i/DJ6FDe)

- 6.构建环境 直接选：Provide Node & npm bin/ folder to PATH


构建环境：


[![DJ6CjO.md.png](https://s3.ax1x.com/2020/11/23/DJ6CjO.md.png)](https://imgchr.com/i/DJ6CjO)

- 7.构建这里要填写两个步骤 执行shell 并且添加一个或多个构建步骤
```
cd /mnt/project/nuxt-ci

git pull

pm2 restart all
```
构建的示意图 



[![DJ6kHH.md.png](https://s3.ax1x.com/2020/11/23/DJ6kHH.md.png)](https://imgchr.com/i/DJ6kHH)


