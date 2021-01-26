import React,{useEffect,useState} from 'react';
import {BLEDevice} from '../model/BLEUtils/BLEDevice';
import { GraphTimer } from '../model/GraphUtils/GraphTimer';
import {convertBinaryToInt} from '../model/BLEUtils/BinaryToInt';
import {
    Chart, Line, Area, HorizontalAxis, VerticalAxis
  } from 'react-native-responsive-linechart';
import { Dimensions  } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {std,mean} from 'mathjs';



export default function ECGChart(props){
   //Variables
   const connectedDevice = new BLEDevice(props.device);
   //Screen States
   const [graphData,setGraphData] = useState([]);
   
   
 
 //Hooks
   useEffect(() => {
  
     const unsubscribeFocus = props.navigation.addListener("focus",()=>{
         const timer = new GraphTimer();
        //  timer.beginTimer();
         connectedDevice.readECGData((ecgValue)=>{
          timer.getTime();
          // console.log("timer.shouldRestart()",timer.shouldRestart())
         
         
            updateUI(ecgValue);

         


          //  updateUI(ecgValue,timer.getTime())
       })
 
     })
 
 
     const unsubscribeBlur = props.navigation.addListener("blur",()=>{
       console.log("removing everything")
        connectedDevice.stopReadingECGData();
      })
 
 
     return ()=>{
       unsubscribeFocus,
       unsubscribeBlur
     };
   }, [props.navigation]);
 
   
  
   
   
     function updateUI(base64Value){
       
         const tempData = [];  
         const graphValue = convertBinaryToInt(base64Value);


      
          graphData.push(graphValue);
         
          setTimeout(()=>graphData.shift(),1000)

        graphData.forEach(ele=>{
           tempData.push(ele);
         })
        //  console.log("tempData",tempData)
          setGraphData(tempData);

               
        }

        function cleanData(base64Value){
          const graphValue = convertBinaryToInt(base64Value);
          graphData.length = 0;

          if(graphValue >= 1500 && graphValue <= 2500){
            const data = [];
            data.push(graphValue);
            console.log("graphData",graphData)
            setGraphData(data);
            
          }

        }
 
 
    function normalizeData(list,ecgNoise){
      if(graphData.length === 0)return 1500;
      
      const tempList = []; 
      graphData.forEach(ele=>{
        tempList.push(ele);
      }) 
      tempList.push(ecgNoise);

      const min = Math.min(tempList);
      const max = Math.max(tempList);
      const newMin = 1500;
      const newMax = 2500;

      
     return ( ((newMax-newMin) * (ecgNoise - min)) / (max - min) ) + newMin;
     
    }
    function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
      const unscaled = unscaledNum % 2500;
      return ((maxAllowed - minAllowed) * (unscaled - min)) / (max - min) + minAllowed;
    }
   return(
    <LineChart
    data={{
      labels: [],
      datasets: [
        {
          data: graphData.length == 0 ? [0]: graphData
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    withDots={false}
    chartConfig={{
      backgroundColor: "#F2F2F2",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0.1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      propsForVerticalLabels:{
        originY:graphData.length === 0 ? 0 : graphData[0],
        scaleX:5
      }
      
    }}
    style={{
      margin: 8,
    }}
    
    
  />
   )
}
















