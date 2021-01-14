import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';


export default function DevicesScreen() {
    return (
        <View style={{flex:1}}>
           
           <View style={{flex:1,backgroundColor:"#FBB03B"}}>
               <Text style={{fontFamily:"bold",fontSize:27,color:"#000000",
                       alignSelf:"center",flex:1,margin:2,marginTop:5,}}>
                       NumberOne AI
               </Text>
               <Image style={{flex:5,alignSelf:"center",width:239,height:185}} resizeMode="contain" source={require("../../assets/icons/Frame1.png")} />
           </View>
           <View style={{flex:2}}>
                <Input
                    placeholder='0f:1c:d4:e3:01:ab' label="Devices"
                    labelStyle={{color:"#000000"}}
                    inputStyle={{color:"#000000",padding:10}}
                    containerStyle={{margin:5,alignSelf:"center",marginTop:40}}
                    inputContainerStyle={{borderWidth:1,borderColor:"#000000",borderRadius:10}}
                    rightIcon={<Text style={{fontSize:16,color:"#000000",paddingRight:16}}>Ardruino</Text>}/>
            <TouchableOpacity style={{backgroundColor:"#FBB03B",alignSelf:"center",
                                    width:165,height:52,borderRadius:100,justifyContent:"center",alignItems:"center"}}>
               <Text style={{flex:1,textAlign:"center",fontSize:18,color:"#000000",textAlignVertical:"center"}}>Pair</Text>
           </TouchableOpacity>
           </View> 
           
        </View>
    )
}
