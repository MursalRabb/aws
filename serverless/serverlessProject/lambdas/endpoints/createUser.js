const Responses = require('../common/API_RESPONSES')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName

const handler = async event => {
  


  const user = JSON.parse(event.body)  

  let newUser = null
  try {
    newUser = Dynamo.create(user, tableName)
  } catch (error) {
    console.log('error creating the new user')
  }
  
  
  if (!user === null) {
    return Responses._400({'message': 'failed to create a user'})
  }
  
  return Responses._200({newUser})
}


module.exports = { handler }