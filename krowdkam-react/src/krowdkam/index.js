import React ,{useEffect,useState} from "react";
import axios from "axios";
import { Route, Switch, BrowserRouter as Router,useHistory  } from "react-router-dom";
import UserLogin from "./pages/user-login";
import ClientLogin from "./pages/client-login";
import Navbar from "./components/Navbar";
import UserHome from "./pages/user-home";
import UserLocation from "./pages/user-location";
import ClientHome from "./pages/client-home";
import ClientZoneReg from "./pages/client-zone-register";
import ClientCam from "./pages/client-cam";
import Home from './pages/home';




const Krowdkam = ()=>{

    // const [locations, setLocations] = useState([]);
//   let history = useHistory();
//     console.log("The test is: ",history);

    // useEffect(()=>{

    //     axios.get('/guser/api/location_carousel')
    //     .then(res=>{
    //         console.log("Locations: ",res);
    //         setLocations(res.data);
    //     })


    // },[]);
    const [organization,setOrganization] = useState({
        address: "Khopoli, Navi Mumbai",
        created_at: "2021-07-11T08:05:06.297414Z",
        description: "Imagicaa is a 130-acre theme park in Khopoli, India. It is owned by Imagicaaworld Entertainment Ltd.",
        id: 1,
        lat: "21.000000",
        logo: "/imagica.jpg",
        long: "21.000000",
        map: "/Img_map_1.jpg",
        name: "Imagica",
        password: "orgi@123",
        password2: "orgi@123",
        status: 1,
        updated_at: "2021-07-11T08:05:06.297414Z",
    })

    const[type, setType] = useState("");

    useEffect(()=>{
        if(localStorage.getItem('krowdkam-access')){
            setType(localStorage.getItem('krowdkam-account-type'))
        }
    })

    const Logout = () =>{
        console.log("Yes button clicked");
        localStorage.setItem('krowdkam-access',null);
        localStorage.setItem('krowdkam-account-type',"");
        setType("");
        window.location.href = "http://localhost:3000";
    }


    const typeHandler = (value)=>{
        console.log("Hey type is: ",value);
        setType(value);
    }

    return (
        <>
        <Router>
            <Switch>
            <Route  path="/user-login/">
                    <Navbar type={type} logout={Logout}/>
                    <UserLogin typeHandler={typeHandler}/>
                </Route>
            <Route exact path="/">
                    <Navbar type={type} logout={Logout}/>
                    <Home/>
                </Route>
                
                <Route  path="/client-login/">
                    <Navbar type={type} logout={Logout}/>
                    <ClientLogin typeHandler={typeHandler}/>
                </Route>
                <Route exact path="/client/">
                    <Navbar type={type} logout={Logout}/>
                    <ClientHome organization = {organization}/>
                </Route>
                <Route exact path="/client/zone-register">
                    <Navbar type={type} logout={Logout}/>
                    <ClientZoneReg organization = {organization} />
                </Route>
                <Route exact path="/client/cam/:zoneId">
                    <Navbar type={type} logout={Logout}/>
                    <ClientCam organization = {organization}/>
                </Route>
                <Route exact path="/user">
                    <Navbar type={type} logout={Logout}/>
                    <UserHome organization = {organization}/>
                </Route>
                <Route exact path="/user/:id">
                    <Navbar type={type} logout={Logout}/>
                    <UserLocation organization = {organization}/>
                </Route>
            </Switch>
        </Router>
        </>
    );
}

export default Krowdkam;