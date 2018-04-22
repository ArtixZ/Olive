import React, { Component } from 'react';
import { View, Text, Dimensions, Linking } from 'react-native';
import { Rating, Button, Header, Icon } from 'react-native-elements';
import numeral from 'numeral';

import BarChart from './BarChart';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

class FoodDetail extends Component {
    static navigationOptions = {
        header: ({navigation}) => {
            return (<Header
                        outerContainerStyles={styles.headerSty}
                        leftComponent={<Icon 
                                            containerStyle={styles.leftHeaderIconWrapper}                            
                                            name='chevron-left'
                                            type='entypo'
                                            color='#43496A'
                                            onPress={()=>{
                                                routes = navigation.state.routes;
                                                curRoute = routes[routes.length - 1];
                                                navigation.goBack(curRoute.key);
                                            }}
                                        />}
                        centerComponent={{ text: 'Statistics', style: { fontFamily: 'System', color: '#43496A', fontSize: 20 } }} 
                    />)
        }
    };
    constructor(props) {
        super(props);
    }

    onHaveIt = (restaurantDetail) => {
        const { restaurant_id } = restaurantDetail;
        const url = `https://www.ubereats.com/boston/food-delivery/${restaurant_id}`;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        const { navigation } = this.props;
        const { nuritionStatistics: ingredients } = navigation.state.params;
        const { thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, detailContainerSty, foodInfoSty, abstractSty, ingredientSty, actionSty } = styles;
        
        // const { navigation } = this.props;
        // const { foodInfo } = navigation.state.params;
        // const { pic, name, restaurantName, restaurantDetail, highlights, rating, tags, distance, price } = foodInfo;
        return(
            <View style = {detailContainerSty}>
                
                <View style={{flex: 4}} />
                <View style = {ingredientSty}>
                    <BarChart
                        ingredients = {ingredients}
                    />
                </View>

                <View style={{flex: 4}} />
                
            </View>
        )
    }
}

const styles = {
    headerSty: {
        backgroundColor: '#fff',
        position: 'relative'
    },
    leftHeaderIconWrapper: {
        padding: 5, 
        paddingLeft: 5, 
        paddingRight: 5,
        marginBottom: -6,
    },
    detailContainerSty: {
        backgroundColor: '#fff',
        flex: 1
    },
    foodInfoSty: {
        marginLeft: 10,
        marginRight: 10,
        flex: 7,
        flexDirection: 'column'
    },
    ingredientSty: {
        flex: 4,
    },
    abstractSty: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionSty: {
        flex: 1,
        marginBottom: 20,
        justifyContent: 'center',
    },
    thumbnailContainerStyle: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailStyle: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderRadius: 10,
        height: SCREEN_WIDTH*0.7,
        width: SCREEN_WIDTH*0.8
    },
    contentContainerStyle: {
        flex: 2,
        marginLeft:35,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
}

export default FoodDetail;