import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ListView} from 'react-native';
import {connect} from 'react-redux';
import {pokeListFetch, pokemonFetch, clearCurrentPokemon} from "../actions";

import {Card, CardSection, Spinner, DetailModal} from "./common";

import {VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel} from "victory-native";


const characterData = [
    {strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50},
    {strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90},
    {strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 60}
];


class Gen1List extends Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            data: this.processData(characterData),
            maxima: this.getMaxima(characterData),
            showModal: false
        };
    }

    getMaxima(data) {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
            memo[key] = data.map((d) => d[key]);
            return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
            memo[key] = Math.max(...groupedData[key]);
            return memo;
        }, {});
    }

    processData(data) {
        const maxByGroup = this.getMaxima(data);
        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return {x: key, y: d[key] / maxByGroup[key]};
            });
        };
        return data.map((datum) => makeDataArray(datum));
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
                                        <Text style={{...nameTextStyle, paddingBottom: 55}}>
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

                                    <VictoryChart polar
                                                  theme={VictoryTheme.material}
                                                  domain={{ y: [ 0, 1 ] }}
                                    >
                                        <VictoryGroup colorScale={["gold", "orange", "tomato"]}
                                                      style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                                        >
                                            {this.state.data.map((data, i) => {
                                                return <VictoryArea key={i} data={data}/>;
                                            })}
                                        </VictoryGroup>
                                        {
                                            Object.keys(this.state.maxima).map((key, i) => {
                                                return (
                                                    <VictoryPolarAxis key={i} dependentAxis
                                                                      style={{
                                                                          axisLabel: { padding: 10 },
                                                                          axis: { stroke: "none" },
                                                                          grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                                                                      }}
                                                                      tickLabelComponent={
                                                                          <VictoryLabel labelPlacement="vertical"/>
                                                                      }
                                                                      labelPlacement="perpendicular"
                                                                      axisValue={i + 1} label={key}
                                                                      tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                                                                      tickValues={[0.25, 0.5, 0.75]}
                                                    />
                                                );
                                            })
                                        }
                                        <VictoryPolarAxis
                                            labelPlacement="parallel"
                                            tickFormat={() => ""}
                                            style={{
                                                axis: { stroke: "none" },
                                                grid: { stroke: "grey", opacity: 0.5 }
                                            }}
                                        />

                                    </VictoryChart>
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
