import React from "react";
import "../styles/navbar.css";
import Logo from "../images/Logo.png"
import { Link } from "react-router-dom";

const Navbar = ({type, logout}) =>{



    return (
    <>
    <nav id='header'>
      <a href="practice.html">
      <img src={Logo} id="logo" alt="KK" width="13%" height="20%"/>
      </a>
      <form class="header-search">
        <input type="text" class="header-searchbox" line-height="1.25rem" placeholder="Search for an exciting event"/>
      </form>
      <button class="btn" id="header-searchbox-btn" type="submit">SEARCH</button>
    </nav>
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    {type === "client"?(
                    <>
                        <li class="nav-item">
                            <Link to = {'/'}><a class="nav-link " aria-current="page" >Home</a></Link>
                        </li>
                        <li class="nav-item">
                            <Link to = {'/client/'}><a class="nav-link" >Zones</a></Link>
                        </li>
                        <li class="nav-item">
                            <Link to = {'/client/zone-register'}><a class="nav-link " aria-current="page" >Zone Register</a></Link>
                        </li>
                        {/* <li class="nav-item">
                            <Link to = {'/client/cam'}><a class="nav-link " aria-current="page" >Cam</a></Link>
                        </li> */}
                        <li class="nav-item">
                            <Link><a class="nav-link" onClick={logout}>Logout</a></Link>
                        </li> 
                    </>
                    ):type === "user"?(
                    <>
                        <li class="nav-item">
                            <Link to = {'/'}><a class="nav-link " aria-current="page" >Home</a></Link>
                        </li>
                        <li class="nav-item">
                            <Link to = {'/user/'}><a class="nav-link" >Locations</a></Link>
                        </li>
                        <li class="nav-item">
                            <Link><a class="nav-link"  onClick={logout}>Logout</a></Link>
                        </li> 
                    </>
                    ):(
                        <>
                            <li class="nav-item">
                                <Link to = {'/'}><a class="nav-link " aria-current="page" >Home</a></Link>
                            </li>
                            <li class="nav-item">
                                <Link to = {'/user-login/login'}><a class="nav-link" >Login</a></Link>
                            </li> 
                        </>
                    )}
                </ul>
                </div>
            </div>
        </nav>
    </>
    );
}

export default Navbar;