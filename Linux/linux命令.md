## 创建文件夹
```
mkdir a //创建a文件夹
mkdir -p a/b 创建a且a下面创建b
```
## 删除文件夹

```
rmdir a //删除a文件夹(a必须为空)
rm -rf a //强制删除且不询问
```

## 创建文件

```
touch 1.txt //创建 1.txt
```

## 删除文件
```
rm -rf a //强制删除且不询问
```

## 复制文件
```
cp 1.txt 2.txt //复制文件

cp -r test/ test2 //复制文件夹
cp -r test/* test2 //test test2都存在 将test文件覆盖到test2

```

## 移动指令
```
mv 1.txt 2.txt //将1.txt改名成2.txt

mv 3.txt test //将3.txt移动到test文件夹下面

mv test test2 //如果test2存在 将test移动到test2下面。如果test2不存在test改名为test2
```

## 压缩文件

~~~
tar zcvf 2020-11-15-23.tar.gz 2020-11-15-access.log 

tar -czvf a.tar.gz 1.txt 2.txt  //将1.txt 2.txt 压缩成a.tar.gz
//解压文件
tar zvxf 压缩文件名.tar.gz 

-c  压缩
-x  解压
-z  支持gzip解压文件
-v  显示操作过程
-f  使用档名，请留意，在f之后要立即接档名！不要再加参数！
~~~





