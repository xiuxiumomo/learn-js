## 1.nginx中location匹配规则

### 1.1优先级顺序

- 1.= : 表示精确匹配后面的url
- 2.~ : 表示正则匹配，但是区分大小写
- 3.~* : 正则匹配，不区分大小写
- 4.^~ : 表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
- 5.@ : "@" 定义一个命名的 location，使用在内部定向时，例如 error_page

```
//排名顺序

location = /uri 　　　=开头表示精确匹配，只有完全匹配上才能生效。
location ^~ /uri 　　^~ 开头对URL路径进行前缀匹配，并且在正则之前。
location ~ pattern 　~开头表示区分大小写的正则匹配。
location ~* pattern 　~*开头表示不区分大小写的正则匹配。
location /uri 　　　　不带任何修饰符，也表示前缀匹配，但是在正则匹配之后。
location / 　　　　　通用匹配，任何未匹配到其它location的请求都会匹配到，相当于switch中的default。

```


```

location = / {
   #规则A
}
location = /login {
   #规则B
}
//匹配目录
location ^~ /static/ {
   #规则C
}

//区分大小写

location ~ \.(gif|jpg|png|js|css)$ {
   #规则D
}
//不区分大小写
location ~* \.png$ {
   #规则E
}
location / {
   #规则F
}

```

那么会产生如下效果

- 访问根目录 /， 比如 http://localhost/ 将匹配规则 A
- 访问 http://localhost/login 将匹配规则 B，http://localhost/register 则匹配规则 F
- 访问 http://localhost/static/a.html 将匹配规则 C
- 访问 http://localhost/a.gif, http://localhost/b.jpg 将匹配规则 D 和规则 E，但是规则 D 顺序优先，规则 E 不起作用，而 http://- - - localhost/static/c.png 则优先匹配到规则 C
- 访问 http://localhost/a.PNG 则匹配规则 E，而不会匹配规则 D，因为规则 E 不区分大小写。


~~~
# 直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
# 这里是直接转发给后端应用服务器了，也可以是一个静态首页
# 第一个必选规则
location = / {
    proxy_pass http://tomcat:8080/index
}



# 第二个必选规则是处理静态文件请求，这是 nginx 作为 http 服务器的强项
# 有两种配置模式，目录匹配或后缀匹配，任选其一或搭配使用
location ^~ /static/ {
    root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}


