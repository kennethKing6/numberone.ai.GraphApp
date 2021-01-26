import React from 'react';

import {connect} from 'react-redux';
import { Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {setConnectedDevice,addDevice} from '../redux/actions/DeviceActions/actions';

function BLEDevicesList(props){
  const {
    setDevice,
  } = props.parentProps;

  const {
    devicesList,
  } = props;

    const renderItem = ({ item, index }) => (
      <TouchableOpacity style={{flex:1,borderBottomColor:"black",
      borderBottomWidth:1,padding:15,margin:10}}
      onPress={()=>{
        setDevice(devicesList[index]);
        setConnectedDevice(index);
        }} >
        <Text style={{flex:1,fontSize:18,color:"black"}}>Device Id: {item.id}</Text>
        <Text style={{flex:1,fontSize:12}}>name: {item.name==null?"Unknown":item.name}</Text>
      </TouchableOpacity> 
    );
     
        return(
    
            <FlatList
              data={props.devicesList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{flex:1}}
            />
        )
    }
   const mapStateToProps = state =>({
    devicesList: state.devicesObject.devices,

   }) 
export default connect(mapStateToProps,{setConnectedDevice,addDevice})(BLEDevicesList);