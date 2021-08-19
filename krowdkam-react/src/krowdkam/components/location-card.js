import React, { useState } from "react";
import "../styles/userhome.css";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LocationDetail = ({image, data}) =>{

    const [buttonState,setButttonState] = useState(false);

    const subscribe = ()=>{
        console.log("Subscribing...");
        // console.log("The sending body is: ",body);
        axios.get(`/guser/api/subscription?oid=${data.id}&&uid=2`).then(res=>{
            console.log("Res is : ",res);
            setButttonState(true);
            toast.success(`You have Subscribed to ${data.name}`);

        }).catch(e=>{
            console.log("Error is: ",e);
        })
    }

    return (
        <div class="card my-4 mx-4 shadow p-3 mb-5 bg-white rounded" style={{width: "18rem"}}>

            <img class="card-img-top" src={image} alt="Card image cap"/>
            <div class="card-body">
                <h5 class="card-title">{data.name}</h5>
                {/* <div style = {{height:"10rem"}}> */}
                <p class="card-text" style = {{height:"8rem"}}>{data.description}</p>
                {/* </div> */}
                <Link to={`/user/${data.id}`}>
                    <button class="btn btn-primary" style={{margin:"5px"}}>Details</button>
                </Link>
                <button className={buttonState?"btn btn-success":"btn btn-danger"}  onClick={subscribe}>{buttonState?"Subscribed":"Subscribe"}</button>
                {/* style={{margin:"5px",backgroundColor:"red",borderRadius:"1px solid red"}} */}
            </div>
        </div>
    );
}

export default LocationDetail;