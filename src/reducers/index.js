import { combineReducers } from 'redux';
import SurveyReducer from "./SurveyReducer";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
    surveys: SurveyReducer,
    accessToken: AuthReducer,
    user: UserReducer
});