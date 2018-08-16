const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TokenSchema = new mongoose.Schema({
  name: String, //global ticket
  access_token: String,
  expires_in: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

TokenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

TokenSchema.statics = {
  async getAccessToken() {
    const token = await this.findOne({
      name: 'access_token',
    }).exec()
    //下面三行目测一点卵用都没有
    if(token && !token.token){
        token.token  = 'test'
        //console.log(JSON.stringify(Object.getOwnPropertyDescriptors(token),null,2))
    }
    return token
  },
  async saveAccessToken(data) {
    let token = await this.findOne({
      name: 'access_token',
    }).exec()
    //console.log(`\n token ${token} data:${data.access_token}\n`)
    if (token) {
      token.access_token = data.access_token
      token.expires_in = data.expires_in
      //console.log(`\n[1 saveAccessToken token]${JSON.stringify(token)}`)
    } else {
      token = new Token({
        name: 'access_token',
        token: data.access_token,
        expires_in: data.expires_in
      })
      //console.log(`\n[2 saveAccessToken token]${JSON.stringify(token)}`)
    }
    //console.log(`\n[saveAccessToken token]${JSON.stringify(token)}`)
    await token.save()
    return data
  }
  uploadMaterial(token,type,material,permanent)
}

const Token = mongoose.model('Token', TokenSchema)
