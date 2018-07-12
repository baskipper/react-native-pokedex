import axios from 'axios'
import {
    POKE_LIST_FETCH_SUCCESS,
    POKEMON_FETCH_SUCCESS,
    CLEAR_CURRENT_POKEMON
} from "./types";

const BASE_URL = "https://pokeapi.co/api/v2/";
const DETAIL_URL = `${BASE_URL}pokemon/`;
const LIST_URL = `${BASE_URL}pokemon?limit=25`;
const EN = 'en';

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
                    result.name = capitalizeName(result.name);
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
    return ((dispatch) => {
        let detailUrl = DETAIL_URL + pokemonId;

        axios.get(detailUrl)
            .then(({data: {id, name, weight, height, genera, species: {url}, sprites: {front_default}}}) => {
                axios.get(url)
                    .then(({data: {flavor_text_entries, genera}}) => {
                        console.log('received pokemen data')
                        console.log(genera);

                        let flavor_text = flavor_text_entries.find((value) => {
                            return (value.language.name === EN && (value.version.name === "blue"));
                        }).flavor_text;
                        flavor_text = flavor_text.replace(/[\n\r\f]/g, ' ');

                        const genus = genera.find((value) => {
                            return (value.language.name === EN)
                        }).genus.split(" ")[0];

                        dispatch({
                            type: POKEMON_FETCH_SUCCESS,
                            payload: {
                                id: formatId(`${id}`),
                                name: capitalizeName(name),
                                weight,
                                height,
                                species: url,
                                sprite: front_default,
                                flavor_text,
                                genus
                            }
                        })
                    })

            })
    })
};

export const clearCurrentPokemon = () => {
    return dispatch =>
        dispatch({
            type: CLEAR_CURRENT_POKEMON
        })
}

const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase().concat(name.substr(1));
}

const formatId = (id) => {
    while (id.length < 3) {
        id = `0${id}`
    }
    return id;
};
