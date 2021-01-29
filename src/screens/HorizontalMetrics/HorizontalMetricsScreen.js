import React, {
    useState,
    useEffect,
  } from 'react';
  import {
    StyleSheet, Text, View, PermissionsAndroid, Dimensions,Image,
    BackHandler
  } from 'react-native';
import { BLESupport } from '../../model/BLEUtils/BLESupport';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { setConnectedDevice } from '../../redux/actions/DeviceActions/actions'
import ECGChart from '../../components/ECGChartTwo';



 

function HorizontalMetrics(props) {
  const [runningState,setRunningState] = useState(false);
  const connectedDevice = props.connectedDevice;
  const bleSupport = new BLESupport();
  const [replay,setReplay] = useState(false);

   
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      ScreenOrientation.unlockAsync().then().catch();
      bleSupport.destroyBLE();
      
    });

    // console.log("the running state",runningState)
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation,runningState]);

    
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
       // lock screen orientation to landscape
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    });

   
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);


    return (
      <View style={styles.container}>
        <View style={{flex:1,backgroundColor:"#FBB03B",flexDirection:"row",width:"100%"}}>
              <Image style={{flex:1,alignSelf:"center",width:93,height:70}} resizeMode="contain" source={require("../../assets/icons/Frame1.png")} />
               <Text style={{fontFamily:"bold",fontSize:27,color:"#000000",
                       alignSelf:"center",flex:5,margin:2,marginTop:5,}}>
                       NumberOne AI
               </Text>
           </View>
        <View style={{flex:4,width:"100%",margin:10}}><ECGChart device={connectedDevice} navigation={props.navigation}/></View>
        <TouchableOpacity>
          <Avatar containerStyle={{alignSelf:"center",width:37,height:37,margin:5,marginBottom:10}} size="small"
                      rounded
                      source={require("../../assets/icons/playButton.png")}
                        onPress={()=>{
                          console.log("Button pressed");
                          setReplay(!replay)
                        }}
                      />
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    scrollViewContainer: {
      height: 360,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const mapStateToProps = state =>({
    connectedDevice: state.devicesObject.connectedDevice,
  })
  export default connect(mapStateToProps,{setConnectedDevice})(HorizontalMetrics);
