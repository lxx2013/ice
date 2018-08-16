import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './utils'
import reply from '../wechat/reply'

export default function (opts, reply) {
  return async function wechatMiddle(ctx, next) {
    const token = opts.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    console.log('begin sha1')
    const sha = sha1(str)
    console.log('sha: ' + sha)
    console.log(str)

    if(ctx.method === 'GET'){
        if (sha === signature) {
          ctx.body = echostr
        } else {
          ctx.body = 'Failed'
        }
    }else if(ctx.method === 'POST'){
        console.log(`signature: ${signature}`)
        if(sha !==signature){
            ctx.body = 'POST Failed'
            console.log('tadasii sha: '+sha)
            return false
        }
        console.log('OK!')
        const data = await getRawBody(ctx.req,{
            length:ctx.length,
            limit:'1mb',
            encoding:ctx.charset
        })
        const content = await util.parseXML(data)
        const message = util.formatMessage(content.xml)

        ctx.weixin = message
        try{
            await reply.apply(ctx,[ctx,next])
        }catch(err){
            console.log(err)
        }

        const reply_msg = ctx.reply
        const xml = util.tpl(reply_msg,message)

        ctx.status = 200
        ctx.type = 'application/xml'
        ctx.body = xml
    }
   
  }
}
