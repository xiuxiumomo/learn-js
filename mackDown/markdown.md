```
# aaa  一级标题
## aaa 二级标题
* aaa 列表项一
* aaa 列表项二
* aaa 列表项三
- 小点1
- 小点2
**aaa** 加粗
*aaa* 斜体
------ 华丽的分割线
> aaa 小模块
[我时链接](https://www.baidu.com)
![图片](http://pic37.nipic.com/20140113/8800276_184927469000_2.png) 图片链接
```

aaa 代码块

```

$\color{#000}{aaa}$ 给文字添加颜色
```

```
git 指令

一.本地文件合并到已有的分支

1.git init
2.git add .
3.git commit -m 创建
4. git remote add origin http://xxxx
5.git pull --rebase origin master
6.git checkout -b A
6.git push
二.删除分支
1.git push origin -d BranchName（仓库）
2.git branch -D branchName (本地)

三.版本回退
1. git log 查看版本
2. git reset --hard 8291ff(上一次commit的版本号)
3. git push -force
```

四.linux 新建测试服务
1.cd /home/www
2.git clone 项目地址

3.cd /usr/local/nginx/conf/vhost/
4.cp xx.conf yy.conf 复制一份
~~~
    //有 api
    server
{
    listen 80;
    server_name cms.yyuexs.com;
    index index.php index.html index.htm;
    root /home/www/CMS/dist;
    #return 301 https://$host$request_uri;
    location ~ .\*\.(php|php5)?\$
 {
    fastcgi_pass  unix:/var/run/php-fpm/php-cgi.sock;
    fastcgi_index index.php;
    include enable-php.conf;
 }

location /status {
    stub_status on;
    access_log   off;
}


location ^~ /admin/  {
    proxy_redirect off;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://backend.yyuexs.com;
#proxy_pass http://mt-mini-backend.yyuexs.com;
}

location /qiniu/token/  {
    proxy_pass http://backend.yyuexs.com;
}

location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
{
expires      30d;
}

}
~~~
~~~
//没有 api
{
    listen 80;
    server_nameaa.yyuexs.com;
    index index.php index.html index.htm;
    root /home/www/CMS/dist; //git 地址
    #return 301 https://$host$request_uri;
    location ~ .\*\.(php|php5)?\$
{

    fastcgi_pass  unix:/var/run/php-fpm/php-cgi.sock;
    fastcgi_index index.php;
    include enable-php.conf;
}

location /status {
    stub_status on;
    access_log   off;
}



location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
}

}
~~~

5.vim 文件
6.按住 i 进入编辑
7.按住 esc 退出编辑
8.按住:wq 退出 
9.重启 service nginx reload


## git忽略某个文件夹下的文件
~~~
src/utils/index
//前提是清理缓存：git rm -r --cached .
~~~
## 在本地新建文件夹，从远程拉取代码
~~~
git init # 初始化一个repo
git remote add origin http://****.git # 把****设置为第一步创建的repo的origin
git pull origin master # 获取origin的master分支
~~~

## git clone 太慢了
- github.com 替换成 github.com.cnpmjs.org


## 