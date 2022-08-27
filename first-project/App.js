import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Button,
  Alert,
  Platform,
} from 'react-native';

export default function App() {
  const heightOfScreen = Dimensions.get('window').height;
  const widthOfScreen = Dimensions.get('window').width;
  console.log(heightOfScreen);
  console.log(widthOfScreen);
  console.log(StatusBar.currentHeight);
  return (
    // // <SafeAreaView style={styles.container}>
    // //   <Text
    // //     numberOfLines={4}
    // //     onPress={() => {
    // //       alert('You tapped the button!');
    // //     }}
    // //   >
    // //     Hello! This is my first app .
    // //   </Text>
    //   {/* <TouchableNativeFeedback */}
    //   {/* // onPress={() => { */}
    //   {/* //   alert('You tapped the button!');
    //     // }}
    //   // > */}
    //   {/* <Image
    //       fadeDuration={1000}
    //       resizeMode="contain"
    //       source={{
    //         uri: 'https://picsum.photos/200/300',
    //         width: 200,
    //         height: 300,
    //       }}
    //       style={styles.image}
    //     /> */}
    //   {/* <View style={styles.button}>
    //       <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
    //     </View> */}
    //   {/* </TouchableNativeFeedback> */}
    //   {/* <Button
    //     title="Press Me"
    //     onPress={() => { */}
    //       {/* // Alert.alert('Are you sure?', 'Press Ok to continue', [
    //       //   { */}
    //       {/* //     text: 'YES',
    //       //     onPress: () => {
    //       //       alert('You pressed YES');
    //       //     },
    //       //   },
    //       //   {
    //       //     text: 'NO',
    //       //     onPress: () => {
    //       //       alert('You pressed NO');
    //       //     },
    //       //   },
    //       // ]);
    //     //   Alert.prompt('Enter your name', 'What is your name?', (text) => {
    //     //     alert(`Hello ${text}`);
    //     //   });
    //     // }}
    //   /> */}
    //   {/* <StatusBar style="auto" />
    // </SafeAreaView> */}
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}
    >
      <View
        style={{
          flex: 2,
          backgroundColor: 'blue',
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'gold',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:
      Platform.OS === 'android' ? Dimensions.get('screen').height * 0.05 : 0,
  },
});
