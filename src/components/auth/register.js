import React, { useState } from 'react';
import{Link} from 'react-router-dom';
import './register.css';
import { registerUser } from './authAPI';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [name,setName]=useState('');
  const[email , setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  
  const handleRegister= async(e)=>{
    e.preventDefault()
  try{
    const response=await registerUser({
    name,   
    email,
    password,}
);
console.log("hello",response);
const {data}= response ;
console.log('Registration Response: ', data);

setMessage('Registration successful!');
navigate('/register/success');
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth">
      <h1>Register!</h1>
      <form onSubmit={handleRegister}>
        <input placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}></input>
        <input placeholder='Email'value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <input placeholder='Enter a Password'value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        
       <button type='submit'>Register</button>
      
       <span>Already have an account ? <Link to="/login">Login</Link></span>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
export default RegistrationForm;