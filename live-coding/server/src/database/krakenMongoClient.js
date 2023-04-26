import { MongoClient } from 'mongodb';

let db = undefined;
const appDatabaseName = "kraken-inn-v1";
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
console.log(username, password);

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = `mongodb+srv://${username}:${password}@edu-cluster.6kt7zaf.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  db = client.db(appDatabaseName);

  return db;
}