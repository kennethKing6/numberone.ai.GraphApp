import React from 'react';
import { View, Text, Image } from 'react-native';
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Metrics() {
    const data1 = [
        { x: -2, y: 1 },
        { x: -1, y: 0 },
        { x: 8, y: 13 },
        { x: 9, y: 11.5 },
        { x: 10, y: 12 }
      ]
      
    
    return (
        <View style={{flex:1}}>
           
            <View style={{flex:1,backgroundColor:"#FBB03B"}}>
                <Text style={{fontFamily:"bold",fontSize:27,color:"#000000",
                        alignSelf:"center",flex:1,margin:2,marginTop:5,}}>
                        NumberOne AI
                </Text>
                <Image style={{flex:5,alignSelf:"center",width:239,height:185}} resizeMode="contain" source={require("../../assets/icons/Frame1.png")} />
            </View>
            <View style={{flex:2.5}}>
                <View style={{margin:10}}>
                    <Text style={{textAlign:"right",fontSize:18,color:"#000000",marginRight:20}}>ECG</Text>
                    <Chart
                        style={{ height: 180, width: '100%', backgroundColor: '#eee' }}
                        xDomain={{ min: -2, max: 10 }}
                        yDomain={{ min: -2, max: 20 }}
                        padding={{ left: 20, top: 5, bottom: 15, right: 15 }}
                        >
                        <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
                        <HorizontalAxis tickCount={5} />
                        <Line data={data1} smoothing="none" theme={{ stroke: { color: '#61D04F', width: 4 } }} />
                    </Chart>
                </View>
               <View >
                <Text style={{textAlign:"right",fontSize:18,color:"#000000",marginRight:20}}>Movement</Text>

                <Chart
                        style={{ height: 180, width: '100%', backgroundColor: '#eee' }}
                        xDomain={{ min: -2, max: 10 }}
                        yDomain={{ min: -2, max: 20 }}
                        padding={{ left: 20, top: 5, bottom: 15, right: 15 }}
                        >
                        <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
                        <HorizontalAxis tickCount={5} />
                        <Line data={data1} smoothing="none" theme={{ stroke: { color: '#374AF5', width: 4 } }} />
                    </Chart>
               </View>
              <TouchableOpacity style={{marginTop:10}}>
                <Avatar
                containerStyle={{alignSelf:"center",width:47,height:47}}
                size="small"
                    rounded
                    source={require("../../assets/icons/playButton.png")}
                    />
              </TouchableOpacity>

            </View>
        </View>
    )
}
