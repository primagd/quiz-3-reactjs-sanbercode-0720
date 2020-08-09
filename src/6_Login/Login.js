import React, { useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { MovieContext } from './MovieContext';



const Login = ()=>{
    const history = useHistory();
    const [currentLogin,setLogin] = useContext(MovieContext);

    const [loginMessage,setLoginMessage] = useState("");
    const [inputUsername,setInputUsername] = useState("");
    const [inputPassword,setInputPassword] = useState("");

    const handleLogin = (e)=>{
        e.preventDefault();
        if( inputPassword !== "" && inputUsername !== "" ){
            setLogin(inputUsername);
            setInputUsername("");
            setInputPassword("");
            setLoginMessage("");
            history.push("/");
        }else{
            setLoginMessage("username and password cannot be empty");
        }
    }

    const handleChange = (e)=>{
        let nam = e.target.name;
        switch( nam ){
            case "username": setInputUsername(e.target.value); break;
            case "password": setInputPassword(e.target.value); break;
            default: break;
        } 
    }
    
    return (
        <section>
            <form>
                <h1>Login</h1>
                <table style={{margin:"auto"}}>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td><input type="text" name="username" value={inputUsername} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" name="password" value={inputPassword} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button onClick={handleLogin}>Login</button></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style={{color:"red"}}><small>{loginMessage}</small></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </section>
    )
}

export default Login;
