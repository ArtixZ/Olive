import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class Logout extends Component {
    constructor(props) {
        super(props);
    }
    logout = () => {
        const {navigation} = this.props;
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            navigation.dispatch(
                {
                    type: 'Navigation/NAVIGATE',
                    routeName: 'auth',
                }
            )
          }, function(error) {
            // An error happened.
          })
    }   

    render() {
        console.log(this.props)
        return (
            <View flex={1} justifyContent='center'>
                <Button
                    raised
                    icon={{name: 'cached'}}
                    title='LOGOUT' 
                    onPress={this.logout}
                />
            </View>
        )
    }
}