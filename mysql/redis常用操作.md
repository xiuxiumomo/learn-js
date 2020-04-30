## 1.安装redis
- windows安装
- linux安装

### 1.1 windows下下载和操作
windows下载https://github.com/MicrosoftArchive/redis/releases 
解压后到解压的文件夹下启动服务  redis-server.exe redis.windows.conf
在新建输入框 redis-cli.exe -h 127.0.0.1 -p 6379 完成数据操作

### 1.2linux(ubauntu) 下安装redis
~~~
sudo apt-get install redis-server
netstat -nlt|grep 6379 指令查看redis服务状态
~~~

## 2.redis 在node中使用
### 2.1 nodejs文件
```
var redis = require('redis'),
    config = require('./config'),
    RDS_PORT = config.port,     //端口号
    RDS_HOST = config.host,     //服务器IP
    client = redis.createClient();



//存储对象
var obj = {
    age: '2-year-old',
    sex: 'male'
}
client.hmset('kitty', obj, function(err,res){
    console.log(res)
});
client.hgetall('kitty',function(err,res){
    console.log(res)
})
存储数组
client.lpush('myArray',[1,2,3],function(err,res){
    console.log(res)
})
client.lrange('myArray',0,-1,function(err,res){
    console.log(res)
})
存数组
client.sadd('ip', '192.168.3.7', function(err,res){console.log(res)});

client.sadd('ip', '192.168.3.8', function(err,res){console.log(res)});

client.sadd('ip', '192.168.3.9', function(err,res){console.log(res)});
  
client.smembers('ip',function(err,res) {
    console.log(res)
})
```