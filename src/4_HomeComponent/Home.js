import React from 'react';
import axios from 'axios';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {movieList: null};
        if( this.state.movieList === null ){
            this.fetchData();
        }
    }

    fetchData = ()=>{
        axios.get(`http://backendexample.sanbercloud.com/api/movies`)
        .then(res => {
            let rdata = res.data;
            rdata = rdata.sort(function(a,b){
                return b.rating - a.rating;
            });
            this.setState({
                movieList: rdata
            });
        });
    }

    render(){
        return (
            <section>
                <h1>Daftar Film Film Terbaik</h1>
                {
                    this.state.movieList !== null && this.state.movieList.map((el)=>{
                        let durho = Math.floor(el.duration/60);
                        let durmin = el.duration%60;
                        durho = durho === 0 ? "" : durho+= " jam";
                        durmin = durmin === 0 ? "" : durmin+= " menit";
                        return (
                            <div key={el.id}>
                                <h2>{el.title}</h2>
                                <div style={{borderBottom: "1px solid lightgrey"}}>
                                    <b>Rating: {el.rating}</b><br></br>
                                    <b>Durasi: {durho} {durmin}</b><br></br>
                                    <b>genre: {el.genre}</b><br></br>
                                    <p><b>deskripsi: </b> {el.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        )
    }
}

export default Home;
