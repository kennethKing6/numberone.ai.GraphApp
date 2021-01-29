import React,{useEffect,useState} from 'react';
import {BLEDevice} from '../model/BLEUtils/BLEDevice';
import { GraphTimer } from '../model/GraphUtils/GraphTimer';
import {convertBinaryToInt} from '../model/BLEUtils/BinaryToInt';
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import {GraphPlotter} from '../model/GraphUtils/GraphPlotter'
import {Alert} from 'react-native';
import {WriteBLEValues} from '../model/BLEFile/BLEFile';


const grapPlotter = new GraphPlotter();

export default function ECGGraph(props){
      //Variables
   const connectedDevice = new BLEDevice(props.device);
   //Screen States
   const [graphData,setGraphData] = useState([]);


    //Hooks
    useEffect(() => {
  
        const unsubscribeFocus = props.navigation.addListener("focus",()=>{
            // const timer = new GraphTimer();
            // timer.beginTimer();
            connectedDevice.readECGData((err,ecgValue)=>{
             // console.log("timer.shouldRestart()",timer.shouldRestart())
            
                
                if(err === null && ecgValue){
                    // WriteBLEValues(convertBinaryToInt(ecgValue));
                    updateUI(ecgValue);

                }else{
                    connectedDevice.stopReadingECGData();
                   //Display error to user 
                   Alert.alert(err.message);
                }
          })
    
        })
    
    
        const unsubscribeBlur = props.navigation.addListener("blur",()=>{
        //   console.log("removing everything")
           connectedDevice.stopReadingECGData();
         })
    
    
        return ()=>{
          unsubscribeFocus,
          unsubscribeBlur
        };
      }, [props.navigation]);
    
      
     
      
      
        function updateUI(base64Value){
          
            const graphValue = convertBinaryToInt(base64Value);
            if (graphValue >= 1500 && graphValue <= 2500){
                const tempData = [];  
                 
                grapPlotter.displayECGData(graphValue).forEach(ele=>{
                   tempData.push(ele);
                 })

                //  console.log("tempData",tempData);
                  setGraphData(tempData);
            }
                
           }

        function getXOrigin(){
            if(graphData.length > 0){
                return graphData[0].x;
            }else{
                return 0;
            }
        }

        function getYOrigin(){
            if(graphData.length > 0){
                return graphData[0].y;
            }else{
                return 0;
            }
        }

     
    return(
        <Chart
        
        style={{ height: "90%", width: '100%', backgroundColor: '#eee'}}
        xDomain={{ min: grapPlotter.getMinX(), max: grapPlotter.getMaxX() }}
        yDomain={{ min:grapPlotter.getMinY(), max:grapPlotter.getMaxY() }}
        padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
        viewport={{ 
            initialOrigin: {x :getXOrigin() ,y:getYOrigin()},
            size:{width: graphData.length === 0 ? 1:graphData.length} 
            }}
        padding={{ left: 40, bottom: 30, right: 20,top:30 }}
    >
    <VerticalAxis 
        // theme={{ labels: { formatter: (v) => v.toFixed(0) } }}
    tickCount={5}/>
    <HorizontalAxis  />
    <Line data={graphData.length == 0 ?[{x:0,y:0}]:graphData}  smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
    </Chart>
    )


}