#!/bin/sh
## Author: 休休漠漠
## Desc: 用来定时检测cpu是否过高，过高后自动重启nginx

max=40

while true; do
  cpu=$(top -b -n1 | grep '%Cpu(s):' | awk '{print $2}')
  if [[ $cpu > $max ]]; then
    nginx -s reload
  fi
  echo $(date +%F" "%H:%M:%S)+" cpu:$cpu%"
  sleep 60
done
