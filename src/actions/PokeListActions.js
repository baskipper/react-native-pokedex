import axios from 'axios'
import {POKE_LIST_FETCH_SUCCESS, POKEMON_FETCH_SUCCESS} from "./types";

const BASE_URL = "https://pokeapi.co/api/v2/";
const DETAIL_URL = `${BASE_URL}pokemon/`;
const LIST_URL = `${BASE_URL}pokemon?limit=25`;
const SPECIES_URL = `${BASE_URL}pokemon-species/`;

export const pokeListFetch = (dataUrl = LIST_URL) => {
    return (dispatch) => {
        console.log('dispatching')
        axios.get(dataUrl)
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
                    result.id = formatId(id);
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
};

export const pokemonFetch = (pokemonId) => {
    return (dispatch) => {
        let detailUrl = DETAIL_URL + pokemonId;
        let speciesUrl = SPECIES_URL + pokemonId;

        console.log(`Requesting info from ${detailUrl}`)

        axios.get(detailUrl)
            .then(({data: {id, name, weight, height, species: {url}, sprites: {front_default}}}) => {
                axios.get(url)
                    .then(({data: {flavor_text_entries}}) => {
                        const flavor_text_array = flavor_text_entries.filter((value) => {
                            return value.language.name === "en" && (value.version.name === "blue")
                        });
                        let flavor_text = flavor_text_array[0].flavor_text;

                        dispatch({
                            type: POKEMON_FETCH_SUCCESS,
                            payload: {id: formatId(`${id}`), name, weight, height, species: url, sprite: front_default, flavor_text}
                        })
                    })

            })
    }
};

const formatId = (id) => {
    while (id.length < 3) {
        id = `0${id}`
    }
    return id;
};