# 第三个规则就是通用规则，用来转发动态请求到后端应用服务器
# 非静态文件请求就默认是动态请求，自己根据实际把握
# 毕竟目前的一些框架的流行，带.php、.jsp后缀的情况很少了
location / {
    proxy_pass http://tomcat:8080/

~~~

### 1.2rewrite写法相关

- last – 基本上都用这个 Flag
- break – 中止 Rewirte，不再继续匹配
- redirect – 返回临时重定向的 HTTP 状态 302
- permanent – 返回永久重定向的 HTTP 状态 301

1.判断表达式
~~~
-f 和 !-f 用来判断是否存在文件
-d 和 !-d 用来判断是否存在目录
-e 和 !-e 用来判断是否存在文件或目录
-x 和 !-x 用来判断文件是否可执行
~~~

2.定义一个全局变量

```
例：http://localhost:88/test1/test2/test.php?k=v
$host：localhost
$server_port：88
$request_uri：/test1/test2/test.php?k=v
$document_uri：/test1/test2/test.php
$document_root：D:\nginx/html
$request_filename：D:\nginx/html/test1/test2/test.php
```

3.rewrite配置

- last 和 break关键字的区别只用到了break，即匹配到此处后不会继续跳。

- permanent 和 redirect关键字的区别

rewrite … permanent 永久性重定向，请求日志中的状态码为301
rewrite … redirect 临时重定向，请求日志中的状态码为302

```
server {
    listen 80;
    server_name demo.com;
   
    rewrite ^(.*)$ https://${server_name}$1 permanent;  //http重定向https
}
```


### 1.3 Redirect语法

```
server {
    listen 80;
    server_name start.igrow.cn;
    index index.html index.php;
    root html;
    if ($http_host !~ "^star\.igrow\.cn$") {
        rewrite ^(.*) http://star.igrow.cn$1 redirect;
    }
}
```

## 2.nginx里面的变量

### 1.定义变量

```
 server {

    listen 80;

    server_name localhost;

    location /test {
	      set $foo hello;
        set $first "hello";
	      echo "foo: $foo,first: ${first}";      
    }	
  }
  //curl localhost/test

```

### 2.变量的作用域


```
##注意，只要定义了变量，就会在整个serve中起作用
server {
    listen 8080;
    
    location /foo {
        echo "foo = [$foo]";
    }
    
    location /bar {
        set $foo 32;
        echo "foo = [$foo]";
    }
}

[root@localhost html]# curl 'http://localhost/foo'
foo = []

[root@localhost html]# curl 'http://localhost/bar'
foo = [32]

[root@localhost html]# curl 'http://localhost/foo'
foo = []
```

```
## 在serve的内部跳转中依然存在这个变量
server {
    listen 8080;

    location /foo {
        set $a hello;
        echo_exec /bar;
    }

    location /bar {
        echo "a = [$a]";
    }
}
```

### 3.内建变量

- $uri 和 $request_uri

由 ngx_http_core 模块提供的内建变量 $uri，可以用来获取当前请求的 URI（经过解码，并且不含请求参数），
而 $request_uri 则用来获取请求最原始的 URI （未经解码，并且包含请求参数）。简单来说，$uri不带参数只获取路由，$request_uri带参数

```
location /test-uri {
    echo "uri = $uri";
    echo "request_uri = $request_uri";
}


[root@localhost html]# nginx -s reload
[root@localhost html]# curl localhost/test-uri
uri = /test-uri
request_uri = /test-uri

[root@localhost html]# curl "localhost/test-uri?a=3&b=4"
uri = /test-uri
request_uri = /test-uri?a=3&b=4

[root@localhost html]# curl "localhost/test-uri/hello%20world?a=3&b=4"
uri = /test-uri/hello world
request_uri = /test-uri/hello%20world?a=3&b=4
```

- $arg_XXX

另一个特别常用的内建变量其实并不是单独一个变量，而是有无限多变种的一群变量，即名字以 arg_ 开头的所有变量，我们估且称之为 $arg_XXX 变量群。
一个例子是 $arg_name，这个变量的值是当前请求中名为 name 的参数的值，而且还是未解码的原始形式的值。简单来说，就是获取？后面的参数名字

```
location /test-arg {
    echo "name: $arg_name";
    echo "class: $arg_class";
}

[root@localhost html]# nginx -s reload
[root@localhost html]# curl localhost/test-arg
name: 
class:

[root@localhost html]# curl "localhost/test-arg?name=Tom&class=3"
name: Tom
class: 3

[root@localhost html]# curl "localhost/test-arg?name=hello%20world&class=9"
name: hello%20world
class: 9

```

- 全局变量

```
arg_PARAMETER       #这个变量包含GET请求中，如果有变量PARAMETER时的值。
args                #这个变量等于请求行中(GET请求)的参数，如：foo=123&bar=blahblah;
binary_remote_addr  #二进制的客户地址。
body_bytes_sent     #响应时送出的body字节数数量。即使连接中断，这个数据也是精确的。
content_length      #请求头中的Content-length字段。
content_type        #请求头中的Content-Type字段。
cookie_COOKIE       #cookie COOKIE变量的值
document_root       #当前请求在root指令中指定的值。
document_uri        #与uri相同。
host                #请求主机头字段，否则为服务器名称。
hostname            #Set to themachine’s hostname as returned by gethostname
http_HEADER
is_args             #如果有args参数，这个变量等于”?”，否则等于”"，空值。
http_user_agent     #客户端agent信息
http_cookie         #客户端cookie信息
limit_rate          #这个变量可以限制连接速率。
query_string        #与args相同。
request_body_file   #客户端请求主体信息的临时文件名。
request_method      #客户端请求的动作，通常为GET或POST。
remote_addr         #客户端的IP地址。
remote_port         #客户端的端口。
remote_user         #已经经过Auth Basic Module验证的用户名。
request_completion  #如果请求结束，设置为OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)。
request_method      #GET或POST
request_filename    #当前请求的文件路径，由root或alias指令与URI请求生成。
request_uri         #包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。不能修改。
scheme              #HTTP方法（如http，https）。
server_protocol     #请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
server_addr         #服务器地址，在完成一次系统调用后可以确定这个值。
server_name         #服务器名称。
server_port         #请求到达服务器的端口号。

```


## 3.nginx接口转发配置
- 1.配置反向代理, 比如我们访问http://demo.com/api/aaa/bbb，我们想要代理到http://api.com/api/aaa/bbb, **只切换了域名，uri相同**。
```
location /api {
    proxy_pass  http://api.com;
    proxy_set_header Host $host;
    proxy_set_header  X-Real-IP        $remote_addr;
    proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_set_header  your-custome-header    "myHeader";
    proxy_set_header X-NginX-Proxy true;
}
```

- 2.配置反向代理时，移除前缀。比如我们的服务http://demo.com/users/aaa/bbb, 我们想要代理到http://users.com/aaa/bbb，即切换域名的同时，去掉users前缀。 ***区别是proxy_pass 结尾的/.***

```
location ^~/users/ {
    proxy_set_header Host $host;
    proxy_set_header  X-Real-IP        $remote_addr;
    proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://users.com/;
}


//或者用rewrite方式
location ^~/users/ {
    proxy_set_header Host $host;
    proxy_set_header  X-Real-IP        $remote_addr;
    proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    
    rewrite ^/users/(.*)/$ $1 break;  注意这个rewrite是 a+b 重写成 b 
    proxy_pass http://users.com;  ##注意这里的区别
}




//举列子说明
 ##自己的  http://101.200.218.760/proxy/bing/HPImageArchive.aspx?format=js&idx=0&n=1

 ##实际的  https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1

 location ^~/proxy/bing/ {
    

    rewrite ^/proxy/bing/(.*)$ /$1 break;
    proxy_pass https://cn.bing.com/; 
}

```



