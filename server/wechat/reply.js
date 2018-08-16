import colors, { bgYellow } from 'colors'
const tip = 'Welcome to reply.js\n'

export default async (ctx,content,next)=>{
    let client = require('../wechat').getWechat()
    const message = ctx.weixin
    console.log('reply.js:7 () message]:\n'.bgYellow,message)
    if(message.MsgType == 'text'){
        if(client[message.Content] ){
            var  data = {}
            try{
                data =  await client.handle(message.Content)
            }catch(err){
                console.log(err)
            }
            console.log('data'.green,data)
            ctx.reply = { content:JSON.stringify(data,null,2)}
        }
        else{
            ctx.reply = { content: message.Content}
        }
    }else if(message.MsgType == 'image'){
        ctx.reply = {
            msgType:message.MsgType,
            mediaId:message.MediaId
        }
    }else if(message.MsgType == 'voice'){
        ctx.reply = {
            msgType:message.MsgType,
            mediaId:message.MediaId
        }
    }else if(message.MsgType == 'video'){
        ctx.reply = {
            msgType:message.MsgType,
            mediaId:message.MediaId,
            title : message.ThumbMediaId,
            description: 'This is not adult video'
        }
    }else if(message.MsgType == 'location'){
        ctx.reply = {
            msgType: 'text',
            content: `经度:${message.Location_Y}纬度:${message.Location_X}`
        }
    }
    else if(message.MsgType == 'link'){
        ctx.reply = {
            msgType: 'text',
            content: message.Title+'\n >_< 変なリンク'
        }
    }
    else if( message.MsgType == 'event'){
        if(message.Event === 'subscribe'){
            ctx.reply = { content: '目前支持:\n1.复读机: \n\t文字 \n\t图片 \n\t语音 \n\t链接标题\n2.定位解析经纬度'}
        }else if (message.Event == 'unsubscribe'){
            console.log('哼竟然真的抛弃了人家'.red)
            ctx.reply = { content: ''}
        }else if (message.Event =='LOCATION'){
            ctx.reply = {
                msgType: 'text',
                content: `经度:${message.Location_Y}纬度:${message.Location_X}`
            }
        }else if(message.Event == 'CLICK'){
            if(message.EventKey == '11'){
                var data = "最新种子接口还没写"
                ctx.reply = { content:JSON.stringify(data,null,2)}
            }else if(message.EventKey == '31'){
                var  data = {}
                try{
                    data =  await client.handle('fetchUserList')
                }catch(err){
                    console.log(err)
                }
                console.log('data'.green,data)
                ctx.reply = { content:JSON.stringify(data,null,2)}
            }else if(message.EventKey == '32'){
                var  data = {}
                try{
                    data =  await client.handle('getMenu')
                }catch(err){
                    console.log(err)
                }
                console.log('data'.green,data)
                ctx.reply = { content:JSON.stringify(data,null,2)}
            }else if(message.EventKey == '33'){
                var  data = {}
                try{
                    data =  await client.handle('delMenu')
                }catch(err){
                    console.log(err)
                }
                console.log('data'.green,data)
                ctx.reply = { content:JSON.stringify(data,null,2)}
            }else if(message.EventKey == '34'){
                var  data = {}
                try{
                    data =  await client.handle('createMenu')
                }catch(err){
                    console.log(err)
                }
                console.log('data'.green,data)
                ctx.reply = { content:JSON.stringify(data,null,2)}
            }
        }else if(message.Event == 'scancode_waitmsg'){
            ctx.reply = { content:JSON.stringify(message,null,2)}
        }else if(message.Event == 'scancode_push'){
            ctx.reply = { content:JSON.stringify(message,null,2)}
        }
    }else{
        ctx.reply = { content: '目前支持:\n1.复读机: \n\t文字 \n\t图片 \n\t语音 \n\t链接标题\n2.定位解析经纬度'}
    }
    
}