import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,PermissionsAndroid,Dimensions} from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import { Overlay } from 'react-native-elements';
import {BLESupport} from './BLEUtils/BLESupport';
import {GraphTimer} from './GraphUtils/GraphTimer';
import {GraphData} from './GraphUtils/GraphData';

/**
 * use these variables to determine the 
 * min and maximum point on the Y axis to be plotted.
 * 
 * In these graph, they represent the BLE device rssi strength.
 */
const rssiMinStrength = -120;
const rssiMaxStrength = 0;

//instance of data to be plotted
const graphData = new GraphData();


const graphTimer = new GraphTimer();
graphTimer.beginTimer();

const bleSupport = new BLESupport();

const {width,height} = Dimensions.get("window");

function ECGChart(props){
  
  //Hooks
  const [hasPermission,setHasPermission] = useState(false);
  const [device,setDevice] = useState(null);
  const [BLEStrengthdata,setData] = useState([]);
  const [tryAgain,setTryAgain] = useState(graphTimer.getCurrentSeconds());
  
  useEffect(() => {

    if(hasPermission === true && device === null){
      bleSupport.findDevice().then((device)=>{
        return device.connect()
      }).then((device)=>{
        return device.discoverAllServicesAndCharacteristics()
      }).then((device)=>{
        setDevice(device);
      }).catch((error) => {
        // Handle errors
        console.log("connection failed",error)
        return;
    });
    }else if( hasPermission === false ){
      getDevicePermission().then().catch();
    }



}, [hasPermission,tryAgain]);



  useEffect(()=>{

    
    var  tryagain;
    

    

     /**
      * Read the rssi strength of the device after every second
      */
     const timer = setInterval(()=>{
      if(device !== null){
        console.log("device rssi",device.rssi);
        clearInterval(tryagain)
        clearInterval(timer)
          device.readRSSI(device.id).then((deviceRSSI)=>{
            const rssi = {x: graphTimer.timer,y:deviceRSSI.rssi};
  
            graphData.addGraphData(rssi);
         
  
              const rssiListData = [...graphData.getData()];
              
    
    
              console.log("Graph data",graphData.getData())
              
              setData(rssiListData);
            
       
  
          }).catch((err)=>{
            clearInterval(tryagain);
            graphTimer.stopTimer();
            console.log("reading rrsi error",err);
            return;
          })
       }else if(device === null){
       setTryAgain(graphTimer.getCurrentSeconds());
       }else{
         clearInterval(tryagain);
         graphTimer.stopTimer();

       }
      
     },970)
     

      
    
  
  },[device,BLEStrengthdata,hasPermission])



    async function requestLocationPermission() {
    try {
      const locationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
        title:"Activate Location",
          buttonPositive: 'OK'}); 

         
    
             
      if (locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission for bluetooth scanning granted');
        return true;
      } else {
        console.log('Location permission for bluetooth scanning revoked');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
    }
    async function getDevicePermission(){
    const response = await requestLocationPermission();
    if(response){
      setHasPermission(response);
      console.log("I have the permission", response)

    }}
    return(
      
     <View style={props.style}>
         <Chart
          style={{ height: "100%", width: "100%"}}
          data={graphData.dataInitializer()}
          padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          xDomain={{ min: graphTimer.getMinTimer(), max: graphTimer.getMaxTimer() }}
          yDomain={{ min: rssiMinStrength, max: rssiMaxStrength }}
         
          viewport={{size:{height:height * 0.1,width:width * 0.09}}}
          >
          <VerticalAxis tickCount={27} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
          <HorizontalAxis tickCount={graphTimer.getHorizontalTick()} theme={{ labels: { formatter: (v) => v.toFixed(0) } }} />
          <Line smoothing="cubic-spline" tension={0.3} theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
          <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.1 } }}} />

        </Chart>
     </View>
    )
}

export default function GraphScreen() {
  const [connected,setConnected] = useState(false);
  useEffect(()=>{
      
        const checkDeviceConnectivity = setInterval(()=>{
          if(bleSupport.hasDevice() === true){
            bleSupport.getDevice().then((foundDevice)=>{
              return foundDevice.isConnected();
              }).then((isConnected)=>{
                if(isConnected === true){
                 setConnected(true);
                }else if(isConnected === false){
      
                  setConnected(false);
                }
                
              }).catch(()=>{
                return;
              })
          }
        },300)
      
  
   
  })

  function determineOverlayVisibility(){
    console.log("determining overlay visibility")
   if(bleSupport.hasDevice() === true || connected === true)
      return false
   else
      return true;
   
  }

  return (
    <View  style={styles.container}>
     <Overlay isVisible={determineOverlayVisibility()} overlayStyle={{margin:20}} >
        <View>
        <Text style={{fontSize:32,alignSelf:"center"}}>Sorry our attempt to connect you has failed!</Text>
        <Text>Turn on your Bluetooth and make sure you are in proximity of a BLE device</Text>
        <Text>To see the graph, first turn on your BLE device and your bluetooth. Make sure the BLE device is on  first and then restart the application</Text>
        </View>

      </Overlay>
      <View style={{flex:2,width:"100%"}}>
        <Text style={{fontSize:20,width:"100%",padding:5,backgroundColor:"#0C154A",color:"white",textAlign:"center"}}>Graph of Device RSSI (y-axis) over time/seconds (x-axis)</Text>
        <Text style={{color:"black",width:"100%",textAlign:"center"}}>Please make sure have Bluetoth on and a BLE device on</Text>
      </View>
    <ECGChart style={{flex:15,width:"100%"}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer:{
    height:360,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
