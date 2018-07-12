import React from 'react';
import {Text, View, Modal} from 'react-native';
import {CardSection} from './CardSection'
import {Button} from './Button';
import {Spinner} from "./Spinner";

const DetailModal = ({visible, children, onAccept, loading}) => {
    const {cardSectionStyle, textStyle, containerStyle} = styles;
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

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export {DetailModal};
