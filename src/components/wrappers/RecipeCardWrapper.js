import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Card, Rating } from 'react-native-elements'
import numeral from 'numeral';
import SmartImage from '../common/SmartImage';

import { CardHorizontal, CardSection } from '../common';


const CardWrapper = ({ thumbnail_image, foodName, tags, suggestion, onCardPress }) => {

    const { cardContainerSty, thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, ratingSty, txtCardContainer } = styles;

    return (
            <Card containerStyle={cardContainerSty} wrapperStyle={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{flex:1, flexDirection: 'row'}} onPress={onCardPress}>
                    <View flex={3} flexDirection={'column'}>
                        <View style={thumbnailContainerStyle}>
                            <SmartImage
                                style={thumbnailStyle}
                                uri={thumbnail_image}
                            />
                        </View>
                        
                    </View>


                    <View flex={2} flexDirection={'column'}>
                        <View style={contentContainerStyle}>
                            <Text style={{fontFamily: 'System', fontWeight: '600', fontSize: 17}}>{foodName}</Text>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
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
                            */}  
                            <Text style={{textAlign:'center', fontStyle: 'italic'}}>{tags.toString()}</Text>
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
        marginTop: 5,
        marginBottom: 5,
        ...Platform.select({
            ios: {
                borderWidth: 1,
                borderRadius: 2,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                shadowColor: 'rgba(32, 33, 36, 0.28)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.28,
                shadowRadius: 6,
                elevation: 1,
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
        margin: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    thumbnailStyle: {
        flex: 1,
        width: null,
        height: null,
        // resizeMode: 'cover',
    },
    thumbnailContainerStyle: {
        flex: 1,
        overflow: 'hidden',     
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
}

export default CardWrapper;