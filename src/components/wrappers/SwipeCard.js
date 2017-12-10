import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    Platform
} from 'react-native';
import Swiper from 'react-native-swiper';

import CardWrapper from './CardWrapper';
import { photoURL } from '../../actions/urls';

const { width } = Dimensions.get('window');
// const loading = require('./img/loading.gif');


// const Slide = (props) => {
//     return (<View style={styles.slide}>
//         <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{ uri: props.uri }} />
//         {
//             !props.loaded && <View style={styles.loadingView}>
//                 <Image style={styles.loadingImage} source={loading} />
//             </View>
//         }
//     </View>
        
//   )
// }

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onCardPress(card) {
        const {navigation} = this.props;
        navigation.navigate('foodDetail', {foodInfo: card});
    }

    render() {
        const {cards} = this.props;

        return (
            <View>
                <Swiper
                    removeClippedSubviews={false}
                    showsPagination={false}
                    containerStyle={styles.wrapper}
                    bounces
                    autoplay
                    autoplayTimeout={30}
                    height={170}
                    loop={false}
                >
                    {
                        cards.map((card, i) => {
                            let { image_uri: pic, food_name: name, restaurant_detail: restaurantDetail, restaurant_detail:{restaurant_name: restaurantName, restaurant_cuisine: highlights}, tags, distance = 3, suggestion, food_rating: rating, price = 12 } = card;
                            pic = `${photoURL}/${pic}`;
                            return (<CardWrapper
                                        key={i}
                                        thumbnail_image={pic}
                                        foodName={name}
                                        restaurantName={restaurantName}
                                        distance={distance}
                                        highlights={highlights}
                                        tags={tags}
                                        suggestion={suggestion}
                                        rating={rating}
                                        price={price}
                                        onCardPress={this.onCardPress.bind(this, { pic, name, restaurantDetail, restaurantName, highlights, tags, distance, suggestion, rating, price })}
                                    />)
                            })
                    }
                </Swiper>
            </View>
        )
    }
}

const styles = {
    wrapper: {
        marginBottom: 3,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 3, width: 2 },
                shadowOpacity: 3,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    // slide: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: 'transparent'
    // },
    // image: {
    //     width,
    //     flex: 1,
    //     backgroundColor: 'transparent'
    // },

    // loadingView: {
    //     position: 'absolute',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     bottom: 0,
    //     backgroundColor: 'rgba(0,0,0,.5)'
    // },

    // loadingImage: {
    //     width: 60,
    //     height: 60
    // }
}
