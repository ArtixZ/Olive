import moment from 'moment';

import {
    CURRENT_NUTRITIONS_FOR_FOOD,
    ACCUMULATE_NUTRITIONS,
} from '../actions/types';
import { 
    toTitleCase
} from "../utils/utils";
import { standardNutrition } from '../assets/config/_NutritionData';

const INIT_STATE = {
    currentNutrition: {},
    accumulatedNutritions: {}
}

for(let i in standardNutrition) {
    INIT_STATE.accumulatedNutritions[i] = 0;
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case CURRENT_NUTRITIONS_FOR_FOOD:
            state.currentNutrition = action.payload;
            return state;
        
        case ACCUMULATE_NUTRITIONS:
            const { accumulatedNutritions, currentNutrition } = state;
            const {payload: portion} = action;
            let newObj = {};
            newObj['portion'] = portion;
            newObj['nutrition'] = currentNutrition;
            const currentTimeStamp = moment().toISOString();
            
            accumulatedNutritions[currentTimeStamp] = newObj;

            return state;
        default:
            return state;
    }
}