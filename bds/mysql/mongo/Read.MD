## MongoDB 创建数据库

### 1.创建数据库

使用一下语法
```
use DATABASE_NAME
```
如果数据库不存在，创建数据库，否则切换到指定数据库。

```
> use runoob //创建一个库
switched to db runoob
> db  //查看当前库
```

**查看所有的库**

```
> show dbs
admin 0.000Gb
test 0.0000Gb

```
当向库中直接插入一条数据时，会默认建立一张test表

```
> db.runoob.insert({"name":"菜鸟教程"})
WriteResult({ "nInserted" : 1 })
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
runoob  0.000GB
```

### 2.删除数据库
db.dropDatabase()

```
show dbs

use runoob

db.dropDatabase
```

### 3.创建集合(表)
db.createCollection(name,options)
参数说明：
- name:要创建集合名称
- options:可选参数指定内存大小索引的选项
  - capped
  - autoIndexId
  - size
  - max
```
> use test
switched to db test
> db.createCollection("runoob")
{ "ok" : 1 }
>

```
如果要查看已有集合，可以使用 show collections 或 show tables 命令：
```
> show collections
runoob
system.indexes
```

下面是带有几个关键参数的 createCollection() 的用法：

创建固定集合 mycol，整个集合空间大小 6142800 B, 文档最大个数为 10000 个。

```
> db.createCollection("mycol", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )
{ "ok" : 1 }
>
```

在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。
```
> db.mycol2.insert({"name" : "菜鸟教程"})
> show collections
mycol2
...
```

### 4删除表

语法格式

```
db.collections.drop()

```
返回值
如果成功删除选定集合，则 drop() 方法返回 true，否则返回 false

### 5.表中插入数据
MongoDB使用insert()或save()方法向合集中插入文档，语法如下：
```
db.COLLECTION_NAME.insert(document)
或
db.COLLECTION_NAME.save(document)
```

- save()：如果 _id 主键存在则更新数据，如果不存在就插入数据。该方法新版本中已废弃，可以使用 db.collection.insertOne() 或 db.collection.replaceOne() 来代替。
- insert(): 若插入的数据主键已经存在，则会抛 org.springframework.dao.DuplicateKeyException 异常，提示主键重复，不保存当前数据。


db.collection.insertOne() 用于向集合插入一个新文档，语法格式如下：

```
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)

```
db.collection.insertMany() 用于向集合插入一个多个文档，语法格式如下:

```
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

一下文档可以存在MongoDB的runoob数据库col集合
```
>db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

我们也可以将数据定义为一个变量，如下所示：

```
> document=({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
});
```

执行插入操作：

```
> db.col.insert(document)
WriteResult({ "nInserted" : 1 })
> 
```

### 6.更新表数据
update() 方法
```
db.collection.update(<query>,<update>,{upset: <boolean>,multi:<boolean>,writeConcern: <document>})
```
参数说明：

- query : update的查询条件，类似sql update查询内where后面的。
- update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- writeConcern :可选，抛出异常的级别。

我们在集合 col 中插入如下数据：
```
>db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

### 7.删除表数据
remove()方法的基本语法格式：
```
db.collection.remove(<query>,<justOne>)
```
如果你的MongoDB是2.6版本以后的，语法格式如下：

```
db.collection.remove(
  <query>,
  {
    justOne: <boolean>,
    writeConcern: <document>
  }
)
```

参数说明：

- query :（可选）删除的文档的条件。
- justOne : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- writeConcern :（可选）抛出异常的级别


```
db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

### 8.表查询

MongoDB 查询文档使用 find() 方法。
```
db.collection.find(query, projection)
```
如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：
```
db.col.find().pretty()
```
除了 find() 方法之外，还有一个 findOne() 方法，它只返回一个文档。

**MongoDB与RDBMS Where语据比较**
```

操作	格式	范例	RDBMS中的类似语句
等于   db.col.find({"by":"菜鸟教程"}).pretty()  where by = '菜鸟教程'
小于   db.col.find({"likes":{$lt:50}}).pretty()   where likes < 50
小于或等于 db.col.find({"likes":{$lte:50}}).pretty() where likes <= 50
大于 db.col.find({"likes":{$gt:50}}).pretty() where likes > 50
大于或等于  db.col.find({"likes":{$gte:50}}).pretty()  where likes >= 50
不等于 db.col.find({"likes":{$ne:50}}).pretty()  where likes != 50
```

**MongoDB AND 条件**
MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，即常规 SQL 的 AND 条件。
```
db.col.find({key1:value1, key2:value2}).pretty()


> db.col.find({"by":"菜鸟教程", "title":"MongoDB 教程"}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```


**MongoDB OR 条件**
MongoDB OR 条件语句使用了关键字 $or,语法格式如下：

```
>db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()   
```

```
>db.col.find({$or:[{"by":"菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
>
```

**AND 和 OR 联合使用**
```
>db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```


### 9.条件操作符

### 10.MongoDB$type操作符

$type操作符基于BSON类型来检索集合中匹配的数据，并返回结果。
```

类型	数字	备注
Double	1	 
String	2	 
Object	3	 
Array	4	 
Binary data	5	 
Undefined	6	已废弃。
Object id	7	 
Boolean	8	 
Date	9	 
Null	10	 
Regular Expression	11	 
JavaScript	13	 
Symbol	14	 
JavaScript (with scope)	15	 
32-bit integer	16	 
Timestamp	17	 
64-bit integer	18	 
Min key	255	Query with -1.
Max key	127
```

```
db.col.find({"title" : {$type : 2}})
或
db.col.find({"title" : {$type : 'string'}})
```

### 11.MongoDB Limit与skip方法
limit()方法基本语法如下
```
db.mycol.find().limit(number)
```

skip() 方法脚本语法格式如下：

```
db.col.find().skip(1)
```

### 12.MongoDB排序
sort()方法基本语法如下所示：
1是升序 -1是降序
```
db.col.find().sort({KEY: 1})

db.mycol.find().sort({age: -1})
```



