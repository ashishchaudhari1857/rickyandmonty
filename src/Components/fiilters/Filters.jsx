import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataAction } from "../../redux/DataSlice";
import classes  from '../fiilters/filter.module.css'
import useFetch from "../../Api/useFetch";

function Filters() {
  const [characterName, setCharacterName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("All");
  const [gender, setGender] = useState("All");
  const [toggel, setToggel] = useState(false);
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  
  useEffect(() => {
    // Define a function to filter and update the data
    const filterData = () => {
      const filteredData = data.filter((item) => {
        const nameMatch =
          characterName &&
          item.name.toLowerCase().includes(characterName.toLowerCase());
        const locationMatch =
          location &&
          item.location.name.toLowerCase().includes(location.toLowerCase());
        const statusMatch =
          status === "All"
            ? true
            : item.status.toLowerCase() === status.toLowerCase();
        const genderMatch =
          gender === "All"
            ? true
            : item.gender.toLowerCase() === gender.toLowerCase();
        return (
          (characterName === "" || nameMatch) &&
          (location === "" || locationMatch) &&
          (status === "All" || statusMatch) &&
          (gender === "All" || genderMatch)
        );
      });

      dispatch(dataAction.storeFilterdata(filteredData));
    };

    // Call the filterData function whenever any of the filter criteria changes
    filterData();
  }, [characterName, location, status, gender, data, dispatch]);

  return (
  <>
    <div  className={classes.Filters}>
      <div>
        <input
          type="text"
          placeholder="Search by Name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by ocation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <span>Status</span>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Dead">Dead</option>
          <option value="Alive">Alive</option>
        </select>
      </div>  
      <div>
      <span>Gender</span>

        <select onChange={(e) => setGender(e.target.value)}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
          <div className={classes.menue}>
        {toggel ? <button onClick={(pre)=>setToggel(!toggel)}>Close</button>: <button onClick={(pre)=>setToggel(!toggel)}>Filter</button>}
            </div> 

    <div  className={classes.mobileview_filter} style={{left:toggel ?'0%':"-100%"}}>
      <div>
        <input
          type="text"
          placeholder="Search by Name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by ocation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <span>Status</span>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Dead">Dead</option>
          <option value="Alive">Alive</option>
        </select>
      </div>  
      <div>
      <span>Gender</span>

        <select onChange={(e) => setGender(e.target.value)}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
    </>
  );
}

export default Filters;
