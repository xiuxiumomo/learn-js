const Koa = require('koa'),
    Router = require('koa-router'),
    cheerio = require('cheerio'),
    charset = require('superagent-charset'),
    superagent = charset(require('superagent')),
    app = new Koa(),
    router = new Router();
    let resData = '';
    const url = 'http://www.creprice.cn/market/chartsdatanew.html?city=fuzhou&proptype=11&district=CR&town=&sinceyear=1&flag=1&isv3=0&type=forsale&bldgarea1=&bldgarea2=&br=&price1=&price2=&unitprice1=&unitprice2=&bldgcode=&buildyear1=&buildyear2=&matchrand=a0b92382&based=price&dtype=line&data'
    router.get('/api/home', (ctx, next)=> {
        superagent.get(url).buffer(true).end((err,data)=>{
            if(err) {
                console.log('请求错误')
            }else{
                
                resData = JSON.parse(data.text)
            }
        })
        ctx.body = resData
    });
    
    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        await next();
    });
    app
        .use(router.routes())
        .use(router.allowedMethods());
    
    app.listen(3888, () => {
        console.log('[服务已开启,访问地址为：] http://127.0.0.1:3888/');
    });