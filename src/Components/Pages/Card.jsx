// eslint-disable-next-line
import React from 'react'


import classes from '../Pages/Card.module.css'

function Card({item}) {
  return (
    
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
      <li>
        <span>Character Type:</span>
        <span>{item.type}</span>
      </li>
    </div>
  </div>
  )
}

export default Card