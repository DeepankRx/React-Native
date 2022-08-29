import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { DataTable, IconButton } from 'react-native-paper';
import { Stack, FAB } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartReducer';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);
  return (
    <View>
      <Text style={styles.cartHeader}>Cart</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {cart.length > 0 ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Image</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Price</DataTable.Title>
              <DataTable.Title>Quantity</DataTable.Title>
              <DataTable.Title>Total</DataTable.Title>
              <DataTable.Title>Remove</DataTable.Title>
            </DataTable.Header>
            {cart.map((item) => (
              //apply styles to each item in the, cart
              <DataTable.Row key={item._id}>
                <DataTable.Cell>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </DataTable.Cell>
                <DataTable.Cell style={styles.text}>{item.name}</DataTable.Cell>
                <DataTable.Cell style={styles.text}>
                  {item.price}
                </DataTable.Cell>
                <DataTable.Cell style={styles.text}>
                  {item.quantity}
                </DataTable.Cell>
                <DataTable.Cell style={styles.text}>
                  {item.quantity * item.price}
                </DataTable.Cell>
                <DataTable.Cell style={styles.text}>
                  {/* <Button
                    title="Remove"
                    style={{
                      backgroundColor: '#ff4081',
                      marginTop: 20,
                    }}
                    onPress={() => dispatch(removeFromCart({ product: item }))}
                  /> */}
                  <IconButton
                    icon={() => (
                      <Icon
                        name="delete"
                        size={30}
                        onPress={() =>
                          dispatch(removeFromCart({ product: item }))
                        }
                      />
                    )}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <Text style={styles.emptyCart}>Cart is empty</Text>
        )}
        {total > 0 ? <Text style={styles.total}>Total: {total}</Text> : null}
        {total > 0 ? (
          <Stack fill spacing={4} left={'80%'}>
            <IconButton
              variant="contained"
              size={40}
              icon={(props) => (
                <Icon name="cart-check" color={'#fff'} {...props} />
              )}
            />
          </Stack>
        ) : null}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 30,
    marginTop: 10,
    color: '#fff',
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  emptyCart: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: '5%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Cart;
