import React  from 'react';
import { View, Image } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { FileSystem } from 'expo';
import { Text, Divider } from 'react-native-elements'

// import CardWrapper from '../wrappers/CardWrapper';
import SwipeCard from '../wrappers/SwipeCard';
import FoodClassCard from '../wrappers/FoodClassCard';
import FoodClassOptions from '../FoodClassOptions';
import FoodClassOption from '../FoodClassOption';
import ReportCard from '../ReportCard';
import { respondTakenImg } from '../../actions/Camera';
import SmartImage from './SmartImage';

const MessageBubble = ({ outOrIn, timestamp, messageId, body, navigation, onResponse }) => {

    const { textStyle, dividerStyle, takenImgSty } = styles;
    const { type } = body;
    const leftOrRight = outOrIn === 'outgoing' ? 'flex-end' : 'flex-start';
    switch (type) {
        case 'txt': 
            let mTop = { marginTop: 0 };
            if(outOrIn === 'outgoing') mTop = { marginTop: 30 };
            return (
                <Text
                    style={{ ...textStyle, alignSelf: leftOrRight, ...mTop }}
                >
                    {body.msg}
                </Text>
            );
        case 'img':
            console.log(type);
        case 'card':
            const { payload } = body;
            return (
                <SwipeCard
                    cards={payload}
                    navigation={navigation}
                />
            );
        case 'divider':
            return <Divider style={dividerStyle} />
        case 'imgRecognition':
            const { picURI, foodClass, picBase64 } = body.payload;
            // FileSystem.readDirectoryAsync(
            //     FileSystem.documentDirectory + 'photos'
            // )
            return (
                <FoodClassCard 
                    picURI = {picURI}
                    picBase64 = {picBase64}
                    foodClass = {foodClass}
                />)
        case 'takenImg':
            const { picURI: pic } = body.payload;
            return (
                <Image
                    style={{ ...takenImgSty, alignSelf: leftOrRight }}
                    source={{ uri: pic }}
                />
            )
        case 'takenImgLoadingResponse':
            return (
                <View 
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#e2e2eb',
                        borderRadius: 100,
                        height: 50,
                        margin: 20,
                        overflow: 'hidden',
                        width: 100,
                    }}
                >
                    <AnimatedEllipsis 
                        numberOfDots={3}
                        minOpacity={0.4}
                        animationDelay={200}
                        style={{
                            color: '#94939b',
                            fontSize: 100,
                            left: -10,
                            letterSpacing: -15,
                            textAlign: 'center',
                            top: -65,
                        }}
                    />
                </View>
            )
        case 'takenImgOptions':
            const { options } = body.payload;
            return (
                <FoodClassOptions 
                    options={options}
                />
            )
        case 'selectedImg':
            return (
                <FoodClassOption 
                    navigation={navigation}                
                    messageId={messageId}
                    option={body.payload}
                />
            )
        case 'renderReport':
            return (
                <ReportCard 
                    nutritionHistory={body.payload}
                />
            )
        default:
            console.log(type);
    }
}

const styles = {
    takenImgSty: {
        margin: 20,
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    textStyle: {
        alignItems:'center',
        marginLeft:30,
        marginRight:30,        
        minHeight: 40,
        fontSize: 22
    },
    dividerStyle: {
        backgroundColor: '#999',
        height:2,
        marginTop:40,

    }
};

export { MessageBubble };
