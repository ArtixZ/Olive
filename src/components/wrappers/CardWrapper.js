import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { Card, Rating } from 'react-native-elements'
import numeral from 'numeral';

import { CardHorizontal, CardSection } from '../common';


const CardWrapper = ({ thumbnail_image, foodName, restaurantName, tags, suggestion, rating, price, highlights, distance, onCardPress }) => {

    const { cardContainerSty, thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, ratingSty, txtCardContainer } = styles;

    return (
            <Card containerStyle={cardContainerSty} wrapperStyle={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{flex:1, flexDirection: 'row'}} onPress={onCardPress}>
                    <View flex={3} flexDirection={'column'}>
                        <View style={thumbnailContainerStyle}>
                            <Image
                                style={thumbnailStyle}
                                source={{uri: thumbnail_image}}
                            />
                        </View>
                        
                    </View>


                    <View flex={2} flexDirection={'column'}>
                        <View style={contentContainerStyle}>
                            <Text style={{fontFamily: 'System', fontSize: 17}}>{foodName}</Text>
                            <Text style={{fontSize: 15}}>{restaurantName}</Text>                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Rating
                                    type='custom'
                                    ratingImage={require('../../assets/pics/rating_dot_grey.png')}
                                    ratingColor='#4B53FF'
                                    ratingBackgroundColor='#979797'
                                    imageSize={12}
                                    readonly
                                    startingValue={rating}
                                    style={ratingSty}
                                />
                                <Text style={{color:'#979797', fontSize: 11}}>{`${numeral(rating).format('0.0')}/5.0`}</Text>
                            </View>
                            <Text style={{color:'#979797', fontSize: 11}}>{`${numeral(distance).format('0.0')} miles`}</Text>                            
                            <Text style={{textAlign:'center'}}>{highlights.toString()}</Text>
                            <Text style={{color:'black'}}>{`$${price}`}</Text>                            
                        </View>
                    </View>
                </TouchableOpacity>
                
            </Card>
    );
};

const styles = {
    cardContainerSty: {
        flex: 1, 
        padding: 0,
        paddingRight: 4,
        marginLeft:5,
        marginRight:5,
        ...Platform.select({
            ios: {
                borderWidth: 1,
                borderRadius: 2,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
                marginTop: 10,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    ratingSty: {

    },
    txtCardContainer: {
        backgroundColor: '#F98324',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 2,
        overflow: 'hidden',
    },
    bkgColor: {
        backgroundColor: '#bfa',
    },
    contentContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    thumbnailStyle: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    thumbnailContainerStyle: {
        flex: 1,
        overflow: 'hidden',     
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
}

export default CardWrapper;