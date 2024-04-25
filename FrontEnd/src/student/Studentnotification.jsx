import React, { useEffect, useState } from 'react'
import Studentheader from './Studentheader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function Studentnotification() {
    let {id}=useParams();
    let [message,smessage]=useState([{}]);
    let [up,sup]=useState([]);
    let [val,sval]=useState(0);
    setInterval(()=>{
      sval(val=>val+1);
    },9000);
    
   useEffect(()=>{
    
   axios.post(`https://renderbackendbbb.onrender.com/studentinfo`,{
    id
   })
   .then((res)=>{
    let data=res.data.currentsemester;
   
    axios.post(`https://renderbackendbbb.onrender.com/allmessage`,{
      year:data
    })
    .then((res)=>{
       smessage(res.data);
      
       sup(res.data);
       
    })

   })
   },[val]);
   if(up.length>10){
    up.splice(10,up.length);
    sup([...up]);
   }
  return (
    <div>
        <Studentheader sid={id}/>
      <div style={{height:'45px'}}></div>
      <div>{up.map((it,i)=>{ 
          return <div style={{backgroundColor:'purple',marginTop:'0px',marginLeft:'auto',marginBottom:'5px',marginRight:'auto', width:'80%',borderRadius:'10px'}} key={i}>
          <p style={{fontWeight:'bolder',textAlign:'center',lineHeight:'30px',color:'aliceblue'}}>{it.name}</p>
          <p style={{fontWeight:'normal',textAlign:'center',lineHeight:'30px',color:'aliceblue'}}>{it.message}</p>
          <p style={{fontSize:'10px',textAlign:'center',lineHeight:'30px',color:'aliceblue'}}>{it.time}</p>
          
        </div>
      })}</div>
    </div>
  )
}
