import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ChatMessageReducer from './ChatMessageReducer';
import CameraReducer from './CameraReducer';
import FBAuthReducer from './FBAuthReducer';
import SignupReducer from './SignupReducer';
import NutritionReducer from "./NutritionReducer";

export default combineReducers({
  FBAuth: FBAuthReducer,
  auth: AuthReducer,
  messages: ChatMessageReducer,
  cameraImg: CameraReducer,
  signup: SignupReducer,
  nutritionsRecord: NutritionReducer,
});
