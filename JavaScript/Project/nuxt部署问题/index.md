## nuxt 部署上线问题
### 使用npm run build 或者使用npm run start
把文件上传到服务器放开.nuxt文件
### 在服务器上npm install


### pm2 开启服务
linux服务器使用指令
pm2 start npm --name nuxt -- run start --watch

window服务器上必须添加文件
//start.js
~~~
var cmd = require("node-cmd");
cmd.run("npm start")
~~~
然后 pm2 start start.js

### nginx转发
