import { Device,BleManager,Subscription } from 'react-native-ble-plx';

export const TransactionId = "metronome";
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

            //listen for device connection
        
            return device.discoverAllServicesAndCharacteristics();
         
        }).then((device)=>{
            this.device = device;
            const serviceUUID = "3368ffa9-77bf-46b2-a148-1cbeb8ca490c";
            return device.characteristicsForService(serviceUUID)
        }).then((characteristics)=>{
            this.characteristics = characteristics;
            const desiredCharacteristics =  characteristics[0];
            const charactListener = desiredCharacteristics._manager.monitorCharacteristicForDevice(this.device.id,desiredCharacteristics.serviceUUID,desiredCharacteristics.uuid,(err,charac)=>{
      
            
                if(err){
                    const errorObj = JSON.stringify(err);
                    if(errorObj.errorCode === 201){
                        console.log("error status 201", errorObj);
                        this.readECGData(callback);
                    }
                    console.log("desiredCharacteristics listener",JSON.stringify(err));

                    charactListener.remove();
                    bleManager.cancelTransaction(TransactionId)
                    callback(err);
                }else{
                  callback(null,charac.value);
                }
                 
                
    
                   
               
                },TransactionId)
                console.log("connection listener",desiredCharacteristics._manager)
                
            //  this.charactListener = desiredCharacteristics.monitor((err,charac)=>{
      
            //   if(err){
            //       this.charactListener.remove();
            //       this.charactListener = null;

            //         callback(err);
            //   }else{
            //     callback(null,charac.value);
            //   }
               
              
  
                 
             
            //   })  
        }).then(()=>{
            console.log("adding on Disconnect")
            return this.device.onDisconnected((err,device)=>{
            if(err){
                console.log("error" +JSON.stringify(err) + ", message:" + err)
                
               
            }
            callback(err, device);
            console.log("disconnection error",JSON.stringify(err));
            console.log("disconnection element")
             })
        }).catch((BLEError)=>{
            console.log("error" +JSON.stringify(BLEError) + ", message:" + BLEError)
            callback(JSON.stringify(BLEError))
        })
        
       }
    }

    // readECGData(callback){
    //     if(this.hasDevice()){
           
    //      const bleManager = new BleManager();
    //      console.log("bleManager",bleManager)
    //      bleManager.connectToDevice(this.device.id,{autoConnect:true}).then((device)=>{
    //          this.device = device;
    //          if(device)return device.discoverAllServicesAndCharacteristics();
    //          else console.log("lost connection",device)
    //      }).then((device)=>{
    //          return device.characteristicsForService("3368ffa9-77bf-46b2-a148-1cbeb8ca490c")
    //      }).then((characteristics)=>{
    //          this.characteristics = characteristics;
    //          const desiredCharacteristics =  characteristics[0];
    //           this.charactListener = desiredCharacteristics.monitor((err,charac)=>{
       
    //            if(err)callback(null,err);
    //            else  callback(charac.value);
                 
              
    //            })  
    //      }).catch((BLEError)=>{
    //          console.log("Reading ECG failed")
    //          console.log("BLEError",BLEError);
    //          console.log("BLEError message",BLEError.message);
    //      })
         
    //     }
    //  }
 
    stopReadingECGData(){
       
        
        if(this.characteristics !== null){
            this.characteristics = null;
        }

        if(this.onDisconnectedListener !== null){
            this.onDisconnectedListener.remove();
            this.onDisconnectedListener = null;
        }
    }
}