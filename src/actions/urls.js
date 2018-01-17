export const baseURL = 'http://34.201.144.15:18780/olive';
export const photoURL = 'http://34.201.144.15:18780/photos';

export const FOOD_CLASS_FROM_IMAGE = {
    requestedType: ["food_class_from_image"],
    url: `${baseURL}/classifier`
};

export const FOOD_DETAILS_FROM_KEYWORDS = {
    requestedType: ["food_details_from_keywords"],
    url: `${baseURL}/details`
}

export const CREATE_A_USER = {
    requestedType: ["new_user_registration"],
    url:`${baseURL}/event`
}

export const FOOD_NUTRITION = {
    requestedType: ["food_nutrition"],
    url: `${baseURL}/nutrition/food?name={foodName}`
}