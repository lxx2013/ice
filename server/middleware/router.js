import rrouter from 'koa-router'
import config from '../config'
import sha1 from 'sha1'

export function Router(app){
  const router = new rrouter()
  router.get('/wechat-hear', (ctx, next) => {
    const token = config.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    console.log('begin sha1')
    const sha = sha1(str)
    console.log('sha: '+sha)
    if (sha === signature) {
      ctx.body = echostr
    } else {
      ctx.body = 'Failed'
    }
  })
  router.post('/wechat-hear', (ctx, next) => {

  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
