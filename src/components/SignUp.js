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
import { emailChanged, passwordChanged, signupUser } from '../actions';
import { Spinner, Input } from './common';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  onEmailChange(text) {
    this.setState({email: text});
  }

  onPasswordChange(text) {
    this.setState({password: text});
  }

  onConfirmPasswordChange(text) {
    this.setState({confirmPassword: text});    
  }

  onSignupButtonPress() {
    const { email, password } = this.state;

    this.props.signupUser({ email, password });
  }

  onBackButtonPress() {
    const { navigation } = this.props;
    navigation.navigate('auth');
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
          returnKeyType="next"
          onSubmitEditing={() => this.confirmPasswordInputArea.focus()}
          ref={ ref => this.passwordInputArea = ref}
        />
        <TextInput
            style={styles.inputSty}
            secureTextEntry
            label="Confirm Password"
            placeholder="confirm password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            enablesReturnKeyAutomatically
            onChangeText={this.onConfirmPasswordChange.bind(this)}
            value={this.state.confirmPassword}
            returnKeyType="done"
            onSubmitEditing={() => this.onSignupButtonPress()}
            ref={ ref => this.confirmPasswordInputArea = ref}
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
            style={styles.signupBtnContainerSty}
            onPress={this.onSignupButtonPress.bind(this)}
          >
            <Text style={styles.btnTextSty}>SIGN UP</Text>
          </TouchableOpacity>
        }

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
          <View flex={0.5} />
        </TouchableWithoutFeedback>

        <TouchableOpacity 
          style={styles.backBtnContainerSty}
          onPress={this.onBackButtonPress.bind(this)}
        >
          <View flex={0.5}>
            <Text style={styles.btnTextSty}>Back</Text>
          </View>
        </TouchableOpacity>

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
  signupBtnContainerSty: {
    marginTop: 4,
    backgroundColor: '#1E88E5',
    paddingVertical: 15
  },
  btnTextSty: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  backBtnContainerSty: {
    backgroundColor: '#C5CAE9',
    paddingVertical: 15
  }
};

const mapStateToProps = ({ signup }) => {
  const { error, loading } = signup;

  return { error, loading };
};

export default connect(mapStateToProps, { signupUser })(Signup);
