import rrouter from 'koa-router'
import config from '../config'
import { getWechat } from '../wechat'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { resolve } from 'path';

export function Router(app){
  const router = new rrouter()
  //.all 相当于 get | post
  router.all('/wechat-hear', wechatMiddle(config.wechat,reply))
  
  router.get('/get_token',async (ctx,next)=>{
      var Wechat = getWechat();
      var token = await Wechat.getAccessToken();
      ctx.body = JSON.stringify(Wechat,null,2)+`\n Wechat.getAccessToken:${token}`
  })
  router.get('/upload',(ctx,next)=>{
    let wechat = getWechat()

    //wechat.handle('uploadMaterial','image',resolve(__dirname,'../../static/img/logo.png'))
    const news = {
      articles:[{
        title:'SSR',
        thumb_media_id:'aNg7tsY4SBrPeJ35Ev6Vf_cdS4jo6fClq_fc24F8fR0',
        author:'setsuna',
        digest:'没有摘要',
        show_cover_pic:1,
        content:'没有内容',
        content_source_URL:'http://coding.imooc.com'
      },{
        title:'SSR 2',
        thumb_media_id:'aNg7tsY4SBrPeJ35Ev6Vf_cdS4jo6fClq_fc24F8fR0',
        author:'setsuna',
        digest:'没有摘要',
        show_cover_pic:1,
        content:'没有内容',
        content_source_URL:'http://imooc.com'
      }]
    }
    wechat.handle('uploadMaterial','news',news)
        wechat.handle('fetchMaterial', 'aNg7tsY4SBrPeJ35Ev6Vf_cdS4jo6fClq_fc24F8fR0', 'image',{})
    
  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
