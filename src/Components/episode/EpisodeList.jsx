import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes  from '../episode/EpisodeList.module.css'
function EpisodeList() {
  const episodes = useSelector((state) => state.data.episodes);
  console.log("ep"  ,episodes)

  const [episodeData, setEpisodeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataForEpisodes = async () => {
    try {
      const episodeData = await Promise.all(
        episodes.map(async (episodeUrl) => {
          const response = await fetch(episodeUrl);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data = await response.json();
          return data;
        })
      );

      setEpisodeData(episodeData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDataForEpisodes();
  }, [episodes]);
  
  console.log( "",episodeData)

  return (
    <div className={classes.episode_container}> 
     {episodeData.map((episode, index) => (
  <div key={index} className={classes.episode_card}>
    <h2>{episode.name}</h2>
    <p>Air Date: {episode.air_date}</p>
    <p>Episode: {episode.episode}</p>
    <div className="characters">
      <p>Characters:</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
         
        </ul>
      )}
    </div>
  </div>
))}

    </div>
  );
}

export default EpisodeList;
