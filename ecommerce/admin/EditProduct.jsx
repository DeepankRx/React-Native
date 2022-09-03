import React, { useState, useEffect } from 'react';
import { TextInput } from '@react-native-material/core';
import { Stack, Button } from '@react-native-material/core';
import axios from 'axios';
import { ScrollView } from 'react-native';
import AdminNavBar from '../admin/NavBar';
import { useRoute } from '@react-navigation/native';
const EditProduct = () => {
  const route = useRoute();
  const { id } = route.params;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://thrift-shop-app.herokuapp.com/api/product/getProductById/${id}`
      );
      console.log(result.data.product.stock);
      setName(result.data.product.name);
      setPrice(result.data.product.price);
      setDescription(result.data.product.description);
      setCategory(result.data.product.category);
      setImage(result.data.product.image);
      setStock(result.data.product.stock);
    };
    fetchData();
  }, []);
  const handleEditProduct = async () => {
    if (isNaN(price)) {
      alert('Price must be a number');
      return;
    } else if (isNaN(stock)) {
      alert('Stock must be a number');
      return;
    }
    if (Number(stock) < 0 || Number(price) < 0) {
      alert('Stock and Price must be positive numbers');
      return;
    }
    const product = {
      name,
      price,
      description,
      category,
      image,
      stock,
    };
    try {
      const res = await axios.put(
        `https://thrift-shop-app.herokuapp.com/api/product/updateProduct/${id}`,
        product
      );
      console.log(res.data);
      if (res.status === 200) {
        alert('Product updated successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <AdminNavBar />
      <TextInput
        label="Product Name"
        style={{ marginTop: 20 }}
        value={name}
        defaultValue={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Product Price"
        style={{ marginTop: 20 }}
        value={price}
        defaultValue={price}
        onChangeText={(text) => setPrice(text)}
      />
      <TextInput
        label="Product Description"
        style={{ marginTop: 20 }}
        value={description}
        defaultValue={description}
        numberOfLines={4}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        label="Product Image"
        style={{ marginTop: 20 }}
        value={image}
        defaultValue={image}
        numberOfLines={4}
        onChangeText={(text) => setImage(text)}
      />
      <TextInput
        label="Product Category"
        style={{ marginTop: 20 }}
        value={category}
        defaultValue={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TextInput
        label="Product Stock"
        style={{ marginTop: 20 }}
        value={stock}
        defaultValue={stock}
        onChangeText={(text) => setStock(text)}
      />
      <Button
        style={{
          marginTop: 20,
          width: 200,
          height: 50,
          backgroundColor: '#ff4081',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          color: 'white',
        }}
        title="Update Product"
        onPress={() => handleEditProduct()}
      />
    </ScrollView>
  );
};

export default EditProduct;
