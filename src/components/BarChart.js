import React, { Component } from 'react';
import {
    Dimensions,
    Animated,
    View,
    Text,
} from 'react-native';
import numeral from 'numeral';
import { standardNutrition } from './_data';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        const { ingredients } = props;
        // init ingredients
        Object.keys(standardNutrition).forEach( ing => {
            this.state[ing] = new Animated.Value(0);
        })
    }

    componentDidMount () {
        const { ingredients } = this.props;
        const percentage = {};
        for(let item in standardNutrition) {
            percentage[item] = ingredients[item.toLowerCase()] / standardNutrition[item];
        }
        const width = this.getWidth(percentage);
        
        Animated.parallel(Object.keys(standardNutrition).map(item => Animated.timing(
            this.state[item], {toValue: width[item], duration: 500}))).start();
    }

    getWidth (percentages) {
        const deviceWidth = Dimensions.get('window').width;
        let widthAry = {};
        Object.keys(percentages).forEach( element => {
            let width = percentages[element] * deviceWidth * 0.5;
            if (percentages[element] > 1) width = deviceWidth * 0.5;
            widthAry[element] = width;
        }); 

        return widthAry;
    }
    
    render() {
        const { Calories } = this.state;
        const { ingredients } = this.props;
        return(
            <View style={{flex: 1}}>
                
                {Object.keys(standardNutrition).map( (ing, i) => 
                    <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{flex: 1}}>{ing}</Text>
                        </View>
                        <View style={{flex: 5, flexDirection: 'row'}}>
                            <Animated.View style={[styles.bar, styles[ing], {width: this.state[ing]}]}/>
                            <Text>{`${numeral(ingredients[ing.toLowerCase()]/standardNutrition[ing] * 100).format('0.0')}%`}</Text>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}
const styles = {
    bar: {
        alignSelf: 'flex-start',
        borderRadius: 5,
        height: 10,
        marginRight: 5,
        marginTop: 4,
    },
    Calories: {
        backgroundColor: '#F55443'
    },
    Fat: {
        backgroundColor: '#0D47A1'
    }, 
    Fiber: {
        backgroundColor: '#FCBD24'        
    },
    Sodium: {
        backgroundColor: '#59838B'
    },
    Carbohydrate: {
        backgroundColor: '#4D98E4'
    },
    Sugars: {
        backgroundColor: '#418E50'
    },
    Saturated: {
        backgroundColor: '#039BE5'
    },
    Protein: {
        backgroundColor: '#7B7FEC'
    }
}
export default BarChart;