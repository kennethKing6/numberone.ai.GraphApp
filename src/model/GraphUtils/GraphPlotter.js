import {min,max, re} from 'mathjs';
import { Dimensions,Alert } from 'react-native';
import  {ECG} from '../GraphUtils/ECG';
// This constant makes sure that values fall within the range 
//of values of the graph
const RANGE = 0.1; 


//Timer constants
const NoTimerSet = -1;
const TimerBegan = 0;
const TimerEnded = 1;

export class GraphPlotter{
    
    constructor(){
        this.time = 0;
        this.recentEcgIndex = -1;//no value in the array
        this.ECGDisplayValues = [];
        this.ECGTimeDislayValues =[];
        this.unSeenECGValues = [];
        this.minX = 0;
        this.maxX = 100;
        this.minY = 1500;
        this.maxY = 2500;
        this.yDisplayValues = [];
        this.xDisplayValues = [];

        this.graphTimerState = NoTimerSet;
        this.ECG_Generator = new ECG();

    }
    // displayECGData(newECGReading){
    //     this.time = this.time + 1;
    //     this.recentEcgIndex = this.recentEcgIndex + 1;

    //     //Start the timer if there are timer set yet and we just started

    //     this.ECGDisplayValues.push(newECGReading);
    //     this.ECGTimeDislayValues.push({x:this.time,y:newECGReading})
        
        // if(this.graphTimerState === NoTimerSet){
        //     this.graphTimerState = TimerBegan;
        //     // this.maxX = this.determineMaxX();
        //     //This allows the ecg arrays to collect enough data to display
        //     //before moving the array
        //     setTimeout(()=>this.graphTimerState = TimerEnded,1000)
        // }

    //     if(this.graphTimerState  === TimerEnded){
    //         console.log("value",this.ECGTimeDislayValues.length);
    //         this.unSeenECGValues.push(this.ECGDisplayValues.shift());
    //         this.ECGTimeDislayValues.shift(); 
    //         this.recentEcgIndex = this.recentEcgIndex - 1;
         
           
    
    //         // this.maxX = this.ECGTimeDislayValues.length;
    
    //         //Update the range of Y values
    //         this.findMinYDomain();// update the min first 
    //         this.findMaxYDomain(); //update the max
    //         this.findMinYDomain();// update the min first 
    //         this.findMaxYDomain()
    //         return this.ECGTimeDislayValues;
    
    //     }
               
        
        

        
        

       
    //     return [{x:0,y:0}];
    // }

    displayECGData(newECGReading){
        this.recentEcgIndex = this.recentEcgIndex + 1;
        this.time = this.time + 1;

        if(this.graphTimerState === NoTimerSet){
                this.graphTimerState = TimerBegan;
                // this.maxX = this.determineMaxX();
                //This allows the ecg arrays to collect enough data to display
                //before moving the array
                setTimeout(()=>this.graphTimerState = TimerEnded,1000)
            }
        
        
       
        //Make sure you get enough data to plot
 
        
           
            

        
        this.ECGDisplayValues.push(newECGReading);
        this.determineYDisplay(newECGReading)
       
        if(this.graphTimerState  === TimerEnded){
            this.unSeenECGValues.push(this.ECGDisplayValues.shift());
            this.ECGTimeDislayValues.splice(0,1); 
        }

       
        this.findMinXDomain();
        this.findMaxXDomain();
        this.findMinYDomain();// update the min first 
        this.findMaxYDomain();
        // console.log("this.maxX: " + this.maxX +",this.time: " + this.time)

           return this.ECGTimeDislayValues;
    }
    determineYDisplay(ecgValue){
        if(ecgValue >= 1500 && ecgValue <= 2500){
            const result = ecgValue% 0.9;
            this.ECG_Generator.addData(result.toFixed(1));

            if(this.ECG_Generator.isReady()){
                var value  = this.ECG_Generator.tick();

                while(!this.ECG_Generator.isBufferEmpty()){
                   
                     const yValue = value[1].toFixed(1);
                     const xValue = value[0].toFixed(1);
                    this.ECGTimeDislayValues.push({x:this.time,y:yValue});
                  
                 
                    value  = this.ECG_Generator.tick();
                    if(!this.ECG_Generator.isBufferEmpty()){
                        this.time = this.time + 1;
                    }
                   

                    
            
                }
                this.ECG_Generator.empty();
               
                // console.log("this.ECGTimeDislayValues",this.ECGTimeDislayValues)
                // console.log("\n")
            }else{
                this.ECGTimeDislayValues.push({x:this.time,y:0});
               
               
            }
        }else{
            this.ECGTimeDislayValues.push({x:this.time,y:0});
            

        }
    }
    
     findMaxYDomain(){
        if(this.ECGTimeDislayValues.length > 0){
            const temp = [];
            this.ECGTimeDislayValues.forEach(e=>temp.push(e.y));
            
            this.maxY = max(temp) + RANGE;
        }
        const min = this.findMinYDomain();

        //Make sure that the max Domain/Range value of the graph
        //Is always bigger than the min Domain/Range
        if(min > this.maxY || min === this.maxY)
            this.maxY = min + RANGE;

        return this.maxY;
    }

     findMinYDomain(){
        if(this.ECGTimeDislayValues.length > 0){
            const temp = [];
            this.ECGTimeDislayValues.forEach(e=>temp.push(e.y));
            
             this.minY = min(temp) - RANGE;
        }

        return this.minY;
    }
    findMinXDomain(){
        if(this.ECGTimeDislayValues.length > 0){
           
            const temp = [];
            this.ECGTimeDislayValues.forEach(e=>temp.push(e.x));
         
            this.minX = min(temp);
       }

       return this.minX;
    }
    findMaxXDomain(){
        if(this.ECGTimeDislayValues.length > 0){
           
            const temp = [];
            this.ECGTimeDislayValues.forEach(e=>temp.push(e.x));
         
            this.maxX = max(temp) + 1;
       }

       return this.maxX;
    }

    getMinX(){
        return this.minX;
    }
    getMaxX(){
        return this.maxX;
    }

    getMaxY(){
        return this.maxY;
    }

    getMinY(){
        return this.minY;
    }
    getLastECGPos(){
        return this.recentEcgIndex;
    }

    determineMaxX(){
        const {width} = Dimensions.get("screen");
        // alert("value " + (width/411.42857142857144) * 100)
        return (width/411.42857142857144) * 100;
    }
}