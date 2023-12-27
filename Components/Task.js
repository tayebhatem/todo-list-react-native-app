import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, Button,TouchableOpacity ,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { useState,useEffect } from 'react';


export default function Task(props) {
   
   
    const [isHidden, setIsHidden] = useState(false);
    const [status, setStatus] = useState(props.status === 'done' ? 'done' : 'todo');
    useEffect(() => {
      setStatus(props.status === 'done' ? 'done' : 'todo');
  }, [props.status]);

const handleDelete=()=>{
    fetch('https://todoapp-react-native.mohamedkacem1.repl.co/tasks/'+props.id+"?userid="+props.userId, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              
              setIsHidden(true);
             
              
            });
}


        const handleCheckBox = () => {

          const newStatus = status === 'todo' ? 'done' : 'todo';
          setStatus(newStatus);
  
        
        fetch('https://todoapp-react-native.mohamedkacem1.repl.co/tasks/'+props.id+"?userid="+props.userId, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Task status updated:", data);
            });

        }
    
        if (isHidden) {
            return null; 
          }
     
  return (
    <View style={styles.item}
    
    >
    <CheckBox
        style={styles.select}
        onPress={handleCheckBox}
        checked={status === 'done'}
       
    />

    <Text style={status === 'done' ? [styles.taskText, { textDecorationLine: 'line-through' }] : styles.taskText}>
        {props.text}
    </Text>
    <TouchableOpacity onPress={handleDelete} style={styles.delete}>
    <FontAwesome5 name="trash" size={22} color="#444"   />
    </TouchableOpacity>
   
</View>
  )
}
const styles = StyleSheet.create({
    item:{
    flexDirection:'row',
     justifyContent:'space-around',
    alignItems:'center',
   
    borderRadius:5,
    backgroundColor:'#fff',
    width:'100%',
    height:50,
    marginVertical:15,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
    },
    select:{
     padding:-10,
     margin:10,
    flex:1
    },
    taskText:{
     fontSize:18,
     
     flex:2,
     textAlign:'center'
     
    },
    delete:{
        flex:1
    },
    checked:{
        textDecorationLine:'line-through',
        fontSize:18,
        flex:2,
        textAlign:'center'
    }
  });