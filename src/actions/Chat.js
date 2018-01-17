import { 
    TXT_CHAT_MESSAGE, 
    TXT_RESPONSE_MESSAGE,
    FOOD_CLASS,
    TAKEN_IMAGE,
    RESPOND_TAKEN_PIC,
    LOADING_RESPONSE_MESSAGE,    
    GET_FOOD_RECOMMENDATIONS,
} from './types';
import {phraseParser} from '../utils/PhraseParser';
import { callAPI } from './utils';
import {
    FOOD_DETAILS_FROM_KEYWORDS
} from './urls';

export const sendMessage = (message) => {
    // return {
    //     type: TXT_CHAT_MESSAGE,
    //     payload: message
    // };
    return (dispatch, getState) => {
        dispatch(renderInput(message));
        getResponse(dispatch, getState, message);
    }
};

const renderInput = (message) => {
    return {
        type: TXT_CHAT_MESSAGE,
        payload: message
    }
}

const getResponse = (dispatch, getState, message) => {
    const response = phraseParser(message);
    const store = getState();
    const { accumulatedNutritions } = store.nutritionsRecord;
    
    if (response.renderReport) {
        return dispatch({
            type: TXT_RESPONSE_MESSAGE,
            payload: { renderReport: true, accumulatedNutritions }
        });
    } else {
        dispatch({type: LOADING_RESPONSE_MESSAGE});
        const data = {"keyword": response.keyword};
        
        callAPI( 'POST', FOOD_DETAILS_FROM_KEYWORDS, data)
        .then( res => {
            dispatch(foodRecommendations(res[FOOD_DETAILS_FROM_KEYWORDS.requestedType[0]]))
        })
    }
    
};

const foodRecommendations = (details) => {
    return {
        type: GET_FOOD_RECOMMENDATIONS,
        payload: details
    }
}

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