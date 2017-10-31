import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
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
                                            name='chevron-left'
                                            type='entypo'
                                            color='#43496A'
                                            onPress={()=>{
                                                routes = navigation.state.routes;
                                                curRoute = routes[routes.length - 1]
                                                navigation.goBack(curRoute.key)
                                            }}
                                        />}
                        centerComponent={{ text: 'Food Profile', style: { fontFamily: 'System', color: '#43496A', fontSize: 20 } }} 
                    />)
        }
    };
    constructor(props) {
        super(props);
    }
    render() {
        const ingredients = {Calories: 19, Fat: 22, Sodium: 31, Carbs: 13, Sugars: 17, Protein: 17}

        const { thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, detailContainerSty, foodInfoSty, abstractSty, ingredientSty, actionSty } = styles;
        
        const { navigation } = this.props;
        const { foodInfo } = navigation.state.params;
        const { pic, name, restaurantName, highlights, rating, tags, distance, price } = foodInfo;
        return(
            <View style = {detailContainerSty}>
                
                <View style = {foodInfoSty}>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={thumbnailStyle}
                            source={{uri: pic}}
                        />
                    </View>
                    <View style={contentContainerStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{fontWeight:'bold'}}>{restaurantName}</Text>
                        </View>
                        <Text style={{color:'grey'}}>{`${numeral(distance).format('0.0')} mi`}</Text>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={rating}
                        />
                        <Text style={{textAlign:'center'}}>{highlights.toString()}</Text>
                    </View>
                    <View style = {abstractSty}>
                        <Text>This is a bowl of lively salad of grilled chicken. </Text>
                    </View>
                </View>
                <View style = {ingredientSty}>
                    <BarChart
                        ingredients = {ingredients}
                    />
                </View>

                <View style = {actionSty}>
                    <Button
                        large
                        iconRight
                        backgroundColor={'#42A5F5'}
                        icon={{name: 'local-cafe'}}
                        title='HAVE IT' />
                </View>
            </View>
        )
    }
}

const styles = {
    headerSty: {
        backgroundColor: '#fff',
        position: 'relative'
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