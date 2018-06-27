import {combineReducers} from 'redux';
import ListReducer from './ListReducer';

export default combineReducers({
    pokemonList: ListReducer
})