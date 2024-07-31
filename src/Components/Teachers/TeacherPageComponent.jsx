import React, { useEffect, useState } from 'react';

const TeacherProfile = ({ teacher, loggedIn }) => {

    const [isStudent, setIsStudent] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('isStudent')){
            setIsStudent(true);
        }
    })

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? teacher.reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === teacher.reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentReview = teacher.reviews[currentReviewIndex];

  const handleAddClass = ()=>{
  }




  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          src={teacher.profilePic}
          alt={teacher.name}
        />
        <div>
          <h2 className="text-2xl font-semibold text-blue-400">{teacher.name}</h2>
          <p className="text-gray-400">Experience: {teacher.experience} years</p>
          <p className="text-gray-400">Location: {teacher.location.locationName}</p>
          <div className="flex items-center mt-2">
            <div className="rating rating-sm flex space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${i < teacher.rating ? 'text-yellow-400 animate-glow' : 'text-gray-700'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927a1 1 0 011.902 0l1.286 3.957a1 1 0 00.95.69h4.163a1 1 0 01.59 1.81l-3.368 2.448a1 1 0 00-.363 1.118l1.287 3.957a1 1 0 01-1.541 1.118L10 14.347l-3.368 2.448a1 1 0 01-1.541-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.647 9.384a1 1 0 01.59-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z"></path>
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-500">({teacher.reviews.length} reviews)</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-400">Subjects:</h3>
        <ul className="list-disc list-inside ml-4">
          {teacher.subjects.map((subject, index) => (
            <li key={index} className="text-gray-300">{subject}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-400">Sample Video:</h3>
        <div className="mt-2 border border-blue-500 rounded-lg overflow-hidden">
          <video className="w-full" controls>
            <source src={teacher.sampleVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {teacher.reviews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-400">Reviews:</h3>
          <div className="mt-2 border border-blue-500 rounded-lg p-4 relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer" onClick={handlePrevReview}>
              <svg
                className="w-6 h-6 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M15 10a1 1 0 01-1 1H6.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L6.414 9H14a1 1 0 011 1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer" onClick={handleNextReview}>
              <svg
                className="w-6 h-6 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h7.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <h4 className="text-md font-semibold">{currentReview.studentId.name}</h4>
                <p className="text-gray-400 text-sm">{new Date(currentReview.date).toLocaleDateString()}</p>
                <div className="rating rating-sm flex space-x-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < currentReview.rating ? 'text-yellow-400' : 'text-gray-700'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927a1 1 0 011.902 0l1.286 3.957a1 1 0 00.95.69h4.163a1 1 0 01.59 1.81l-3.368 2.448a1 1 0 00-.363 1.118l1.287 3.957a1 1 0 01-1.541 1.118L10 14.347l-3.368 2.448a1 1 0 01-1.541-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.647 9.384a1 1 0 01.59-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-300">{currentReview.review}</p>
          </div>
        </div>
      )}
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={handleAddClass}>
            Add Class
          </button>
        </div>
    </div>
  );
};

export default TeacherProfile;
