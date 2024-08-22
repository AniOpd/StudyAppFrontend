import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements,} from "react-router-dom";

import store from './Redux/store.js'
import {Provider} from 'react-redux'

import Home from './Components/Home/Home.jsx'
import Teachers from './Components/Teachers/Teachers.jsx';
import TeacherRegistration from './Components/Teachers/TeacherRegistration.jsx';
import TeacherPage from './Components/Teachers/TeacherPage.jsx';
import StudentSignUp from './Components/Students/StudentSignUp.jsx';
import StudentLogin from './Components/Students/StudentsLogin.jsx';
import TeacherLogin from './Components/Teachers/TeacherLogin.jsx';
import ContactUs from './Components/ContactPage/ContactUs.jsx';
import Aboutus from './Components/AboutPage/AboutPage.jsx';
import StudentClass from './Components/Students/StudentClass.jsx';
import StudentPrfile from './Components/Students/StudentProfile.jsx';
import StudentPaymentHistory from './Components/Students/StudentPaymentHistory.jsx';
import TeacherProfile from './Components/Teachers/TeacherProfile.jsx';
import TeacherClasses from './Components/Teachers/TeacherClasses.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="teachers" element={<Teachers />} />
      <Route path="teacherRegistration" element={<TeacherRegistration/>} />
      <Route path="teacher/:id" element={<TeacherPage />} />
      <Route path="studentSignUp" element={<StudentSignUp />} />
      <Route path="studentLogin" element={<StudentLogin />} />
      <Route path="teacherLogin" element={<TeacherLogin />} />
      <Route path="contactUs" element={<ContactUs />} />
      <Route path="about" element={<Aboutus />} />
      <Route path="studentClasses" element={<StudentClass />} />
      <Route path="studentProfile" element={<StudentPrfile />} />
      <Route path="studentPaymentHistory" element={<StudentPaymentHistory />} />
      <Route path="teacherProfile" element={<TeacherProfile />} />
      <Route path="teacherClasses" element={<TeacherClasses />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
