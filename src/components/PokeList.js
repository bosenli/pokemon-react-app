import { useState, useEffect } from 'react';
import axios from 'axios';
import { CLIENT_URL } from '../services/constants';  //to hide api key we use next line after setting up env file and .gitignore file
//import dotenv from 'dotenv'   // related to line 5, 12 
//dotenv.config()
import Pokemon from '../components/Pokemon';

function PokeList() {

  const [pokemons, setPokemons] = useState([]) //empty array

  //let client_url = process.env.CLIENT_URL

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(CLIENT_URL);
        const { results } = response.data;
        console.log(results)
        setPokemons(results);
          
      } catch (error) {
        console.log(error)
      }

    }
    fetchData();

  }, []) //second paramerter saying render just first time


  return (
    <ul className="container collection with-header" style={{ marginTop: 25 }}>
      {// if there is no data just return [] empty array for debugging purposes
       (pokemons || []).map((pokemon, index) => {
         const { name, url } = pokemon;
         //single responsibility principle - pokemon components, pass property
         return <Pokemon name={name} url={url} key={index} />
        })
      }
      
    </ul>
   
  )
}

export default PokeList;