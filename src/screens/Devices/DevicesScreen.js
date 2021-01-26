import React,{useEffect,useState} from 'react';
import { View, Text,Image, FlatList,Platform  } from 'react-native';
import { Input } from 'react-native-elements';
import {connect} from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {addDevice,setConnectedDevice} from '../../redux/actions/DeviceActions/actions';
import  * as Permissions from 'expo-permissions';
import {BLESupport} from '../../model/BLEUtils/BLESupport';
import BLEDevicesListComponent from '../../components/BLEDevicesList';




 function DevicesScreen(props) {
  

  
  
    //Hooks
    const [device,setDevice] = useState(null);
    const [pairing,setPairing] = useState(false);
    const [permission, askForPermission ] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });

 
      
      
   

    useEffect(() => {
      let manager = new BLESupport();

        const unsubscribeFocus = props.navigation.addListener('focus', () => {
          
          askForPermission().then(()=>{
            manager.findDevices();

            manager.checkBLEStateListener(state=>{
              if (state === 'PoweredOn') {
                console.log("state we work with PoweredOn");
                manager.findDevices();

              }
            })
          }).catch((err)=>{
            console.log("permission err",err);

          });
           // lock screen orientation to portrait
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

        });
    
        const unsubscribeBlur =  props.navigation.addListener('blur',()=>{
          manager.destroyBLE();
          setPairing(false);
 
        })
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return ()=>{unsubscribeFocus; unsubscribeBlur};
      }, [props.navigation]);
      

  
      

      // Methods
      function pairDevice(){
        let bleSupport = new BLESupport();
        if(bleSupport.isBLEDevice(device) && props.connectedDevice !== null){
          if(Platform.OS === "ios" && device.isConnectable() === false){
            setPairing(false);
            return;
          }

          bleSupport.getDeviceConnection(device).then((isConnected)=>{
            if(isConnected === true){
              bleSupport.destroyBLE();
              props.navigation.navigate("HorizontalMetricsScreen")
            }else 
              setPairing(false);

          }).catch((BleError)=>{
            setPairing(false);
            console.log("BleError",BleError);
            console.log("err message",BleError.reason);
            return;
          })
          setPairing(true);

        }
      }
      
      const devicesListValues = {
        setDevice: setDevice
      }
    return (
        <View style={{flex:1}}>
           
           <View style={{flex:1,backgroundColor:"#FBB03B"}}>
               <Text style={{fontFamily:"bold",fontSize:27,color:"#000000",
                       alignSelf:"center",flex:1,margin:2,marginTop:5,}}>
                       NumberOne AI
               </Text>
               <Image style={{flex:5,alignSelf:"center",width:239,height:185}} resizeMode="contain" source={require("../../assets/icons/Frame1.png")} />
           </View>
           <View style={{flex:2,}}>
              <View style={{flex:1}}>
                  <Input
                        placeholder={device == null?"Pick a device":device.id} 
                        label="Devices"
                        labelStyle={{color:"#000000"}}
                        inputStyle={{color:"#000000",padding:10}}
                        containerStyle={{margin:5,alignSelf:"center",marginTop:10}}
                        inputContainerStyle={{borderWidth:1,borderColor:"#000000",borderRadius:10}}
                        editable={false}
                        rightIcon={<Text style={{fontSize:16,color:"#000000",paddingRight:16}}>Ardruino</Text>}/>
                    <TouchableOpacity style={{backgroundColor:"#FBB03B",alignSelf:"center",
                                            width:165,height:57,borderRadius:100,justifyContent:"center",alignItems:"center"}}
                                            onPress={()=>pairDevice()}>
                      <Text style={{flex:1,textAlign:"center",fontSize:18,color:"#000000",textAlignVertical:"center"}}>{pairing? "Pairing...":"Pair"}</Text>
                  </TouchableOpacity>
                
              </View>
              <View style={{flex:2,marginTop:60}}>
                <BLEDevicesListComponent parentProps={devicesListValues}/>
              </View>
           </View> 
           
        </View>
    )
}

const mapStateToProps  = state =>({
    devicesList: state.devicesObject.devices,
    connectedDevice: state.devicesObject.connectedDevice,

  })
export default connect(mapStateToProps,{addDevice,setConnectedDevice})(DevicesScreen);