import { useState } from 'react';
import CredentialComponent from './CredentialComponent';
import authService from '../service/authService.js';

export default function LoginComponent () {
  const [credential, setCredential] = useState({username: '', password: ''});
  const [infoMessage, setInfoMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    let res = await authService.authenticate(credential);
    
    if(res.status >= 400) {
      let text = await res.text();
      setInfoMessage(text);
    } else {
      let data = await res.json();
      setInfoMessage("Successfully logged in!");
      sessionStorage.setItem('JWT_TOKEN', data.accessToken);
    }
  }

  const handleChange = ({name, value}) => {
    setCredential({...credential, [name]: value});
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <CredentialComponent onTextChange={handleChange} />
        <p>{infoMessage}</p>

        <button type="submit">Login</button>
        <button type="reset">Cancel</button>
      </form>

      <a href="register">No account? Sign up here!</a>
    </div>
  )
}