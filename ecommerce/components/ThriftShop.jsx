import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import NavBar from './NavBar';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import { useSelector } from 'react-redux';
export default function ThriftShop() {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  console.log(user);
  console.log(isLoggedIn);
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
          <Stack.Screen name="Profile" component={Profile} />
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
