import {
    CURRENT_NUTRITIONS_FOR_FOOD,
    ACCUMULATE_NUTRITIONS,
} from '../actions/types';
import { standardNutrition } from '../assets/config/_NutritionData';
import { 
    toTitleCase
} from "../utils/utils";

const INIT_STATE = {
    currentNutrition: {},
    accumulatedNutritions: {}
}


export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case CURRENT_NUTRITIONS_FOR_FOOD:
            state.currentNutrition = action.payload;
            return state;
        
        case ACCUMULATE_NUTRITIONS:
            const { accumulatedNutritions, currentNutrition } = state;
            const {payload: portion} = action;

            Object.keys(currentNutrition).forEach( (val) => {
                if(accumulatedNutritions[toTitleCase(val)]) accumulatedNutritions[toTitleCase(val)] += currentNutrition[val] * portion;
                else accumulatedNutritions[toTitleCase(val)] = currentNutrition[val] * portion;
            });

            return state;
        default:
            return state;
    }
}