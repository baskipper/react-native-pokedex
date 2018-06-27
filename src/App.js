import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {View} from 'react-native';
import reducers from './reducers';
import {Header} from "./components/common";
import Gen1List from "./components/Gen1List";


const App = () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
        <View>

            <Header
                headerText='Pokedex G1'
            />
            <Gen1List />
        </View>
        </Provider>
    )
};

export default App;