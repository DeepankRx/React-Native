import { ImageBackground, Platform, Text } from 'react-native';
import React from 'react';
import { Stack, Button } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';
const HomeScreen = ({ navigation }) => {
  const handlePress = (route) => {
    navigation.navigate(route);
  };
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return !isLoggedIn ? (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
    >
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
          variant="contained"
          title="Login"
          style={{
            backgroundColor: '#ff4081',
            marginRight: 10,
            marginTop: Platform.OS === 'android' ? 350 : 0,
            marginLeft: Platform.OS === 'android' ? 100 : 0,
          }}
          onPress={() => handlePress('Login')}
        />
        <Button
          variant="outlined"
          title="SignUp"
          color="#ff4081"
          style={{
            backgroundColor: '#fff',
            marginTop: Platform.OS === 'android' ? 350 : 0,
            marginRight: Platform.OS === 'android' ? 10 : 0,
          }}
          onPress={() => handlePress('SignUp')}
        />
      </Stack>
    </ImageBackground>
  ) : (
    <Text>You are not logged in</Text>
  );
};

export default HomeScreen;
