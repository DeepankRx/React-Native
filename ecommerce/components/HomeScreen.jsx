import {
  ImageBackground,
  Platform,
  Text,
  ScrollView,
  View,
  Box,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../ui/Card';
import { Stack, Button } from '@react-native-material/core';
import { useSelector } from 'react-redux';
const HomeScreen = ({ navigation }) => {
  const handlePress = (route) => {
    navigation.navigate(route);
  };
  const [products, setProducts] = useState([]);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        'http://192.168.242.78:5000/api/product/getAllProducts'
      );
      setProducts(response.data.products);
      console.log(response.data.products);
    }
    getProducts();
  }, [isLoggedIn]);
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
    <ScrollView>
      {products.map((product, i = 0) => (
        <Card key={product._id} product={product} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet({
  Box: {
    backgroundColor: '#ff1012',
  },
});

export default HomeScreen;
