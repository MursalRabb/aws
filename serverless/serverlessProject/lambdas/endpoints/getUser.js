const Responses = require('../common/API_RESPONSES')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName

const handler = async event => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({'message': 'missing the ID from the path'})
  }

  let ID = event.pathParameters.ID;
  
  let user = null
  try {
    user = await Dynamo.get(ID, tableName)
    console.log(user, 'userrrrrr')
  } catch {
    console.log('error getting the user')
  }
  
  
  if (!user === null) {
    return Responses._400({'message': 'no ID in database'})
  }
  

  return Responses._200(user)
}


module.exports = { handler }