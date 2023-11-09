import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../../redux/DataSlice";
import useFetch from "../../Api/useFetch";
import Card from "./Card";
import classes from "../Pages/page.module.css";
import { Link } from "react-router-dom";
//  this is our card name change now creting conflict

function Pages({check}) {
  const page = useSelector((state) => state.data.pageNumber);
  const TotalPages = useSelector((state) => state.data.filterdata.Totalpage);
  const dispatch = useDispatch();
  // const { data} = useFetch(`character?page=${page}`);

  // useEffect(() => {
  //   if (Object.keys(data).length !== 0) {
  //     dispatch(dataAction.datastore(data.results));
  //   }
  // }, [data, dispatch]);

  const nextpage = () => {
    if (page >= TotalPages) {
      dispatch(dataAction.setpage(1));
      return;
    }
    dispatch(dataAction.setpage(page + 1));
  };

  const prvPage = () => {
    if (page <= 1) {
      dispatch(dataAction.setpage(1));
      return;
    }
    dispatch(dataAction.setpage(page - 1));
  };

  let filterdata = useSelector((state) => state.data.filterdata.filterdata);

  if (check 
    && filterdata.length!==0) {
    const startIndex = (page - 1) * TotalPages;
    const endIndex = startIndex + 20;
    filterdata = filterdata?.slice(startIndex, endIndex);
  }
  const pagenumber = Array.from({ length: TotalPages }, (_, i) => i + 1);

  const displayData =
    filterdata?.length > 0 ? (
      filterdata.map((item) => (
        <Link
          key={item.id}
          to={`/profile/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card item={item}> </Card>
        </Link>
      ))
    ) : (
      <h1 style={{  color:check?"black":"white" }}>No data Found</h1>
    );

  return (
    <div>
      <div className={classes.character_container}>{displayData}
      </div>

      <div className={classes.pages}>
        {pagenumber.map((pageNumber) => (
          <div
            key={pageNumber}
          // pageNumber === page ? style={zz} : "";
             style={{backgroundColor:pageNumber === page ? "red":""}}
            onClick={(e) => dispatch(dataAction.setpage(pageNumber))}
            
          >
            {pageNumber}
          </div>
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
