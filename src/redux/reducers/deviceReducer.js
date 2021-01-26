import * as deviceActions from "../actions/DeviceActions/types";
import {addMetronomeDevice} from "../../model/BLEUtils/BLEDeviceFilter";

const stateObject = {
    devices:[],
    connectedDevice:null
}

export const deviceReducer = (state = stateObject,action)=>{

    switch(action.type){
        case deviceActions.ADD_DEVICE:
            const currentState = {
                devices: [],
                connectedDevice:null
            }
            state.devices.forEach((device)=>currentState.devices.push(device));

            addMetronomeDevice(currentState.devices,action.newDevice);
            
            state = currentState;
            break;
        case deviceActions.GET_DEVICE_AT_INDEX:
            state.connectedDevice = state.devices[action.index];

            state = Object.assign({},state);
            
        default:
            return state;
    }

    return state;
}