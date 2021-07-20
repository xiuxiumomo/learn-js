## 定时脚本

> 需求背景,当cup过高时，可能会导致nginx堵塞，导致网站服务变慢。

### 建立文件和写shell脚本

```
创建 /mnt/shell/logs/nginx_restart.log

创建 /mnt/shell/nginx_restart.sh
内容如下：
#!/bin/sh


max=50  ##cpu最大值不能超过50%

while true; do  //利用循环获取动态的cpu量
  cpu=$(top -b -n1 | grep '%Cpu(s):' | awk '{print $2}') ##获取当前cpu量
  if [[ $cpu > $max ]]; then  ## 当超过最大值时候，重启nginx
    nginx -s reload
  fi
  echo $(date +%F" "%H:%M:%S)+" cpu:$cpu%"
  sleep 60 //睡眠1min相当于一次
done


赋予权限 chmod 777 /mnt/shell/nginx_restart.sh
```
### 认识linux自带的crontab命令（windows中的定时器）
crontab [ -u user ] { -l | -r | -e }

- -l列出所有任务列表
- -r删除任务
- -e进入编辑状态

```



//crontab - e 进入编辑状态 
//写入
*/5 * * * * /mnt/shell/nginx_restart.sh >> /mnt/shell/logs/nginx_restart.log

//重启 crond服务
service crond restart
```



**关于前面五个星号的说明**
```
*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- 星期中星期几 (0 - 6) (星期天 为0)
|    |    |    +---------- 月份 (1 - 12) 
|    |    +--------------- 一个月中的第几天 (1 - 31)
|    +-------------------- 小时 (0 - 23)
+------------------------- 分钟 (0 - 59)



0 */2 * * * /sbin/service httpd restart  意思是每两个小时重启一次apache 

50 7 * * * /sbin/service sshd start  意思是每天7：50开启ssh服务 

50 22 * * * /sbin/service sshd stop  意思是每天22：50关闭ssh服务 

0 0 1,15 * * fsck /home  每月1号和15号检查/home 磁盘 

1 * * * * /home/bruce/backup  每小时的第一分执行 /home/bruce/backup这个文件 

00 03 * * 1-5 find /home "*.xxx" -mtime +4 -exec rm {} \;  每周一至周五3点钟，在目录/home中，查找文件名为*.xxx的文件，并删除4天前的文件。

30 6 */10 * * ls  意思是每月的1、11、21、31日是的6：30执行一次ls命令

```

### 认识nohup

>nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。

nohup 命令，在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。

```
//开启后台执行
nohup /mnt/shell/nginx_restart.sh > /mnt/shell/logs/nginx_restart.log 2>&1 &
```

### 加入开机自启动
```
vi /etc/rc.local

## 写入
nohup /mnt/shell/nginx_restart.sh > /mnt/shell/logs/nginx_restart.log 2>&1 &
```
备注：建设通目前使用的是nohup执行定时任务