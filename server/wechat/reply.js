const tip = 'Welcome to reply.js\n'

export default async (ctx,content,next)=>{
    
    const message = ctx.weixin
    console.log(message)
    if(message.MsgType == 'text'){
        if(message.Content == '明智之举'){
            ctx.reply = { content: message.Content}
            return 
        }
        ctx.reply = { content: message.Content}
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
    
}