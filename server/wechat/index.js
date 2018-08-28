import mongoose from 'mongoose'
import config from '../config'
import Wechat from '../wechat-lib'
import { AsyncSubject } from 'rx';
import WechatOAuth from '../wechat-lib/oauth';

const Token = mongoose.model('Token')
const Ticket = mongoose.model('Ticket')
const wechatConfig = {
    wechat :{
        appID: config.wechat.appID,
        appSecret : config.wechat.appSecret,
        token:config.wechat.token,
        getAccessToken: async ()=>await Token.getAccessToken(),
        saveAccessToken: async (data)=> await Token.saveAccessToken(data),
        getAccessTicket: async ()=>await Ticket.getAccessTicket(),
        saveAccessTicket: async (data)=> await Ticket.saveAccessTicket(data),
    }
}

export const getWechat = ()=>{
    const wechatClient = new Wechat(wechatConfig.wechat)
    return wechatClient
}

export const getOAuth = ()=>{
    const oauth = new WechatOAuth(wechatConfig.wechat)
    return oauth
}