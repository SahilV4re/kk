import React,{useEffect, useState}  from "react";
import Imagica from "../images/imagica.jpg";
import "../styles/userlocation.css";
import "../styles/graph.css";
import axios from "axios";
import Graph from "../components/graph-div";
import ZoneName from "../components/zone-name";
import UserLocation from "./user-location";
import "../styles/userhome.css";
import LocationDetail from "../components/location-card";
import ZoneDetail from "../components/zoneDetail";

const ClientHome = ({organization}) =>{
    let id = organization.id;
    const [zones, setZones] = useState([{
        name:"Gold-Rush",
        description:"RollerCoaster",
        id:"3"
    }])


    useEffect(()=>{
        console.log("Heyy",localStorage.getItem('krowdkam-access'));
        const token = localStorage.getItem('krowdkam-access');
        // axios.get(`/getzones/${id}/`,{ headers: {"Authorization" : `Bearer ${token}`}})
        // .then(res=>{
        //     console.log("Response is: ",res);
        //     setZones(zones);

        // })
    },[id])
    
    return (
        <>
        <span id="cont-client">
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,0.5fr)"}}>
                {zones.map(zone=>{
                    return (
                        <ZoneDetail data={zone}/>
                    )
                })}
                {/* <ZoneDetail image={Imagica} data={{name:"Gold-rush",description:"Heyy"}}/>
                <ZoneDetail image={Imagica} data={{name:"Gold-rush",description:"Heyy"}}/>
                <ZoneDetail image={Imagica} data={{name:"Gold-rush",description:"Heyy"}}/>
                <ZoneDetail image={Imagica} data={{name:"Gold-rush",description:"Heyy"}}/> */}

            </div>
        </span>
            {/* <div id="rides">
                <div className="ride-image">
                    <div>
                        <img class="map" src={Imagica} alt="Imagica map"/>
                    </div>
                </div>
                <div className="main-grid-userlocation">
                    {list}
                </div>
            </div>
            {graphDetails?(
                <>
                    <Graph graphDetails={graphDetails}/>
                </>
            ):(
                <>
                </>
            )}
            <div style={{padding:'100rem'}}>
            </div> */}

        </>
    )

}

export default ClientHome