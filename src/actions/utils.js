import {
    FOOD_CLASS_FROM_IMAGE
} from './urls';
import { Constants, Location, Permissions } from 'expo';
import firebase from 'firebase';

export const callAPI = async (method, {requestedType, url}, data) => {
    
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        
    }
// 
    const user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;
    
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
    const userInfo = {name, email, photoUrl, uid, emailVerified};
// 

    const location = await Location.getCurrentPositionAsync({});

    data["requested_types"] = requestedType;
    data = {...data, ...location, userInfo};

    url = parseURL(url, data);
    
    return fetch(url, {
        method: method,
        body: method === 'POST' ? JSON.stringify(data) : null
    }).then(res => {
        return res.json()
    }).catch(err =>
         err)
}

const parseURL = (url, data) => {
    const reg = /\{.+?\}/g;
    const newURL = url.replace(reg, (m) => {
        const keyVal = m.slice(1, m.length - 1);
        
        if(keyVal && data[keyVal]) return data[keyVal];
        else {
            console.log("didn't provide the value" + keyVal);
            return "";
        }
    });
    return newURL;
}
