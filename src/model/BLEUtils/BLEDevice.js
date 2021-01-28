import { Device,BleManager,Subscription } from 'react-native-ble-plx';

export class BLEDevice{

    constructor(device){
        this.initBLEDevice(device);
    }

    initBLEDevice(device){
        if(this.isDevice(device)){
            this.device = device;
            this.charactListener = null;
            this.characteristics  = null;
            this.onDisconnectedListener = null;
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
        bleManager.connectToDevice(this.device.id,{autoConnect:true}).then((device)=>{
            this.device = device;

            //listen for device connection
           this.onDisconnectedListener =  device.onDisconnected((err,device)=>{
            
            this.onDisconnectedListener.remove();
            this.onDisconnectedListener = null;
            callback(err, device);
            })

            return device.discoverAllServicesAndCharacteristics();
         
        }).then((device)=>{
            
            return device.characteristicsForService("3368ffa9-77bf-46b2-a148-1cbeb8ca490c")
        }).then((characteristics)=>{
            this.characteristics = characteristics;
            const desiredCharacteristics =  characteristics[0];
             this.charactListener = desiredCharacteristics.monitor((err,charac)=>{
      
              if(err){
                  this.charactListener.remove();
                  this.charactListener = null;

                    callback(err);
              }else{
                callback(null,charac.value);
              }
               
              
  
                 
             
              })  
        }).catch((BLEError)=>{
            console.log("Reading ECG failed")
            console.log("BLEError",BLEError);
            console.log("BLEError message",BLEError.message);
            callback(BLEError)
        })
        
       }
    }

    stopReadingECGData(){
        if(this.charactListener !== null)this.charactListener.remove();

        if(this.characteristics !== null)this.characteristics = null;

        if(this.onDisconnectedListener !== null) this.onDisconnectedListener.remove()
    }
}