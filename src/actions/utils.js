import {
    FOOD_CLASS_FROM_IMAGE
} from './urls';
import { Constants, Location, Permissions } from 'expo';


export const callAPI = async (method, {requestedType, url}, data) => {
    
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        
    }

    const location = await Location.getCurrentPositionAsync({});

    data["requested_types"] = requestedType;
    data = {...data, ...location};
    
    return fetch(url, {
        method: method,
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).catch(err =>
         err)
}