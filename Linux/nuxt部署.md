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
1.在项目的package.json中script加入 "pm2": "pm2 start npm --name 'pc_hhb' -- run start"

2.npm run pm2 


```

## 修改hosts

```
1.vi /etc/hosts
2./etc/init.d/network restart
```

