
export const addMetronomeDevice = (metronomeDeviceList,newDevice)=>{
   try{
            //Check if newDevice is in the list already
    const found = metronomeDeviceList.find(element => element.id === newDevice.id);

    //Add the newDevice to the list if the device is not in the list
    if(found === undefined){
                
        metronomeDeviceList.push(newDevice);
        return newDevice;

             
      
        
    }
   }catch(e){console.log("err",e);}
return null;
}

