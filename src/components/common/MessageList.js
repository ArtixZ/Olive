import React, { Component } from 'react';
import { ListView, Text, ScrollView } from 'react-native';
// import InvertibleScrollView from 'react-native-invertible-scroll-view';

import { MessageBubble } from './';

class MessageList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: ds.cloneWithRows(props.messages),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages !== this.props.messages) {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ dataSource: ds.cloneWithRows(nextProps.messages) });
        }
    }

    renderRow(rowData) {
        const { msg_id, timestamp, direction, body } = rowData;
        return (
            <MessageBubble
                id={msg_id}
                outOrIn={direction}
                timestamp={timestamp}
                body={body}
            />
             
        ); 
    }

    renderScrollComponent(props) {
        return (
            <InvertibleScrollView
                inverted
                keyboardDismissMode={'interactive'}
                ref={cpt => this._invertibleScrollViewRef = cpt}
                {...props}
            />
        );
    }

    scrollTo(options) {
        this._invertibleScrollViewRef.scrollTo(options);
    }


    render() {
        const styles = {
            MessageListStyle: {
                marginBottom: 16
            }
        };
        return (
            <ListView 
                style={styles.MessageListStyle}
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderScrollComponent={this.renderScrollComponent.bind(this)}
            />
        ); 
    }   
}

export { MessageList }; 
