import React, { useState } from 'react';
import { TextInput } from '@react-native-material/core';
import { Stack, Button } from '@react-native-material/core';
import axios from 'axios';
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const createAccount = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    if (name.length < 2) {
      alert('Name must be at least 2 character');
      return;
    }
    if (!email.includes('@') || !email.includes('.') || email.length < 6) {
      alert('Email is not valid');
      return;
    }
    try {
      const response = await axios.post(
        'https://thrift-shop-app.herokuapp.com/api/user/signup',
        {
          email,
          password,
          name,
        }
      );
      if (response.status === 200) {
        alert('Account created successfully');
        navigation.navigate('Login');
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
        label="Name"
        style={{ margin: 16 }}
        onChangeText={(text) => setName(text)}
      />
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
      <TextInput
        label="Confirm Password"
        style={{ margin: 16 }}
        secureTextEntry={showPassword}
        onChangeText={(text) => setConfirmPassword(text)}
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
          title="Create Account"
          style={{
            backgroundColor: '#ff4081',
            marginTop: 20,
          }}
          onPress={() => createAccount()}
        />
      </Stack>
    </>
  );
};
export default SignUp;
