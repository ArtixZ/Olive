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
    data = {...data, ...location, user_info: userInfo};
    
    return fetch(url, {
        method: method,
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).catch(err =>
         err)
}