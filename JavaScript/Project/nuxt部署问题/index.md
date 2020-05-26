## nuxt 部署上线问题
### 使用npm run build 或者使用npm run start
把文件上传到服务器放开.nuxt文件
### 在服务器上npm install
### pm2 开启服务
pm2 start npm --name nuxt -- run start --watch
### nginx转发