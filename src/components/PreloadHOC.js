import React, {Component} from 'react';
import { 
    Platform,
    AsyncStorage,
} from 'react-native';
import Expo, { Font, Constants, Location, Permissions } from 'expo';
import firebase from 'firebase';


import {IMAGES} from '../reducers/data';

const INITIAL_NUTRITION_RECORDS = {};

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Expo.Asset.fromModule(image).downloadAsync();
        }
    });
}

export default function PreloadHOC(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                appIsReady: false,
            }
        }

        componentWillMount() {
            this._initFirebase();
            // this._loadAssetsAsync();
            this._initAsyncStorage();
            
            // if (Platform.OS === 'android' && !Constants.isDevice) {
            //     this.setState({
            //         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            //     });
            // } else {
            //     this._getLocationAsync();
            // }
        }


        _initFirebase() {
            const config = {
                apiKey: "AIzaSyCzhEJV07MC8QWW2bQtttEA2fuXTq6AEhc",
                authDomain: "chatforfood-b4819.firebaseapp.com",
                databaseURL: "https://chatforfood-b4819.firebaseio.com",
                projectId: "chatforfood-b4819",
                storageBucket: "chatforfood-b4819.appspot.com",
                messagingSenderId: "445326614913"
            };
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            } else {
                firebase.app().delete().then(function() {
                    firebase.initializeApp(config);
                });
            }
        }

        async _initAsyncStorage() {
            try {
                await AsyncStorage.setItem('@MyLocalStore: nutritionRecords', JSON.stringify(INITIAL_NUTRITION_RECORDS));
            } catch (error) {
                console.log(error);
            }
            this.setState({ appIsReady: true }); 
        }

        async _loadAssetsAsync() {
            const imageAssets = cacheImages(Object.values(IMAGES));
            // await Font.loadAsync({
            //     'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
            // });
            

            await Promise.all([
                ...imageAssets,
            ]);
            // this.setState({ appIsReady: true });            
        }

        // _getLocationAsync = async () => {
        //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
        //     if (status !== 'granted') {
        //       this.setState({
        //         errorMessage: 'Permission to access location was denied',
        //       });
        //     }
        
        //     let location = await Location.getCurrentPositionAsync({});
        //   };

        render() {
            if (!this.state.appIsReady) {
                return <Expo.AppLoading />;
            }
            return <WrappedComponent {...this.props}/>
        }
    }
};