import React from "react";
import "../styles/userhome.css";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";

const ZoneDetail = ({image, data}) =>{
    return (
        <div class="card my-4 mx-4 shadow p-3 mb-5 bg-white rounded" style={{width: "18rem"}}>
            <img class="card-img-top" src={image} alt="Card image cap"/>
            <div class="card-body">
                <h5 class="card-title">{data.name}</h5>
                {/* <div style = {{height:"10rem"}}> */}
                <p class="card-text" style = {{height:"8rem"}}>{data.description}</p>
                {/* </div> */}
                <Link to={`/client/cam/${data.id}`}>
                    <button class="btn btn-primary">Upload</button>
                </Link>
            </div>
        </div>
    );
}

export default ZoneDetail;