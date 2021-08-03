import axios from "axios";
import React,{useState} from "react";
import { useHistory, useLocation } from "react-router";
import "../styles/zone-reg.css";


const ClientZoneReg = ({organization}) =>{

  let history = useHistory();
  // console.log("The history is: ",histroy);
  const [zoneRegister,setZoneRegister] = useState({
    name:"",
    description:"",
    location:""
  })

  const [cameras,setCameras] = useState([{
    position:"",
    area:0
  }])

  const changeHandler = (e) =>{
    console.log("Change is: ",e.target.name,e.target.value);
    // const state = userRegister;
    // state[e.target.name] = e.target.value;
    setZoneRegister(inputs => ({...inputs, [e.target.name]: e.target.value}));
}

  const cameraChange = (e) =>{
    console.log("The change is: ",e.target.name,e.target.value);
    let newArr = [...cameras]
    newArr[0][e.target.name] = e.target.value

    setCameras(newArr)
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    console.log("Heyyy");
    const body = {
        "organization":"Imagica",
        "name":zoneRegister.name,
        "description":zoneRegister.description,
        "location":zoneRegister.location,
        "cameras":cameras
    }

    console.log("The sending body is: ",body);
    axios.post('/zonepostapi',body)
    .then(res=>{
      console.log("The registered data is:" ,res);
      // eslint-disable-next-line no-restricted-globals
      history.push("/client/");
      // console.log("History is: ",props.history)
    }).catch(e=>{
      console.log("The error is: ",e);
    })

  }




    return (
        <>
        <div id="zone-reg-body">
        <form onSubmit={submitHandler}>
        <span class="cont-reg">
        <div id="cont-header-reg">
          ZONE REGISTRATION
        </div>
        <div class="inp-grp-ysb" id="name">
            <input type="text" name="name" onChange={changeHandler} value={zoneRegister.name} required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Name of Zone</label>
        </div>
        
        <div class="inp-grp-ysb">
            <input type="text" name = "description" onChange={changeHandler} value={zoneRegister.description} required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Description</label>
        </div>
        <div class="inp-grp-ysb">
            <input type="text" name = "location" onChange={changeHandler} value={zoneRegister.location} required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Location</label>
        </div>
    </span>
      <span class="cont-reg cont-reg-2">
        <div id="cont-header-reg">
          CCTV REGISTRATION
        </div>
        <div class="inp-grp-ysb" id="name">
            <input type="text" name = "position" onChange={cameraChange} value={cameras[0]["position"]} required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Position of CCTV</label>
        </div>
        <div class="inp-grp-ysb" id="name">
            <input type="number" name = "area" onChange={cameraChange} value={cameras[0]["area"]} required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Area</label>
        </div>
        {/* <div class="inp-grp-ysb" id="name">
          <input type="file" id="myFile" name="filename" placeholder="Enter CCTV"/>
            <span class="highlight"></span>
            <span class="bar"></span>
        </div> */}
    </span>
    {/* <a href="zone_reg.html">
    <button class="btn-register" type="submit">SUBMIT ZONE</button></a> */}
       <button class="btn-finish" >FINISH</button>
    </form>
 
    </div>
</>
    );

}

export default ClientZoneReg;