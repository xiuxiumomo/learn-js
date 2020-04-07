## 下载数据库
- 1.下载mysql并且安装或者下载phpStudy集成环境。
- 2.添加path到全局环境如：查找mysql的bin目录复制到环境变量，然后放在path最前面。

## 指令
~~~
/**
mysql指令后面表达式需要加分号
1.连接 mysql -u root -p 回车输入密码连接成功
2.查看数据库 show databases;
3.进入某个库 use egg_app;
4.查看库里的表 show users;
5.查看表的字段 desc users;
6.创建表 
CREATE TABLE news (
	id INT (4) NOT NULL PRIMARY KEY auto_increment,
	title CHAR (20) NOT NULL,
	content CHAR (20) NOT NULL
);
7.插入表 INSERT INTO news (title, content) VALUES ('表啊啊', '222');
8.删除表 delete from news WHERE id = 10;
9.更新表 update news set title='表啊啊啊222' WHERE id=9;


**/
~~~