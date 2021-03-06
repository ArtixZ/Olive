import React, { Component } from 'react';
import { View, Text, AsyncStorage, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import userInfo from '../utils/user';
import { Spinner } from './common';
import LoginForm from './LoginForm';
import * as actions from '../actions';

class AuthScreen extends Component {
  state = { loggedIn: null }
  
  componentWillMount () {
    const nutritionRecords = userInfo.getNutritionRecords();
    this.props.setInitNutritionHistory(nutritionRecords);
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Keyboard.dismiss();
        this.props.navigation.navigate('main');
        this.setState({ loggedIn: true});
      } else {
        this.setState({ loggedIn: false });
      }
    });

  }

  componentWillReceiveProps(nextProps) {
    
  }

  // onAuthComplete(props) {
  //   if (props.token) {
  //     this.props.navigation.navigate('main');
  //   }
  // }

  render() {
    switch(this.state.loggedIn) {
      case false:
        return <LoginForm {...this.props}/>
      default:
        return <Spinner />
    }
  }
}

function mapStateToProps({  }) {
  return { };
}

export default connect(null, actions)(AuthScreen);