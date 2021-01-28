import {min,max} from 'mathjs';
import { Dimensions,Alert } from 'react-native';

// This constant makes sure that values fall within the range 
//of values of the graph
const RANGE = 1; 


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
        this.maxX = 660;
        this.minY = 0;
        this.maxY = 2500;

        this.graphTimerState = NoTimerSet;

    }
    // displayECGData(newECGReading){
    //     this.time = this.time + 1;
    //     this.recentEcgIndex = this.recentEcgIndex + 1;

    //     //Start the timer if there are timer set yet and we just started

    //     this.ECGDisplayValues.push(newECGReading);
    //     this.ECGTimeDislayValues.push({x:this.time,y:newECGReading})
        
    //     if(this.graphTimerState === NoTimerSet){
    //         this.graphTimerState = TimerBegan;
    //         // this.maxX = this.determineMaxX();
    //         //This allows the ecg arrays to collect enough data to display
    //         //before moving the array
    //         setTimeout(()=>this.graphTimerState = TimerEnded,1000)
    //     }

    //     if(this.graphTimerState  === TimerEnded){
    //         console.log("value",this.ECGTimeDislayValues.length);
    //         this.unSeenECGValues.push(this.ECGDisplayValues.shift());
    //         this.ECGTimeDislayValues.shift(); 
    //         this.recentEcgIndex = this.recentEcgIndex - 1;
    //         this.minX = this.minX + 1;
    //         this.maxX = this.maxX +5 ;
           
    
    //         // this.maxX = this.ECGTimeDislayValues.length;
    
    //         //Update the range of Y values
    //         this.findMinYDomain();// update the min first 
    //         this.findMaxYDomain(); //update the max

    //         return this.ECGTimeDislayValues;
    
    //     }
               
        
        

        
        

       
    //     return [{x:0,y:0}];
    // }

    displayECGData(newECGReading){
        this.time = this.time + 1;
        this.recentEcgIndex = this.recentEcgIndex + 1;

        //Make sure you get enough data to plot
        if(this.graphTimerState === NoTimerSet){
            this.graphTimerState = TimerBegan;
            // this.maxX = this.determineMaxX();
            //This allows the ecg arrays to collect enough data to display
            //before moving the array
            setTimeout(()=>this.graphTimerState = TimerEnded,3000)
        }

        this.ECGDisplayValues.push(newECGReading);
        this.ECGTimeDislayValues.push({x:this.time,y:newECGReading})

        if(this.graphTimerState === TimerEnded ){
            this.unSeenECGValues.push(this.ECGDisplayValues.shift());
            this.ECGTimeDislayValues.shift(); 
            this.maxX = this.maxX + 1;
            this.minX = this.minX + 1;
        }

        this.findMinYDomain();// update the min first 
        this.findMaxYDomain();

        return this.ECGTimeDislayValues;
    }
     findMaxYDomain(){
        if(this.ECGDisplayValues.length > 0){
           
            
            this.maxY = max(this.ECGDisplayValues) + RANGE;
        }
        const min = this.findMinYDomain();

        //Make sure that the max Domain/Range value of the graph
        //Is always bigger than the min Domain/Range
        if(min > this.maxY || min === this.maxY)
            this.maxY = min + RANGE;

        return this.maxY;
    }

     findMinYDomain(){
        if(this.ECGDisplayValues.length > 0){
            
            
             this.minY = min(this.ECGDisplayValues) - RANGE;
        }

        return this.minY;
    }
    findMinXDomain(){
        if(this.ECGDisplayValues.length > 0){
            var temp = [];
            this.ECGTimeDislayValues.forEach((e)=>temp.push(e.x))
            
            this.minX = min(temp);
       }

       return this.minX;
    }
    findMaxXDomain(){
        if(this.ECGDisplayValues.length > 0){
            var temp = [];
            this.ECGTimeDislayValues.forEach((e)=>temp.push(e.x))
            
            this.maxX = max(temp);
       }

       return this.maxX + RANGE;
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