import React,{useState,useEffect} from 'react'
import HeroSection from './HeroSection'
import DataTable from './DataTable'
import DataModel from './DataModel'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useNavigate } from 'react-router-dom'
import axiosInstance from '../../Helper/axiosInterceptor'
const Welcome = () => {
    const navigate = useNavigate()
    const [sampleData,setSampleData] = useState([])
    const [showModal,setShowModal] = useState(false)
    const fectchData = async()=>{
        await axiosInstance.get("/api/employee",{withCredentials:true}).then((res)=>{
            let finalData = res.data.data
            return setSampleData((s)=>[...finalData])
        })
    }
    const [currentPage, setCurrentPage] = useState(1);
    const paginationFunction = (array, state, sliceSize = 10)=> {
        const startIndex = (state - 1) * sliceSize;
        const endIndex = state * sliceSize;
        const validEndIndex = Math.min(endIndex, array.length);
        return array.slice(startIndex, validEndIndex);
    }
    const [headerName,setHeaderName] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const getUsername = async ()=>{
        await axiosInstance.get("/api/user",{withCredentials:true}).then((data)=>{
         console.log(data.data.username)
         const resul = data.data.username
         setHeaderName(resul)
         setIsAuthenticated(true)
        }).catch((err)=>{console.log(err);setIsAuthenticated(false)})
    }
    useEffect(() => {
        if (!isAuthenticated) {
            alert("your session expired")
          navigate('/login'); 
        }
      }, [isAuthenticated, navigate]);
    useEffect(()=>{
        getUsername()
       fectchData()
      },[])
    
      const logoutHandler = async()=>{
        try {
            localStorage.removeItem('existingUser')
            localStorage.removeItem('refreshToken')
            await axiosInstance.get("/api/logout",{withCredentials:true}).then(()=>{
                Cookies.remove('authToken');
                setIsAuthenticated(false)
            }) 
        } catch (error) {
           console.log(error)
        }
      }
  return (
    <div className='bg-slate-100 w-full min-h-lvh'>
        <div className='bg-slate-400 w-full h-20 flex items-center justify-between px-28'>
            <div className="left"><h1 className='text-3xl font-extrabold'>Employee Details</h1></div>
            <div className="right"><h1 className='text-xl font-medium'>{headerName}</h1><button onClick={logoutHandler}>Logout</button></div>
        </div>
        <HeroSection sampleData={sampleData} showModal={showModal} setShowModal={setShowModal} setSampleData={setSampleData} fectchData={fectchData} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <DataTable sampleData={sampleData} setSampleData={setSampleData} currentPage={currentPage} paginationFunction={paginationFunction} fectchData={fectchData} />
        <DataModel fectchData={fectchData} showModal={showModal} setShowModal={setShowModal}/>
    </div>
  )
}

export default Welcome