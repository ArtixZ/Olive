import React from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';

const ChatBox = ({ value, onChangeText, placeholder, onSend }) => {
  const { inputStyle, containerStyle, buttonStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize={'none'}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onSend} style={buttonStyle}>
        <Text style={textStyle}>
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderTopWidth: 2,
    height: 20,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 5
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    
  },
  
};

export { ChatBox };
