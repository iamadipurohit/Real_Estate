import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/UserSlice';
export default function SignIn() {
  const [formData,setFormData]=useState({});
  const {loading,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleChange=(e)=>{
      setFormData(
        {
          ...formData,
          [e.target.id]:e.target.value,
        }
      );
  };
  console.log(loading+"   feqf   "+error);
  const handleSubmit= async(e)=>
      {
      e.preventDefault();
      try{
      dispatch(signInStart());
      
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();    
      console.log(data);  
      if(data.success===false)   
      {
          dispatch(signInFailure(data.error));
        return;
      }      
      dispatch(signInSuccess(data));
      console.log(data);
      navigate('/');
    }
    catch(e)
    {
      dispatch(signInFailure(e));
         console.log(e);
    }

  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg max-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In </h1>
        <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
          <input id="username" type="text" placeholder='username ' className='border p-3 rounded-lg' onChange={handleChange}/>
          <input id="password" type="password" placeholder='password' className='border p-3 rounded-lg' onChange={handleChange}/>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading?'Loading....':'SignIn'}
          </button>
        </form>
        <div className='flex gap-2 mt-5'>
           <p>Do not have an account?</p>
           <Link to={"/SignUp"}>
            <span className='text-blue-700'> Sign Up</span>
           </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
