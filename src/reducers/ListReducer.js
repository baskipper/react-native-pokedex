import {POKE_LIST_FETCH_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
    results: [],
    next: ''
};

export default (state = INITIAL_STATE, action ) => {
    switch(action.type){
        case POKE_LIST_FETCH_SUCCESS:
            return {
                ...state,
                results: [...state.results, ...action.payload.results],
                next: action.payload.next
            }
        default:
            return state;
    }
}