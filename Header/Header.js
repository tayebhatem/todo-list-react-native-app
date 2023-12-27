import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, Button,TouchableOpacity ,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import ProfileInfo from '../ProfileInfo/ProfileInfo';

export default function Header(props) {
  
 
  return (
   
      <View style={styles.header}>
    {props.page==='profile'? <ProfileInfo setPage={props.setPage} user={props.user} image={props.image} userId={props.userId}/>:<FontAwesome name="user-circle-o" size={120} color="#fff" style={styles.logo} />}
    
   </View>
  
   
  )
}





  const styles = StyleSheet.create({
   
    header:{
      
     
      paddingVertical:50,
      paddingHorizontal:20,
      height:'38%',
      backgroundColor:'#0245D1',
      borderBottomRightRadius:60,
      borderBottomLeftRadius:60,
      elevation: 4,
    },
    logo:{
      alignSelf:'center',
     position:'absolute',
     bottom:-60,
     backgroundColor:'#0245D1',
     padding:10,
     borderRadius:100
    }
  });

