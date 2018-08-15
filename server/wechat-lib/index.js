import request from 'request-promise'
const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base 
}
class Wechat {
  constructor(opts) {
    this.opts = Object.assign({}, opts)
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken

    this.fetchAccessToken()
  }
  async request(options) {
    options = Object.assign({},options,{json:true})
    console.log(`options : ${JSON.stringify(options)}`)
    try{
        const response = await request(options)
        console.log(response)
        return response
    }catch(error){
        console.log(error)
    }
  }
  async fetchAccessToken() {
    var data = await this.getAccessToken()
    if (!this.isValidAccessToken(data)) {
       data = await this.updateAccessToken()
    }
    //console.log(`[fetchAccessToken data]${JSON.stringify(data)}`)
    await this.saveAccessToken(data)
    return data
  }
  async updateAccessToken() {
    const url = api.accessToken + `token?grant_type=client_credential&appid=${this.appID}&secret=${this.appSecret}`
    const data = await this.request({url:url})
    const now = new Date().getTime()
    const expires_in = now + (data.expires_in-20)*1000
    data.expires_in = expires_in
    console.log(`[request new token data]${JSON.stringify(data)}`)
    return data
  }
  isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false;
    }
    const expires_in = data.expires_in
    const now = new Date().getTime()

    if (now < expires_in) {
      return true
    } else {
      return false;
    }
  }
}

export default Wechat