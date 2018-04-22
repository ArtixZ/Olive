import {
    GET_FOOD_INITIAL_RECOMMENDATIONS,
    GET_RECIPE_INITIAL_RECOMMENDATIONS,
    GET_FOOD_RECOMMENDATIONS,
    LOADING_RESPONSE_MESSAGE,
    TXT_CHAT_MESSAGE,
} from './types';
import { callAPI } from './utils';
import {
    FOOD_DETAILS_FROM_KEYWORDS,
    FOOD_RECIPE_FROM_KEYWORDS,
} from './urls';

export const getInitRecommendation = () => {
    return (dispatch) => {
        const data = {"keyword": "Asian Seafood"};
        dispatch({type: LOADING_RESPONSE_MESSAGE});
        
        callAPI( 'POST', FOOD_DETAILS_FROM_KEYWORDS, data)
        .then( res => {
            // dispatch({type: TXT_CHAT_MESSAGE, payload: "Here are food recommandations for you:"})
            dispatch(foodInitialRecs(res[FOOD_DETAILS_FROM_KEYWORDS.requestedType[0]]))
        })
        callAPI('POST', FOOD_RECIPE_FROM_KEYWORDS, data)
        .then( res=> {
            // dispatch({type: TXT_CHAT_MESSAGE, payload: "Here are recipe recommandations for you:"})
            dispatch(recipeInitialRecs(res[FOOD_RECIPE_FROM_KEYWORDS.requestedType[0]]))
        })
    }    
}


const foodInitialRecs = (details) => {
    return {
        type: GET_FOOD_INITIAL_RECOMMENDATIONS,
        payload: details,
    }
}

const recipeInitialRecs = (details) => {
    return {
        type: GET_RECIPE_INITIAL_RECOMMENDATIONS,
        payload: details,
    }
}
