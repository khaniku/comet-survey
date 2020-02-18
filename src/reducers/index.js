import { combineReducers } from 'redux';
import SurveyReducer from "./SurveyReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
    surveys: SurveyReducer,
    accessToken: AuthReducer,
});