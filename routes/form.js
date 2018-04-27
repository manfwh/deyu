const router = require('koa-router')()

// router.prefix('/users')

router.post('/join', function (ctx, next) {
  console.log(ctx.request.body)
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
