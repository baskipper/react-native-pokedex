import React, {Component} from 'react';
import {View, Image, Text, ScrollView, ListView} from 'react-native';
import {connect} from 'react-redux';
import {pokeListFetch} from "../actions";

import {Card, CardSection} from "./common";

class Gen1List extends Component {

    componentDidMount() {
        console.log(this.props.pokeList)
         if (!this.props.dataLoaded) {
            this.props.pokeListFetch();
         }

    }

    componentWillUpdate()
    {
        console.log('updating')
        console.log(this.props.pokeList)


    }

    render(){
        return (
            <ListView
                style={{marginBottom:80}}
                enableEmptySections
                dataSource={this.props.pokeList}
                renderRow={this.renderRow}
            />
        )
    }

    renderRow(pokemon) {
        console.log(this.props && this.props.pokeList)
        const {
            headerTextStyle,
            nameTextStyle,
            headerContentStyle,
            thumbnailStyle,
            thumbnailContainerStyle
        } = styles;
        return (
            <Card key={pokemon.id}>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image

                            source={
                                {uri: pokemon.imageUrl,
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
        )
    }

    renderPokedex() {
        return this.props.pokeList && this.props.pokeList.map(pokemon => {
            const {
                headerTextStyle,
                nameTextStyle,
                headerContentStyle,
                thumbnailStyle,
                thumbnailContainerStyle
            } = styles;
            return (
                <Card key={pokemon.id}>
                    <CardSection>
                        <View style={thumbnailContainerStyle}>
                            <Image
                                source={{uri: pokemon.imageUrl}}
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
            )
        })
    }

    bar() {

        return (
            <ScrollView style={{marginBottom:80}}>
                {this.renderPokedex()}
            </ScrollView>

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
    console.log(state.pokemonList)
    this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    return {
        pokeList: this.ds.cloneWithRows(state.pokemonList),
        dataLoaded: state.pokemonList.length > 0
    }
});

export default connect(mapStateToProps, {pokeListFetch})(Gen1List);