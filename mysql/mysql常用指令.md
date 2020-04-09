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
## where查询
~~~
常用的比较有
=  != 或者<> >  < >= <=
select * from news where id>=1;
~~~

## order by查询
~~~
1.asc 升序
2.desc 降序
order by <字段名> asc|desc
select * from news order by id desc;
~~~
## like 语句模糊查询
~~~
1.% 代表前面为任意字符且多个只要以d1结尾就可以
2._ 代表单个任意字符 as_d1
select * from news where title LIKE '%d1';
select * from news where title LIKE 'as_d1';
~~~

## as 别名 <字段名> as 别名
~~~
select title as 标题 from news;
~~~

## union 联合两张表 选出来的不带重复数据
~~~
select id from news union  select id from users ORDER BY id;
~~~
## distinct 去重搜索
~~~
select distinct id from users;
~~~

## group by 分组搜索
~~~
select id,count(*) from users GROUP BY id; 

~~~
## null 值处理
~~~
//选出age = null的
select * from users where age<=>null;
select * from users where age IS NULL;
//用=选不出age=null的
select * from users where age=null;
~~~

## 正则表达式
~~~
1. ^
2. $
3. .
4. [abc]
5. [^abc]
6. p1|p2|p3
~~~