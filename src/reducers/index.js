import { combineReducers } from 'redux';
import SurveyReducer from "./SurveyReducer";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import PictureReducer from "./PictureReducer";

export default combineReducers({
    surveys: SurveyReducer,
    accessToken: AuthReducer,
    user: UserReducer,
    picture: PictureReducer
});