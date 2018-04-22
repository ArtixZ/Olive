import React, { Component } from 'react';
import { View, Text, Dimensions, Linking } from 'react-native';
import { Rating, Button, Header, Icon } from 'react-native-elements';
import numeral from 'numeral';
// import Icon from 'react-native-vector-icons/FontAwesome';

import BarChart from './BarChart';
import SmartImage from './common/SmartImage';

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

    onHaveIt = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        // const ingredients = {Calories: 19, Fat: 22, .Sodium: 31, Carbs: 13, Sugars: 17, Protein: 17}

        const { thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, detailContainerSty, recipeInfoSty, abstractSty, ingredientSty, actionSty } = styles;
        
        const { navigation } = this.props;
        const { recipeInfo } = navigation.state.params;
        let { photos: pic, recipe_name: name, tags, description, nutrition: ingredients, url } = recipeInfo;
        pic = pic[0]
        return(
            <View style = {detailContainerSty}>
                
                <View style = {recipeInfoSty}>
                    <View style={thumbnailContainerStyle}>
                        <SmartImage
                            style={thumbnailStyle}
                            uri={pic}
                        />
                    </View>
                    <View style={contentContainerStyle}>
                        <Text style={{fontWeight: 'bold', fontSize: 17}}>{name}</Text>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text>{restaurantName}</Text>
                        </View> */}
                        {/* <Text style={{color:'grey'}}>{`${numeral(distance).format('0.0')} mi`}</Text> */}
                        {/* <Rating
                            imageSize={20}
                            readonly
                            startingValue={rating}
                        /> */}
                        <Text style={{textAlign:'center'}}>{tags.toString()}</Text>
                    </View>
                    <View style = {abstractSty}>
                        <Text>{description}</Text>
                    </View>
                </View>
                <View style = {ingredientSty}>
                    <BarChart
                        ingredients = {ingredients}
                    />
                </View>

                <View style = {actionSty}>
                    <Button
                        titleStyle={{ fontWeight: "600", fontSize: 20 }}
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            height: 50,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        iconRight
                        backgroundColor={'#43A422'}
                        icon={
                            <Icon
                                name='kitchen'
                                size={20}
                                color='white'
                            />
                        }
                        title='Check it out on Allrecipes.com!' 
                        onPress={()=>this.onHaveIt(url)}
                    />
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
    recipeInfoSty: {
        marginLeft: 10,
        marginRight: 10,
        flex: 5,
        flexDirection: 'column'
    },
    ingredientSty: {
        flex: 5,
    },
    abstractSty: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        flex: 0.8,
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
        // resizeMode: 'cover',
        borderRadius: 10,
        height: SCREEN_WIDTH*0.7,
        width: SCREEN_WIDTH*0.8
    },
    contentContainerStyle: {
        flex: 2,
        marginLeft:35,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
}

export default FoodDetail;