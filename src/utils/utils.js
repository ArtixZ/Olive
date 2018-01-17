import moment from 'moment';
const today = moment();

export const toTitleCase = (str) =>{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const isWithinAWeek = (day) => {
    const aWeekAgo = today.clone().subtract(7, 'days').startOf('day');
    return day.isAfter(aWeekAgo);
}