import React, { Component } from 'react';
import {
    Dimensions,
    Animated,
    View,
    Text,
} from 'react-native';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        const { ingredients } = props;
        // init ingredients
        Object.keys(ingredients).forEach( ing => {
            this.state[ing] = new Animated.Value(0);
        })
    }

    componentDidMount () {
        const { ingredients } = this.props;
        const width = this.getWidth(ingredients);
        
        Animated.parallel(Object.keys(ingredients).map(item => Animated.timing(
            this.state[item], {toValue: width[item], duration: 500}))).start();
    }

    getWidth (percentages) {
        const deviceWidth = Dimensions.get('window').width
        let widthAry = {};
        Object.keys(percentages).forEach( element => {
            let width = percentages[element]*0.01*deviceWidth*0.5;
            widthAry[element] = width;
        }); 

        return widthAry;
    }
    
    render() {
        const { Calories } = this.state;
        const { ingredients } = this.props;
        return(
            <View style={{flex: 1}}>
                
                {Object.keys(ingredients).map( (ing, i) => 
                    <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{flex: 1}}>{ing}</Text>
                        </View>
                        <View style={{flex: 5, flexDirection: 'row'}}>
                            <Animated.View style={[styles.bar, styles[ing], {width: this.state[ing]}]}/>
                            <Text>{`${ingredients[ing]}%`}</Text>
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
        marginRight: 5
    },
    Calories: {
        backgroundColor: '#F55443'
    },
    Fat: {
        backgroundColor: '#FCBD24'
    }, 
    Sodium: {
        backgroundColor: '#59838B'
    },
    Carbs: {
        backgroundColor: '#4D98E4'
    },
    Sugars: {
        backgroundColor: '#418E50'
    },
    Protein: {
        backgroundColor: '#7B7FEC'
    }
}
export default BarChart;