import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Button,
  Avatar,
} from '@react-native-material/core';
import Profile from './Profile';
import { useNavigation } from '@react-navigation/native';
import { setLoggedIn } from '../redux/loginReducer';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
const NavBar = ({ User }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);
  const [loggedInUser, setLoggedInUser] = useState('Login');
  const handlePress = (route) => {
    navigation.navigate(route);
  };

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
                icon={<Avatar label={User.name} size={28} />}
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
