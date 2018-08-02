import {combineReducers} from 'redux';
import ListReducer from './ListReducer';
import PokemonReducer from "./PokemonReducer";

export default combineReducers({
    pokemonList: ListReducer,
    currentPokemon: PokemonReducer
})