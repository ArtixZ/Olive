import { SET_INITIAL_NUTRITION_HISTORY } from './types';

export const setInitNutritionHistory = (nutritions) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_INITIAL_NUTRITION_HISTORY,
            payload: nutritions,
        })
    }
}