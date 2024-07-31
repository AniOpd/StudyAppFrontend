import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from './Components/Home/Home.jsx'
import Teachers from './Components/Teachers/Teachers.jsx';
import TeacherRegistration from './Components/Teachers/TeacherRegistration.jsx';
import TeacherPage from './Components/Teachers/TeacherPage.jsx';
import StudentSignUp from './Components/Students/StudentSignUp.jsx';
import StudentLogin from './Components/Students/StudentsLogin.jsx';
import TeacherLogin from './Components/Teachers/TeacherLogin.jsx';

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
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
