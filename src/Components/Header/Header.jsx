// src/Navbar.j
import React, { useEffect, useState } from 'react';
import { Link,NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Auth/AuthSlice.js';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const dispatch = useDispatch();

    const navbarComponents=[
        {
            name:"Home",
            link:"/",
            show:true
        },
        {
            name:"About",
            link:"/about",
            show:true
        },
        {
            name:"contact us",
            link:"/contactUs",
            show:true
        },
        {
            name:"Teachers",
            link:"/teachers",
            show:!isTeacher
        },
        {
            name:"classes",
            link:"/studentClasses",
            show:isStudent
        },
        {
            name:"classes",
            link:"/teacherClasses",
            show:isTeacher
        },
        {
            name:"logout",
            link:"/logout",
            show:isTeacher||isStudent,
        },
        {
            name:"TeacherLogin",
            link:"/teacherLogin",
            show:!isTeacher && !isStudent
        },
        {
            name:"StudentLogin",
            link:"/studentLogin",
            show:!isTeacher && !isStudent
        },
        {
            name:"StudentSignup",
            link:"/studentSignUp",
            show:!isTeacher && !isStudent
        },
        {
            name:"TeacherSignup",
            link:"/teacherRegistration",
            show:!isTeacher && !isStudent
        },
        {
            name:"Profile",
            link:"/studentProfile",
            show:isStudent
        },
        {
            name:"Profile",
            link:"/teacherProfile",
            show:isTeacher
        },
        {
            name:"Pyament History",
            link:"/studentPaymentHistory",
            show:isStudent
        },
        {
            name:"Pyament History",
            link:"/teacherPaymentHistory",
            show:isTeacher
        }
    ]


    useEffect(()=>{
        const isTeacher = localStorage.getItem("isTeacher");
        const isStudent = localStorage.getItem("isStudent");
        if(isTeacher==="true"){
            setIsTeacher(true);
        }else if(isStudent==="true"){
            setIsStudent(true);
        }
    },[])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-base-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-xl font-bold" href="/">
          Logo
        </a>
        <div className="hidden lg:flex space-x-4">
        {
            navbarComponents.map((component,index)=>{
                if(component.name==="logout" && component.show){
                    return <button key={index} onClick={()=>{
                        dispatch(logout());
                        window.location.href = '/';
                    }} className="btn btn-ghost">{component.name}</button>
                }
                  return component.show && <NavLink key={index} to={component.link}  className={({isActive})=>`duration-200 ${isActive ? "text-yellow-500" : "text-black"} hover:bg-yellow-400 btn btn-ghost `}>{component.name}</NavLink>
          })
        }
        </div>
        <button className="lg:hidden btn btn-ghost" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
      {isOpen && (
        <div className="lg:hidden">
            <div className='flex flex-col'>
            {
                navbarComponents.map((component,index)=>{
                    if(component.name==="logout" && component.show){
                        return <button key={index} onClick={()=>{
                            dispatch(logout());
                            window.location.href = '/';
                        }} className="btn btn-ghost">{component.name}</button>
                    }
                    return component.show && <NavLink key={index} to={component.link}  className={({isActive})=>`duration-200 ${isActive ? "text-yellow-500" : "text-black"} hover:bg-yellow-400 btn btn-ghost `}>{component.name}</NavLink>
                })
            }
            </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
