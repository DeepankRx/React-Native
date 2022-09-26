import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressScreen from './AddressScreen';
const Checkout = ({ navigation }) => {
  let user;
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getAddress = async () => {
      user = await AsyncStorage.getItem('address');
      if (user) {
        setAddress(JSON.parse(user));
      }
    };
    getAddress();
  }, []);
  return (
    <View>
      <AddressScreen address={address} />
    </View>
  );
};

export default Checkout;
