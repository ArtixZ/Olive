import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default FoodClassOption = ({option}) => {
    return (
        <View style={styles.containerSty}>
            <Text style={styles.textStyle}>
                {option.food_class}
            </Text>
        </View>
    )
}

const styles={
    containerSty: {
        padding: 10,
        marginRight: 25,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#52575a',
    },
    textStyle: {
        alignSelf: 'center',
        color: '#373850',
        fontSize: 20,
        fontWeight: '600',
        padding:10,
    },
}