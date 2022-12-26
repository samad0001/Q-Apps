import React,{useEffect, useState} from 'react'
import './index.css'
import Queue from "../../Assets/Queue.png"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
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


function Header() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.Userreducer.user)
  const [name,setName] = useState(false)
  const [popup,setPopup] = useState(false)
  

  const auth  = getAuth(app)
  const db = getFirestore(app)
  const provider_fb = new FacebookAuthProvider();



  const [mode,setMode] = useState(false);

  const ToggleTheme = ()=>{
      if(mode === false) {
        setMode(true)
        dispatch(setTheme("#000"))
      }else{
        setMode(false)
        dispatch(setTheme("#fff"))
      }
  }
  useEffect(()=>{

      
  },[])


  const theme = useSelector(state=>state.ThemeReducer.theme)
  document.body.style.backgroundColor = theme
  document.body.style.color = "#fff"
  
  





  async function AddInfo(Name,id,email,photoUrl){
    await setDoc(doc(db, "Users", Name), {
      name: Name,
      id: id,
      email: email,
      PhotoLink:photoUrl
    });
  }


  const Successfully =()=>{
   
      Modal.success({
        content: 'Login SuccessFully Continue Your Browsing',
      });
    
  }

  const fb = ()=>{
    signInWithPopup(auth, provider_fb)
    .then((result) => {
      Successfully()
      const user = result.user;
      const userInfo = {
        Name:user.displayName,
        photo:user.photoURL
      }
      setName(true)
      dispatch(LoginState(name))
      dispatch(setUserInfo(userInfo))
      navigate("/Admin")
      const credential = FacebookAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      const errorMessage = error.message;
      // //console.log(errorMessage);      
    });
  }

  // ======================= Use State ======================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  // ===========================================================================

  const [email,setEmail] = useState()
  const [password,setpassword] = useState()
  const [User,setUser] = useState()
   

  function AddUser(){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
    userAdd(user.uid)
   
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
      navigate("/User")
      success()
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // //console.log(errorMessage);      
    });
  


  } 
  // const errors = () => {
  //   Modal.error({
  //     title: 'This is an error message',
  //     content: 'some messages...some messages...',
  //   });
  // };

  const success = () => {
    Modal.success({
      content: 'Login SuccessFully',
    });
  };


  const [time,setTime] = useState()

  setTimeout(()=>{
    setTime(moment().format('LTS'))
  },1000)

  useEffect(()=>{
    dispatch(Time(time))
  },[time])
  
   

  return (
    <>
    <Navbar  expand="lg" className='bg-[#3498db]'>
      <Container>
        <Navbar.Brand onClick={()=> navigate("/")} className={`text-[25px] font-black ${mode === false ? "text-black":"text-white"}`}>
          <img className='w-[50px] h-[50px]' src={Queue} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " className=''>
          <Nav className="me-auto ">
            <Nav.Link href="#home" className={`text-[20px] font-black ${mode === false ? "text-black":"text-white"}`}>{time}</Nav.Link>
            <Nav.Link href="#link" className={`text-[20px] font-black ${mode === false ? "text-black":"text-white"}`}></Nav.Link>
           
          </Nav>


        
         {
          name === false ? 
          <Button variant="primary" onClick={showModal} className={`loginpopup w-[100px] text-[30px] bg-[#7f8c8d]  font-black ${mode === false ? "text-black":"text-white"}`} >Login</Button>:
          <>
          <div className="image w-[60px] h-[60px]  rounded-full">
            <img className='w-full h-full rounded-full' src={user.photo} alt="" />
          </div>
          <p><span>{user.Name}</span></p>
          </>
          }

          <div className='ml-5'>
   
        <button onClick={ToggleTheme}><FiToggleRight size={30} className="text-blacK "/></button>
 
          
        </div>
         

          
        </Navbar.Collapse>
      </Container>
    </Navbar>



    <Modal title="Basic Modal" className='flex flex-col justify-around items-center' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="w-[400px] h-[400px] flex flex-col justify-around items-center">
        
        <div className="btns-group w-full h-[34px]  rounded-lg">
          <div className="btn-group w-full h-[30px]">
            <button className="btn btn-primary" onClick={()=>setPopup(false)}>Login</button>
            <button className="btn btn-primary"  onClick={()=>setPopup(true)}>Sign Up</button>
          </div>
        </div>
        


        {popup === false ? 
       
        <div className="Login flex flex-col justify-around items-center">
          <Input placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} className='w-[200px]' />
          <Input placeholder='Enter Password' onChange={(e)=> setpassword(e.target.value)} className='w-[200px]' />
          <Button variant="primary" onClick={SignIn}>
            Login For Buy A Company Token
          </Button>
        </div>
      :  
      <div className="SignUp flex flex-col justify-around items-center">
          <Input placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} className='w-[200px]' />
          <Input placeholder='Enter Password' onChange={(e)=> setpassword(e.target.value)} className='w-[200px]' />
          <Input placeholder='Enter Name'  onChange={(e)=>setUser(e.target.value)} className='w-[200px]' />
          <Button onClick={AddUser} variant="primary">Register</Button>
        </div>


    
      }







        <Button className='w-full' onClick={fb}>
          Login With Facebook For Add Company
        </Button>
      
        
        
        </div>

      </Modal>
        
    </>
  )
}

export default Header