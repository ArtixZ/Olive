import React, { Component } from 'react';
import { Card, CheckBox } from 'react-native-elements';
import {
    View,
    Text,
    Image,
    Platform,
    FlatList
} from 'react-native';
// import * as Progress from 'react-native-progress';
import { FileSystem } from 'expo';

class FoodClassCard extends Component {
    constructor(props) {
        super(props);
        props.foodClass[0]['checked'] = true;
        this.state = {
            foodClasses: props.foodClass,
        };
    }

    onPressBtn = (index) => {
        const { foodClasses } = this.state;
        foodClasses.forEach( (item, i) => {
            if(i === index) {
                item.checked = true;
            }else {
                item.checked = false;
            }
        })
        this.setState({foodClasses: [...foodClasses]});
    }

    renderBtn = ({item, index: i}) => {
        return (
            <CheckBox
                center
                title={item.food_class}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!!item.checked}
                onIconPress={() => this.onPressBtn(i)}
                onPress={() => this.onPressBtn(i)}
                checkedColor='#5C6BC0'
            />
        )
    }

    render() {
        const { cardWrapperSty, imgContainer, imgSty, contentSty } = styles;
        const { picURI, picBase64 } = this.props;
        return (
            <Card containerStyle={cardWrapperSty} wrapperStyle={{ flex: 1, flexDirection: 'column' }}>
                <View style={imgContainer}>
                    <Image
                        style={imgSty}
                        uri= {picURI}
                    />
                </View>
                <FlatList 
                    keyExtractor={(item, index) => index}                
                    style={contentSty}
                    horizontal
                    data={this.state.foodClasses}
                    renderItem={this.renderBtn}
                />
            </Card>
        )
    }
}

const styles = {
    cardWrapperSty: {
        height: 300,
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
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
                marginTop: 10,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    imgContainer: {
        flex: 4
    },
    imgSty: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    contentSty: {
        flex: 1,
        flexDirection: 'row'
    }
}

export default FoodClassCard;