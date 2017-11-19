import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';

const { width: SYSTEM_WIDTH } = Dimensions.get('window');

export default class Logout extends Component {
    static navigationOptions = {
        header: ( {navigation} ) => {
            return (
            <Header
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
                centerComponent={<View style={styles.headerTxtWrapper}><Text style={{fontFamily: 'System',color: '#43496A',fontSize: 20}}>Olive</Text></View>}
            />)
        }
    }

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

const styles = {
    headerSty: {
        position: 'relative',
        backgroundColor: '#F5F5F5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        elevation: 1,
    },
    leftHeaderIconWrapper: {
        padding: 5, 
        paddingLeft: 5, 
        paddingRight: 5,
        marginBottom: -6,
    },
    headerTxtWrapper: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SYSTEM_WIDTH * 0.4,
        height: '100%',
        borderColor: '#5C6BC0',
        borderBottomWidth:2,
        marginBottom: -10
    },
}