import moment from 'moment';
import { AsyncStorage } from 'react-native';

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

