import { Collection, MongoClient } from 'mongodb'

let client: MongoClient

export const MongoHelper = {
  async connect(uri: string): Promise<void> {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconnect(): Promise<void> {
    await client.close()
  },

  getCollection(name: string): Collection {
    return client.db().collection(name)
  },

  map(collection: any): Object {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },
}
