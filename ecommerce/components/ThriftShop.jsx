import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './NavBar';
import AddressScreen from './AddressScreen';
import Payment from './Payment';
import { useEffect } from 'react';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderHistory from './OrderHistory';
import Checkout from './Checkout';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Cart from './Cart';
import AdminNavBar from '../admin/NavBar';
import SingleProduct from './SingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/loginReducer';
import AllProducts from '../admin/AllProducts';
import AddProduct from '../admin/AddProduct';
import AllUsers from '../admin/AllUsers';
import EditProduct from '../admin/EditProduct';
import Orders from '../admin/Orders';
export default function ThriftShop() {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  AsyncStorage.getItem('user')
    .then((data) => {
      if (data) {
        dispatch(setLoggedIn(true));
      }
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        setPreviousData(JSON.parse(data));
        dispatch(setLoggedIn(true));
      }
      getData();
    };
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
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen name="Add Product" component={AddProduct} />
          <Stack.Screen name="All Products" component={AllProducts} />
          <Stack.Screen name="All Users" component={AllUsers} />
          <Stack.Screen name="AdminPanel" component={AdminNavBar} />
          <Stack.Screen name="EditProduct" component={EditProduct} />
          <Stack.Screen name="Orders" component={Orders} />
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
