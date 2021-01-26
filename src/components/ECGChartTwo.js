import React,{useEffect,useState} from 'react';
import {BLEDevice} from '../model/BLEUtils/BLEDevice';
import { GraphTimer } from '../model/GraphUtils/GraphTimer';
import {convertBinaryToInt} from '../model/BLEUtils/BinaryToInt';
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'

import { Dimensions  } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {min,max} from 'mathjs';
import {GraphPlotter} from '../model/GraphUtils/GraphPlotter'


const grapPlotter = new GraphPlotter();

export default function ECGGraph(props){
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
             // console.log("timer.shouldRestart()",timer.shouldRestart())
            
   
   
              updateUI(ecgValue,timer.getTime())
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
    
      
     
      
      
        function updateUI(base64Value,time){
          
            const graphValue = convertBinaryToInt(base64Value);
                
                if(graphValue >= 1500 && 2500 >= graphValue){
                    const tempData = [];  
                 
                grapPlotter.displayECGData(graphValue).forEach(ele=>{
                   tempData.push(ele);
                 })

                 console.log("tempData",tempData);
                  setGraphData(tempData);
        
                }
            
            
   
           }

        //    function cleanData(base64Value){
        //      const graphValue = convertBinaryToInt(base64Value);
        //      graphData.length = 0;
   
        //      if(graphValue >= 1500 && graphValue <= 2500){
        //        const data = [];
        //        data.push(graphValue);
        //        console.log("graphData",graphData)
        //        setGraphData(data);
               
        //      }
   
        //    }
        function getMinXDomain(){
            if(graphData.length > 0){
                return graphData[0].x;
            }else{
                return 0;
            }
        }
        function getMaxXDomain(){
            if(graphData.length > 0){
                return graphData[graphData.length - 1].x + 2;
            }else{
                return 0;
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

     
      
        function findMaxYDomain(){
            var value = 2500;
            if(graphData.length > 0){
                const temp = [];
                graphData.forEach(e=>{
                    temp.push(e.y)
                })
                
                value = max(temp) + 50;
            }
            const min = findMinYDomain();

            if(min > value || min === value)
                value += 100;

            return value
        }

        function findMinYDomain(){
            var value = 0;
            if(graphData.length > 0){
                const temp = [];
                graphData.forEach(e=>{
                    temp.push(e.y)
                })
                
                 value = min(temp) - 50;
            }
            // console.log("findMinYDomain",value)

            return value;
        }
    return(
        <Chart
    style={{ height: "90%", width: '100%', backgroundColor: '#eee' }}
    xDomain={{ min: grapPlotter.getMinX(), max: grapPlotter.getMaxX() }}
    yDomain={{ min:grapPlotter.getMinY(), max:grapPlotter.getMaxY() }}
    padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
    viewport={{ 
        initialOrigin: {x :getXOrigin() ,y:getYOrigin()},
        size:{width: graphData.length === 0 ? 1:graphData.length} 
        }}
    >
    <VerticalAxis />
    <HorizontalAxis  />
    <Line data={graphData.length == 0 ?[{x:0,y:0}]:graphData}  smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
    </Chart>
    )


}