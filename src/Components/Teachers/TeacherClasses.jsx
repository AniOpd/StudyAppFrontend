import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentClassesPage = () => {
  const [studentClasses, setStudentClasses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${baseUrl}teacher/classes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setStudentClasses(response.data.classes);
    })
    .catch(error => console.error(error));
  }, [id, baseUrl, token]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleTakeClass = async (studentClass) => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}classes/genrateOtp`, { 
        teacherId: id, 
        studentEmail: studentClass.studentId.email 
      });
      alert(res.data.message);
      if (res.status === 200) {
        setSelectedStudent(studentClass);
        setShowPopup(true);
        setTimer(60);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
   if(selectedStudent){
    try{
     const res = await axios.post(`${baseUrl}classes/TakeClass`, {
       teacherId: id,
       studentId: selectedStudent.studentId._id,
       otp
     });
     alert(res.data.message);
     if (res.status === 200) {
       setShowPopup(false);
       setOtp('');
       setTimer(0);
       window.location.reload();
     }
    }catch(e){
      console.error(e);
      alert('Failed to take class. Please try again.');
     }
   }
  };

  const handleResendOtp = () => {
    axios.post(`${baseUrl}teacher/classes/resend-otp`, {
      email: selectedStudent.studentId.email
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      alert('OTP Resent Successfully');
      setTimer(60); 
    })
    .catch(error => console.error(error));
  };

  const defaultProfilePic = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-24 h-24 text-gray-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 18.75a8.25 8.25 0 0115 0"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Classes</h1>
      
      {/* Responsive Table View */}
      <div className="hidden sm:block">
        <div className="bg-white shadow rounded-lg p-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left font-medium text-gray-600 p-4">Name</th>
                <th className="text-left font-medium text-gray-600 p-4">Standard</th>
                <th className="text-left font-medium text-gray-600 p-4">Email</th>
                <th className="text-left font-medium text-gray-600 p-4">Mobile</th>
                <th className="text-left font-medium text-gray-600 p-4">Classes Left</th>
                <th className="text-left font-medium text-gray-600 p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {studentClasses.map((studentClass) => (
                <tr key={studentClass._id}>
                  <td className="text-gray-700 p-4">{studentClass.studentId.name}</td>
                  <td className="text-gray-700 p-4">{studentClass.studentId.standard}</td>
                  <td className="text-gray-700 p-4">{studentClass.studentId.email}</td>
                  <td className="text-gray-700 p-4">{studentClass.studentId.mobile}</td>
                  <td className="text-gray-700 p-4">{studentClass.classesLeft}</td>
                  <td className="text-gray-700 p-4">
                    <button
                      onClick={() => handleTakeClass(studentClass)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                      ) : (
                        'Take Class'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive Profile Card View */}
      <div className="sm:hidden flex flex-col items-center space-y-6">
        {studentClasses.map((studentClass) => (
          <div 
            key={studentClass._id} 
            className="bg-white shadow-lg rounded-lg p-6 sm:p-8 transform hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 w-full max-w-md"
          >
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0">
                {studentClass.studentId.profilePic ? (
                  <img
                    src={studentClass.studentId.profilePic}
                    alt={`${studentClass.studentId.name}'s profile`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                    {defaultProfilePic}
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{studentClass.studentId.name}</h2>
                <p className="text-gray-600">Standard: {studentClass.studentId.standard}</p>
                <p className="text-gray-600">{studentClass.studentId.email}</p>
                <p className="text-gray-600">{studentClass.studentId.mobile}</p>
                <p className="text-gray-600">Classes Left: {studentClass.classesLeft}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleTakeClass(studentClass)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    'Take Class'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Component */}
      {showPopup && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Enter OTP for {selectedStudent.studentId.email}
            </h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter OTP"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleOtpSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleResendOtp}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                disabled={timer > 0}
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentClassesPage;
