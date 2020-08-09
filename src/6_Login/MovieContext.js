import React, { useState, createContext } from 'react';


export const MovieContext = createContext();

export const MovieProvider = props =>{
  const [currentLogin,setLogin] = useState(null);

  return (
    <MovieContext.Provider value={[currentLogin,setLogin]}>
        {props.children}
    </MovieContext.Provider>
  )
}
