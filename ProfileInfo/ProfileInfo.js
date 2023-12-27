import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, Button,TouchableOpacity ,Image,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function ProfileInfo(props) {
    const [image, setImage] = useState(props.image);
   
    const pickImage = async () => {
      try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (!permissionResult.granted) {
          Alert.alert('Permission Denied', 'Please allow access to the photo library');
          return;
        }
  
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
       

        if (!result.canceled) {
        setImage(result.assets[0].uri);
         
 
        
      
      const endpointUrl = 'https://todoapp-react-native.mohamedkacem1.repl.co/tasks/users/'+props.userId+'/photo'; // Replace with your server URL

      const formData = new FormData();
      formData.append('photo', {
        uri: result.assets[0].uri,
        type: 'image/jpeg', // Adjust the type based on the image file type
        name: 'profile.jpg', // Adjust the name as needed
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Send the image to the server using Axios
      const response = await axios.patch(endpointUrl, formData, config);

      // Handle the server's response as needed
      console.log('Image uploaded:', response.data);
      
    }
         
        
      } catch (error) {
        console.error('ImagePicker Error:', error);
        Alert.alert('Error', 'Could not pick an image');
      }
    };
  
    const logOut=()=>{
        
        props.setPage('login');
    }
  return (
    <View style={styles.profile}>
         <TouchableOpacity style={styles.logout} onPress={logOut}>
      <MaterialIcons name="logout" size={32} color="#fff" />
      </TouchableOpacity>
    <TouchableOpacity onPress={pickImage}>
    {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <Image source={{ uri: props.image }} style={styles.img} />
        )}
    <Entypo name="edit" size={20} color="#444" style={styles.edit} />
    </TouchableOpacity>

    <Text style={styles.fullName}>{props.user}</Text>
    </View>
  )
};
const styles = StyleSheet.create({
   
   profile:{
    alignItems:'center',
    justifyContent:'space-between',
    gap:30,
   },
    fullName:{
        fontSize:24,
      
        color:'#fff',
      
        },
        img:{
           borderRadius:50,
           width:100,
           height:100,
           
        },
     logout:{
       alignSelf:'flex-end',
       marginRight:10
     },
     edit:{
      
      position:'absolute',
      right:35,
      bottom:-8,
      backgroundColor:'#fff',
      borderRadius:100,
      padding:5,
      shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
      verticalAlign:'middle',
      textAlign:'center'
     }
  });
