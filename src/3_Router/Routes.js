import React, { useContext } from "react";
import { Switch, Route } from "react-router";
import Home from '../4_HomeComponent/Home'
import About from '../3_AboutComponent/About'
import MovieListEditor from '../5_CRUD/FormMovie';
import Login from '../6_Login/Login';
import { MovieContext } from '../6_Login/MovieContext';

const Routes = () => {
    const [currentLogin] = useContext(MovieContext);
    let movieListRoute = "";
    if( currentLogin !== null ){
        movieListRoute = (
            <Route path="/movie-list-editor">
                <section><MovieListEditor></MovieListEditor></section>
            </Route>
        );
    }

    return (
        <Switch>
            <Route exact path="/">
                <Home></Home>
            </Route>
            <Route path="/tugas2">
                <tugas2></tugas2>
            </Route>
            <Route path="/About">
                <About></About>
            </Route>
            {movieListRoute}
            <Route path="/login">
                <Login></Login>
            </Route>
        </Switch>
    );
};

export default Routes;
