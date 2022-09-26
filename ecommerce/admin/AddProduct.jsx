import React, { useState } from 'react';
import { TextInput } from '@react-native-material/core';
import { Stack, Button } from '@react-native-material/core';
import axios from 'axios';
import { ScrollView } from 'react-native';
import AdminNavBar from '../admin/NavBar';
const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const handleAddProduct = async () => {
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
      const res = await axios.post(
        'https://thrift-shop-app.herokuapp.com/api/product/createProduct',
        product
      );
      console.log(res.data);
      if (res.status === 200) {
        alert('Product added successfully');
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
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Product Price"
        style={{ marginTop: 20 }}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <TextInput
        label="Product Description"
        style={{ marginTop: 20 }}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        label="Product Image"
        style={{ marginTop: 20 }}
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <TextInput
        label="Product Category"
        style={{ marginTop: 20 }}
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TextInput
        label="Product Stock"
        style={{ marginTop: 20 }}
        value={stock}
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
        onPress={() => handleAddProduct()}
      >
        Add Product
      </Button>
    </ScrollView>
  );
};

export default AddProduct;
