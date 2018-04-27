const router = require('koa-router')()
// 首页
router.get('/', async (ctx, next) => {
  await ctx.render('pages/index', {
    title: '山西德宇创星科技'
  })
})
// 产品介绍
router.get('/product', async (ctx, next) => {
  await ctx.render('pages/product', {
    title: '山西德宇创星科技'
  })
})
// 产品详情
router.get('/product/:id', async (ctx, next) =>{
  await ctx.render('pages/productDetail', {
    title: '山西德宇创星科技'
  })
})
// 实体店铺
router.get('/entityShop', async (ctx, next) => {
  await ctx.render('pages/entityShop', {
    title: '山西德宇创星科技'
  })
})
// 店铺详情
router.get('/entityShop/:id', async (ctx, next) =>{
  await ctx.render('pages/entityShopDetail', {
    title: '山西德宇创星科技'
  })
})
// 关于我们
router.get('/about', async(ctx, next) =>{
  await ctx.render('pages/about', {
    title: '山西德宇创星科技'
  })
})
// 诚聘英才
router.get('/hr', async (ctx) =>{
  await ctx.render('pages/hr', {
    title: '山西德宇创星科技'
  })
})
// 合作招募
router.get('/join', async (ctx) =>{
  await ctx.render('pages/join', {
    title: '山西德宇创星科技'
  })
})
// oA办公
router.get('/oa', async (ctx) =>{
  await ctx.render('pages/oa', {
    title: '山西德宇创星科技'
  })
})
// 员工登录
router.get('/login', async (ctx) =>{
  await ctx.render('pages/login', {
    title: '山西德宇创星科技'
  })
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
