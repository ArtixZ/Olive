import { 
    CAMERA_IMAGE_URI,
    CAMERA_IMAGE_FOOD_IMG,
    TAKEN_IMAGE_RESPONSE_LOADING,
    SELECT_OPTION,
    SELECT_FOOD_PORTION,
 } from './types';

 import {
    FOOD_CLASS_FROM_IMAGE,
 } from './urls'
import { callAPI } from './utils';
import { sendFoodClass, takenPic } from './Chat';

 
export const selectCameraImg = (image) => {
    return (dispatch, getState) => {

        if (image.uri) {
            dispatch(cameraImg(image));
            dispatch(takenPic(image.uri));
            dispatch({type: TAKEN_IMAGE_RESPONSE_LOADING});
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

        dispatch({type: TAKEN_IMAGE_RESPONSE_LOADING})
            
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
        })
    }
}

export const selectFoodPortion = (portion) => {
    return(dispatch, getState) => {
        dispatch({
            type: SELECT_FOOD_PORTION,
            payload: portion
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