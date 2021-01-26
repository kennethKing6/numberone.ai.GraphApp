import {Buffer} from 'buffer';  
import { Base64 } from 'js-base64';



export const convertBinaryToInt = (base64)=>{

//  const bytes = base64.toByteArray(Base64);
//  const view = new DataView(bytes.buffer);
//  const value = view.getFloat32();

  const binaryBuf = Buffer.from(base64,'base64');

  // const height = binaryBuf[1];
  // const down = binaryBuf[0];

  // console.log("binaryBuf.readUInt16LE()",binaryBuf.readUInt16LE() )
//   const intUBE =  binaryBuf.readUInt16BE();
//  if(intUBE >= 1500 && intUBE <= 2500)return intUBE ;
//  else;
 
  // console.log("binaryBuf", binaryBuf.readUInt16BE(0))
  return binaryBuf.readUInt16LE();
}