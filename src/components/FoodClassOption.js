import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Slider } from 'react-native-elements'
import numeral from 'numeral';

import { selectFoodPortion } from '../actions';

class FoodClassOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 0
        }
    }
    onPressOK = () => {
        const { sliderValue } = this.state;
        const { selectFoodPortion } = this.props;
        selectFoodPortion(numeral(numeral(sliderValue).format('0.0')).value());
    }
    
    render() {
        const {option} = this.props;
        return (
            <View>
                <View style={styles.txtContainerSty}>
                    <Text style={styles.textStyle}>
                        {option.food_class}
                    </Text>
                    {
                        option.portion ? 
                        <Text style={styles.portionSubTxtSty}>
                            {option.portion} serving(s)
                        </Text>
                        : null
                    }
                </View>
                {
                    !option.portion ?
                    <View style={styles.sliderContainerSty}>
                        <View style={styles.sliderSty}>
                            <Text style={styles.portionTxtSty}>
                                Portion eaten: {numeral(this.state.sliderValue).format('0.0')} serving(s)
                            </Text>
                            <Slider 
                                trackStyle={styles.trackSty}
                                thumbStyle={styles.thumbSty}
                                minimumTrackTintColor='#9FA8DA'
                                maximumValue={2}
                                value={this.state.sliderValue}
                                onValueChange={(value) => {this.setState({sliderValue: value})}} 
                            />
                        </View>
                        {
                            this.state.sliderValue ? 
                            <TouchableOpacity style={styles.btnContainerSty} onPress={this.onPressOK}>
                                <Text style={styles.btnTextStyle}>OK</Text>
                            </TouchableOpacity>
                            : null
                        }
                        
                    </View>
                    : null
                }
                 
            </View>
        )
    }
}

const styles={
    txtContainerSty: {
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
    portionSubTxtSty: {
        padding: 10,
        alignSelf: 'center',
        color: '#373850',
        fontSize: 16,
    },
    sliderContainerSty: {
        flexDirection: 'row',
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'center' 
    },
    sliderSty: {
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'center',
        padding: 10,
        marginRight: 25,
        marginLeft: 20,
        marginTop: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#52575a',
    },
    portionTxtSty: {
        alignSelf: 'center',
        color: '#373850',
        fontSize: 16,
    },
    trackSty: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
    },
    thumbSty: {
        marginTop: 3,
        width: 10,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#303F9F',
    },

    btnContainerSty: {
        padding: 7,
        marginLeft: -15,
        marginRight: 25,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        justifyContent: 'center',
    },
    btnTextStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 20,
        fontWeight: '600',
        padding:10,
    }
}

export default connect(null, { selectFoodPortion })(FoodClassOption);

