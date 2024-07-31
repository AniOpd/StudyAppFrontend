import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-r from-teal-400 to-blue-400 text-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-4 text-teal-800">Welcome to EdTech Home Tuition</h1>
          <p className="text-lg mb-8 text-gray-700">
            Empowering students to achieve academic excellence through personalized home tuition. 
            Discover the perfect teacher within your reach.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Explore Teachers
          </button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 bg-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-teal-800">Our Mission</h2>
          <p className="text-lg text-gray-800">
            At EdTech Home Tuition, our mission is to make quality education accessible to every student by connecting them with highly qualified teachers. 
            We believe in the power of personalized learning, tailored to meet the unique needs of each student.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-teal-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="bg-teal-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Search for Teachers</h3>
              <p className="text-gray-700">
                Enter your location in the Teachers menu, and we'll provide you with a list of teachers within a 20km radius.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="bg-teal-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">View Teacher Profiles</h3>
              <p className="text-gray-700">
                Browse through the profiles of available teachers. If you’ve already had classes with a teacher, 
                you’ll see their profile; otherwise, you can add classes directly from the teacher’s page.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="bg-teal-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Book Classes</h3>
              <p className="text-gray-700">
                Select your preferred teacher and book classes directly through our platform. Start your personalized learning journey today!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newcomer Discount Offer */}
      <section className="py-16 px-6 bg-gradient-to-r from-teal-300 to-blue-200 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-teal-800">Newcomer Discount Offer</h2>
          <p className="text-lg text-gray-800 mb-8">
            Are you new to EdTech Home Tuition? Get a **20% discount** on your first class when you sign up today! 
            Take advantage of this limited-time offer and start your journey towards academic success.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Claim Your Discount
          </button>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-teal-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-gray-700">
                We match students with teachers who can tailor lessons to meet their specific academic needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Verified Teachers</h3>
              <p className="text-gray-700">
                All our teachers undergo a rigorous verification process to ensure they are qualified and trustworthy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-700">
                Our platform is designed to make booking classes easy and hassle-free, so you can focus on learning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Supportive Community</h3>
              <p className="text-gray-700">
                We believe in building a community of learners and educators who support and inspire each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-teal-800">Get Started Today</h2>
          <p className="text-lg text-gray-700 mb-8">
            Ready to take your learning to the next level? Start exploring our platform now and find the perfect teacher for you.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Explore Teachers
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
