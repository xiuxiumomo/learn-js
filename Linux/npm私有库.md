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
    server_name verdicco.xiuxiumomo.com
    location /{
      xxx
    }
  }
}

```
### 3.本地使用nrm切换源

### 3.1安装nrm
```
npm install -g nrm
```

### 3.2拉取私有源并且切换到私有源

```
nrm add momo-verdicco http://verdicco.xiuxiumomo.com //添加源
nrm use momo-verdicco //本地源替换为自由库的源

```

### 3.3注册和登陆私有源

```
npm adduser –registry http://verdicco.xiuxiumomo.com //依次输入账号密码和邮箱
npm login //测试是否可以登陆然后依次输入账号密码和邮箱号

```

### 3.4新增一个简单的项目，修改package.json

```
npm init -y

```
```
{
  "name": "zl-ui",
  "version": "0.1.4",
  "private": false,
  "main": "./dist/zl-ui.common.js",
  "scripts": {
    "dev": "npm run serve",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "build-bundle": "vue-cli-service build --target lib --name zl-ui ./src/components/index.js"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "vue-template-compiler": "^2.6.11",
    "sass": "^1.25.0",
    "sass-loader": "^8.0.2"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ],
  "files": [
    "dist/*",
    "src/*",
    "public/*",
    "*.json",
    "*.js"
  ]
}

```

添加files字段，提交需要发布的文件，注意每次打包需要修改版本号。
### 4.发布代码

```
//注意当前源一定要在momo-verdicco
npm publish --registry http://verdicco.xiuxiumomo.com

```
### 5.如何封装自己的组件库并且发布?

[如何发布内部私有的组件库]('./Project/封装自己的组件库/Read.md')
