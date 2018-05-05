const router = require('koa-router')()
const fs = require('fs')
const fse = require('fs-extra')
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
  const users = require('../data/admin');
  const { account, password } = ctx.request.body;
  const user = users.find((user => user.account == account))
  if(user) {
    if(user.password == password) {
      ctx.session.user = user
      ctx.redirect('/oa');
    } else {
      ctx.body = {
        code: 40002,
        message: '账号或密码错误'
      }
    }
  } else {
    ctx.body = {
      code: 40001,
      message: '账号未开通'
    }
  }
  
})
// 退出登录
router.post('/signOut', async (ctx, next) =>{
  ctx.session.user = null;
  ctx.status = 204;
})
// 临时接口  添加账户
router.post('/register', async ctx =>{
  const {account, password} = ctx.request.body;
  if(account && password) {
    try {
      let users = await fse.readJson('./data/admin.json');
      let user = users.find(user => user.account == account)
      if(user) {
        return ctx.body = {
          code: 40002,
          message: '该账户已存在'
        }
      }
      users.push({account, password, idDel: false, rule: 0})
      await fse.writeJson('./data/admin.json',users )
      ctx.body = {
        code: 20000,
        message: '注册成功'
      }
    } catch (error) {
      console.log(error)
    }
    
  }
})
// 临时接口 禁用账户
router.post('/user/del', async ctx =>{
  if(ctx.session.user.rule >= 10) {
    const {account} = ctx.request.body;
    console.log(account,  ctx.request.body)
    const userList = await fse.readJson('./data/admin.json')
    console.log(userList)
    const user = userList.find(user => user.account == account);
    user.isDel = true;
    await fse.writeJSON('./data/admin.json', userList);
    ctx.body = {
      code: 20000,
      message: '删除成功'
    }
  }
})
module.exports = router
