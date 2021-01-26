import * as actions from './types';
import {store} from '../../index';

export const addDevice = (newDevice)=>{

    store.dispatch({
        type: actions.ADD_DEVICE,
        newDevice : newDevice
    })
}

export const setConnectedDevice = (index)=>{
    store.dispatch({
        type:actions.GET_DEVICE_AT_INDEX,
        index:index
    })
}

