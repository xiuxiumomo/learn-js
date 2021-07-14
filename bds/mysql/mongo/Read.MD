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

### 13.MongoDB索引
> 索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。

这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构

**createIndex() 方法**

db.collection.createIndex(keys, options)


语法中 Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。
```
db.col.createIndex({"title":1})
```
createIndex() 方法中你也可以设置使用多个字段创建索引（关系型数据库中称作复合索引）。
```
db.col.createIndex({"title":1,"description":-1})
```

options参数
```
background	Boolean	建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为false。
unique	Boolean	建立的索引是否唯一。指定为true创建唯一索引。默认值为false.
name	string	索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。
dropDups	Boolean	3.0+版本已废弃。在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 false.
sparse	Boolean	对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 false.
expireAfterSeconds	integer	指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。
v	index version	索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。
weights	document	索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。
default_language	string	对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语
language_override	string	对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language.
```

### 14.MongoDB中聚合
>MongoDB 中聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果。有点类似 SQL 语句中的 count(*)。

**aggregate() 方法**

```
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

```
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
},
{
   _id: ObjectId(7df78ad8902d)
   title: 'NoSQL Overview', 
   description: 'No sql database is very fast',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 10
},
{
   _id: ObjectId(7df78ad8902e)
   title: 'Neo4j Overview', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.neo4j.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 750
},

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
```

### 15.MongoDB复制

MongoDB复制是将数据同步在多个服务器的过程。

复制提供了数据的冗余备份，并在多个服务器上存储数据副本，提高了数据的可用性， 并可以保证数据的安全性。

复制还允许您从硬件故障和服务中断中恢复数据。

**什么是复制?**
- 保障数据的安全性
- 数据高可用性 (24*7)
- 灾难恢复
- 无需停机维护（如备份，重建索引，压缩）
- 分布式读取数据

**MongoDB复制原理**

mongodb的复制至少需要两个节点。其中一个是主节点，负责处理客户端请求，其余的都是从节点，负责复制主节点上的数据。

mongodb各个节点常见的搭配方式为：一主一从、一主多从。

主节点记录在其上的所有操作oplog，从节点定期轮询主节点获取这些操作，然后对自己的数据副本执行这些操作，从而保证从节点的数据与主节点一致。


### 16.MongoDB分片

**分片**
在Mongodb里面存在另一种集群，就是分片技术,可以满足MongoDB数据量大量增长的需求。

当MongoDB存储海量的数据时，一台机器可能不足以存储数据，也可能不足以提供可接受的读写吞吐量。这时，我们就可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。

**为什么使用分片**
- 复制所有的写入操作到主节点
- 延迟的敏感数据会在主节点查询
- 单个副本集限制在12个节点
- 当请求量巨大时会出现内存不足。
- 本地磁盘不足
- 垂直扩展价格昂贵


### 17.MongoDB 备份(mongodump)与恢复(mongorestore)

**MongoDB数据备份**

在Mongodb中我们使用mongodump命令来备份MongoDB数据。该命令可以导出所有数据到指定目录中。

mongodump命令可以通过参数指定导出的数据量级转存的服务器。

```
mongodump -h dbhost -d dbname -o dbdirectory
```

-h：
MongoDB 所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017

-d：
需要备份的数据库实例，例如：test

-o：
备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。

### 18.MongoDB监控
**mongotop 命令**
mongotop也是mongodb下的一个内置工具，mongotop提供了一个方法，用来跟踪一个MongoDB的实例，查看哪些大量的时间花费在读取和写入数据。 mongotop提供每个集合的水平的统计数据。默认情况下，mongotop返回值的每一秒。

启动你的Mongod服务，进入到你安装的MongoDB目录下的bin目录， 然后输入mongotop命令，如下所示：

```
D:\set up\mongodb\bin>mongotop
```