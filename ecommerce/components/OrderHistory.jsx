import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const OrderHistory = () => {
  const user = useSelector((state) => state.login.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `https://thrift-shop-app.herokuapp.com/api/cart/orderHistory/${user._id}`
      );
      setOrders(response.data.cart);
      console.log(response.data.cart);
    };
    fetchOrders();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text>{orders.length > 0 ? 'Your Orders' : 'No Orders Yet'}</Text>
      <View style={styles.productContainer}>
        {orders.map((order, index) => (
          <View key={order._id} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                margin: 10,
              }}
            />

            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
              }}
            >
              Order {index + 1}
            </Text>
            <View style={styles.addressContainer}>
              <View style={styles.productCard}>
                <Text style={styles.addressTitle}>Order Time</Text>
                <Text style={styles.date}>
                  Ordered Date : {order.createdAt.split('T')[0]}
                </Text>
                <Text style={styles.time}>
                  Ordered Time : {order.createdAt.split('T')[1].split('.')[0]}
                </Text>
                <Text style={styles.addressTitle}>Shipping Address</Text>
                <Text style={styles.addressText}>
                  Name -{order.address.name}
                </Text>
                <Text style={styles.addressText}>
                  Phone -{order.address.phoneNumber}
                </Text>
                <Text style={styles.addressText}>
                  Address -{order.address.address}
                </Text>
                <Text style={styles.addressText}>
                  City -{order.address.city}
                </Text>
                <Text style={styles.addressText}>
                  State -{order.address.state}
                </Text>
                <Text style={styles.addressText}>
                  Pincode -{order.address.pincode}
                </Text>
                <Text style={styles.addressText}>
                  Landmark -{order.address.landmark}
                </Text>
                <Text style={styles.addressText}>
                  Locality -{order.address.locality}
                </Text>
              </View>
            </View>
            <View style={styles.productCard} key={order._id}>
              {order.products.map((product) => (
                <>
                  <View key={product._id} style={styles.product}>
                    <Image
                      source={{ uri: product.productId.image }}
                      style={styles.productImage}
                    />
                    <Text style={styles.productText}>
                      Product : {product.productId.name}
                    </Text>
                    <Text style={styles.productText}>
                      Price : {product.productId.price}
                    </Text>
                    <Text style={styles.productText}>
                      Quantity : {product.quantity}
                    </Text>
                    <Text style={styles.productText}>
                      Total Price : {product.quantity * product.productId.price}
                    </Text>
                    <Text style={styles.productText}>
                      Category : {product.productId.category}
                    </Text>
                    <Text style={styles.productText}>
                      Description : {product.productId.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      margin: 10,
                    }}
                  />
                </>
              ))}
            </View>
            <View style={styles.productStatusContainer} key={Math.random()}>
              <View>
                <Text style={styles.productStatusText}>
                  Is Delivered : {order.isDelivered ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.productStatusText}>
                  Is Shipped : {order.isShipped ? 'Yes' : 'No'}
                </Text>
                {order.isCancelled && (
                  <Text style={styles.productStatusText}>
                    Is Cancelled : {order.isCancelled ? 'Yes' : 'No'}
                  </Text>
                )}
              </View>
            </View>
            <Text style={styles.amount}>Total : {order.totalAmount}</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                margin: 10,
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },

  productContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 30,
  },
  product: {
    flex: 1,
    flexDirection: 'column',
  },
  productImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  productText: {
    fontSize: 15,
    margin: 2,
  },
  amount: {
    fontSize: 20,
    margin: 10,
    textAlign: 'right',
  },
  date: {
    fontSize: 15,
    margin: 10,

    textAlign: 'left',
  },
  time: {
    fontSize: 15,
    margin: 10,
    textAlign: 'left',
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 30,
  },
  addressTitle: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  addressText: {
    fontSize: 15,
    margin: 2,
    marginLeft: 10,
    textAlign: 'left',
  },
  productStatus: {
    fontSize: 15,
    margin: 2,
    marginLeft: 10,
    textAlign: 'left',
  },
  productStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  productStatusCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 30,
  },
  productStatusText: {
    fontSize: 15,
    margin: 2,
    marginLeft: 10,
    textAlign: 'left',
  },
});

export default OrderHistory;
