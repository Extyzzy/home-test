const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient
const url = process.env.MONGO_LOCALHOST
const client = new MongoClient(url, { useNewUrlParser: true })
const dbName = 'todoList'

const makeIdFromString = (id) => {
  return new mongodb.ObjectID(id)
}

const connect = async () => {
  await client.connect()
  const db = await client.db(dbName)
  db.makeId = makeIdFromString
  return db
}

const close = async () => {
  await client.connect()
  const db = await client.db(dbName)

  if (!db.serverStatus().connections) {
    return;
  }

  db.close();
};

module.exports = {
  connect,
  close
}
