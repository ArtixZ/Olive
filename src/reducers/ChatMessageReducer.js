import moment from 'moment';
import {
    TXT_CHAT_MESSAGE,
    TXT_RESPONSE_MESSAGE,
    FOOD_CLASS,
    GET_FOOD_DETAILS,
    TAKEN_IMAGE,
    TAKEN_IMAGE_RESPONSE_LOADING,
    CAMERA_IMAGE_FOOD_IMG,
    SELECT_OPTION,
    SELECT_FOOD_PORTION,
} from '../actions/types';

import {data, IMAGES} from './data';
import numeral from 'numeral';

const IMG_BASE = './food_photos';


const PAYLOADS = data.map((item, index) => {
    const folderName = item.food_name.replace(/\s/g, '').toLowerCase();
    return {
        pic: IMAGES[folderName],
        name: item.food_name,
        restaurantName: item.restaurant_name,
        highlights: item.tags.slice(0,2),
        rating: item.restaurant_rating,
        tags: item.tags,
        distance: Math.random() * 10,
        price: numeral(Math.random() * 30).format('0.00')
    }
});

const m = Math.ceil(PAYLOADS.length / 3);
const n = Math.ceil(2 * PAYLOADS.length / 3);

// const INIT_STATE = [
//     {
//         msg_id: `temp_${generateGuuId()}`,
//         timeStamp: moment().toISOString(),
//         direction: 'ingoing',
//         body: {
//             type: 'card',
//             payload: PAYLOADS.slice(0, m)
//         }
//     }, {
//         msg_id: `temp_${generateGuuId()}`,
//         timeStamp: moment().toISOString(),
//         direction: 'ingoing',
//         body: {
//             type: 'card',
//             payload: PAYLOADS.slice(m, n)
//         }
//     }, {
//         msg_id: `temp_${generateGuuId()}`,
//         timeStamp: moment().toISOString(),
//         direction: 'ingoing',
//         body: {
//             type: 'card',
//             payload: PAYLOADS.slice(n)
//         }
//     }
// ];

const INIT_STATE = []



// const INIT_STATE = [{
//     msg_id: `temp_${generateGuuId()}`,
//     timeStamp: moment().toISOString(),
//     direction: 'ingoing',
//     body: {
//         type: 'card',
//         payload: [
//             {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": ['Healthy', 'Salad'],
//                 "distance": 4.1,
//                 "price": 24.99
//             }, {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": ['healthy', 'protein'],
//                 "distance": 4.1,
//                 "price": 24.99
//             }, {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": [],
//                 "distance": 4.1,
//                 "price": 24.99
//             }, {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": [],
//                 "distance": 4.1,
//                 "price": 24.99
//             }
//         ]
//     },
// }]

