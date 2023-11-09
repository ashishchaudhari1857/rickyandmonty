import React from 'react'
import { Link } from 'react-router-dom';
import  classes from  '../Navigation/Navbar.module.css'
function Navbar() {
  return (
    <nav className={classes.navbar}>
    <ul className={classes.nav_list}>
      <li className={classes.nav_item}>
        <Link to="/characters">Characters</Link>
      </li>
      <li  className={classes.nav_item}>
        <Link to="/locations">Locations</Link>
      </li>
      <li  className={classes.nav_item}>
        <Link to="/episode/1">Episodes</Link>
      </li>
    </ul>
  </nav>
);
  
}

export default Navbar