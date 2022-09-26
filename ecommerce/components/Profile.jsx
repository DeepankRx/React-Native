import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoggedIn } from '../redux/loginReducer';
// import { useNavigation } from '@react-navigation/native';
// const Profile = () => {
//   const navigation = useNavigation();
//   const [revealed, setRevealed] = useState(false);
//   const User = useSelector((state) => state.login.user);
//   if (!User) {
//     navigation.navigate('Login');
//   }
//   const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
//   const dispatch = useDispatch();
//   const handleLogout = async () => {
//     dispatch(setLoggedIn(false));
//     await AsyncStorage.removeItem('user');
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* <Image
//         style={{
//           radius: '50%',
//           borderRadius: '50%',
//           width: 150,
//           height: 150,
//           alignSelf: 'center',
//           marginTop: '5%',
//         }}
//         source={require('../assets/bg.jpg')}
//       /> */}
//       <Box
//         style={{
//           width: '90%',
//           alignSelf: 'center',
//           marginTop: '5%',
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
//           Name : {User.name}
//         </Text>
//         <Text style={{ fontSize: 20 }}>Email : {User.email}</Text>
//       </Box>
//       <Stack
//         fill
//         spacing={7}
//         shouldWrapChildren={true}
//         style={{
//           flex: 1,
//           flexDirection: 'row',
//           justifyContent: 'center',
//         }}
//       >
//         {/* <Button
//           variant="contained"
//           title="Logout"
//           style={{
//             backgroundColor: '#ff4081',
//             marginTop: 20,
//           }}
//           onPress={() => setRevealed(!revealed)}
//         /> */}
//         <IconButton
//           icon={() => (
//             <Icon
//               name="cart"
//               size={30}
//               color="#ff4081"
//               style={{ marginTop: 20 }}
//             />
//           )}
//           onPress={() => navigation.navigate('Cart')}
//         />
//         <IconButton
//           icon={() => (
//             <Icon
//               name="logout"
//               size={30}
//               color="#ff4081"
//               style={{ marginTop: 20 }}
//             />
//           )}
//           onPress={() => handleLogout()}
//         />
//         <IconButton
//           icon={() => (
//             <Icon
//               name="leaf"
//               size={30}
//               color="#ff4081"
//               style={{ marginTop: 20 }}
//             />
//           )}
//           onPress={() => navigation.navigate('AdminPanel')}
//         />
//       </Stack>
//     </View>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const DropdownComponent = () => {
  const data = [
    {
      label: 'Cart',
      value: 'Cart',
    },
    {
      label: 'Checkout',
      value: 'Checkout',
    },
    {
      label: 'Order History',
      value: 'OrderHistory',
    },
    {
      label: 'Logout',
      value: 'Logout',
    },
  ];
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const User = useSelector((state) => state.login.user);
  console.log(User);
  if (!User) {
    navigation.navigate('Login');
  }
  if (User.isAdmin) {
    data.push({
      label: 'Admin Panel',
      value: 'AdminPanel',
    });
  }
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setLoggedIn(false));
    await AsyncStorage.removeItem('user');
  };
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        iconColor="black"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          if (item.value === 'Logout') {
            handleLogout();
          } else navigation.navigate(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </ScrollView>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
