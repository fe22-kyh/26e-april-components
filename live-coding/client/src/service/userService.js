const buildPostFetchOptions = (body) => ({
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + sessionStorage.getItem("JWT_TOKEN")
  }
});

const buildGetFetchOptions = () => ({
  headers: {
    "Authorization": "Bearer " + sessionStorage.getItem("JWT_TOKEN")
  }
});

const performRequest = async (url, method, body) => {
  let options = undefined;

  if(method === "GET") {
    options = buildGetFetchOptions();
  }
  else if(method === "POST") {
    options = buildPostFetchOptions(body);
  }
  
  return await fetch(url, options);
}


async function getBalance() {
  let resp = await performRequest("http://127.0.0.1:4000/user/balance", "GET");

  return resp;
}

async function getHistory() {
  let resp = await performRequest("http://127.0.0.1:4000/user/history", "GET");

  return resp;
}



const userService = { getBalance, getHistory };
export default userService;
