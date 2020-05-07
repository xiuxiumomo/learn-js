## 下载数据库

- 1.下载 mysql 并且安装或者下载 phpStudy 集成环境。
- 2.添加 path 到全局环境如：查找 mysql 的 bin 目录复制到环境变量，然后放在 path 最前面。

## 指令

```
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
```

## where 查询

```
常用的比较有
=  != 或者<> >  < >= <=
select * from news where id>=1;
```

## order by 查询

```
1.asc 升序
2.desc 降序
order by <字段名> asc|desc
select * from news order by id desc;
```

## like 语句模糊查询

```
1.% 代表前面为任意字符且多个只要以d1结尾就可以
2._ 代表单个任意字符 as_d1
select * from news where title LIKE '%d1';
select * from news where title LIKE 'as_d1';
```

## as 别名 <字段名> as 别名

```
select title as 标题 from news;
```

## union 联合两张表 选出来的不带重复数据

```
select id from news union  select id from users ORDER BY id;
```

## distinct 去重搜索

```
select distinct id from users;
```

## group by 分组搜索

```
select id,count(*) from users GROUP BY id;

```

## null 值处理

```
//选出age = null的
select * from users where age<=>null;
select * from users where age IS NULL;
//用=选不出age=null的
select * from users where age=null;
```

## 正则表达式

```
1. ^
2. $
3. .
4. [abc]
5. [^abc]
6. p1|p2|p3
```

## 函数

> select 函数名(参数) from [表]

- 单行函数 concat length ifnull
- 分组函数

## 1.字符函数

```
select length('join'); //4
select LENGTH('李'); //3
```

### 2.拼接 concat

```
SELECT CONCAT(id,'-',title) as 名字 FROM news;
```

### 3.upper lower 大小写

```
SELECT UPPER('jack');
```

### 4.substr 截取 注意：索引从 1 开始

```
SELECT SUBSTR('jack',2,4) as output;

```

### 5.instr 第一次出现的位置 如果找不到返回 0

```
SELECT INSTR('lovejacklove','jack') as output; //5
```

### 6.trim() 去前后空格

```
SELECT TRIM( 'a' from 'aaa马asd仔aaa') as output;
```

### lpad() 左边连接指定字符串

```
//4指的是总长度
SELECT LPAD('漠漠',4,'**') as output;
```

### rpad() 右边填充

```
SELECT rpad('漠漠',4,'**') as output;
```

### replace() 替换

```
SELECT REPLACE('张无忌爱上了周芷若','周芷若','赵敏') as output;
```
## 数学函数

### round 四舍五入
```
select ROUND(1.5);  //2
```

### ceil() 向上取整

```
select ceil(1.2) //2
```
### floor() 向下取整
```
select floor(1.2) //1
```

### truncate 截断函数
```
select TRUNCATE(1.678,1); 1.6
```

### mod 取余
```
select mod(10,3)
```

## 日期函数
### now返回当前系统日期

```
select now() //日期+时分秒
```
### curdate 返回当前日期
```
SELECT CURDATE(); //2020-04-16
```

### curtime 当前时间
```
select curtime() 
```

### 获取指定的年月日等
```
SELECT YEAR(now());
year month
```
### str_to_date

```
SELECT STR_TO_DATE('2020-9-1','%Y-%c-%d') //2020-09-01
```

## data_form
```
SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日') as 日期;
```

## 其他函数
### version  版本
### database 当前数据库


## 流程控制函数
### if 函数
```
SELECT if(10>5,'对的','错的') as output; 类似三元表达式
```

### case函数

> case 字段 when 常量 then 语句 else  n end

```
select salary as 原始工资,department_id
case department_id
WHEN 30 salary*1.1
When 40 salary*1.2
when 50 salary*1.3
else salary 
end as 新工资
from emplory; 
```

# 分组函数
> 主要用来统计
- sum
- avg
- min
- count

## 1.使用

```
select SUM(age),avg(age) from users;
select avg(age) from users;
select SUM(age) from users;
select min(age) from users;
select count(age) from users;
```

## 2.参数类型
```
sum avg 一般处理数值型
max min count 处理任何类型
```
## 3.是否忽略null值
```
默认忽略null值
```

## 4.和distinct 去重搭配

```
select sum( DISTINCT age) from users;
```

## 5.count其他用法
```
select count(*) from user; //用于统计行数
```

## 6.和分组函数一同查询字段有限制
```
要求是group by函数

```
### 6.1分组查询 group by
```
select 分组函数,列(要求出现在group by后面) from 表 【where 筛选条件】 group by 分组列表 【order by 句子】


select MAX(age),id from users GROUP BY id

//带条件

select avg(age),id from users where name like '%b%' group by id;

//用分组后的条件查询 查询分类类型大于2的类型
select count(*),id from users group by id having count(*)>2;
```
不同条件不同的时间点去可以选择不一样的东西，你们觉得
### 6.2按照函数分组 
```
//按照title长度分组并统计每组的个数

select count(*),LENGTH(title) as title_len FROM article GROUP BY LENGTH(title) HAVING count(*)>1;

```
### 6.3按照多个字段查询
```
//按照作者和分类查询统计
select count(*),author,category FROM article GROUP  BY author,category;
```

### 6.4添加排序
```
//6.3基础上按照降序排序
select count(*),author,category FROM article GROUP  BY author,category ORDER BY count(*) DESC;
```

## 7.笛卡尔积连接查询



