import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Button,
  Avatar,
} from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../redux/loginReducer';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
const NavBar = ({ User }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);
  const handlePress = (route) => {
    navigation.navigate(route);
  };
  const [userFromStorage, setUserFromStorage] = useState(null);
  console.log(User);
  useEffect(() => {
    console.log('user is not logged in');
    const fetchFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          setUserFromStorage(JSON.parse(value));
          dispatch(setUser(JSON.parse(value)));
        }
      } catch (error) {
        navigation.navigate('Login');
      }
    };
    fetchFromStorage();
  }, []);
  console.log(userFromStorage);
  return (
    <AppBar
      style={{ backgroundColor: '#ff4081' }}
      title="Thrift Shop"
      leading={(props) => (
        <IconButton
          onPress={() => navigation.navigate('Home')}
          icon={(props) => <Icon name="home" {...props} />}
          {...props}
        />
      )}
      trailing={(props) => (
        <Button
          variant="text"
          title={
            isLoggedIn ? (
              <IconButton
                icon={
                  <Avatar
                    label={User ? User.name : userFromStorage.name}
                    size={28}
                  />
                }
                onPress={() => {
                  navigation.navigate('Profile');
                  // dispatch(setLoggedIn(false));
                }}
              />
            ) : (
              <IconButton
                icon={(props) => <Icon name="login" {...props} />}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
            )
          }
          compact
          style={{ marginEnd: 4 }}
          {...props}
        />
      )}
    />
  );
};

export default NavBar;
