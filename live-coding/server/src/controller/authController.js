import authService from "../service/authService.js";
import jwt from 'jsonwebtoken';


async function register(req, res) {
  const { username, password } = req.body;

  if (username == undefined || password == undefined) return res.status(400).send("Missing username or password");
  if (username.length <= 4) return res.status(400).send("Username must be longer than 4 characters");
  if (password.length <= 4) return res.status(400).send("Password must be longer than 4 characters");
  if (username.includes(" ") || password.includes(" ")) return res.status(400).send("Password and username must not have whitespaces");

  let result = await authService.createUser(username, password);

  if(result.upsertedCount == 1) {
    return res.status(201).send("Account created successfully!");
  } else {
    return res.status(409).send("Account already exist");
  }
} 

async function login(req, res) {
  const { username, password } = req.body;

  if (username == undefined || password == undefined) return res.sendStatus(400);

  const isAuthenticated = await authService.authenticate(username, password);

  if(isAuthenticated) {
    const accessToken = jwt.sign({username}, process.env.JWT_SECRET);
    return res.status(200).send({accessToken});
  } else {
    return res.status(400).send("Bad credentials");
  }
}


export default { register, login };