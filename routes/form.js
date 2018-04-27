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
   **************************************
   姓名： ${name}
   手机号: ${phone}
   邮箱: ${email}
   城市: ${city}
   备注： ${remarks}
   提交时间： ${date.getDate()} 日 ${date.getHours()} : ${date.getMinutes()} 
   ***************************************
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
  fs.appendFile(`./data/join/${filename}`, data, 'utf8', err =>{
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
  const { account, password } = ctx.request.body;
  if(account == 'admin' && password == 'admin') {
    ctx.session.user = 'admin';
    ctx.redirect('/oa');
  } else {
    ctx.body = {
      code: 40001,
      message: '账号和密码错误'
    }
  }
})
module.exports = router
