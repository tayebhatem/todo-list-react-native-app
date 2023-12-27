import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text,Alert, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { color } from 'react-native-elements/dist/helpers';
const SignUp = ({setPage}) => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const login=()=>{
    setPage('login')
  }
  const handleRegister = () => {
    // Basic validation checks
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Password length check
    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters');
      return;
    }

    axios.post('https://todoapp-react-native.mohamedkacem1.repl.co/tasks/users', {
      username: username,
      password: password,
    })
    .then(response => {
      
            Alert.alert('Success', 'login successful!');
      
       

       
    })
    .catch(error => {
     
      setErrorMessage(error.response.data.message);
    });
  };
    
  
  return (
    <View style={styles.container}>
     <View style={styles.input}>
     <FontAwesome5 name="user-alt" size={20} color="#444" />
     <TextInput
        
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
     </View>
      <View style={styles.input}>
      <FontAwesome5 name="lock" size={20} color="#444" />
      <TextInput
       
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      </View>
      <View style={styles.input}>
      <FontAwesome5 name="lock" size={20} color="#444" />
      <TextInput
       
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={handleRegister} style={styles.register}>
     <Text style={{color:'#fff'}}> Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={login}>
      <Text>Already have account ?</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop:60,
    gap:15
  },
  input: {
    flexDirection: 'row',
    gap:20,
   
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  register:{
    backgroundColor:'#0245D1',
    padding:15,
    borderRadius:5,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  }
});

export default SignUp;
