/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { BleManager } from 'react-native-ble-plx';

export class BLESupport {
  constructor() {
    /**
         * manager enables us to have access to the react native
         * BLE api
         */
    this.manager = new BleManager();
    /**
         * Device represents a BLE device.
         * undefined means we have not yet looked for a device and there is no device yet
         * null means we have tried looking for a device and something caused it to fail
         * or It has a device that we can connect to and work with
         */
    this.device = undefined;
  }

  /**
   * This method makes sure the 
   */
  initBLEManager(){
    if(this.manager == null){
      this.manager = new BleManager();
    }
  }
  /**
     * This method is used to find a device
     * ble device it finds.
     */
  findDevice() {
    this.initBLEManager();
    return new Promise((resolve, reject) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          this.device = null;
          reject(error);
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        if (device) {
          this.device = device;
          this.manager.stopDeviceScan();
          resolve(device);
        }
      }));
  }

  getBLEManager() { 
    initBLEManager()
    return this.manager;
   }

  /**
     * Wait until you at least get a device or you tried at least once
     */
  getDevice() {
    return new Promise((resolve, reject) => {
      // Make sure to wait until you either get a device or no device
      const timer = setInterval(() => {
        if (this.device === null) {
          clearInterval(timer);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(null);
        } else {
          resolve(this.device);
          clearInterval(timer);
        }
      },
      100);
    });
  }

  hasDevice() {
    return this.device !== undefined && this.device !== null;
  }

  destroyBLE(){
    this.manager.destroy();
    this.manager = null;
  }
}
