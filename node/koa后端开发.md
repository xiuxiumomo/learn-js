# koa 框架开发 API 接口

## 1.安装

- 使用前人种树的 koa-generator 基础框架

```
npm install koa-generator -g

koa koa_demo
npm install
npm run dev
```

## 2.数据库相关

- 安装 sequelize
- 安装 mysql mysql2
- 链接数据库 db.js

```
npm install seqelize mysql mysql2 -D

```

在项目根目录下创建文件夹 config/db.js 写入 mysql 的链接

```
//注意这里的账号密码写相应的服务器账号密码
const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbname','dbusername','password',{
    host:'localhost',
    dialect:'mysql',
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'  //东八时区
});

module.exports = {
    sequelize
};
```

- 创建 schema、modules、controllers 模块在根目录下创建

### 2.1 schema 数据表模型实例 建表和表相关

```
// 在schema中建立article.js
//mysql语句

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;


//使用seqelize定义一张表
const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('article',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        //文章标题
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title'
        },
        //作者
        author:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'author'
        },
        //内容
        content:{
            type: DataTypes.STRING,
            allowNull: false,
            field:'content'
        },
        //文章分类
        category:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'category'
        },
        // 创建时间
        createdAt:{
            type: DataTypes.DATE
        },
        // 更新时间
        updatedAt:{
            type: DataTypes.DATE
            }
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
}
```

### 2.2 module 相当于 service 用于 sql 语句的查询和返回值

在 module 中创建 article.js

```
// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Article = Sequelize.import('../schema/article');
Article.sync({force: false}); //自动创建表

class ArticleModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createArticle(data){
        return await Article.create({
            title: data.title, //标题
            author: data.author,  //作者
            content: data.content,  //文章内容
            category: data.category //文章分类
        });
    }

    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async getArticleDetail(id){
        return await Article.findOne({
            where:{
                id
            }
        });
    }
}

module.exports = ArticleModel;
```

### 2.3controllers 控制器服务端与客户端连接的地方

```
const ArticleModel = require("../modules/article");
class articleController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        if(req.title && req.author && req.content && req.category){
            try{
                //创建文章模型
                const ret = await ArticleModel.createArticle(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await ArticleModel.getArticleDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建文章成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建文章失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询文章详情模型
                let data = await ArticleModel.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }
}

module.exports = articleController;
```

## 3.路由 koa-router 模块

```
const Router = require('koa-router');
const ArtileController = require('../controllers/article');

const router = new Router({
  prefix: '/api/v1'
});

/**
 * 文章接口
 */
//创建文章
router.post('/article/create',ArtileController.create);

//获取文章详情
router.get('/article/:id',ArtileController.detail)

module.exports = router

//在app.js引入router

const router = require('../router')

app.use(router.routes(),router.allowedMethods());
```

## 4.安装 koa-core 解决接口跨域问题

```
npm install koa-cors --save
const cors = require('koa-cors')
app.use(cors()) //使用cors
```

## 5.jwtToken 配置问题

## 6.cross-env 配置 env 环境变量
- 设置env环境为了方便配置数据库等区分线上和线下

```
//在config文件夹下建立 development.js和production.js和index.js

//development.js
module.exports = {
    env: 'development', //环境名称
    port: 3000,         //服务端口号
    dbName: 'koa',    //数据库名字
    dbUserName: 'root', //用户名
    dbPassWord: '123456',
    dbIP: '193.112.176.177'
}
//production 同development

//index
var development_env = require('./development');
var production_env = require('./production');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
let isDev = process.env.NODE_ENV.includes('development');
const currEnv = isDev ? development_env : production_env;
module.exports = currEnv;
```



```

npm install cross-env
在package.json中 写入
{
    "script": {
        "start": "cross-env NODE_ENV=development  node bin/www",
        "dev": "cross-env NODE_ENV=development ./node_modules/.bin/nodemon bin/www",
        "prd": "pm2 start bin/www",
        "pm2": "cross-env NODE_ENV=production pm2 start bin/www --name='koa_api' --watch",
    }
}


```

## 7.pm2 部署上线
