import {combineReducers} from 'redux';
import {deviceReducer} from './deviceReducer';

export const combinedReducers = combineReducers({
    devicesObject: deviceReducer
})