import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    navigate('/quiz');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Enter your name:</label>
      <input 
        className='border-slate-700 border-[1px]'
        type="text" 
        name="name" 
        id="name" 
        required 
        onChange={(e) => setInputName(e.target.value)}
      />
      <button className='mt-2 bg-white border-slate-700 border-[1px] shadow-inner' type="submit">Start!</button>
    </form>
  );
}