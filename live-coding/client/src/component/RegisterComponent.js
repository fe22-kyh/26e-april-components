import { useState } from 'react';
import CredentialComponent from './CredentialComponent';
import authService from '../service/authService.js';

export default function RegisterComponent () {
  const [credential, setCredential] = useState({username: '', password: ''});
  const [infoMessage, setInfoMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    let resp = await authService.register(credential);
    let text = await resp.text();
    
    setInfoMessage(text);
  }

  const handleChange = ({name, value}) => {
    setCredential({...credential, [name]: value});
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <h2>Register</h2>
        <CredentialComponent onTextChange={handleChange} />
        <p>{infoMessage}</p>
        
        <button type="submit">Register</button>
        <button type="reset">Go back</button>
      </form>
    </div>
  )
}