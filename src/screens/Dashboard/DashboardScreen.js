import React from 'react'
import { View, Text,Image } from 'react-native'
import {styles} from './style';
import {AppStyles} from '../AppStyles';


export default function DashboardScreen() {
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
                <Text style={{marginTop:30,fontSize:68,textAlign:"center",color:"#000000"}}>92</Text>
                <Text style={{marginTop:10,textAlign:"center",fontSize:22,color:"#000000"}}>Heart Rate</Text>
                <Text style={{marginTop:30,fontSize:68,color:"#000000",textAlign:"center"}}>Low</Text>
                <Text style={{alignSelf:"center",fontSize:22,color:"#000000",margin:5}}>Movement</Text>
                <View style={{borderWidth:1,margin:20,borderColor:"#000000",
                            height:90,alignSelf:"center",width:324,backgroundColor:"#FFFAFA"}}>
                    <Text style={{paddingLeft:12,paddingBottom:5,fontSize:18,color:"#000000",width:291}}>Alerts</Text>
                    <Text style={{paddingLeft:32,fontSize:18,color:"#000000",width:291}}>SP02 is low, try deep breathing</Text>
                </View>
            </View>
        </View>
    )
}
