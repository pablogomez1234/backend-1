const connectToDd = require('../DB/config/connectToMongo')
const { chatModel } = require('../DB/model/mongoDbModel')
const normalizedData = require('../normalize/normal')

class Container {

  constructor( schema ) {
      this.schema = schema
  }
  

  async getAll() {
    try{
      await connectToDd()
      const messagesInDb = await this.schema.findOne ( { chatid: 'chat1'} )
       // { projection: { messages: 1, _id: 0 }} )
      return normalizedData( messagesInDb )
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }
 

  async add( message ) {
    try{
      await connectToDd()
      const messagesInDb = await this.schema.findOne ( { chatid: 'chat1' } ,
      { projection: { messages: 1, _id: 0 }} )
      await this.schema.updateOne( { chatid: 'chat1' } ,
      { $set: { messages: messagesInDb.push( message) }} )
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

}


const chats = new Container ( chatModel )


module.exports = chats