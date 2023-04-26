import { useState } from 'react';

export default function LoginComponent () {
  const [credential, setCredential] = useState({username: '', password: ''});
  const [infoMessage, setInfoMessage] = useState('');

  const authenticate = async (options) => {
    let res = await fetch("http://127.0.0.1:4000/auth/login", options);
    
    if(res.status >= 400) {
      let text = await res.text();
      setInfoMessage(text);
    } else {
      let data = await res.json();
      setInfoMessage("Successfully logged in!");
      sessionStorage.setItem('JWT_TOKEN', data.accessToken);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(credential),
      headers: {
        "Content-Type": "application/json"
      }
    }

    authenticate(fetchOptions);
  }

  const handleChange = ({name, value}) => {
    setCredential({...credential, [name]: value});
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <div>
          <p>
            <label>Username</label>
            <input value={credential.username} name="username" onChange={e => handleChange(e.target)} type="text" />
          </p>
          <p>
            <label>Password</label>
            <input value={credential.password} name="password" onChange={e => handleChange(e.target)} type="password" />
          </p>
          <p>{infoMessage}</p>
        </div>

        <button type="submit">Login</button>
        <button type="reset">Cancel</button>
      </form>

      <a href="register">No account? Sign up here!</a>
    </div>
  )
}