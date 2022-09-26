import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
export default function SimilarProduct({ category }) {
  const navigation = useNavigation();
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://thrift-shop-app.herokuapp.com/api/product/getProductByCategory/' +
          category
      );
      setSimilarProducts(result.data.products);
    };
    fetchData();
  }, [category]);

  if (similarProducts.length === 0) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, marginTop: 200 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
          textAlign: 'center',
        }}
      >
        Similar Products
      </Text>

      <ScrollView horizontal={true}>
        {similarProducts.length > 0 &&
          similarProducts.map((product, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                navigation.navigate('SingleProduct', { id: product._id })
              }
            >
              <Image
                key={product._id}
                source={{ uri: product.image }}
                style={{ width: 100, height: 100, margin: 10 }}
              />
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
    </View>
  );
}
