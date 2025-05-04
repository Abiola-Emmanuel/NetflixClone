import React from "react";
import '../styles/navbar.css'

function Navbar() {
  return (
    <header>
      <img src="./logo.png" alt="Logo" />
      <a href="/search"><button>Search...</button></a>
    </header>
  )
}

export default Navbar;