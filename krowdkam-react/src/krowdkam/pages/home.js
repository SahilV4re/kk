import React from "react";
import "../styles/home.css";
import Card1 from "../images/abt_bg.jpg";
import Card2 from "../images/carmd2_bg.jfif";

const Home = ()=>{
    return (
        <>
        <div class="carmd">
    <div id="carmd-suptitle">WHAT'S IN IT FOR YOU</div>
    <div id="carmd-title">AI BASED CROWD MANAGEMENT</div>
    <div id="carmd1_cont">A centralised system for automatic detection of crowds allows <br/> registered organizations to make
      efficient plans for crowd <br/> management as
      well as plan infrastructure according to the <br/> crowd flow.   
    </div>
    <img id="carmd1_img" src={Card1} alt="carmd-1"/>
</div>
<div class="carmd carmd2">
    <span id="carmd2_cont">
    <div id="carmd-suptitle">WHAT'S IN IT FOR YOU</div>
    <div id="carmd-title">HAPPY CUSTOMERS</div>
    <div id="carmd1_cont">A real-time feature enables you to plan your trips to various <br/> supermarkets, tourist attractions, public places and many more <br/> with live and accurate crowd updates to help you avoid long <br/> queues and have a hassle free trip! </div>
</span>
<img id="carmd2_img" src={Card2} alt="carmd-1"/>
</div>
<div class="carmd offer row">
    <span class="col1">CLIENT <br/> <span class="col1-data">Peroidic Detailed Crowd Analysis & Reports.</span> </span>
    <span class="col2">USER <br/> <span class="col2-data"> Hassle Free Life with KrowdKam </span> </span>
    <span class="col3">EVERYONE <br/> <span class="col3-data">Real time & Accurate crowd updates.</span> </span>
</div>
<div style={{padding:'80px'}}></div>
</>

    )
}

export default Home;