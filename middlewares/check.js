module.exports = {
    checkLogin: async (ctx, next) =>{
      if(!ctx.session.user) {
        return ctx.redirect('/login')
      } else {
        next()
      }
    },
    checkoutNotLogin: async (ctx, next) =>{
      if(ctx.session.user) {
        return ctx.redirect('/')
      }
      next()
    },
    checkPermissions: async (ctx, next) =>{
      if(ctx.session.user.rule >= 10) {
        next()
      } else {
        return ctx.redirect('/')
      }
    }
  }