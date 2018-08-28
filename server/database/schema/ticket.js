const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TicketSchema = new mongoose.Schema({
  name: String, //global ticket
  ticket: String,
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

TicketSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

TicketSchema.statics = {
  async getAccessTicket() {
    const ticket = await this.findOne({
      name: 'ticket',
    }).exec()
    //下面三行目测一点卵用都没有
    if(ticket && !ticket.ticket){
        ticket.ticket  = 'test'
        //console.log(JSON.stringify(Object.getOwnPropertyDescriptors(ticket),null,2))
    }
    return ticket
  },
  async saveAccessTicket(data) {
    let ticket = await this.findOne({
      name: 'ticket',
    }).exec()
    //console.log(`\n ticket ${ticket} data:${data.access_ticket}\n`)
    if (ticket) {
      ticket.access_ticket = data.access_ticket
      ticket.expires_in = data.expires_in
      //console.log(`\n[1 saveAccessTicket ticket]${JSON.stringify(ticket)}`)
    } else {
      ticket = new Ticket({
        name: 'ticket',
        ticket: data.ticket,
        expires_in: data.expires_in
      })
      //console.log(`\n[2 saveAccessTicket ticket]${JSON.stringify(ticket)}`)
    }
    //console.log(`\n[saveAccessTicket ticket]${JSON.stringify(ticket)}`)
    await ticket.save()
    return data
  }
}

const Ticket = mongoose.model('Ticket', TicketSchema)
