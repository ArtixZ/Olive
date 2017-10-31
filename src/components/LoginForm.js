import React, { Component } from 'react';
import { 
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner, Input } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange(text) {
    this.setState({email: text});
  }

  onPasswordChange(text) {
    this.setState({password: text});
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.props.loginUser({ email, password });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.containerSty}>
        <StatusBar barStyle="light-content"/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
          <View flex={1} />
        </TouchableWithoutFeedback>

        <TextInput
          style={styles.inputSty}
          label="Email"
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          enablesReturnKeyAutomatically
          autoCorrect={false}
          autoCapitalize={'none'}
          onChangeText={this.onEmailChange.bind(this)}
          value={this.state.email}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInputArea.focus()}
        />

        <TextInput
          style={styles.inputSty}
          secureTextEntry
          label="Password"
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          enablesReturnKeyAutomatically
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.state.password}
          returnKeyType="done"
          onSubmitEditing={() => this.onButtonPress()}
          ref={ ref => this.passwordInputArea = ref}
        />
        {
          this.props.error ?
          <Text style={styles.errorTextStyle}>
            {this.props.error} 
          </Text>
          : null
        }

        {
          this.props.loading ? 
          <Spinner size="large" />
          : 
          <TouchableOpacity 
            style={styles.btnContainerSty}
            onPress={this.onButtonPress.bind(this)}
          >
            <Text style={styles.btnTextSty}>LOGIN</Text>
          </TouchableOpacity>
        }

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
          <View flex={1} />
        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerSty: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5C6BC0',
    padding: 20,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  inputSty: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFF',
    paddingHorizontal: 10,
    marginBottom: 20
  },
  btnContainerSty: {
    backgroundColor: '#3F51B5',
    paddingVertical: 15
  },
  btnTextSty: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
};

const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;

  return { error, loading };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
