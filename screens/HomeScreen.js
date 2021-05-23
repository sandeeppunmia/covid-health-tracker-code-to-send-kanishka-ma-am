import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity ,Modal,ScrollView,KeyboardAvoidingView, Alert} from 'react-native';
import db from '../config';
import firebase from'firebase';
import {RFValue} from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import {Title,Color,Size,SoundUrl} from 'react-native';
import {Audio} from 'expo-av';

export default class BpScreen extends Component{

constructor(){
    super();
    this.state={
        userId:firebase.auth().currentUser.email,
        name:'',
        age:'',
        temperature:'',
        oxygenLevel:'',
        date:''
    }
}

    componentDidMount(){
        this.getUserDetails()
    }

    getUserDetails=async()=>{
        var email=firebase.auth().currentUser.email;
        var requestRef= await db.collection('temperature&oxygenLevel').doc(this.state.userId)
        .get()
        .then((doc)=>{
            var name=doc.data().name
            console.log(name);
            console.log(doc.data().age);
            console.log(doc.data().temperature);
            console.log(doc.data().oxygenLevel)
            this.setState({
                name:doc.data().name,
                age:doc.data().age,
                bloodPressure:doc.data().temperature,
                pulseRate:doc.data().oxygenLevel,
                date:doc.data().date
            })
        })
        var date1 = new Date().getDate()
        var date2 = this.state.date
        if(date2 - date1>20){
            Alert.alert("Please Check Your Temperature and Oxygen Level")
            this.playSound()
        }else{
            Alert.alert("Your parametres are up to date")
        }
    }

    
updateUserDetails=()=>{
    db.collection('temperature').doc(this.state.userId)
    .update({
        'name':this.state.name,
        'age':this.state.age,
        'temperature':this.state.temperature,
        'oxygenLevel':this.state.oxygenLevel,
        'date':new Date().getDate()
    })
    Alert.alert('Profile Updated Successfully')
}

playSound = async () => {
    await Audio.Sound.createAsync(
      {
        uri:"http://soundbible.com/mp3/Buzzer-SoundBible.com-188422102.mp3"
      },
      {
        shouldPlay:true
      }
    )
 }
    
    render(){
        return(
           
            <KeyboardAvoidingView style={styles.container}>
                <MyHeader title="Temperature and Oximeter" navigation ={this.props.navigation}/>
                <View style={styles.formContainer}>
                <View style={styles.imageView}>
                      <Image source={require("../assets/temperature.jpg")}
                         style={styles.tempImage}/>
                  </View>

                    <Text style={styles.label}>           Age        </Text>
                    <TextInput
                       style={styles.formTextInput}
                      // placeholder={'Age'}
                       maxLength={3}
                       onChangeText={(text)=>{
                           this.setState({
                               age:text
                           })
                       }}
                       value={this.state.age}
                       />

                    <Text style={styles.label}>      Temperature  </Text>
                    <TextInput
                       style={styles.formTextInput}
                       maxLength={3}
                       onChangeText={(text)=>{
                           this.setState({
                               temperature:text
                           })
                       }}
                       value={this.state.temperature}
                       />

                <Text style={styles.label}>       Oxygen Level  </Text>
                <TextInput
                       style={styles.formTextInput}
                       maxLength={3}
                       onChangeText={(text)=>{
                           this.setState({
                               oxygenLevel:text
                           })
                       }}
                       value={this.state.oxygenLevel}
                       />

                       <TouchableOpacity style={styles.button}
                         onPress={()=>{
                                this.updateUserDetails()
                         }}>
                             <Text style={styles.buttonText}>Save</Text>
                         </TouchableOpacity>
                </View>
                <View style={styles.imageView}>
                      <Image source={require("../assets/temperature2.png")}
                         style={styles.tempImage2}/>
                  </View>
           </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#6fc0b8'
    },
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
        elevation:16,
        marginTop:20,
        marginLeft:RFValue(200)
    },
    formTextInput:{
        width:'90%',
        height:RFValue(50),
        alignSelf:'center',
        borderColor:'grey',
        borderRadius:2,
        borderWidth:1,
        padding:RFValue(10),
        marginLeft:RFValue(25)
    },
    formContainer:{
        flex:0.88,
        justifyContent:'center'
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
    },
    label:{
        fontSize:18,
        color:'#717d7e',
        fontWeight:'bold',
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:RFValue(140),
        marginBottom:RFValue(20)
    },
    tempImage:{
        width:RFValue(100),
        height:RFValue(100),
        resizeMode:'stretch',
        marginRight:RFValue(300),
        borderColor:'black',
        marginTop:RFValue(225)
    },
    tempImage2:{
        width:RFValue(100),
        height:RFValue(100),
        resizeMode:'stretch',
        marginLeft:RFValue(300),
        borderColor:'black'
    }
})