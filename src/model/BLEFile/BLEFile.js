import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';


var hasStoredValues = false;
const BLEValues = [];
var stopWriting = false;
export const WriteBLEValues= (ecgValue)=>{

    if(hasStoredValues === false && BLEValues.length === 0){
        console.log("set Timer");
        setTimeout(()=>{
            hasStoredValues = true;
        },3000);
    }

    if(hasStoredValues === false){
        BLEValues.push(ecgValue);
    }

    if(hasStoredValues === true && stopWriting === false){
        stopWriting = true;
        const fileName = `ECGS_${ecgValue}.csv`;

        const path = FileSystem.documentDirectory + `/${fileName}`;

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory,BLEValues.toString(),{encoding:FileSystem.EncodingType.UTF8})
        .then(()=>{
            console.log("values were successfully plotted")
        }).catch((err)=>{
            console.log("writing files error",err);
        })
        console.log("storing in files: " + path);
        console.log("values added",BLEValues.toString())
        console.log("done plotting values")

    }
    
    
}



// export const WriteBLEValues= (ecgValue)=>{

//     if(hasStoredValues === false && BLEValues.length === 0){
//         console.log("set Timer");
//         setTimeout(()=>{
//             hasStoredValues = true;
//         },3000);
//     }

//     if(hasStoredValues === false){
//         BLEValues.push(ecgValue);
//     }

//     if(hasStoredValues === true && stopWriting === false){
//         stopWriting = true;
//         const fileName = "BLEfilevalues.txt";

//         const path = RNFS.DocumentDirectoryPath + `/${fileName}`;

//         // console.log("path",path)
//         // RNFS.readDir(path).then((docsList )=>{
//         //     console.log("Document List",docsList);
            
//         //     const bleFile = docsList.find(bleFile=>{
//         //         return bleFile.name === fileName;
//         //     })
//         //     return bleFile
    
//         // }).then((bleFile)=>{
//         //     console.log("bleFile",bleFile);
//         //     //If the file already exists delete it 
//         //     if(bleFile){
//         //         RNFS.unlink(path)
//         //         .then(() => {
//         //           console.log('FILE DELETED');
//         //         })
//         //         // `unlink` will throw an error, if the item to unlink does not exist
//         //         .catch((err) => {
//         //           console.log("file deletion error",err.message);
//         //         });
//         //     }else{
                  
//         //     }
    
           
              
             
    
//         // }).catch((err)=>{
//         //     console.log("File error",err)
//         // })
//     // write the file
//     RNFS.write(path, BLEValues.toString(), 'utf8')
//     .then((success) => {
//         console.log("wrote to file");
//     console.log('FILE WRITTEN!',success);
//     })
//     .catch((err) => {
//         console.log("writing to file failed")
//     console.log("file writing error",err.message);
//     });
//         console.log("storing in files" + path);

//     }
    
    
// }



