const router = require('koa-router')();
const check = require('../middlewares/check')

const TITLE = '山西德宇创星科技有限公司';

const OA_CATE = {
  all: '全部',
  xz: '行政文件',
  vis: 'VIS资料',
  ch: '策划方案',
  cp: '产品资料',
  train: '培训资料'



}
// 首页
router.get('/', async (ctx, next) => {
  const data = require('../data/productsShow')
  await ctx.render('pages/index', {
    title: TITLE,
    data
  })
})
// 产品介绍
router.get('/product', async (ctx, next) => {
  await ctx.render('pages/product', {
    title: TITLE
  })
})
// 产品详情
// router.get('/product/:id', async (ctx, next) => {
//   await ctx.render('pages/productDetail', {
//     title: TITLE
//   })
// })
// 实体店铺
router.get('/entityShop', async (ctx, next) => {
  await ctx.render('pages/entityShop', {
    title: TITLE
  })
})
// 店铺详情
router.get('/entityShop/:id', async (ctx, next) => {
  await ctx.render('pages/entityShopDetail', {
    title: TITLE
  })
})
// 关于我们
router.get('/about', async (ctx, next) => {
  await ctx.render('pages/about', {
    title: TITLE
  })
})
// 诚聘英才
router.get('/hr', async (ctx) => {
  await ctx.render('pages/hr', {
    title: TITLE
  })
})
// 合作招募
router.get('/join', async (ctx) => {
  await ctx.render('pages/join', {
    title: TITLE
  })
})
// oA办公
router.get('/oa', async (ctx, next) => {
  await next()
  await ctx.render('pages/oa', {
    title: TITLE
  })
}, check.checkLogin)
// OA办公分类
router.get('/oa/:cate', async (ctx, next) => {
  await next()
  const key = ctx.params.cate;
  if (OA_CATE[key] == undefined) {
    await next()
  } else {
    await ctx.render('pages/oaCate', {
      title: TITLE,
      cateName: OA_CATE[key]
    })
  }
}, check.checkLogin)
// 员工登录
router.get('/login', async (ctx) => {
  if(ctx.session.user) {
    return ctx.redirect('/')
  }
  await ctx.render('pages/login', {
    title: TITLE
  })
})
// 动态详情
router.get('/news/:id', async (ctx, next) =>{
  try {
   const article = require(`../data/${ctx.params.id}.json`);
   await ctx.render('pages/news', {
     title: TITLE,
     article
   })
  } catch (error) {
    next(error)
  }
})
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
