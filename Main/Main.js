import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, Button,TouchableOpacity ,Image,ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../Components/Input';
import Task from '../Components/Task';
import { useState } from 'react';
import { useEffect } from 'react';
import task from '../task';
import Header from '../Header/Header';
import axios from 'axios';
export default function Main({id}) {
const [tasks,setTasks]=useState([]);
const [error, setError] = useState(null);

const fetchData = async () => {
 
  try {
    const response = await axios.get('https://todoapp-react-native.mohamedkacem1.repl.co/tasks/',{
      params: { userid: id }
    });
    const result = response.data; // Access the response data directly

    setTasks(result);
  } catch (error) {
    console.error('fetch failed:', error);
    // Handle error, display error message, etc.
  }
  
};

useEffect(() => {
  // Call the fetch function
  fetchData();
}, []);




  return (
    
   <View style={styles.main}>
    <Input setTask={setTasks} userId={id} tasks={tasks}/>
    <ScrollView style={styles.tasks} >
   {tasks.length>0 ? (
    tasks.map((item) => (
          <Task key={item._id} text={item.task} status={item.status} id={item._id} setTask={setTasks} userId={id}/>
        ))
   
   ):null}
    </ScrollView>
   </View>
  )
}
const styles = StyleSheet.create({
    main:{
   
    justifyContent:'space-between',
    alignItems:'center',
    padding:35,
 

      
    },
  tasks:{
    marginTop:20,
height:'50%',


  }
  });