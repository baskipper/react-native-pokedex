import axios from 'axios'
import {POKE_LIST_FETCH_SUCCESS} from "./types";

export const pokeListFetch = () => {
    return(dispatch) => {
        console.log('dispatching')
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=15")
            .then(({data: {results, next}}) => {
                console.log(results);
                console.log('next');
                console.log(next);
                console.log(results[0].url.split('/'));
                results = results.map((result) => {
                    const subStr = result.url.split('/');
                    let id = subStr[subStr.length - 2];
                    result.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                    result.name = result.name.charAt(0).toUpperCase().concat(result.name.substr(1));
                    while(id.length < 3)
                    {
                        id = `0${id}`
                    }
                    result.id = id;
                    return result;
                });
                console.log(results);
                dispatch({
                    type: POKE_LIST_FETCH_SUCCESS,
                    payload: {results, next}
                })
            })
            .catch(err => {
                console.log(`Error: ${err}`)
            })
    }
}