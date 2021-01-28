/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { BleManager,Device } from 'react-native-ble-plx';
import {addMetronomeDevice} from "../../model/BLEUtils/BLEDeviceFilter";
import {addDevice} from "../../redux/actions/DeviceActions/actions";

export class BLESupport {
  constructor() {
   this.initBLEManager();
  }

  /**
   * This method makes sure the 
   */
  initBLEManager(){
    if(this.manager === null || this.manager === undefined){
      
      this.manager = new BleManager();   
    }else if(this.manager instanceof BleManager){
      //Get rid of the previous blemanager to create a new one
      this.destroyBLE();
      this.manager = new BleManager();

    }
    this.isScanning = false;
    this.BLEStatetateListener = null;
    this.device = null;
    this.devices = [];
  }
  /**
     * This method is used to find and get all ble devices
     * in proximity
     * 
     * Note: You must call this.destroyBLE when done using this methodù
     * to release manager and device resources
     * 
     * we resolve the list of Devices found and reject if
     * there was an error while scanning for a device
     */
  findDevices() {
    this.initBLEManager();
      if(this.manager instanceof BleManager && this.isScanning === false){
        const scanOptions = {allowDuplicates:true};

         // eslint-disable-next-line implicit-arrow-linebreak
       this.manager.startDeviceScan(["3368ffa9-77bf-46b2-a148-1cbeb8ca490c"], null, (error, device) => {
       

        this.isScanning = true;

        if (error || this.manager == null) {
          this.device = null;
          this.manager = false;
          this.isScanning = false;
          this.findDevices()
        }

        var newDevice =  addMetronomeDevice(this.devices,device);
          if(newDevice instanceof Device){
            addDevice(newDevice);

          }

      })
      }else{
        console.log("this.manager",this.manager)
      }
    
  }


  destroyBLE(){
    try{
      console.log(`destroying ${this.manager}`)

      if(this.isScanning == true && this.manager instanceof BleManager)
      this.manager.stopDeviceScan();

    if(this.manager instanceof BleManager)
      this.manager.destroy();


    this.cancelBLEStateListener();

    this.manager = null;
    this.isScanning = false;
    this.devices = [];
    this.BLEStatetateListener = null;
    this.device = null;
    }catch(err){
      console.log("err",err)
    }

  }
  cancelBLEStateListener(){
    if(this.BLEStatetateListener != null)
      this.BLEStatetateListener.remove();
  }

  checkBLEStateListener(callback){
    if(this.manager instanceof BleManager){
      this.BLEStatetateListener =  this.manager.onStateChange((state)=>{
        if(callback !== undefined)callback(state);
      
      },true);
      return;
    }else{
      this.initBLEManager();
      this.checkBLEStateListener(callback);
    }
  }
 
  isBLEDevice(device){
    return device instanceof Device;
  }

  getDeviceConnection(device){
    if(this.isBLEDevice(device) && this.manager instanceof BleManager){
      return this.manager.connectToDevice(device.id)
      .then((connectedDevice)=>{
        return connectedDevice.isConnected();
      }).then((isConnected)=>{
        
        return isConnected;

      }).catch((BleError)=>{
        console.log("BLESupport Error",BleError)
        return BleError;})
    }else{
      throw Error(`${device} is not a device`);
    }
  }
}
