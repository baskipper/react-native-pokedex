import React from 'react';
import {Text, View, Modal} from 'react-native';
import {CardSection} from './CardSection'
import {Button} from './Button';
import {Spinner} from "./Spinner";

const DetailModal = ({visible, children, onAccept, loading}) => {
    const {cardSectionStyle,  containerStyle} = styles;
    return (
        <Modal

            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {
            }}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                        {loading ? <Spinner /> : children}
                </CardSection>
                <CardSection>
                    <Button onPress={onAccept}>
                        OK
                    </Button>
                </CardSection>
            </View>

        </Modal>
    );
};

// justifyContent = vertical. flex-end, center, flex-start, space-between, space-around
// alignItems = horizontal

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export {DetailModal};
