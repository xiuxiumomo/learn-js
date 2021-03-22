## 基于 Linux 的 npm 私有库搭建教程

### 1.认识 verdaccio

> verdaccioi 是 sinopia 开源框架的一个 fork，sinopia 已经没有人维护了所以建议直接使用 verdaccio。使用 npm 全局安装即可

```
npm install verdaccio -g

## 使用pm2开启verdaccio(提前安装pm2) 默认的端口号4873
pm2 start verdaccio
```

### 2.开启防火墙等(2和2.1选一种)

```
firewall-cmd --zone=public --add-port=4873/tcp --permanent

firewall-cmd --reload
```

#### 2.1使用nginx代理域名访问
```
# nginx的配置文件
{
  server {
    location /{
      xxx
    }
  }
}

```

### 3.本地使用nrm添加源
```
npm install -g nrm

nrm ls //查看所有源

nrm add  momo-verdicco http://verdicco.xiuxiumomo.com


```