export default (state = INIT_STATE, action) => {

    let message;
    switch (action.type) {
        case TXT_CHAT_MESSAGE:
            message = generateTxtMsg(action.payload);
            return [...state, message];
        case TXT_RESPONSE_MESSAGE:

            const {positive, something, renderReport} = action.payload;
            if(renderReport) {
                return [...state, 
                    {
                        msg_id: `temp_${generateGuuId()}`,
                        timeStamp: moment().toISOString(),
                        direction: 'ingoing',
                        body: {
                            type: 'txt',
                            msg: "Here's how you did last week"
                        }
                    },
                    {
                        msg_id: `temp_${generateGuuId()}`,
                        timeStamp: moment().toISOString(),
                        direction: 'ingoing',
                        body: {
                            type: 'renderReport',
                            payload: {}
                        }
                    }
                ];
            }

            const txtMessage = generateTxtResponse(positive, something);
            const cardMessage = generateCardResponse(PAYLOADS, positive, something);
            if(cardMessage) {
                const divider = generateDivider();
                const lastTxt = state.splice(state.length-1, 1);
                return [...state, divider, ...lastTxt, txtMessage, ...cardMessage];
            }
            return [...state];
        case FOOD_CLASS: 
            const foodClassMessage = generateFoodClassMsg(action.payload);
            return [...state, foodClassMessage]
        case GET_FOOD_DETAILS: 
            console.log(action.payload);
            const initialMsgs = generateInitMsgs(action.payload);
            return initialMsgs

        case TAKEN_IMAGE:
            const takenPic = generateTakenPic(action.payload)
            return [...state, takenPic]
        case TAKEN_IMAGE_RESPONSE_LOADING:
            return [...state, {
                msg_id: `temp_${generateGuuId()}`,
                timeStamp: moment().toISOString(),
                direction: 'ingoing',
                body: {
                    type: 'takenImgLoadingResponse',
                    payload: {}
                }
            }]
        case CAMERA_IMAGE_FOOD_IMG:
            const takenPicOptions = generateTakenPicOptions(action.payload);
            state.pop();
            return [...state, takenPicOptions];
        case SELECT_OPTION:
            state.pop();
            return [...state, {
                msg_id: `temp_${generateGuuId()}`,
                timeStamp: moment().toISOString(),
                direction: 'outgoing',
                body: {
                    type: 'selectedImg',
                    payload: action.payload
                }
            }]
        case SELECT_FOOD_PORTION:
            const selected = state.find(i => i.msg_id === action.payload.messageId);
            const oldPayload = selected.body.payload;
            const newPayload = Object.assign({portion: action.payload.portion}, oldPayload);
            selected.body.payload = newPayload;
            return [...state];
        default: 
            return state;
    }
};

function generateTakenPicOptions(options) {
    return {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'takenImgOptions',
            payload: {
                options
            }
        }
    }
}

function generateTakenPic(uri) {
    return {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'outgoing',
        body: {
            type: 'takenImg',
            payload: {
                picURI: uri,
            }
        }
    }
}

function generateInitMsgs(messages) {
    messages = messages.filter( i=> !!i.image_uri);
    if(messages.length < 3) {
        const initialMsgs = messages.map( (msg) => {
            return (
            {
                msg_id: `temp_${generateGuuId()}`,
                timeStamp: moment().toISOString(),
                direction: 'ingoing',
                body: {
                    type: 'card',
                    payload: msg
                }
            })
        })
        return initialMsgs;
    }
    const m = Math.ceil(messages.length / 3);
    const n = Math.ceil(2 * messages.length / 3);

    return messages.length === 0 ? null : 
    [{
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: messages.slice(0,m)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: messages.slice(m,n)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: messages.slice(n)
        }
    }]
}


function generateGuuId() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const generateTxtMsg = (msg) => {
    const id = `temp_${generateGuuId()}`;
    const timeStamp = moment().toISOString();
    return {
        msg_id: id,
        timeStamp,
        direction: 'outgoing',
        body: {
            type: 'txt',
            msg
        }
    };
};

const generateTxtResponse = (positive, something) => {
    const id = `temp_${generateGuuId()}`;
    const timeStamp = moment().toISOString();
    const modal = positive ? 'with' : 'without';

    return {
        msg_id: id,
        timeStamp,
        direction: 'ingoing',
        body: {
            type: 'txt',
            msg: `Suggesting something ${modal} "${something.toString()}" for you.`
        }
    }
}

const generateCardResponse = (msgs, positive, filters) => {
    let resPayload = [];

    const res = msgs.filter( item => {
        for(let val of filters) {
            if(item.tags.map(item => item.toLowerCase()).includes(val.toLowerCase())) return positive;
            return !positive;
        }
    } )

    resPayload = [...resPayload, ...res];

    const m = Math.ceil(resPayload.length / 3);
    const n = Math.ceil(2 * resPayload.length / 3);

    return resPayload.length === 0 ? null : 
    [{
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: resPayload.slice(0,m)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: resPayload.slice(m,n)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: resPayload.slice(n)
        }
    }]
}

function generateDivider () {
    return {
        msg_id: 'divider',
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'divider',
        }
    }
}

generateFoodClassMsg = ({imgURI, foodClass, imgBase64}) => {
    return Object.assign({}, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'imgRecognition',
            payload: {
                picURI: imgURI,
                picBase64: imgBase64,
                foodClass
            }
        }
    });
}