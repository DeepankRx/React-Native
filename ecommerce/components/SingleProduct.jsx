import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SimilarProduct from './SimilarProduct';
import Loading from './Loading';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
const SingleProduct = () => {
  const route = useRoute();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://thrift-shop-app.herokuapp.com/api/product/getProductById/' +
          route.params.id
      );
      setProduct(result.data.product);
    };
    fetchData();
  }, [route.params.id]);
  return (
    <>
      {product.image ? (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: product.image }}
            style={{ width: '100%', height: 200 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            Name : {product.name}
          </Text>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>
            Price : ₹{product.price}
          </Text>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>
            Description :{product.description}
          </Text>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>
            Category : {product.category}
          </Text>
        </View>
      ) : (
        <Loading />
      )}
      {product.image ? (
        <SimilarProduct category={product.category} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SingleProduct;
