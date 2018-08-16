import xml2js from 'xml2js'
import template from './tpl'
import { ifError } from 'assert';
import colors from 'colors'

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, {
      trim: true
    }, (err, content) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(content)
      }
    })
  })
}

function formatMessage(result) {
  var message = {}
  if (typeof result === 'object') {
    const keys = Object.keys(result)
    for (let i = 0; i < keys.length; i++) {
      let item = result[keys[i]]
      let key = keys[i]
      if (!(item instanceof Array) || item.length === 0) {
        continue
      }
      if (item.length === 1) {
        let val = item[0]
        if (typeof val === 'object') {
          message[key] = formatMessage(val)
        } else {
          message[key] = (val || '').trim()
        }
      } else {
        message[key] = []
        for (let j = 0; j < item.length; j++) {
          message[key].push(formatMessage(item[j]))
        }
      }
    }
  }
  console.log('[utils.js:46 formatMessage result:]\n'.bgYellow, result)
  //console.log('\nmessage: ', message)
  return message
}

function tpl(content, message) {
  var info = {}
  if (!content) {
    content = {
      content: 'Empty News'
    }
  }
  info = Object.assign({}, {
    content: {
      content: content.content,
      mediaId: content.mediaId,
      decription: content.description,
      thumbMediaId: content.title,
      title: content.title
    },
    creatTime: new Date().getTime(),
    msgType: (content ? (content.msgType || 'text') : 'text'),
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName,
  })
  console.log('[utils.js tpl:71 content]:\n'.bgYellow, content)
  console.log('[utils.js tpl:71 message]:\n'.bgYellow, message)
  console.log('[utils.js tpl:71 info]:\n'.bgYellow, info)
  return template(info)
}
export {
  formatMessage,
  parseXML,
  tpl
}
