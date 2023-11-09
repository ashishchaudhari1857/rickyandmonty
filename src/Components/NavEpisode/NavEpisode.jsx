import React, { useState, useEffect } from 'react';
import useFetch from '../../Api/useFetch';
import { useParams } from 'react-router-dom';
import { dataAction } from '../../redux/DataSlice';
import { useDispatch } from 'react-redux';
import Pages from '../Pages/Pages';
import classes  from  '../NavEpisode/NavEpisode.module.css'

function NavEpisode() {
  const params = useParams();
  const dispatch=useDispatch();
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEpisode, setEpisode] = useState(params?.id ? params?.id : 1);
  console.log(selectedEpisode);

  const episodeIds = Array.from({ length: 51 }, (_, i) => i + 1);
  const episodeApi = `https://rickandmortyapi.com/api/episode/${selectedEpisode}`;
  const { data: episode } = useFetch('', episodeApi);

  const characterUrls = episode?.characters;
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

      setCharacterData(charactersData);
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

  console.log();
  dispatch(dataAction.storeFilterdata(error? {result:[] ,Totalpage:1}:{result:characterData,Totalpage:Math.ceil(characterData?.length /20)}));
  return (
    <div>
        <div className={classes.episode_filter}>
            <h2>Search  Character By Episode</h2>
        <select onChange={(e) => setEpisode(e.target.value)}>
        {episodeIds.map((value, i) => (
          <option key={i} value={value}>
            Episode {value}
          </option>
        ))}
         </select>
        </div>
     

<Pages  check="episode"></Pages>
    </div>
  );
}

export default NavEpisode;
