const buildFetchOptions = (body) => ({
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
});

const performRequest = async (url, body) => {
  const options = buildFetchOptions(body);
  let resp = await fetch(url, options);
  
  return resp;
}


async function authenticate(credential) {
  let resp = await performRequest("http://127.0.0.1:4000/auth/login", credential);
    
  return resp;
}

async function register(credential) {
  let resp = await performRequest("http://127.0.0.1:4000/auth/register", credential);

  return resp;
}

const authService = { authenticate, register };
export default authService;
