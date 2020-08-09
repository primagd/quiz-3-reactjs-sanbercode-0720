import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import logo from '../Tugas2/public/img/logo.png';
import { MovieContext } from './MovieContext';


const Header = ()=>{
    const [currentLogin,setLogin] = useContext(MovieContext);

    const handleLogout = ()=>{
        setLogin(null);
    }

    let loginButton = "";
    let editorButton = "";
    if( currentLogin === null ){
        editorButton = "";
        loginButton = <li><Link to="/login">Login</Link></li>;
    }else{
        loginButton = <li><a href="/" onClick={handleLogout}>Logout</a></li>;
        editorButton = <li><Link to="/movie-list-editor">Movie List Editor</Link></li>;
    }

    return (
        <>
        <header>
            <img id="logo" src={logo} width="200px" alt="logo"></img>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {editorButton}
                    {loginButton}
                </ul>
            </nav>
        </header>
        </>
    )
}

export default Header;
