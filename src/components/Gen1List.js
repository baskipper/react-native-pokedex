import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ListView} from 'react-native';
import {connect} from 'react-redux';
import {pokeListFetch, pokemonFetch} from "../actions";

import {Card, CardSection, Spinner, Confirm} from "./common";

class Gen1List extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false}
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        console.log(this.props.pokeList)
        if (!this.props.dataLoaded) {
            this.props.pokeListFetch();
        }

    }

    render() {
        return (
            this.props.dataLoaded ?
                <View>
                    <ListView
                        onEndReached={() => {
                            this.props.pokeListFetch(this.props.next)
                        }}
                        style={{marginBottom: 80}}
                        enableEmptySections
                        dataSource={this.props.pokeList}
                        renderRow={this.renderRow.bind(this)}
                    >
                    </ListView>
                    <Confirm
                        onAccept={null}
                        onDecline={null}
                        visible={this.state.showModal}
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

    openModal(pokemon) {
        console.log(pokemon)
        this.props.pokemonFetch(parseInt(pokemon.id));
        this.setState({showModal: true})
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
                                        uri: pokemon.imageUrl,
                                        cache: 'only-if-cached'
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
    console.log(state.pokemonList)
    this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    return {
        pokeList: this.ds.cloneWithRows(results),
        dataLoaded: results.length > 0,
        next
    }
});

export default connect(mapStateToProps, {pokeListFetch, pokemonFetch})(Gen1List);
