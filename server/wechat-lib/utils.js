import xml2js from 'xml2js'

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
    let message = {}
    if(typeof result === 'Object'){
        const keys = Object.keys(result)
        for(let i = 0;i<keys.length;i++){
            let item = result[keys[i]]
            let key = keys[i]
            if(!(item instanceof Array || item.length ===0 )){
                continue
            }
            if(item.length === 1){
                let val = item[0]
                if(typeof val === 'Object'){
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
    return message
}
export {
    formatMessage,
    parseXML
}