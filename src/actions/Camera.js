import { 
    CAMERA_IMAGE_URI,
    CAMERA_IMAGE_FOOD_IMG,
    LOADING_RESPONSE_MESSAGE,
    SELECT_OPTION,
    SELECT_FOOD_PORTION,
    DELETE_FOOD_PORTION,
    CURRENT_NUTRITIONS_FOR_FOOD,
    ACCUMULATE_NUTRITIONS,
 } from './types';

 import {
    FOOD_CLASS_FROM_IMAGE,
    FOOD_NUTRITION,
 } from './urls'
import { 
    callAPI,
 } from './utils';
import {toTitleCase} from '../utils/utils';

import { sendFoodClass, takenPic } from './Chat';

 
export const selectCameraImg = (image) => {
    return (dispatch, getState) => {

        if (image.uri) {
            dispatch(cameraImg(image));
            dispatch(takenPic(image.uri));
            dispatch({type: LOADING_RESPONSE_MESSAGE});
            const data = {'image': image.base64};
            
            callAPI('POST', FOOD_CLASS_FROM_IMAGE, data)
            .then(res => {
                console.log(res)
                dispatch(imgFoodClass(res[FOOD_CLASS_FROM_IMAGE.requestedType[0]]));
                // dispatch(sendFoodClass(image.uri, image.base64, res[FOOD_CLASS_FROM_IMAGE.requestedType[0]]));
            })
        }
        
    }
}

export const respondTakenImg = () => {
    return (dispatch, getState) => {
        const {cameraImg} = getState();

        dispatch({type: LOADING_RESPONSE_MESSAGE})
            
        const data = {'image': cameraImg.takenImg.base64};
        
        callAPI('POST', FOOD_CLASS_FROM_IMAGE, data)
        .then(res => {
            dispatch(imgFoodClass(res[FOOD_CLASS_FROM_IMAGE.requestedType[0]]));
            // dispatch(sendFoodClass(image.uri, image.base64, res[FOOD_CLASS_FROM_IMAGE.requestedType[0]]));
        })
    }
}

export const selectImgOption = (option) => {
    return(dispatch, getState) => {
        dispatch({
            type: SELECT_OPTION,
            payload: option
        });

        const foodName = toTitleCase(option.food_class);

        callAPI('GET', FOOD_NUTRITION, { foodName })
        .then(res => {
            dispatch(recordNutrition(res));
            // dispatch(sendFoodClass(image.uri, image.base64, res[FOOD_CLASS_FROM_IMAGE.requestedType[0]]));
        })
    }
}

export const selectFoodPortion = (portion, messageId) => {
    return(dispatch, getState) => {
        const store = getState();
        const { currentNutrition } = store.nutritionsRecord;

        dispatch({
            type: SELECT_FOOD_PORTION,
            payload: {portion, messageId, currentNutrition}
        });
        // dispatch({
        //     type: ACCUMULATE_NUTRITIONS,
        //     payload: portion,
        // })
    }
}
export const deleteSelectedPortionById = (messageId) => {
    return(dispatch) => {
        dispatch({
            type: DELETE_FOOD_PORTION,
            payload: messageId
        })
    }
}

const cameraImg = (img) => {
    return {
        type: CAMERA_IMAGE_URI,
        payload: img
    }
}

const imgFoodClass = (foodClass) => {
    return {
        type: CAMERA_IMAGE_FOOD_IMG,
        payload: foodClass
    }
}

const recordNutrition = (nutritions) => {
    return {
        type: CURRENT_NUTRITIONS_FOR_FOOD,
        payload: nutritions,
    }
}