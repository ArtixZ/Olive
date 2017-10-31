import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MessageList } from './common';

class MessageContainer extends Component {

    render() {
        // const messages = [
        //     {
        //         msg_id: '5I02W-16-8278a',
        //         timestamp: 1403099033211,
        //         direction: 'outgoing',
        //         body: {
        //             type: 'txt', 
        //             msg: 'Want something healthy',
        //         }
                
        //     },
        //     {
        //         msg_id: '5I02W-16-8278a',
        //         timestamp: 1403099033211,
        //         direction: 'ingoing',
        //         body: {
        //             type: 'txt', 
        //             msg: 'Received. Parsing...',
        //         }
        //     }

        // ];

        const { messages } = this.props;
        console.log(this.props.messages);
        return (
            <MessageList 
                messages={messages}
            />
        );
    }
}

const mapStateToProps = ({ messages }) => {
    return { messages };
};

export default connect(mapStateToProps)(MessageContainer);
