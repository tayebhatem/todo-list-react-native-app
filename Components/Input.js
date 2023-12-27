import React, { useRef, useState ,useEffect} from 'react';
import { StyleSheet, View, TextInput, Button,Text,TouchableOpacity,Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import showSuccessToast from '../Toast/SuccessToast';
import { color } from 'react-native-elements/dist/helpers';



export default function Input({setTask,userId,tasks}) {
  const [text, setText] = useState('');
  const [valid,setValid]=useState(true);

  const insertHandler = () => {
   if(text===''){
setValid(false);
   }else{
    fetch("https://todoapp-react-native.mohamedkacem1.repl.co/tasks?userid="+userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        task: text,
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
     
      console.log("Task status added:");
      if (tasks.length>0) {
        setTask((prevTasks) => {return [...prevTasks, data];});
      }else{
        setTask(data);
      }
      setValid(true);
      setText(''); 
      Alert.alert('Success', 'Insertion successful!');
    })
    .catch((error) => {
      console.error("Error adding task:", error);
    });
   }

    
  };

  return (
    <View>
      <View style={!valid? [styles.input, { borderColor: 'red' }] : styles.input}>
      <TextInput
        placeholder='Write task here...'
        onChangeText={(text) => setText(text)}
        value={text}
        style={{ flex: 1 }}
        
      />
      <TouchableOpacity onPress={insertHandler}>
      <AntDesign name="plus" size={24} color="black"  />
      </TouchableOpacity>
     
    </View>
    {!valid? <Text style={{color:'red',alignSelf:'center',marginTop:5}}>Empty failed !</Text>:null}
    </View>
    
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderWidth:1
  }
});
