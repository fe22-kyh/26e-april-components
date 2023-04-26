import { useState } from 'react';

export default function RegisterComponent () {
  const [credential, setCredential] = useState({username: '', password: ''});
  const [infoMessage, setInfoMessage] = useState('');

  const register = async (options) => {
    let res = await fetch("http://127.0.0.1:4000/auth/register", options);
    let text = await res.text();
    
    setInfoMessage(text);
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

    register(fetchOptions);
  }

  const handleChange = ({name, value}) => {
    setCredential({...credential, [name]: value});
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <h2>Register</h2>
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

        <button type="submit">Register</button>
        <button type="reset">Go back</button>
      </form>
    </div>
  )
}