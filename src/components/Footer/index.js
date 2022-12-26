import { TypeAnimation } from 'react-type-animation';
import { Button } from "antd";
import React,{useEffect, useState} from 'react'
import Queue from "../../Assets/Queue.png"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Modal,Input } from 'antd';
import { getAuth ,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import {  FacebookAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../config/Firebase';
import { doc, getFirestore, setDoc} from "firebase/firestore"; 
import { setUserInfo } from '../../Redux/Action/User';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'; 
import { Time } from '../../Redux/Action/TimeAction';
import { setTheme } from '../../Redux/Action/ThemeAction';
import {FiToggleRight} from "react-icons/fi"
import { LoginState } from '../../Redux/Action/LoginState';
import { useNavigate } from 'react-router-dom';

export default function Footer(){
  const navigate = useNavigate()
  const auth  = getAuth(app)
  const db = getFirestore(app)
  const provider_fb = new FacebookAuthProvider();


  const [email,setEmail] = useState()
  const [password,setpassword] = useState()
  const [User,setUser] = useState()
   

  const fb = ()=>{
    signInWithPopup(auth, provider_fb)
    .then((result) => {
      const user = result.user;
      const userInfo = {
        Name:user.displayName,
        photo:user.photoURL
      }
   
      navigate("/Admin")
      const credential = FacebookAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      const errorMessage = error.message;
      // //console.log(errorMessage);      
    });
  }

  function AddUser(){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
    userAdd(user.uid)
    alert('Registered Successfull')
   
  })
  .catch((error) => {
    const errorMessage = error.message;
    // //console.log(errorMessage);      
   
  });

  }

const userAdd = async(id)=>{
      await setDoc(doc(db, "Users", id), {
      id:id,
      name: User,
      email: email

    });


  }

  const SignIn = ()=>{
   
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("User",JSON.stringify(user))
      alert('Login Successfull')
      navigate("/User")
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // //console.log(errorMessage);      
    });
  

  }






































  return(
    <>
<div className="background">
<nav  className="navbar bg-body-tertiary">
  <div style={{backgroundColor:'#ebebeb'}} className="container">
    <a className="navbar-brand" href="#">
      {/* <img src="" alt="Bootstrap" width="30" height="24"/> */}
      <p>HOPES YOU FEELS GREAT </p>
    </a>
  </div>
</nav>
    <div
    style={{margin:'0 auto' ,marginTop:'50px', width : '80%' , textAlign:'center'}}
    >
      <h2>
      <TypeAnimation
      sequence={[
        'Welcome To Q-App', // Types 'One'
        1000, // Waits 1s
        'Add Company', // Deletes 'One' and types 'Two'
        2000, // Waits 2s
        'You Need Tokens ?', // Types 'Three' without deleting 'Two'
        1000,
        'Sign In First', // Types 'Three' without deleting 'Two'
        1000,
        () => {
          console.log('Done typing!'); // Place optional callbacks anywhere in the array
        }
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2em' }}
    />
      </h2>
    </div>
  <div style={{marginTop:'100px'}} className="mt-50 sm:mt-0">
    <div className="md:grid md:grid-cols-3 md:gap-6">
      
      <div  >
        
        
      <img src="https://media.istockphoto.com/photos/stethoscope-isolated-on-white-3d-rendering-picture-id1221251689?k=20&m=1221251689&s=612x612&w=0&h=nNIOztf7Csv68tngIrioyCAsLTnccmVgVykt7JQbrdw=" />

      </div>

      <div  className="mt-5 md:col-span-2 md:mt-0">

        <form action="#" method="POST">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                     Email
                  </label>
                  <input
                   onChange={(e)=>setEmail(e.target.value)}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    style={{ color: "black" }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <br />
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                  onChange={(e)=> setpassword(e.target.value)}
                    type="text"
                    style={{ color: "black" }}
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                   Name
                  </label>
                  <input
                  onChange={(e)=>setUser(e.target.value)}
                    type="text"
                    name="email-address"
                    style={{ color: "black" }}
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div
              style={{ backgroundColor: "white", textAlign: "center" }}
              className="px-4 py-3 text-right sm:px-6"
            >
              <Button
                style={{ color: "black", margin: "0 auto" }}
                type="primary"
                onClick={SignIn}
              >
                Login
              </Button>
              <Button
                style={{ color: "black", margin: "0 auto" }}
                type="primary"
                onClick={AddUser}
              >
                Sign Up
              </Button>
              <Button className='w-full' onClick={fb}>
          Login With Facebook For Add Company
        </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</>


)
    }