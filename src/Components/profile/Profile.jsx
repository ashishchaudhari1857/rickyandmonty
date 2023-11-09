import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../Api/useFetch';
import classes from '../profile/profile.module.css';
import { useDispatch } from 'react-redux';
import { dataAction } from '../../redux/DataSlice';
import EpisodeList from '../episode/EpisodeList';

function Profile() {
  const params = useParams();
  const dispatch =useDispatch();
  const { data, loading, error } = useFetch(`character/${params.id}`);
   
  const obj=data.location;


  const locationdATA= useFetch("" , obj?.url)
  console.log( locationdATA?.data)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return null; 
  }
       
  if( data){
    dispatch(dataAction.episodesdata(data?.episode))
  }


  return (
    <>
    <div className={classes.profile_container}>
      <div className={classes.profile_image}>
        <img src={data.image} alt={data.name} />
      </div>
      <div className={classes.profile_details}>
        <h2>{data.name}</h2>
        <p>
          <span>Status:</span> {data.status}
        </p>
        <p>
          <span>Species:</span> {data.species}
        </p>
        <p>
          <span>Gender:</span> {data.gender}
        </p>
        <p>
          <span>Location:</span> {data.location.name}
        </p>
        <p>
          <span>Origin:</span> {data.origin.name}
        </p>
        <p>
          <span>Type(location):</span> {locationdATA?.data?.type}
        </p>
        <p>
          <span>Dimension:</span> {locationdATA?.data?.dimension}
        </p>
        <p>
          <span>Residents:</span> {locationdATA?.data?.residents?.length}
        </p>
        <p>

          <span>Created:</span> {new Date(data.created).toLocaleString()}
        </p>
        
      </div>

        
    </div>
 
    <EpisodeList></EpisodeList>
    </>
  );
}

export default Profile;
