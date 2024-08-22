import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ClassesPage = () => {
  // if(classes.length===0){
  //   return <div className='flex justify-center items-center h-screen'>
  //       <h1 className="text-3xl font-bold text-gray-800 mb-6">You Don't Have Classes</h1>
  //   </div>
  // }
  const baseUrl= import.meta.env.VITE_BASE_URL;
  const [classes, setClasses] = useState([]);
  const id = useSelector((state) => state.auth.user);

  useEffect(()=>{
    axios.get(`${baseUrl}student/classes/${id}`)
    .then((res)=>{
      setClasses(res.data);
    })
    .catch((err)=>{
      console.log(err);
  })},[])




  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Classes</h1>
      <div className="bg-white shadow rounded-lg p-6" >
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left font-medium text-gray-600 p-4">Teacher</th>
              <th className="text-left font-medium text-gray-600 p-4">Classes Left</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id}>
                <td className="text-gray-700 p-4">{classItem.teacherId.name}</td>
                <td className="text-gray-700 p-4">{classItem.classesLeft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesPage;
