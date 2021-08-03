import axios from "axios";
import React , {useEffect, useState}from "react";
import { Route, Switch, Link, BrowserRouter as Router, useHistory } from "react-router-dom";
import "../styles/navbar.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Signup = ({type}) =>{
    let histroy = useHistory();
    const [userRegister,setUserRegister] = useState({
        username:"",
        password:"",
        password2:"",
        email:"",
        age:22,
        mobile:"",
        gender:"male",
        country_code:"",
        organization:"",
    })
    const [orgiOptions, setOrgiOptions] = useState([{
        name:"Imagica",
        id:"1"
    }]);

    const changeHandler = (e) =>{
        console.log("Change is: ",e.target.name,e.target.value);
        // const state = userRegister;
        // state[e.target.name] = e.target.value;
        setUserRegister(inputs => ({...inputs, [e.target.name]: e.target.value}));
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log("User states are: ",userRegister);
        const body = userRegister;
        body["age"] = Number(userRegister["age"]);
        console.log("Body is: ",body);
        axios.post('/register/',body)
        .then(res=>{
            console.log("Response is: ",res);
            if(res.data.username){
                localStorage.setItem('krowdkam',JSON.stringify(res.data));
                window.location.href="http://localhost:3000/user-login/login";
            }

        }).catch(e=>{
            console.log("Error is: ",e)
        })
    }

    useEffect(()=>{
        // if(JSON.parse(localStorage.getItem('krowdkam')))
        //     window.location.href="http://localhost:3000/user";
        // axios.get('/getAllOrgnizations')
        // .then(res=>{
        //     console.log("Res is: ",res);
        //     setOrgiOptions(res.organization);
            
        // })
    },[])

    let orgiList = orgiOptions.map(orgis=>{
        return <option value={orgis.id}>{orgis.name}</option>
    })

    return (
        <span class="cont" style={{top:'20%'}} >
            <div id="cont-header">
            {type} REGISTER!
            </div>
            <form onSubmit={submitHandler}>
                <div class="inp-grp-ysb-signup" id="name">
                    <input type="text" onChange={changeHandler} name="username" value = {userRegister.username} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Username</label>
                </div>
                <div class="inp-grp-ysb-signup">
                    <input type="email" onChange={changeHandler}  name="email" value={userRegister.email} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>email</label>
                </div>
                {/* <div class="inp-grp-ysb-signup">
                    <input type="text" onChange={changeHandler}  name="mobile" value={userRegister.mobile} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>mobile</label>
                </div> */}
                {/* <div class="inp-grp-ysb-signup"> */}
                <PhoneInput
                className="form-input-box"
                international
                countryCallingCodeEditable={false}
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={userRegister.mobile}
                onChange={(value) => {
                setUserRegister(inputs => ({...inputs, ['mobile']: value}));
                // setPhone(value);
                console.log(userRegister);
                }}
                // onChange={changeHandler}
                />
                {/* </div> */}
                <div class="inp-grp-ysb-signup">
                    <input type="password" onChange={changeHandler}  name="password" value = {userRegister.password} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password</label>
                </div>
                <div class="inp-grp-ysb-signup">
                    <input type="password" onChange={changeHandler}  name="password2" value={userRegister.password2} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Confirm Password</label>
                </div>
                {/* <div class="inp-grp-ysb-signup-select">
                    <select id="Orgnization" name="organization" onChange={changeHandler}>
                        <option value="volvo">Volvojjjjjjjj</option>
                        <option value="saab">Saab</option>
                        <option value="vw">VW</option>
                        <option value="audi" selected>Audi</option>
                    </select>
                </div> */}
                <div class="inp-grp-ysb-signup-select">
                    {/* <label>Choose an Orgnization: </label> */}
                    <span style={{color:"white"}}>Orgnization: </span>
                    <select id="Orgnization" name="organization" onChange={changeHandler}>
                        {orgiList}
                    </select>
                </div>
                {/* <div class="inp-grp-ysb-signup">
                    <input type="number" onChange={changeHandler}  name = "age" value={userRegister.age} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>age</label>
                </div>
                <div class="inp-grp-ysb-signup">
                    <input type="text" onChange={changeHandler}  name = "gender" value={userRegister.gender} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>gender</label>
                </div> */}
                {/* <div class="inp-grp-ysb-signup">
                    <input type="text" onChange={changeHandler} name = "country_code" value={userRegister.country_code} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>country_code</label>
                </div> */}
                {/* <div class="inp-grp-ysb-signup">
                    <input type="text" required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Company Email</label>
                </div>
                <div class="inp-grp-ysb-signup">
                    <input type="text" required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Company Name</label>
                </div> */}
                <button class="btn btn-success btn-register " >Submit</button>
                {/* <Link to="/client/signup"><button type="button" class="btn btn-success btn-register ">Login</button></Link> */}
            </form>
            <span style={{color:"white",paddingLeft:'2.6rem'}}><Link to={type==="USER"?'/user-login/login':'/client-login/login'}>Go Back</Link></span>

        </span>
    )

}   

export default Signup;