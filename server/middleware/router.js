import rrouter from 'koa-router'
import config from '../config'
import { getWechat } from '../wechat'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export function Router(app){
  const router = new rrouter()
  //.all 相当于 get | post
  router.all('/wechat-hear', wechatMiddle(config.wechat,reply))
  
  router.get('/get_token',async (ctx,next)=>{
      var Wechat = getWechat();
      var token = await Wechat.getAccessToken();
      ctx.body = JSON.stringify(Wechat,null,2)+`\n Wechat.getAccessToken:${token}`
  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
