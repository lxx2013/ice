import rrouter from 'koa-router'
import config from '../config'
import { getWechat } from '../wechat'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { resolve } from 'path';
import { signature } from '../controllers/wechat'

export function Router(app){
  const router = new rrouter()
  //.all 相当于 get | post
  router.all('/wechat-hear', wechatMiddle(config.wechat,reply))
  router.get('/wechat-signature',signature)
  router.get('/get_token',async (ctx,next)=>{
      var Wechat = getWechat();
      var token = await Wechat.getAccessToken();
      ctx.body = JSON.stringify(Wechat,null,2)+`\n Wechat.getAccessToken:${token}`
  })
  router.get('/upload',(ctx,next)=>{
    let wechat = getWechat()

  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
