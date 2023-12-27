import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, Button,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from './Header/Header';
import Main from './Main/Main';
import { BackgroundImage } from 'react-native-elements/dist/config';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import { useEffect, useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator/QRCodeGenerator';

export default function App() {
  const [page,setPage]=useState('signUp');
  const [user,setUser]=useState('');
  const [id,setId]=useState('');
  const [image,setImage]=useState('');
 
  return (

 <View style={styles.container}>
  
    
     <Header setPage={setPage} user={user} image={image} userId={id} page={page}/>
    {page==='signUp'?<SignUp setPage={setPage}/>:page==='login'?<Login setPage={setPage} setImage={setImage} setId={setId} setUser={setUser}/>:<Main id={id}/>}
     
 
 </View>
 
   
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire container
    justifyContent: 'center', // Center content vertically
  },
  container: {
    flex: 1,
   backgroundColor:'#eee'
  },
  

});
