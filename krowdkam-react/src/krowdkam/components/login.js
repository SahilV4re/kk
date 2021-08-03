import React ,{useEffect, useState} from "react";
import axios from "axios";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Login = ({type, typeHandler}) =>{

    const [userLogin,setUserLogin] = useState({
        username:"",
        password:"",
    })

    const changeHandler = (e) =>{
        console.log("Change is: ",e.target.name,e.target.value);
        // const state = userRegister;
        // state[e.target.name] = e.target.value;
        setUserLogin(inputs => ({...inputs, [e.target.name]: e.target.value}));
    }
    
    const submitHandler = (e) =>{
        e.preventDefault();
        console.log("User states are: ",userLogin);
        axios.post('/login/',userLogin)
        .then(res=>{
            console.log("Response is: ",res);
            if(res.data.access){
                console.log("Data is: ",res.data.access);
                localStorage.setItem('krowdkam-access',res.data.access);
                localStorage.setItem('krowdkam-refresh',res.data.refresh);
                if(type == "USER"){
                    window.location.href="http://localhost:3000/user";
                    localStorage.setItem('krowdkam-account-type',"user");
                    typeHandler("user");
                }
                else{
                    localStorage.setItem('krowdkam-account-type',"client");
                    window.location.href="http://localhost:3000/client";
                    typeHandler("client");
                }
            }

        }).catch(e=>{
            console.log("Error is: ",e)
        })
    }

    return (
        <span class="cont" >
                <div id="cont-header" >
                {type} LOGIN!
                </div>
                <form onSubmit={submitHandler}> 
                            {/* <Login/> */}
                <div class="inp-grp-ysb" id="name" style={{left:'1.8rem'}}>
                    <input type="text" onChange={changeHandler} name="username" value = {userLogin.username} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Username</label>
                </div>
                
                <div class="inp-grp-ysb" style={{left:'1.8rem'}}>
                    <input type="password" onChange={changeHandler}  name="password" value = {userLogin.password} required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password</label>
                </div>
                    <button  class="btn btn-success btn-register ">Success</button>
                </form>
                <span style={{color:"white",transform:'translate(-10px,0px)'}}>Don't have an account? <Link to={type==="USER"?'/user-login/signup':'/client-login/signup'}>Click Here</Link> to SignUp</span><br/>
                <span style={{color:"white",transform:'translate(-10px,0px)'}}>Are you a {type==="USER"?'client':'user'}? <a href={type==="USER"?'/client-login/login':'/user-login/login'}>Click Here</a> to Login</span>
        </span>
    );
}

export default Login;