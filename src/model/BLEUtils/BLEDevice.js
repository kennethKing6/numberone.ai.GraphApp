import { Device,BleManager } from 'react-native-ble-plx';

export class BLEDevice{

    constructor(device){
        this.initBLEDevice(device);
    }

    initBLEDevice(device){
        if(this.isDevice(device)){
            this.device = device;
            this.charactListener = null;
            this.characteristics  = null;
        }else{
            throw new Error(`${device} is not a BLE Device object`);
        }
    }
    isDevice(device){
        return device instanceof Device;
    }

    hasDevice(){
        return this.isDevice(this.device);
    }
    readECGData(callback){
       if(this.hasDevice()){
          
        const bleManager = new BleManager();
        console.log("bleManager",bleManager)
        bleManager.connectToDevice(this.device.id,{autoConnect:true}).then((device)=>{
            this.device = device;
            if(device)return device.discoverAllServicesAndCharacteristics();
            else console.log("lost connection",device)
        }).then((device)=>{
            return device.characteristicsForService("3368ffa9-77bf-46b2-a148-1cbeb8ca490c")
        }).then((characteristics)=>{
            this.characteristics = characteristics;
            const desiredCharacteristics =  characteristics[0];
             this.charactListener = desiredCharacteristics.monitor((err,charac)=>{
      
              if(err)console.log("error ",err)
  
                  try{
                    callback(charac.value);
                  }catch(err){
                      console.log("characteristics value error",err)
                  }
             
              })  
              console.log("device",this.charactListene)
        }).catch((BLEError)=>{
            console.log("Reading ECG failed")
            console.log("BLEError",BLEError);
            console.log("BLEError message",BLEError.message);
            this.readECGData(callback);
        })
        
       }else{
           this.readECGData(callback);
       }
    }

    stopReadingECGData(){
        if(this.charactListener != null)this.charactListener.remove();
    }
}