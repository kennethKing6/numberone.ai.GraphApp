import {min,max, re} from 'mathjs';
import { Dimensions,Alert } from 'react-native';
import {ECG} from '../GraphUtils/ECGTwo';
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
        this.ECGTimeDislayValues = [];
        this.unSeenECGValues = [];
        this.minX = 0;
        this.maxX = 100;
        this.minY = 1500;
        this.maxY = 2500;
        this.yDisplayValues = [];
        this.xDisplayValues = [];

        this.graphTimerState = NoTimerSet;
        this.ecg = new ECG();

    }
 

    displayECGData(newECGReading){
        
        

        // if(this.ecg.isReady()){
        //     var tempData = this.ecg.tick();
        //     while(!this.ecg.getLastXYState()){
                

        //         this.ECGTimeDislayValues.push({x:tempData[0],y:tempData[1]})
        //         tempData = this.ecg.tick();

        //         if(this.ecg.getLastXYState())this.ECGTimeDislayValues.push({x:tempData[0],y:tempData[1]})
        //     }
        // }
        
        // try{
        //     if(this.ECGTimeDislayValues[0].x === 0 && this.ECGTimeDislayValues[0].y === 0)
        //     this.ECGTimeDislayValues.shift()
        // }catch(err){
            
        // }
        // console.log("this.ECGTimeDislayValues.length: "+this.ECGTimeDislayValues.length + ",max " + this.maxX)

        this.ECGDisplayValues.push(newECGReading);

        // if(this.ECGTimeDislayValues.length == this.maxX){
        //     this.ECGTimeDislayValues.shift() ;
        //     this.ECGDisplayValues.shift();
           
        // }  




        if(newECGReading>= 1500 && newECGReading <= 2500){
            const norm = this.normalize(newECGReading);
            console.log("normalized",norm);
            this.ecg.addECGValue(norm);
        }else {
            this.ecg.addECGValue(0);
        }
        
        const data = this.ecg.tick();
        this.ECGTimeDislayValues.push({x:this.time,y:data[1]})
        this.time = this.time + 2;
        

        this.findMinXDomain();
        this.findMaxXDomain();
        this.findMinYDomain();// update the min first 
        this.findMaxYDomain();

           return this.ECGTimeDislayValues;
    }
   
    normalize(x){
        const normalizedECG = (x - min(this.ECGDisplayValues))/(max(this.ECGDisplayValues) - min(this.ECGDisplayValues));
        return isNaN(normalizedECG) ? 0 : normalizedECG;
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
        if(this.ECGTimeDislayValues.length === 600){
            this.ECGTimeDislayValues.shift();
        }
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
         
            this.maxX = max(temp) + RANGE;
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