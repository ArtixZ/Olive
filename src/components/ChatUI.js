import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Image,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { connect } from 'react-redux';
import { send, subscribe } from 'react-native-training-chat-server';
import { Icon, Header } from 'react-native-elements';
import { ImagePicker } from 'expo';


// import Header from './Header';
import { MessageBubble, ReversedList } from './common';
import { sendMessage, getResponse, selectCameraImg, getInitRecommendation, respondTakenImg } from '../actions';

const TITLE = 'ChatForFood';

const { width: SYSTEM_WIDTH } = Dimensions.get('window');

class ChatUI extends Component {
  static navigationOptions = {
    header: ( {navigation} ) => {
      return (
        <Header
          outerContainerStyles={styles.headerSty}
          leftComponent={<Icon 
                            containerStyle={styles.leftHeaderIconWrapper}
                            name='user'
                            type='font-awesome'
                            color='#43496A'
                            onPress={()=>{navigation.navigate('logOut')}}
                        />}
          centerComponent={<View style={styles.headerTxtWrapper}><Text style={{fontFamily: 'System',color: '#43496A',fontSize: 20}}>Olive</Text></View>}
          rightComponent={<Icon 
                            containerStyle={styles.rightHeaderIconWrapper}
                            name='heart'
                            type='entypo'
                            color='#43496A'
                          />}
        />)
    }
  }

  constructor(props){
    super(props);
    this.state = {
      typing: null,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onChatResponse = this.onChatResponse.bind(this);
  }

  componentWillMount() {
    const { getInitRecommendation } = this.props;
    getInitRecommendation();
  }

  componentWillUpdate (nextProps, nextState) {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  

  sendMessage() {
    if (this.state.typing) {
        this.props.sendMessage(this.state.typing);        
        this.setState({ typing: null });
        // this.props.getResponse(this.state.typing);
    }
  }
  onCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);

    if (!result.cancelled) {
      this.props.selectCameraImg(result);
    }
  };

  onChatResponse(type) {
    const { respondTakenImg } = this.props;

    switch(type) {
      case 'takeImage': {
        respondTakenImg();
        return
      }
      default: 
        return
    }
  }

  renderRow(rowData) {
        const { msg_id, timeStamp, direction, body } = rowData.item;
        const { navigation } = this.props;
        return (
            <MessageBubble
                key={rowData.index}
                outOrIn={direction}
                timestamp={timeStamp}
                messageId={msg_id}
                body={body}
                navigation={navigation}
                onResponse={this.onChatResponse}
            />
             
        ); 
    }

  render() {
    const { messages } = this.props;
    return (
      <View style={styles.container}>
        <ReversedList
          removeClippedSubviews={false}
          data={messages}
          renderItem={this.renderRow}
          keyboardShouldPersistTaps={'never'}
          keyboardDismissMode={'on-drag'}
          />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}>
          <View style={styles.footer}>
            <Icon
              type="entypo"
              onPress={this.onCamera}
              color='#5C6BC0'
              iconStyle={styles.camera}
              name='camera' 
            />
            <View style={styles.inputArea}>
              <TextInput
                returnKeyType='send'
                onSubmitEditing={this.sendMessage}
                value={this.state.typing}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="What to have..."
                onChangeText={text => this.setState({ typing: text })}
              />
              <Icon
                type="entypo"
                name='paper-plane'
                onPress={this.sendMessage}
                underlayColor='#eee'
                color={this.state.typing ? '#7986CB' : '#C5CAE9'}
              />
            </View>
            
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginBottom: -4,
  },
  rightHeaderIconWrapper: {
    padding: 5, 
    paddingLeft: 5, 
    paddingRight: 5,
    marginBottom: -7,
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
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    marginTop: 8,
    height: 50,    
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    elevation: 1,
  },
  camera: {
    paddingHorizontal: 10
  },
  inputArea: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    borderRadius:4,
    paddingRight: 5
  },
  input: {
    fontSize: 18,
    flex: 1,
    paddingLeft: 10,
  },
  send: {
    alignSelf: 'center',
    color: '#F98324',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});

const mapStateToProps = ({ messages }) => {
    return { messages };
};

export default connect(mapStateToProps, {
  sendMessage, 
  getResponse, 
  selectCameraImg, 
  getInitRecommendation, 
  respondTakenImg
})(ChatUI);
// export default connect(mapStateToProps, {sendMessage, getResponse})((ChatUI));

