import React, { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../../redux/DataSlice";
import useFetch from "../../Api/useFetch";
import  classes from  '../Pages/page.module.css'
import { Link } from "react-router-dom";
function Pages() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { data} = useFetch(`character?page=${page}`);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      dispatch(dataAction.datastore(data.results));
    }
  }, [data, dispatch]);

  const nextpage = () => {
    if (page >= 42) {
      setPage(1);
      return;
    }
    setPage(page + 1);
  };

  const prvPage = () => {
    if (page <= 1) {
      setPage(1);
      return;
    }
    setPage(page - 1);
  };

  const pagenumber = Array.from({ length: 42 }, (_, i) => i + 1);
  const filterdata =useSelector((state)=>state.data.filterdata)


  const displayData =filterdata.length >0 ?filterdata .map((item) => (
     <Link key={item.id}  to={`/profile/${item.id}`}  style={{textDecoration:"none"}}>
       
    <div className={classes.card_container}>
      <div>
        <img src={item.image} alt="" />
      </div>
      <div className={classes.info}>
        <li >
          <h2>{item.name}</h2>
          <h4>
            <span style={{color:item.status==="Dead"? "red":"yellow"}}>{item.status}</span>-<span>{item.species} </span>
          </h4>
        </li>
        <li >
          <span>Last known location:</span>
          <span>{item.location.name}</span>
        </li>
        <li>
          <span>First seen in:</span>
          <span>{item.origin.name}</span>
        </li>
      </div>
    </div>
     </Link>
  )):  <h1 style={{color:"white"}}>No data Found</h1>;
  

  return (
    <div>
        
<div  className={classes.character_container}>
{displayData}
</div>

        <div className={classes.pages}>
        {pagenumber.map((pageNumber) => (
        <div key={pageNumber} onClick={(e)=> setPage(pageNumber)}>{pageNumber}</div>
      ))}
        </div>
     

     <div className={classes.actions}> 
     <button onClick={prvPage}>Pre</button>

     <button onClick={nextpage}>Next</button>
     </div>
    </div>
  );
}

export default Pages;
