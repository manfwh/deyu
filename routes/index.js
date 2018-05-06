

const router = require('koa-router')();
const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const prettyBytes = require('pretty-bytes');

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
    data,
    env: process.env.NODE_ENV
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
  const jobs = require('../data/jobs');
  await ctx.render('pages/hr', {
    title: TITLE,
    jobs
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
    if(key == 'all') {
      /**
       * 递归遍历目录 返回目录下面的文件信息
       * @param {string} filePath 要遍历的目录
       * @param {string} fileList 遍历返回的数组
       * @param {string} dir 二级目录的名称
       */
      function readFile(filePath, fileList, dir) {
        let files = fs.readdirSync(filePath);
        files.forEach((file) => {
          let states = fs.statSync(filePath + '/' + file);
          if(states.isDirectory()) {
            dir = file
            readFile(filePath + '/' + file, fileList, dir)
          } else {
            fileList.push({
              name: path.parse(file).name,
              type: path.parse(file).ext,
              size: prettyBytes(states.size),
              createAt: moment(states.mtime).format('YYYY/MM/DD'),
              path: `/uploads/${dir}/${file}`
            })
          }
        })
      }
      function getFileList(path, arr) {
        readFile(path, arr);
        return arr;
      }
      
      return await ctx.render('pages/oaCate', {
        title: TITLE,
        cateName: OA_CATE[key],
        files: getFileList('./public/uploads', [])
      })
    }
    var url = './public/uploads/' + key
    const fileList = fs.readdirSync(url);
    const files = fileList.map((file) => {
      const obj = fs.statSync(`${url}/${file}`, 'r');
      return {
        name: path.parse(file).name,
        type: path.parse(file).ext,
        size: prettyBytes(obj.size),
        createAt: moment(obj.mtime).format('YYYY/MM/DD'),
        path: `/uploads/${key}/${file}`
      }
    })
    await ctx.render('pages/oaCate', {
      title: TITLE,
      cateName: OA_CATE[key],
      files
    })
  }
}, check.checkLogin)
// 员工登录
router.get('/login', async (ctx) => {
  if (ctx.session.user) {
    return ctx.redirect('/')
  }
  await ctx.render('pages/login', {
    title: TITLE
  })
})
// 动态详情
router.get('/news/:id', async (ctx, next) => {
  // try {
  // //  const article = require(`../data/${ctx.params.id}.json`);
  //  await ctx.render('pages/news', {
  //    title: TITLE,
  //  })
  // } catch (error) {
  //   next(error)
  // }
  const id = ctx.params.id;
  console.log(id)
  switch (id) {
    case "1":
      await ctx.render('pages/news', { title: TITLE });
      break;
    case "2":
      await ctx.render('pages/news2', { title: TITLE });
      break;
    case "3":
      await ctx.render('pages/news3', { title: TITLE });
  }
})

router.get('/addUser', async ctx =>{
  await ctx.render('pages/addUser', {
  })
})
// 临时接口 admin
router.get('/admin', async (ctx, next) =>{
  await next();
  const userList = await fse.readJson('./data/admin.json');
  await ctx.render('pages/admin', {
    title: TITLE,
    userList
  })
}, check.checkLogin, check.checkPermissions)
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
