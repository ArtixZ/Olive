import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {BlurView} from 'react-native-blur';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';

import { ChatBox } from './common';
import { messageSent, getResponse } from '../actions';


const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
        // this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
        this.resetKeyboardView = this.resetKeyboardView.bind(this);
        this.onKeyboardResigned = this.onKeyboardResigned.bind(this);

        this.state = {
            inputVal: null,
            customKeyboard: {
                component: undefined,
                initialProps: undefined,
            },
            receivedKeyboardData: undefined,
        };
    }

    onChangeInput(val) {
        this.setState({ inputVal: val });
    }
    
    onSend() {
        if (this.state.inputVal) {
            this.props.messageSent(this.state.inputVal);        
            this.setState({ inputVal: null });
            this.props.getResponse(this.state.inputVal);
        }
    }

    resetKeyboardView() {
        this.setState({customKeyboard: {}});
    }
    
    onKeyboardResigned() {
        this.resetKeyboardView();
    }

    keyboardAccessoryViewContent() {
        const InnerContainerComponent = (IsIOS && BlurView) ? BlurView : View;
        return (
            <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
                <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
                <View style={styles.inputContainer}>
                    <AutoGrowingTextInput
                        maxHeight={200}
                        style={styles.textInput}
                        ref={(r) => {
                            this.textInputRef = r;
                        }}
                        placeholder={'Message'}
                        underlineColorAndroid="transparent"
                        onFocus={() => this.resetKeyboardView()}
                        testID={'input'}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => KeyboardUtils.dismiss()}>
                        <Text>Action</Text>
                    </TouchableOpacity>
                </View>
                
            </InnerContainerComponent>
        );
    }

    render() {
        return (
            <KeyboardAccessoryView
                renderContent={this.keyboardAccessoryViewContent}
                onHeightChanged={IsIOS ? height => this.setState({keyboardAccessoryViewHeight: height}) : undefined}
                trackInteractive={TrackInteractive}
                kbInputRef={this.textInputRef}
                kbComponent={this.state.customKeyboard.component}
                kbInitialProps={this.state.customKeyboard.initialProps}
                kbInitialProps={this.state.customKeyboard.initialProps}
                onKeyboardResigned={this.onKeyboardResigned}
                revealKeyboardInteractive
            />);
    }
}

const styles = StyleSheet.create({

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blurContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
    }),
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
  },
});

export default connect(null, {
    messageSent, getResponse
})(ChatContainer);
