import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ListView} from 'react-native';
import {connect} from 'react-redux';

import {pokeListFetch, pokemonFetch, clearCurrentPokemon} from "../actions";
import {Card, CardSection, Spinner} from "./common";
import PokemonDetailModal from "./PokemonDetailModal";

class Gen1List extends Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        if (!this.props.dataLoaded) {
            this.props.pokeListFetch();
        }
    }

    openModal(pokemon) {
        this.props.pokemonFetch(parseInt(pokemon.id));
        this.setState({showModal: true})
    }

    closeModal() {
        this.props.clearCurrentPokemon();
        this.setState({showModal: false})
    }

    renderRow(pokemon) {
        const {
            headerTextStyle,
            nameTextStyle,
            headerContentStyle,
            thumbnailStyle,
            thumbnailContainerStyle
        } = styles;
        return (
            <TouchableOpacity onPress={() => this.openModal(pokemon)}>
                <Card key={pokemon.id}>
                    <CardSection>
                        <View style={thumbnailContainerStyle}>
                            <Image
                                source={
                                    {
                                        uri: pokemon.imageUrl
                                    }}
                                style={thumbnailStyle}>
                            </Image>
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}>
                                {pokemon.id}
                            </Text>
                            <Text style={nameTextStyle}>
                                {pokemon.name}
                            </Text>
                        </View>
                    </CardSection>

                </Card>
            </TouchableOpacity>

        )
    }


    render() {

        const {
            dataLoaded,
            pokeListFetch,
            next,
            pokeList,
            currentPokemon
        } = this.props;

        return (
            dataLoaded ?
                <View>
                    <ListView
                        onEndReached={() => {
                           pokeListFetch(next)
                        }}
                        style={{marginBottom: 140}}
                        enableEmptySections
                        dataSource={pokeList}
                        renderRow={this.renderRow}
                    >
                    </ListView>
                    <PokemonDetailModal
                        onAccept={this.closeModal}
                        visible={this.state.showModal}
                        currentPokemon={currentPokemon}
                    />
                </View>
                :
                <Card>
                    <CardSection>
                        <Spinner/>
                    </CardSection>
                </Card>

        )
    }
}

const styles = {
    headerTextStyle: {
        fontWeight: 'bold'
    },
    nameTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
};

const mapStateToProps = (state => {
    const {results, next} = state.pokemonList;
    console.log('state of list');
    console.log(state);
    console.log(state.currentPokemon.stats);
    this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    return {
        currentPokemon: state.currentPokemon,
        pokeList: this.ds.cloneWithRows(results),
        dataLoaded: results.length > 0,
        next
    }
});

export default connect(mapStateToProps, {pokeListFetch, pokemonFetch, clearCurrentPokemon})(Gen1List);
