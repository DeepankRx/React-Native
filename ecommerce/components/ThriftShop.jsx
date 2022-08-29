import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Cart from './Cart';
import SingleProduct from './SingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/loginReducer';
export default function ThriftShop() {
  const dispatch = useDispatch();
  const [previousData, setPreviousData] = useState([]);
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((value) => {
        if (value) {
          setPreviousData(JSON.parse(value));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.droidSafeArea}>
        <NavBar Login={isLoggedIn ? 'Logout' : 'Login'} User={user} />
        <Stack.Navigator
          //   initialRouteName={
          //    "NavBar","HomeScreen"
          //   }
          //pass two initial routes to the stack navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="NavBar" component={NavBar} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cart" component={Cart} />
          {isLoggedIn ? (
            <>
              <Stack.Screen name="SingleProduct" component={SingleProduct} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : null}
        </Stack.Navigator>
        {/* <HomeScreen /> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: Platform.OS === 'android' ? 32 : 0,
  },
});
