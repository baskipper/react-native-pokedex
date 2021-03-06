import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ListView} from 'react-native';
import {connect} from 'react-redux';
import {pokeListFetch, pokemonFetch, clearCurrentPokemon} from "../actions";

import {Card, CardSection, Spinner, DetailModal} from "./common";

class Gen1List extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.openModal = this.openModal.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        console.log(this.props.pokeList);
        if (!this.props.dataLoaded) {
            this.props.pokeListFetch();
        }

    }

    openModal(pokemon) {
        console.log(pokemon);
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
            headerTextStyle,
            nameTextStyle,
            thumbnailContainerStyle
        } = styles;

        const {modalStyles: {imageStyle, entryStyle, nameStyle}} = styles;

        return (
            this.props.dataLoaded ?
                <View>
                    <ListView
                        onEndReached={() => {
                            this.props.pokeListFetch(this.props.next)
                        }}
                        style={{marginBottom: 140}}
                        enableEmptySections
                        dataSource={this.props.pokeList}
                        renderRow={this.renderRow}
                    >
                    </ListView>
                    <DetailModal
                        onAccept={this.closeModal}
                        visible={this.state.showModal}
                        loading={this.props.currentPokemon.loadingPokemon}
                    >
                        <Card>
                            <CardSection>
                                <View style={thumbnailContainerStyle}>
                                    <Image
                                        source={
                                            {
                                                uri: this.props.currentPokemon.sprite,
                                                cache: 'only-if-cached'
                                            }}
                                        style={imageStyle}>
                                    </Image>
                                    <Text style={headerTextStyle}>
                                        No. {this.props.currentPokemon.id}
                                    </Text>
                                </View>
                                <View style={nameStyle}>
                                    <View>
                                        <Text style={nameTextStyle}>
                                            {this.props.currentPokemon.name}
                                        </Text>
                                        <Text style={{...nameTextStyle, paddingBottom:55}}>
                                            {this.props.currentPokemon.genus}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            HT: {this.props.currentPokemon.height / 10}m
                                        </Text>
                                        <Text>
                                            WT: {this.props.currentPokemon.weight / 10}KG
                                        </Text>
                                    </View>
                                </View>
                            </CardSection>
                            <CardSection>
                                <View>
                                    <Text style={entryStyle}>
                                        {this.props.currentPokemon.flavor_text}
                                    </Text>
                                </View>
                            </CardSection>
                        </Card>
                    </DetailModal>
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
    modalStyles: {
        imageStyle: {
            height: 150,
            width: 150
        },
        entryStyle: {
            fontSize: 18
        },
        nameStyle: {
            paddingTop: 40,
            flexDirection: 'column',
            justifyContent: 'space-around'

        }
    },


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
    console.log(state.currentPokemon.flavor_text);
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
