const {MongoClient} = require('mongodb');
// const MongoClient = require('mongodb).MongoClient;
const database = 'todoapp';

// const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://amitpatel12:amitpatel12@amit.rjihs9m.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);

async function dbConnect(){
    let result = await client.connect();
    let db = result.db(database);
    return db.collection('todos');
}

module.exports = dbConnect;