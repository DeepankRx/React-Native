import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack, Button } from '@react-native-material/core';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AdminNavBar from '../admin/NavBar';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { DataTable, IconButton } from 'react-native-paper';

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(
        'https://thrift-shop-app.herokuapp.com/api/product/getAllOrders'
      );
      setOrders(res.data.orders);
      console.log(res.data.orders);
    };
    fetchOrders();
  }, []);
  const markAsDelivered = async (id) => {
    const res = await axios.get(
      `https://thrift-shop-app.herokuapp.com/api/product/markOrderAsDelivered/${id}`
    );
    console.log(res.data);
    if (res.status === 200) {
      alert('Order marked as delivered');
    }
  };
  const markAsShipped = async (id) => {
    const res = await axios.get(
      `https://thrift-shop-app.herokuapp.com/api/product/markOrderAsShipped/${id}`
    );
    console.log(res.data);
    if (res.status === 200) {
      alert('Order marked as shipped');
    }
  };

  return (
    <ScrollView>
      <AdminNavBar />
      {orders.length > 0 ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title
              style={{
                width: 200,
                flex: 1,
                flexGrow: 1,
              }}
            >
              Order Id
            </DataTable.Title>
            <DataTable.Title>Shipped?</DataTable.Title>
            <DataTable.Title>Delivered?</DataTable.Title>
          </DataTable.Header>
          {orders.map((order) => (
            <DataTable.Row
              key={order._id}
              style={{
                backgroundColor: '#fff',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                width: '100%',
                margin: 10,
              }}
            >
              <DataTable.Cell
                style={{
                  width: 100,
                }}
              >
                {order._id}
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
                    variant="outlined"
                    title={order.isShipped ? '✅' : '❌'}
                    style={{
                      marginRight: 10,
                    }}
                    onPress={() => markAsShipped(order._id)}
                  />
                </Stack>
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
                    variant="outlined"
                    title={order.isDelivered ? '✅' : '❌'}
                    style={{
                      marginRight: 10,
                    }}
                    onPress={() => markAsDelivered(order._id)}
                  />
                </Stack>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        <Text>No orders</Text>
      )}
    </ScrollView>
  );
};

export default Orders;
