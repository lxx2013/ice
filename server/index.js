import Koa from 'koa'
import {
  Nuxt,
  Builder
} from 'nuxt'
import R from 'ramda'
import { resolve } from 'path'

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const r  = path => resolve(__dirname,path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3006
const MIDDLEWARES = ['database','router']

class Server {
  constructor() {
    this.app = new Koa()
    this.useMiddleWare(this.app)(MIDDLEWARES)
      // const str = r('middleware/router.js')
      // const Router = require(str)
      // console.log(Router)
  }

  useMiddleWare(app) {
    return R.map(R.compose(
      R.map(i => i(app)),
      require,
      i => `${r('middleware')}/${i}`
    ))
  }
  async start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    // Build in development
    if (!(this.app.env === 'production')) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    this.app.use(ctx => {
      ctx.status = 200
      ctx.respond = false // Mark request as handled for Koa
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    })

    this.app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
  }
}

new Server().start()
