import {convertBinaryToInt} from './BinaryToInt';

export const filter = (ECGInitialList,characteristicValue)=>{
    
    const finalECGList = [];     
    ECGInitialList.forEach(ele=>{
        finalECGList.push(ele);
          })
    const graphValue = convertBinaryToInt(characteristicValue);

    if(graphValue >= 1500 && graphValue <= 2500){
        finalECGList.push(graphValue);
         
    }else{
       const value =  finalECGList.length === 0 ? 0 : finalECGList[finalECGList.length - 1];
       finalECGList.push(value);
    }

    if(finalECGList.length === 30){
        finalECGList.shift(); 
      }
    //   console.log("final ECG List",finalECGList)
    return finalECGList;
}