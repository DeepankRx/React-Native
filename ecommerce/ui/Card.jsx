import { View, Image, Text, Platform } from 'react-native';
import { Button } from '@react-native-material/core';
const Card = ({ product }) => {
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%',
      }}
    >
      <Image
        source={{ uri: product.image }}
        style={{ width: '100%', height: 200 }}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.name}</Text>
      <Text style={{ fontSize: 20 }}>{product.price}</Text>
      <Text style={{ fontSize: 20 }}>{product.description}</Text>
      <Text style={{ fontSize: 20 }}>{product.category}</Text>
      <Button
        variant="outlined"
        title="Add To Cart"
        color="#ff4081"
        style={{
          backgroundColor: '#fff',
          marginTop: Platform.OS === 'android' ? 350 : 0,
          marginRight: Platform.OS === 'android' ? 10 : 0,
        }}
      />
    </View>
  );
};
export default Card;
