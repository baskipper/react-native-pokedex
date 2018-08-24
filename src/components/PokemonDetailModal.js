import {Card, CardSection, DetailModal} from "./common";
import {Image, Text, View} from "react-native";
import {VictoryArea, VictoryChart, VictoryGroup, VictoryLabel, VictoryPolarAxis, VictoryTheme} from "victory-native";
import React from "react";

const styles = {
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

        },



    headerTextStyle: {
        fontWeight: 'bold'
    },
    nameTextStyle: {
        fontSize: 18
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    }
};


const PokemonDetailModal = ({currentPokemon, onAccept, visible}) =>{
    const {thumbnailContainerStyle, imageStyle, headerTextStyle, nameStyle, nameTextStyle, entryStyle} = styles;
    return (
        <DetailModal
            onAccept={onAccept}
            visible={visible}
            loading={currentPokemon.loadingPokemon}
        >
            <Card>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            source={
                                {
                                    uri: currentPokemon.sprite,
                                    cache: 'only-if-cached'
                                }}
                            style={imageStyle}>
                        </Image>
                        <Text style={headerTextStyle}>
                            No. {currentPokemon.id}
                        </Text>
                    </View>
                    <View style={nameStyle}>
                        <View>
                            <Text style={nameTextStyle}>
                                {currentPokemon.name}
                            </Text>
                            <Text style={{...nameTextStyle, paddingBottom: 55}}>
                                {currentPokemon.genus}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                HT: {currentPokemon.height / 10}m
                            </Text>
                            <Text>
                                WT: {currentPokemon.weight / 10}KG
                            </Text>
                        </View>
                    </View>
                </CardSection>
                <CardSection>
                    <View>
                        <Text style={entryStyle}>
                            {currentPokemon.flavor_text}
                        </Text>

                        <VictoryChart polar
                                      theme={VictoryTheme.material}
                        >
                            <VictoryGroup colorScale={["gold", "orange", "tomato"]}
                                          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                            >
                                <VictoryArea data={currentPokemon.statMap}/>

                            </VictoryGroup>
                            {
                                Object.keys(currentPokemon.stats).map((key, i) => {

                                    return (
                                        <VictoryPolarAxis key={i} dependentAxis
                                                          style={{
                                                              axisLabel: { padding: 30 },
                                                              axis: { stroke: "none" },
                                                              grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                                                          }}
                                                          tickLabelComponent={
                                                              <VictoryLabel labelPlacement="vertical"/>
                                                          }
                                                          labelPlacement="perpendicular"
                                                          axisValue={i + 1} label={key}
                                                          tickCount={4}
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
    )
}

export default PokemonDetailModal;