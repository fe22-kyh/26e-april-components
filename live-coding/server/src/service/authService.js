import { fetchCollection } from "../database/krakenMongoClient.js"

function createUser(username, password) {
  const critera = { username };
  const data = { $setOnInsert: {username, password}};

  return fetchCollection("userDetails").updateOne(critera, data, { upsert: true });
}

async function authenticate(username, password) {
  const critera = {username};

  const result = await fetchCollection("userDetails").findOne(critera);

  return result != undefined && result.password == password;
}

export default { createUser, authenticate }