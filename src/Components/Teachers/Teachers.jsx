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

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${baseUrl}teacher`);
      setTeachers(res.data.teachers);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddressSelect = (address, coordinates) => {
    setAddress(address);
    setCoordinates(coordinates);
  };

  const calculateDistances = () => {
    if (!coordinates.lat || !coordinates.lng) return [];
    return teachers
      .map((teacher) => ({
        ...teacher,
        distance: getDistance(
          { latitude: coordinates.lat, longitude: coordinates.lng },
          { latitude: teacher.location.lat, longitude: teacher.location.lng }
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setSortedTeachers(calculateDistances());
  }, [coordinates]);

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Find Teachers Within 20 Km</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-6 flex gap-4">
          <AddressInput onAddressSelect={handleAddressSelect} />
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
      {address && (
        <div className="mt-4 w-full max-w-lg bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-700">Selected Address:</h2>
          <p className="mt-2 text-gray-600">{address}</p>
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-700 mt-8">Teachers</h2>
      {sortedTeachers.length > 0 ? (
        <div className="mt-6 w-full max-w-lg">
          <ul className="space-y-4">
            {sortedTeachers.map(
              (teacher, index) =>
                teacher.distance <= 20000 && (
                  <Link to={`/teacher/${teacher._id}`} key={index}>
                    <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition">
                      {teacher.profilePic && (
                        <img
                          src={teacher.profilePic}
                          alt={teacher.name}
                          className="w-12 h-12 rounded-full border-2 border-blue-500"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-lg font-bold text-gray-800">{teacher.name}</div>
                        <div className="text-gray-600">{teacher.location.locationName}</div>
                        <div className="text-gray-600">Subjects: {teacher.subjects.join(', ')}</div>
                        <div className="text-gray-600">Experience: {teacher.experience} years</div>
                        <div className="text-gray-600">Distance: {(teacher.distance / 1000).toFixed(2)} km</div>
                      </div>
                    </li>
                  </Link>
                )
            )}
          </ul>
        </div>
      ) : (
        <div className="text-gray-500 mt-8">No teachers found within 20 km.</div>
      )}
    </div>
  );
};

export default Teacher;
