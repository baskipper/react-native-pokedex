import {POKEMON_FETCH_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
    id: '',
    name: '',
    weight: '',
    height: '',
    species: '',
    sprite: '',
    flavor_text: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POKEMON_FETCH_SUCCESS:
            console.log('currrent pokemon');
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}