 import React from 'react'
 import Filters from '../fiilters/Filters'
 import Pages from '../Pages/Pages'
 import  usseFetch  from '../../Api/useFetch'
import useFetch from '../../Api/useFetch';
 function Home() {
 

   return (
      <div  style={{ margin:"auto",padding:"2rem",background:" linear-gradient(rgb(26, 25, 25) ,rgb(77, 73, 73) ,rgb(46, 43, 43),rgb(67, 64, 64)  ,rgb(69, 62, 62) ,black)"}}>
    <Filters></Filters>
    <Pages></Pages>
    </div>
   )
 }
 
 export default Home