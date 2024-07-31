import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomePage = () => {
  // Animations for the hero section
  const heroAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-200">
        <animated.div style={heroAnimation} className="relative z-10 text-center">
          <h1 className="text-6xl font-bold uppercase tracking-wide text-gray-900">
            Elevate Your Learning
          </h1>
          <p className="text-xl mt-4 text-gray-700">
            Discover top-rated tutors in your area and start your journey to academic excellence.
          </p>
          <motion.button
            className="mt-8 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
          >
            Get Started
          </motion.button>
        </animated.div>
      </section>

      {/* Featured Teachers */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12 uppercase tracking-wide text-gray-900">
          Top-Rated Tutors
        </h2>
        <div className="flex justify-center space-x-8 overflow-x-auto pb-10">
          {[1, 2, 3, 4, 5].map((teacher, index) => (
            <motion.div 
              key={index} 
              className="w-80 bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-56 bg-gray-300 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-500 text-2xl">Teacher Image</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">Teacher Name</h3>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, idx) => (
                  <FaStar 
                    key={idx}
                    color={idx < 4 ? "gold" : "gray"}
                    className={`h-6 w-6 ${idx < 4 ? "animate-pulse" : ""}`}
                  />
                ))}
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 uppercase tracking-wide text-gray-900">
            Student Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg mb-6 text-gray-700">
                  "EdTech Home Tuition has completely changed my approach to learning. The tutors are fantastic!"
                </p>
                <h3 className="text-xl font-semibold text-gray-900">Student Name</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 uppercase tracking-wide text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            Join thousands of students who have transformed their academic journey with our top-rated tutors.
          </p>
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide shadow-lg transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            Sign Up Now
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-200 text-center text-gray-500">
        <p className="mb-4">© 2024 EdTech Home Tuition. All rights reserved.</p>
        <p className="text-sm">Contact us: info@edtechhometuition.com</p>
      </footer>
    </div>
  );
};

export default HomePage;
