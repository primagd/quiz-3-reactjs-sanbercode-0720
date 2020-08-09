import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ListMovieEditor = ()=>{
    const [movieList,setMovieList] = useState(null);

    const [formName,setFormName] = useState("Submit");
    const [editedId,setEditedId] = useState(null);

    const [inputTitle,setInputTitle] = useState("");
    const [inputDesc,setInputDesc] = useState("");
    const [inputYear,setInputYear] = useState("");
    const [inputDuration,setInputDuration] = useState("");
    const [inputGenre,setInputGenre] = useState("");
    const [inputRating,setInputRating] = useState("");

    const fetchData = ()=>{
        axios.get(`http://backendexample.sanbercloud.com/api/movies`)
        .then(res => {
            setMovieList(res.data)
        });
    }

    useEffect( ()=>{
        if( movieList === null ){
            fetchData();
        }
    } )

    const handleDelete = (e)=>{
        let id = e.target.getAttribute('index');
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${id}`)
        .then(res => {
            if (res.data === "success"){
                let newArr = movieList;
                newArr = newArr.filter(x => x.id !== parseInt(id));
                setMovieList([...newArr]);
            }
        });
    }

    const handleEdit = (e)=>{
        setFormName("edit");
        let idx = e.target.getAttribute('index');
        let res = movieList.find(x => x.id === parseInt(idx));
        if ( res === undefined ) return;
        setEditedId(idx);

        setInputTitle(res.title);
        setInputDesc(res.description);
        setInputYear(res.year);
        setInputDuration(res.duration);
        setInputGenre(res.genre);
        setInputRating(res.rating);
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();

        let title = inputTitle;
        let desc = inputDesc;
        let year = parseInt(inputYear);
        let duration = parseInt(inputDuration);
        let genre = inputGenre;
        let rating = parseInt(inputRating);

        if (title.replace(/\s/g,'') !== "" && desc.replace(/\s/g,'') !== ""
        && genre.replace(/\s/g,'') !== "" && duration > 0 && (rating > 0 && rating < 11) ){      
            if( formName === "Submit" ){
                axios.post(`http://backendexample.sanbercloud.com/api/movies`,{
                    title: title, description: desc, year: year, duration: duration, genre: genre, rating: rating
                })
                .then(res => {
                    setMovieList([...movieList,res.data]);
                });
                setInputTitle("");
                setInputDesc("");
                setInputYear("");
                setInputDuration("");
                setInputGenre("");
                setInputRating("");
            }else{
              //edit form
                if ( editedId === null ) return;
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${editedId}`,{
                    title: inputTitle, description: inputDesc, year: inputYear, duration: inputDuration, genre: inputGenre, rating: inputRating
                })
                .then(res => {
                    console.log(res.data)
                    let newArr = movieList;
                    let idx = movieList.findIndex(x => x.id === parseInt(editedId));
                    newArr[idx] = res.data;
                    setEditedId(null);
                    setMovieList([...newArr]);
  
                });
    
                setFormName("Submit");
                setInputTitle("");
                setInputDesc("");
                setInputYear("");
                setInputDuration("");
                setInputGenre("");
                setInputRating("");
            }
        }
    }

    const handleChange = (e)=>{
        let nam = e.target.name;
        switch( nam ){
            case "title": setInputTitle(e.target.value); break;
            case "description": setInputDesc(e.target.value); break;
            case "year": setInputYear(e.target.value); break;
            case "duration": setInputDuration(e.target.value); break;
            case "genre": setInputGenre(e.target.value); break;
            case "rating": setInputRating(e.target.value); break;
            default: break;
        } 
    }

    return (
        <>
        <h1>Tabel Daftar Film</h1>
        <table border="1" className="table-movie" style={{margin: "auto"}}>
            <thead>
                <tr style={{backgroundColor:"#AAAA"}}>
                    <th style={{padding: "0 50px"}}>Judul</th>
                    <th style={{padding: "0 50px"}}>Deskripsi</th>
                    <th style={{padding: "0 50px"}}>Tahun</th>
                    <th style={{padding: "0 50px"}}>Durasi (menit)</th>
                    <th style={{padding: "0 50px"}}>Genre</th>
                    <th style={{padding: "0 50px"}}>Rating</th>
                    <th style={{padding: "0 50px"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {movieList !== null && movieList.map((el)=> {
                    return (
                        <tr key={el.id}>
                            <td>{el.title}</td>
                            <td>{el.description}</td>
                            <td>{el.year}</td>
                            <td>{el.duration}</td>
                            <td>{el.genre}</td>
                            <td >{el.rating}</td>
                            <td style={{textAlign:"center"}}>
                                <button onClick={handleDelete} index={el.id}>delete</button>
                                <span>  </span>
                                <button onClick={handleEdit} index={el.id}>edit</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {/* Form */}
        <h1 style={{textAlign: 'center'}}>Form Data Film</h1>
        <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
            <table style={{textAlign: 'justify', margin: "auto"}}>
                <tbody >
                    <tr>
                        <td><label>Title:</label></td>
                        <td><input type="text" name="title" value={inputTitle} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label> Description:</label></td>
                        <td><textarea name="description" onChange={handleChange} value={inputDesc} cols="22" rows="5"></textarea></td>
                    </tr>
                    <tr>
                        <td><label>Year:</label></td>
                        <td><input type="number" name="year" value={inputYear} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label>Duration (minute):</label></td>
                        <td><input type="number" name="duration" value={inputDuration} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label>Genre:</label></td>
                        <td><input type="text" name="genre" value={inputGenre} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label>Rating:</label></td>
                        <td><input type="number" name="rating" min="1" max="10" value={inputRating} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <br/><br/>
                        <td><button>{formName}</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
        </>
    )
}

export default ListMovieEditor;
