import { CAMERA_IMAGE_URI } from '../actions/types';

const INIT_STATE = {
    uri: '',
    foodClass: []
}

export default (state = INIT_STATE, action) => {

    switch(action.type) {
        case 'CAMERA_IMAGE_URI': 
            return { ...state, takenImg: action.payload };
        // case 'CAMERA_IMAGE_FOOD_IMG':
        //     return {...state, foodClass: action.payload};
        default: 
            return state;
    }
}