import React from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'
import {} from './style';
import { Input } from 'react-native-elements';
import {BoxShadow} from 'react-native-shadow';



export default function login({navigation}) {

    const shadowOpt = {
        width:304,
        height:47,
        color:"#000",
        border:3,
        radius:15,
        opacity:0.15,
        x:2,
        y:6,
        style:{marginVertical:5,
            alignSelf:"center",marginTop:15}


    }
    return (
        <View style={{flex:1}}>
            <View style={{flex:2.5,backgroundColor:"#FBB03B"}}>
                <Text style={{fontFamily:"bold",fontSize:27,color:"#000000",
                    alignSelf:"center",flex:1,margin:2,marginTop:5,}}>
                    NumberOne AI
                </Text>
                <Image style={{flex:5,alignSelf:"center",width:239,height:185}} resizeMode="contain" source={require("../../assets/icons/Frame1.png")} />
            </View>

            <View style={{flex:4,backgroundColor:"white"}}>
                <View style={{flex:1,margin:20,alignContent:"center"}}>
                    <Input
                        placeholder='Email' label="Email"
                        labelStyle={{color:"#BDBDBD"}}
                        inputStyle={{color:"#BDBDBD",padding:10}}
                        inputContainerStyle={{borderWidth:1,borderColor:"#BDBDBD",borderRadius:10}}
                        />
                    <Input
                        placeholder='Password' label="Password"
                        labelStyle={{color:"#BDBDBD"}}
                        inputStyle={{color:"#BDBDBD",padding:10}}
                        inputContainerStyle={{borderWidth:1,borderColor:"#BDBDBD",borderRadius:10}}
                        rightIcon={<Text style={{fontSize:16,color:"#5DB075",paddingRight:16}}>Show</Text>}
                        />

                    <TouchableOpacity style={{alignSelf:"center",marginTop:12}}>
                        <Text style={{fontSize:12,textDecorationLine:'underline'}}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf:"center",marginTop:12}}>
                        <Text style={{fontSize:12,textDecorationLine:'underline'}}>Need to Register? Click here</Text>
                    </TouchableOpacity>

                    <BoxShadow setting={shadowOpt}>
                        <TouchableOpacity style={{backgroundColor:"#FBB03B",width:311, height:52,borderRadius:100,elevation:200,alignItems:"center",justifyContent:'center',
                                    shadowColor:"#000",shadowOffset:{width:0,height:2},
                                        shadowOpacity:0.1,shadowRadius:2 ,elevation:2}} onPress={()=>navigation.navigate("DashboardScreens")}>
                            <Text style={{fontSize:18,textAlign:"center",
                                        textAlignVertical:"center"}}>Sign In</Text>
                        </TouchableOpacity>
                    </BoxShadow>
                    <Text style={{fontSize:27,alignSelf:"center",marginTop:30,color:"#000000"}}>Metronome Health</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <Image style={{flex:1,width:"100%"}} resizeMode={"stretch"} source={require("../../assets/icons/Frame2.png")}/>
            </View>
        </View>
    )
}
