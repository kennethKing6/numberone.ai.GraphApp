import {min,max} from 'mathjs';
// This constant makes sure that values fall within the range 
//of values of the graph
const RANGE = 20; 


export class GraphPlotter{
    
    constructor(){
        this.time = 0;
        this.recentEcgIndex = -1;//no value in the array
        this.ECGDisplayValues = [];
        this.ECGTimeDislayValues =[];
        this.unSeenECGValues = [];
        this.minX = 0;
        this.maxX = 100;
        this.minY = 0;
        this.maxY = 2500;

    }
    displayECGData(newECGReading){
        this.time = this.time + 1;
        this.recentEcgIndex = this.recentEcgIndex + 1;

        if(this.time === this.maxX){
            this.unSeenECGValues.push(this.ECGDisplayValues.shift());
            this.ECGTimeDislayValues.shift(); 
            this.recentEcgIndex = 1;

            //update the range of X values
            this.minX = this.minX + 1;
            this.maxX = this.maxX  + 1;

            
        }

        this.ECGDisplayValues.push(newECGReading);
        this.ECGTimeDislayValues.push({x:this.time,y:newECGReading})

        //Update the range of Y values
        this.findMinYDomain();// update the min first 
        this.findMaxYDomain(); //update the max

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
}