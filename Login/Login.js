import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text,Alert,TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import SignUp from '../SignUp/SignUp';
const Login = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
const signUp=()=>{
    props.setPage('signUp');
}

  const handleLogin = () => {
    // Basic validation checks
    if (!username.trim() || !password.trim() ) {
      setErrorMessage('All fields are required');
      return;
    }

   

    // Password length check
    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters');
      return;
    }

    axios.post('https://todoapp-react-native.mohamedkacem1.repl.co/tasks/login', {
      username: username,
      password: password,
    })
    .then(response => {
        props.setUser(username);
        props.setId(response.data.userid);
       
        
        props.setImage(response.data.photo);
     
        

        props.setPage('profile');

   
    })
    .catch(error => {
    
      setErrorMessage('Wrong email or password !');
    });
  };
    
  
  return (
    <View style={styles.container}>
     <View style={[styles.input,errorMessage? styles.validation:null]}>
     <FontAwesome5 name="user-alt" size={20} color="#444" />
     <TextInput
        
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
     </View>
      <View style={[styles.input,errorMessage? styles.validation:null]}>
      <FontAwesome5 name="lock" size={20} color="#444" />
      <TextInput
       
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      </View>
     
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      
      <TouchableOpacity onPress={handleLogin} style={styles.login}>
     <Text style={{color:'#fff'}}> Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signUp}>
      <Text>Don't have account ?</Text>
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
  login:{
    backgroundColor:'#0245D1',
    padding:15,
    borderRadius:5,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },
  validation:{
    borderWidth: 1,
    borderColor: 'red'
  }
});

export default Login;
