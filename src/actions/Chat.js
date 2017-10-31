import { 
    TXT_CHAT_MESSAGE, 
    TXT_RESPONSE_MESSAGE,
    FOOD_CLASS,
    TAKEN_IMAGE,
    RESPOND_TAKEN_PIC    
} from './types';
import {phraseParser} from '../utils/PhraseParser';

export const sendMessage = (message) => {
    // return {
    //     type: TXT_CHAT_MESSAGE,
    //     payload: message
    // };
    return (dispatch, getState) => {
        dispatch(renderInput(message));
        dispatch(getResponse(message));
    }
};

const renderInput = (message) => {
    return {
        type: TXT_CHAT_MESSAGE,
        payload: message
    }
}

const getResponse = (message) => {
    const response = phraseParser(message);

    return {
        type: TXT_RESPONSE_MESSAGE,
        payload: response
    };
};

export const sendFoodClass = (imgURI, imgBase64, foodClass) => {
    return {
        type: FOOD_CLASS,
        payload: {imgURI, imgBase64, foodClass}
    }
}

export const takenPic = (uri) => {
    return {
        type: TAKEN_IMAGE,
        payload: uri
    }
}
export const RespondTakenPic = () => {
    return {
        type: RESPOND_TAKEN_PIC,
    }
}