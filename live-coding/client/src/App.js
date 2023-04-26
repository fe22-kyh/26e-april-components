import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formState, setFormState] = useState('login');
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

  const register = async (options) => {
    let res = await fetch("http://127.0.0.1:4000/auth/register", options);
    let text = await res.text();
    
    setInfoMessage(text);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json"
      }
    }

    if(formState === "login") {
      authenticate(fetchOptions);
    } else {
      register(fetchOptions);
    }
  }

  const toggleHandler = () => {
    if(formState === "login") {
      setFormState("register")
    } else {
      setFormState("login");
    }
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <h2>{formState === 'login' ? "Login" : "Sign up"}</h2>
        <div>
          <p>
            <label>Username</label>
            <input value={username} onChange={event => setUsername(event.target.value)} type="text" />
          </p>
          <p>
            <label>Password</label>
            <input value={password} onChange={event => setPassword(event.target.value)} type="password" />
          </p>
          <p>{infoMessage}</p>
        </div>

        <button type="submit">{formState === 'login' ? "Login" : "Register"}</button>
        <button type="reset" onClick={toggleHandler}>{formState === 'login' ? "Sign up" : "Cancel"}</button>
      </form>
    </div>
  );
}

export default App;
