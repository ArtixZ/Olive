import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { standardNutrition } from '../assets/config/_NutritionData';

const today = moment();

export const toTitleCase = (str) =>{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const isWithinAWeek = (day) => {
    const aWeekAgo = today.clone().subtract(7, 'days').startOf('day');
    return day.isAfter(aWeekAgo);
}


export const setAsyncStorage = (key, obj) => AsyncStorage.setItem(key, JSON.stringify(obj));

export const getAsyncStorage = (key) => AsyncStorage.getItem(key);

export const calcNutritionForAWeek = (nutritionHistory) => {
    const daysWithinAWeek = Object.keys(nutritionHistory).reduce((pre, cur) => {
        if(isWithinAWeek((moment(cur)))) {
            return [...pre, cur];
        } else return pre;
    }, []);

    let ingredients = {};
    
    for(let i in standardNutrition) {
        ingredients[i.toLowerCase()] = 0;
    }

    for(let day of daysWithinAWeek) {
        const nutritionOfDay = nutritionHistory[day];
        const { portion, nutrition } = nutritionOfDay;
        for(let n in nutrition) {
            if(ingredients[n] >= 0) {
                ingredients[n] += nutrition[n] * portion;
            }
        }
    }
    return ingredients
}