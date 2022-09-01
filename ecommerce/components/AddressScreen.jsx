import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { TextInput } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const AddressScreen = (props) => {
  const user = useSelector((state) => state.login.user);
  console.log(user);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const saveAddress = async () => {
    if (
      //check if defaultValue has length > 0
      !name ||
      !phoneNumber ||
      !pincode ||
      !address ||
      !locality ||
      !city ||
      !state
    ) {
      alert('Please fill all the fields');
      return;
    }

    const user = await AsyncStorage.setItem(
      'address',
      JSON.stringify({
        name,
        phoneNumber,
        pincode,
        address,
        locality,
        city,
        state,
        landmark,
      })
    );

    navigation.navigate('Home');
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.heading}>Checkout</Text>
        <TextInput
          label="Name"
          style={{ margin: 16 }}
          onChangeText={(text) => setName(text)}
          defaultValue={name}
        />
        <TextInput
          label="Phone Number"
          style={{ margin: 16 }}
          onChangeText={(text) => setPhoneNumber(text)}
          defaultValue={phoneNumber}
        />
        <TextInput
          label="Pincode"
          style={{ margin: 16 }}
          onChangeText={(text) => setPincode(text)}
          defaultValue={pincode}
        />
        <TextInput
          label="Locality"
          style={{ margin: 16 }}
          onChangeText={(text) => setLocality(text)}
          defaultValue={locality}
        />
        <TextInput
          label="Address"
          style={{ margin: 16 }}
          onChangeText={(text) => setAddress(text)}
          defaultValue={address}
        />
        <TextInput
          label="City/District/Town"
          style={{ margin: 16 }}
          onChangeText={(text) => setCity(text)}
          defaultValue={city}
        />
        <TextInput
          label="State"
          style={{ margin: 16 }}
          onChangeText={(text) => setState(text)}
          defaultValue={state}
        />
        <TextInput
          label="Landmark(Optional)"
          style={{ margin: 16 }}
          onChangeText={(text) => setLandmark(text)}
          defaultValue={landmark}
        />
        <Button
          style={{
            backgroundColor: 'red',
            marginTop: 20,
          }}
          title="Cash on Delivery"
          onPress={saveAddress}
          defaultValue={landmark}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
    height: 30,
    marginTop: 10,
  },
});

export default AddressScreen;
