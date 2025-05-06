import React from "react";
import '../styles/navbar.css'

function Navbar() {

  function handleSignUp() {
    alert("Feature not available yet!");
  }

  return (
    <header>
      <img src="./logo.png" alt="Logo" />
      <a href="#" onClick={handleSignUp}><button>Sign Up...</button></a>
    </header>
  )
}

export default Navbar;