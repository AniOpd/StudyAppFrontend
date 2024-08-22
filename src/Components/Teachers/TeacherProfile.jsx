import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../Utils/Loading.jsx';

const TeacherProfile = () => {
  const id = useSelector((state) => state.auth.user);
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchTeacher = async () => {
        setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}teacher/${id}`);
        console.log(res.data);
        setTeacher(res.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTeacher();
  }, []);

  if(loading){
    return <Loading/>
  }

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Teacher Profile</h1>
      <div className="flex flex-col items-center">
        {teacher.profilePic && (
          <img
            src={teacher.profilePic}
            alt={teacher.name}
            className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
          />
        )}
        <h2 className="text-2xl font-semibold text-gray-700">{teacher.name}</h2>
        {teacher.isVerified && (
          <span className="text-sm text-green-600 mt-2">Verified</span>
        )}
        <div className="mt-4 w-full max-w-md">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-600"><span className="font-bold">Email:</span> {teacher.email}</p>
            <p className="text-gray-600 mt-2"><span className="font-bold">Mobile:</span> {teacher.mobile}</p>
            <p className="text-gray-600 mt-2"><span className="font-bold">Location:</span> {teacher.location.locationName}</p>
            <p className="text-gray-600 mt-2"><span className="font-bold">Subjects:</span> {teacher.subjects.join(', ')}</p>
            <p className="text-gray-600 mt-2"><span className="font-bold">Experience:</span> {teacher.experience} years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
