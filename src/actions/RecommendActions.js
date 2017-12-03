import {
    GET_FOOD_INITIAL_RECOMMENDATIONS,
    GET_FOOD_RECOMMENDATIONS,
    LOADING_RESPONSE_MESSAGE,
} from './types';
import { callAPI } from './utils';
import {
    FOOD_DETAILS_FROM_KEYWORDS
} from './urls';

export const getInitRecommendation = () => {
    return (dispatch) => {
        const data = {"keyword": "Asian Seafood"};
        dispatch({type: LOADING_RESPONSE_MESSAGE});
        
        callAPI( 'POST', FOOD_DETAILS_FROM_KEYWORDS, data)
        .then( res => {
            dispatch(foodIntialRecs(res[FOOD_DETAILS_FROM_KEYWORDS.requestedType[0]]))
        })
    }    
}


const foodIntialRecs = (details) => {
    return {
        type: GET_FOOD_INITIAL_RECOMMENDATIONS,
        payload: details
    }
}
