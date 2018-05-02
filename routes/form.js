const router = require('koa-router')()
const fs = require('fs')
const check = require('../middlewares/check')
// router.prefix('/users')

// 招商加盟 表单
router.post('/join', function (ctx, next) {
  console.log(ctx.request.body)
  const { name, city, phone, email, remarks } =  ctx.request.body;
  const date = new Date();
  const filename = `${date.getFullYear()}-${date.getMonth() + 1}.txt`;
  //const filename2 = `${date.getFullYear()}-${date.getMonth() + 1}.json`;
  const data = `
   **************************************\r\n
   姓名： ${name}\r\n
   手机号: ${phone}\r\n
   邮箱: ${email}\r\n
   城市: ${city}\r\n
   备注： ${remarks}\r\n
   提交时间： ${date.getDate()} 日 ${date.getHours()} : ${date.getMinutes()} \r\n
   ***************************************\r\n\r\n\r\n\r\n\r\n

  `
  const data2 = `
    {
      "name": "${name}",
      "phone": "${phone}",
      "email": "${email}",
      "city": "${city}",
      "remarks": "${remarks}",
      "date": "${date}"
    },
  `
  fs.appendFile(`./uploads/join/${filename}`, data, 'utf8', err =>{
    if(err) throw err;
  })
  // fs.appendFile(`./data/join/${filename2}`, data2, 'utf8', err =>{
  //   if(err) throw err;
  // })
  ctx.status = 204;
})

// 员工登录
router.post('/login', async (ctx, next) =>{
  console.log(ctx.request.body)
  await next()
  const { account } = ctx.request.body;
  if(account == 'admin' ) {
    ctx.session.user = 'admin';
    ctx.redirect('/oa');
  } else {
    ctx.body = {
      code: 40001,
      message: '账号有误'
    }
  }
})
// 退出登录
router.post('/signOut', async (ctx, next) =>{
  ctx.session.user = null;
  ctx.status = 204;
})
module.exports = router
