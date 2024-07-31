import React, { useEffect, useState } from 'react';
import AddressInput from './AddressInput';
import { getDistance } from 'geolib';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Teacher = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [teachers, setTeachers] = useState([]);
  const [sortedTeachers, setSortedTeachers] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
 
  const fetchTeachers = async ()=>{
    try{
      const res = await axios.get(`${baseUrl}teacher`);
      setTeachers(res.data.teachers);
    }catch(e){
      console.error(e);
    }
}

  useEffect(()=>{
    fetchTeachers();
  },[])


  const handleAddressSelect = (address, coordinates) => {
    setAddress(address);
    setCoordinates(coordinates);
  };

  const calculateDistances = () => {
    if (!coordinates.lat || !coordinates.lng) return [];
    return teachers.map(teacher => ({
      ...teacher,
      distance: getDistance(
        { latitude: coordinates.lat, longitude: coordinates.lng },
        { latitude: teacher.location.lat, longitude: teacher.location.lng }
      )
    })).sort((a, b) => a.distance - b.distance);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setSortedTeachers(calculateDistances());
  }, [coordinates]);

  return (
    <div className="flex flex-col items-center  bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Teachers Within 20-Km</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4 flex gap-4">
          <AddressInput onAddressSelect={handleAddressSelect} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
        </div>
      </form>
      {address && (
        <div className="mt-4 w-full max-w-md">
          <h2 className="text-xl font-semibold">Selected Address:</h2>
          <p className="mt-1">{address}</p>
        </div>
      )}
      <h1 className='text-3xl text-gray-400 mt-5' >Teachers</h1>
      {sortedTeachers.length > 0 && (
        <div className="mt-4 w-full max-w-md">
          <ul className="mt-2">
            {sortedTeachers.map((teacher, index) => (
              teacher.distance <= 20000 &&
              <Link to={`/teacher/${teacher._id}`}>
              <li key={index} className="p-2 border-b border-gray-200">
                {teacher.profilePic!=""?<img src={teacher.profilePic} alt={teacher.name} className="w-10 h-10 rounded-full" />:null}
                <div className="font-bold">{teacher.name}</div>
                <div>{teacher.location.locationName}</div>
                <div>Subjects: {teacher.subjects.join(', ')}</div>
                <div>Experience: {teacher.experience} years</div>
                <div>Distance: {(teacher.distance / 1000).toFixed(2)} km</div>
              </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Teacher;
