import React, { useState } from 'react';
import AddressInput from './AddressInput';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const TeacherRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: { locationName: '', lat: 0, lng: 0 },
    subjects: [],
    experience: '',
    highestQualification: '',
    password: '',
    bankDetails: { accountNumber: '', ifscCode: '', bankName: '', accountHolderName: '' },
    aadharNumber: ''
  });

  const [dp, setDp] = useState(null);
  const [sv, setSv] = useState(null);
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      bankDetails: {
        ...formData.bankDetails,
        [name]: value,
      },
    });
  };

  const handleAddressSelect = (ad,cor) => {
    
    setFormData({
      ...formData,
      location: { locationName: ad, lat:cor.lat,lng:cor.lng },
    });
  };

  const handleSubjectChange = (e)=>{
    const array= e.target.value.split(',');
    setFormData({
        ...formData,
        subjects:array,
    })
    console.log(formData.subjects);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
                const name=formData.name;
                const email = formData.email;
                const location=formData.location;
                const subjects=formData.subjects;
                const experience=formData.experience;
                const highestqualification=formData.highestQualification;
                const mobile= formData.mobile;
                const password= formData.password;
                const bankDetails=formData.bankDetails;
                const aadharNumber=formData.aadharNumber;
                let profilePic="";
                let sampleVideo="";
          if(dp){
            const data = new FormData();
            data.append("file", dp);
            data.append("upload_preset", "ml_default");
            data.append("cloud_name", "dfhkh8399");
            profilePic= await fetch("https://api.cloudinary.com/v1_1/dfhkh8399/image/upload", {
              method: "post",
              body: data,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
               return data.url;
              })
              .catch((err) => {
                return null;
              });
          }
          if(sv){
            const data = new FormData();
            data.append("file",sv);
            data.append("upload_preset", "ml_default");
            data.append("cloud_name", "dfhkh8399");
            sampleVideo= await fetch("https://api.cloudinary.com/v1_1/dfhkh8399/video/upload", {
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
    try {
      const response = await axios.post('http://localhost:3000/teacher/register',{
        name,email,location,subjects,experience,highestqualification,profilePic,mobile,password,bankDetails,aadharNumber,sampleVideo
      });
      alert(response.data.message);
      if(response.status===200){
        e.target.reset();
        navigate('/');
      }
    } catch (error) {
      console.error('Error registering teacher:', error);
      alert('Error registering teacher');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Name  <span className='text-red-500'>*</span></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Email  <span className='text-red-500'>*</span></label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Mobile  <span className='text-red-500'>*</span></label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Location  <span className='text-red-500'>*</span></label>
          <AddressInput onAddressSelect={handleAddressSelect} />
        </div>
        <div>
          <label className="block font-bold">Subjects  <span className='text-red-500'>*</span></label>
          <input type="text" name="subjects" value={formData.subjects} onChange={handleSubjectChange} required className="input input-bordered w-full" placeholder="Comma separated subjects" />
        </div>
        <div>
          <label className="block font-bold">Experience (in years)  <span className='text-red-500'>*</span></label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Highest Qualification  <span className='text-red-500'>*</span></label>
          <input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Password  <span className='text-red-500'>*</span></label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Profile Picture</label>
          <input type="file" name="profilePic" onChange={(e)=>{
            setDp(e.target.files[0]);
          }} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Sample Video</label>
          <input type="file" name="sampleVideo" onChange={(e)=>{
            setSv(e.target.files[0]);
          }} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-bold">Bank Account Number  <span className='text-red-500'>*</span></label>
          <input type="text" name="accountNumber" value={formData.bankDetails.accountNumber} onChange={handleBankDetailsChange} className="input input-bordered w-full" required/>
        </div>
        <div>
          <label className="block font-bold">IFSC Code  <span className='text-red-500'>*</span></label>
          <input type="text" name="ifscCode" value={formData.bankDetails.ifscCode} onChange={handleBankDetailsChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-bold">Bank Name  <span className='text-red-500'>*</span></label>
          <input type="text" name="bankName" value={formData.bankDetails.bankName} onChange={handleBankDetailsChange} className="input input-bordered w-full" required/>
        </div>
        <div>
          <label className="block font-bold">Account Holder Name  <span className='text-red-500'>*</span></label>
          <input type="text" name="accountHolderName" value={formData.bankDetails.accountHolderName} onChange={handleBankDetailsChange} className="input input-bordered w-full" required/>
        </div>
        <div>
          <label className="block font-bold">Aadhar Number <span className='text-red-500'>*</span></label>
          <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegistrationForm;
