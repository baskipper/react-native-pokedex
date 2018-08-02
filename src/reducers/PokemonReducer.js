import {POKEMON_FETCH_SUCCESS, CLEAR_CURRENT_POKEMON} from "../actions/types";

const INITIAL_STATE = {
    id: '',
    name: '',
    weight: '',
    height: '',
    species: '',
    sprite: '',
    flavor_text: '',
    genus: '',
    loadingPokemon: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POKEMON_FETCH_SUCCESS:
            console.log('currrent pokemon');
            console.log(action.payload);
            return { ...action.payload, loadingPokemon: false};
        case CLEAR_CURRENT_POKEMON:
            return INITIAL_STATE;
        default:
            return state;
    }
}