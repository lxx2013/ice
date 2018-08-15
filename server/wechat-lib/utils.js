import xml2js from 'xml2js'
import template from './tpl'
function parseXML(xml){
    return new Promise((resolve,reject)=>{
        xml2js.parseString(xml,{trim:true},(err,content)=>{
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                resolve(content)
            }
        })
    })
}

function formatMessage(result){
    var message = {}
    if(typeof result === 'object'){
        const keys = Object.keys(result)
        for(let i = 0;i<keys.length;i++){
            let item = result[keys[i]]
            let key = keys[i]
            if(!(item instanceof Array) || item.length ===0 ){
                continue
            }
            if(item.length === 1){
                let val = item[0]
                if(typeof val === 'object'){
                    message[key] = formatMessage(value)
                }else{
                    message[key] = (val || '').trim()
                }
            }
            else{
                message[key] = []
                for( let j= 0; j<item.length;j++){
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    console.log('result: ',result)
    console.log('\nmessage: ',message)
    return message
}
function tpl(content,message){
    var info = {}
    if(Array.isArray(content)){
        type = 'news'
    }
    if(!content){
        content = 'Empty News'
    } 
    info = Object.assign({},{
        content:content,
        creatTime: new Date().getTime(),
        msgType: content? (content.type ||'text') : 'text',
        toUserName : message.FromUserName,
        fromUserName: message.ToUserName
    })
    console.log('content: ',content)
    console.log('\nmessage: ',message)
    console.log('\ninfo ',info)
    return template(info)
}
export {
    formatMessage,
    parseXML,
    tpl
}