import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, containerStyle }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={{...buttonStyle, ...containerStyle}}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    padding:10,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    padding: 3,
  }
};

export { Button };
