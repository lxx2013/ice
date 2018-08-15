const tip = 'Welcome to reply.js\n'

export default async (ctx,content,next)=>{
    
    const message = ctx.weixin
    console.log(message)

    ctx.reply = message
}