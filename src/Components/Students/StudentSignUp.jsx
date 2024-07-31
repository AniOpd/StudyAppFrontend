import axios from 'axios';
import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    standard: '',
    password: '',
    dp: null,
  });

  const [loading, setLoading] = useState(false);
  const [imgUri, setImgUri] = useState("");
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let profilePic = "";
    if(formData.dp){
        const data = new FormData();
        data.append("file", formData.dp);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dfhkh8399");
         profilePic= await fetch("https://api.cloudinary.com/v1_1/dfhkh8399/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            return data.url;
          })
          .catch((err) => {
            return null;
          });
      }
      
      const {name,email,mobile,standard,password}=formData;
     try{
        const res= await axios.post('http://localhost:3000/student/register',{name,email,mobile,standard,password,profilePic});
        if(res.status===201){
          alert("Student registered successfully");
          window.location.href="/";
        }else{
          alert("Something went wrong");
        }
     }catch(e){
       console.error(e);
       alert("Something went wrong");
       setLoading(false);
     }
  };

  if(loading){
    return <div className='flex justify-center items-center h-screen'>
       <h1 className='text-4xl'>Loading...</h1>
    </div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Student SignUp</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="number"
              name="mobile"
               onInvalid={(e) => e.target.setCustomValidity('Please enter a valid 10 digit mobile number')}
               onInput={(e) => e.target.setCustomValidity('')}
              min={1000000000}
              max={9999999999}
             
              value={formData.mobile}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Standard</label>
            <input
              type="number"
              name="standard"
              min="1"
                max="12"
              value={formData.standard}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="dp"
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
