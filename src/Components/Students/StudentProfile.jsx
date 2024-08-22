import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = ({ userId }) => {
  const [profile, setProfile] = useState({});
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const user = localStorage.getItem('user');

  useEffect(() => {
    axios.get(`${baseUrl}student/${user}`)
      .then(response => 
        setProfile(response.data)
    )
      .catch(error => console.error(error));
  }, [userId]);

  return (
<div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto">
        <div className="flex items-center space-x-4">
          {profile.profilePic ? (
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <svg
              className="w-16 h-16 text-gray-400 rounded-full bg-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2a6 6 0 016 6v1a6 6 0 01-12 0V8a6 6 0 016-6zm3.75 9a3.75 3.75 0 01-7.5 0V8a3.75 3.75 0 017.5 0v3zM12 14a7 7 0 00-7 7v1a1 1 0 001 1h12a1 1 0 001-1v-1a7 7 0 00-7-7zm5 8H7v-.5a5 5 0 0110 0V22z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-500">{profile.isVerified ? 'Verified' : 'Not Verified'}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-4">
            <label className="text-gray-600">Email</label>
            <p className="text-gray-800">{profile.email}</p>
          </div>
          <div className="mb-4">
            <label className="text-gray-600">Mobile</label>
            <p className="text-gray-800">{profile.mobile}</p>
          </div>
          <div className="mb-4">
            <label className="text-gray-600">Standard</label>
            <p className="text-gray-800">{profile.standard}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
