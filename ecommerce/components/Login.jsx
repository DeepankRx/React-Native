import React, { useState } from 'react';
import { TextInput } from '@react-native-material/core';
import { Stack, Button } from '@react-native-material/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setUser } from '../redux/loginReducer';
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state);
  console.log(isLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const login = async () => {
    try {
      if (email === '' || password === '') {
        alert('Please enter email and password');
      }
      const response = await axios.post(
        'http://192.168.242.78:5000/api/user/login',
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        dispatch(setLoggedIn(true));
        dispatch(setUser(response.data.user));
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.response && error.response.data)
        alert(error.response.data.message);
      else alert(error.message);
    }
  };

  return (
    <>
      <TextInput
        label="Email"
        style={{ margin: 16 }}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        style={{ margin: 16 }}
        secureTextEntry={showPassword}
        onChangeText={(text) => setPassword(text)}
      />
      <Stack
        fill
        spacing={7}
        shouldWrapChildren={true}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          style={{ margin: 16 }}
          onPress={() => setShowPassword(!showPassword)}
          title={!showPassword ? 'Hide Password' : 'Show Password'}
        />
        <Button
          variant="contained"
          title="Login"
          style={{
            backgroundColor: '#ff4081',
            marginTop: 20,
          }}
          onPress={() => login()}
        />
      </Stack>
    </>
  );
};
export default Login;
