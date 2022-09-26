import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack, Button } from '@react-native-material/core';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AdminNavBar from '../admin/NavBar';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { DataTable, IconButton } from 'react-native-paper';
const AllProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        'https://thrift-shop-app.herokuapp.com/api/product/getAllProducts'
      );
      setProducts(res.data.products);
      console.log(res.data.products);
    };
    fetchProducts();
  }, []);
  const deleteProduct = async (id) => {
    const res = await axios.delete(
      `https://thrift-shop-app.herokuapp.com/api/product/deleteProduct/${id}`
    );
    console.log(res.data);
    if (res.status === 200) {
      alert('Product deleted successfully');
    }
  };
  const editProduct = (id) => {
    navigation.navigate('EditProduct', { id });
  };

  return (
    <ScrollView>
      <AdminNavBar />
      {products.length > 0 ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Product Name</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>
          {products.map((product) => (
            <DataTable.Row
              key={product._id}
              style={{
                backgroundColor: '#fff',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
              }}
            >
              <DataTable.Cell
                style={{
                  width: 100,
                }}
              >
                {product.name}
              </DataTable.Cell>

              <DataTable.Cell
                style={{
                  width: 100,
                }}
              >
                <Stack
                  fill
                  spacing={7}
                  shouldWrapChildren={true}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    title="Edit"
                    style={{
                      backgroundColor: '#ff4081',
                      marginRight: 10,
                    }}
                    onPress={() => editProduct(product._id)}
                  />
                  <Button
                    variant="contained"
                    title="Delete"
                    style={{
                      marginRight: 10,
                    }}
                    onPress={() => deleteProduct(product._id)}
                  />
                </Stack>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        <Text>No Products</Text>
      )}
    </ScrollView>
  );
};

export default AllProducts;

const styles = StyleSheet.create({});
