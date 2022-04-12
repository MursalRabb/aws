const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID
      }
    }
    const data = await documentClient
      .get(params)
      .promise()

      if (!data || !data.Item) {
        throw Error(`There was an error fetching the data for the ID of ${ID} from ${TableName}`)
      }
      return data.Item
  },
  async create(data, TableName) {
    if (!data.ID) {
      throw Error('no ID on data')
    }

    const params = {
      TableName,
      Item: data
    }

    const res = await documentClient.put(params).promise()

    if (!res) {
      throw Error('Error creating user')
    }

    return data
  }
}

module.exports = Dynamo