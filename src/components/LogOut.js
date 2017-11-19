import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {name: null, email: null, photoUrl: null, uid: null, emailVerified: null}
        };
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;
        
        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
        }
        this.setState({userInfo: { name, email, photoUrl, uid, emailVerified }});
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
                <Text>email: </Text><Text>{this.state.userInfo.email}</Text>
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