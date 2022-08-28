import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector ,useDispatch} from 'react-redux';
import { IconButton, Button, Box, Stack } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { setLoggedIn } from '../redux/loginReducer';
const Profile = () => {
  const [revealed, setRevealed] = useState(false);
  const User = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  console.log(User);
  return (
    <View style={{ flex: 1 }}>
      {/* <Image
        style={{
          radius: '50%',
          borderRadius: '50%',
          width: 150,
          height: 150,
          alignSelf: 'center',
          marginTop: '5%',
        }}
        source={require('../assets/bg.jpg')}
      /> */}
      <Box
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: '5%',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Name : {User.name}
        </Text>
        <Text style={{ fontSize: 20 }}>Email : {User.email}</Text>
      </Box>
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
        {/* <Button
          variant="contained"
          title="Logout"
          style={{
            backgroundColor: '#ff4081',
            marginTop: 20,
          }}
          onPress={() => setRevealed(!revealed)}
        /> */}
        <IconButton
          icon={() => (
            <Icon
              name="logout"
              size={30}
              color="#ff4081"
              style={{ marginTop: 20 }}
            />
          )}
          onPress={() => 
            dispatch(setLoggedIn(false))
          }
        />
      </Stack>
    </View>
  );
};

export default Profile;
