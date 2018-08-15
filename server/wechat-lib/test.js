import * as util from './utils'
import template from './tpl'
import assert   from 'assert'

var result = { ToUserName: [ 'gh_1d70e7b6fcdf' ],
FromUserName: [ 'ovG5d1d5c_earSE6zBEedStViMuo' ],
CreateTime: [ '1534336600' ],
MsgType: [ 'text' ],
Content: [ '你好' ],
MsgId: [ '6589925518519571172' ] }

var message = util.formatMessage(result)

it('should what',()=>{
    console.log(util.tpl(message.Content,message))
})