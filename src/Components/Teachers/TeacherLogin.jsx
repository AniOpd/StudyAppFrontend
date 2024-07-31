import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Utils/Loading.jsx'

const TeacherLoginForm = () => {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [label, setLabel] = useState('Email or Mobile'); 
  const [loading, setLoading] = useState(false);

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (emailPattern.test(identifier)) {
      setLabel('Email');
    } else if (/^\d{10}$/.test(identifier)) { 
      setLabel('Mobile');
    } else {
      setLabel('Email or Mobile');
    }
  }, [identifier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let dataToSend = {};

    if (emailPattern.test(identifier)) {
      dataToSend = { email: identifier, password };
    } else {
      dataToSend = { mobile: identifier, password };
    }

    try {
      const response = await axios.post('http://localhost:3000/teacher/login', dataToSend);
        console.log(response.data);
        alert('Login successful');
        localStorage.clear();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('isTeacher', true);
        window.location.href = '/';
        setLoading(true);
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  if(loading){
    return <Loading/>
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Teacher Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold">{label}</label>
            <input 
              type="text" 
              name="identifier" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
              required 
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-bold">Password</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default TeacherLoginForm;
