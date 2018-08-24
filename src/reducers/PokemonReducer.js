import {POKEMON_FETCH_SUCCESS, CLEAR_CURRENT_POKEMON} from "../actions/types";

const INITIAL_STATE = {
    id: '',
    name: '',
    weight: '',
    height: '',
    species: '',
    sprite: '',
    flavor_text: '',
    stats: [],
    statMap: [],
    genus: '',
    loadingPokemon: true
};

const parseStats = (stats) => {
    let parsedStats = {};
    stats.map((currentStat, index) => {
        parsedStats[currentStat.stat.name] = currentStat.base_stat;
    });
    return parsedStats;
};

const mapStats = (stats) => {
    const mappedStats = stats.map((currentStat, index) => {
        return {x: currentStat.stat.name, y: currentStat.base_stat}
    })
    return mappedStats;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POKEMON_FETCH_SUCCESS:
            action.payload.statMap = mapStats(action.payload.stats);
            action.payload.stats = parseStats(action.payload.stats);
            return { ...action.payload, loadingPokemon: false};
        case CLEAR_CURRENT_POKEMON:
            return INITIAL_STATE;
        default:
            return state;
    }
}