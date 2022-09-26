import {
  View,
  Image,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../redux/cartReducer';
const Card = ({ product }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%',
      }}
    >
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('SingleProduct', { id: product._id })
        }
      >
        <Image
          source={{ uri: product.image }}
          style={{ width: '100%', height: 200, borderRadius: 100 }}
        />
      </TouchableWithoutFeedback>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FA9494' }}>
        {product.name}
      </Text>
      <Text style={{ fontSize: 20 }}>{product.price}</Text>
      <Text style={{ fontSize: 20 }}>{product.description}</Text>
      <Text style={{ fontSize: 20 }}>{product.category}</Text>
      <Button
        variant="outlined"
        title="Add To Cart"
        color="#ff4081"
        style={{
          backgroundColor: '#fff',
          marginTop: 50,
        }}
        onPress={() => dispatch(addToCart({ product }))}
      />
    </View>
  );
};
export default Card;
