#!/bin/bash
date=$(date +%Y-%m-%d)
date_time=$(date +%Y-%m-%d_%H:%M:%S)
logs_back=/etc/nginx/nginx.check.logs
logs_file=$logs_back/$date.nginx.check.logs
mkdir -p /etc/nginx/nginx.check.logs
touch $logs_file
nginx_port=$(netstat -nlt | grep 8080 | awk '{print $4}' | cut -d : -f 2)
echo "" >>$logs_file
echo "------------------Time Now: $date_time--------------------" >>$logs_file
echo "nginx_port:$nginx_port" >>$logs_file
if [ "$nginx_port" = "8080" ]; then
  echo "------------------Time Now: $date_time--------------------" >>$logs_file
  echo "------------------ps -ef |grep nginx --------------------" >>$logs_file
  ps -ef | grep nginx >>$logs_file
  echo "------------------result------------------" >>$logs_file
  echo 'nginx server is running!!' >>$logs_file
  echo "------------------result------------------" >>$logs_file
else
  echo "------------------Time Now: $date_time--------------------" >>$logs_file
  echo "------------------result------------------" >>$logs_file
  echo 'Nginx server is stopped!!' >>$logs_file
  echo "------------------result------------------" >>$logs_file
  echo '------------------start nginx : /usr/local/nginx/sbin/nginx------------------' >>$logs_file
  /usr/local/nginx/sbin/nginx >>$logs_file
  nginx_start_port=$(netstat -nlt | grep 8080 | awk '{print $4}' | cut -d : -f 2)
  echo "nginx_start_port:$nginx_start_port" >>$logs_file
  if [ "$nginx_start_port"="8080" ]; then
    echo "------------------Time Now: $date_time--------------------" >>$logs_file
    echo "------------------ps -ef |grep nginx --------------------" >>$logs_file
    ps -ef | grep nginx >>$logs_file
    echo "------------------result------------------" >>$logs_file
    echo 'Nginx service started Successfully!' >>$logs_file
    echo "------------------result------------------" >>$logs_file
  else
    echo "------------------Time Now: $date_time--------------------" >>$logs_file
    echo "------------------result------------------" >>$logs_file
    echo 'Nginx service started Failed!' >>$logs_file
    echo "------------------result------------------" >>$logs_file
  fi
fi
