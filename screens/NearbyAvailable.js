import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity ,Modal,ScrollView,KeyboardAvoidingView, Alert} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import {Title,Color,Size,SoundUrl} from 'react-native';

export default class NearbyAvailable extends Component{

    render(){
        return(
            <View>
                <TouchableOpacity style={styles.button}
                  onPress={()=>{
                   uri:'https://www.google.com/search?q=nearby+vaccination+centres&oq=nearby+vaccination+centres&aqs=chrome..69i57j0l2j0i10l6j0i22i30i457.8516j0j15&sourceid=chrome&ie=UTF-8'
                  }}>
                <Text>Nearby Vaccination Centres</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    button:{
        width:'100%',
        height:RFValue(60),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:RFValue(50),
        backgroundColor:'#32867d',
        shadowColor:'#000',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.44,
        shadowRadius:10.32,
        elevation:16
    }
})