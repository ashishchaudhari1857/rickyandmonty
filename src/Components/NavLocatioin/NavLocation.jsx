import useFetch from "../../Api/useFetch";
import { useParams } from "react-router-dom";
import { dataAction } from "../../redux/DataSlice";
import { useDispatch } from "react-redux";
import Pages from "../Pages/Pages";
import { useState, useEffect } from "react";
import classes from "../NavLocatioin/NavLocation.module.css";

function NavLocation() {
  const params = useParams();
  const dispatch = useDispatch();
  const [locatondata, setLocationdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setLocation] = useState(1);
  const formattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  const episodeIds = Array.from({ length: 121 }, (_, i) => i + 1);
  const episodeApi = `https://rickandmortyapi.com/api/location/${selectedLocation}`;
  const { data: location } = useFetch("", episodeApi);

  const characterUrls = location?.residents;
  const fetchDataForEpisodes = async () => {
    try {
      const charactersData = await Promise.all(
        characterUrls?.map(async (characterUrl) => {
          const response = await fetch(characterUrl);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data = await response.json();
          return data;
        })
      );

      setLocationdata(charactersData);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForEpisodes();
  }, [characterUrls]);

  dispatch(
    dataAction.storeFilterdata(
      error
        ? { result: [], Totalpage: 1 }
        : {
            result: locatondata,
            Totalpage: Math.ceil(locatondata?.length / 20),
          }
    )
  );

  return (
    <>
      <div className={classes.locationContainer}>
        <div className={classes.locationFilter}>
          <h2>Search Character By Location</h2>
          <select onChange={(e) => setLocation(e.target.value)}>
            {episodeIds.map((value, i) => (
              <option key={i} value={value}>
                Location {value}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.locationDetails}>
          <h1> Location:- <span>{location.name}</span></h1>
          <h2>Air Date: {formattedDate(location.created)}</h2>
          <h3>Type: {location.type}</h3>
        </div>
      </div>
      <Pages check="episode" />
    </>
  );
}

export default NavLocation;
