import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
const SingleProduct = () => {
  const route = useRoute();
  console.log(route.params.id);
  const [product, setProduct] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://thrift-shop-app.herokuapp.com/api/product/getProductById/${route.params.id}`
      );
      console.log(response.data);
      setProduct(response.data.product);
    }
    fetchData();
  }, [route.params.id]);
  return (
    //create a component that will render the single product
    <View style={{ flex: 1,  justifyContent: 'center' }}>
        <Image source={{ uri: product.image }} style={{ width: '100%', height: 200 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FA9494' }}>{product.name}</Text>
        <Text style={{ fontSize: 20 }}>{product.price}</Text>
        <Text style={{ fontSize: 20 }}>{product.description}</Text>
        <Text style={{ fontSize: 20 }}>{product.category}</Text>
    </View>
  );
};

export default SingleProduct;
