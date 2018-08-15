const tip = 'Welcome to reply.js\n'

export default async (ctx,content,next)=>{
    
    const message = ctx.weixin
    console.log(message)

    //const xml = `<xml><ToUserName>< ![CDATA[${content.xml.FromUserName[0]}] ]></ToUserName> <FromUserName>< ![CDATA[${content.xml.ToUserName[0]}] ]></FromUserName> <CreateTime>${parseInt(Date.now()/1000)}</CreateTime> <MsgType>< ![CDATA[text] ]></MsgType> <Content>< ![CDATA[${tip}] ]></Content> </xml>`
    const xml = 
    `<xml>
      <ToUserName><![CDATA[${content.xml.FromUserName[0]}]]></ToUserName> 
      <FromUserName><![CDATA[${content.xml.ToUserName[0]}]]></FromUserName> 
      <CreateTime>${parseInt(Date.now()/1000)}</CreateTime> 
      <MsgType><![CDATA[text]]></MsgType> 
      <Content><![CDATA[${tip}]]></Content> 
    </xml>`
    console.log(xml)
    ctx.status = 200
    ctx.type = 'application/xml'
    ctx.body= xml
}