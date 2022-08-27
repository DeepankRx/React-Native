import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
  Button,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
const App = () => {
  const [title, setTitle] = useState('');
  const [id, setId] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [toDo, setToDo] = React.useState([
    {
      title: '',
      id: Math.random(),
      message: '',
    },
  ]);
  const addToToDo = () => {
    if (title.length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }
    if (message.length < 3) {
      setError('Message must be at least 3 characters long');
      return;
    }
    setError('');
    setToDo([...toDo, { title, message, id: Math.random() }]);
    setTitle('');
    setMessage('');
  };
  const deleteToDo = (id) => {
    setToDo(toDo.filter((todo) => todo.id !== id));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>ToDo List</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        placeholder="Enter Message"
      />
      <Button title="Add ToDo" onPress={addToToDo} />
      <ScrollView>
        {toDo.map((item) =>
          item.title.length > 0 && item.message.length > 0 ? (
            <Text key={item.id} style={styles.todoList}>
              {item.title} - {item.message}
              <Button
                style={styles.deleteButton}
                title="Delete"
                color="red"
                onPress={() => deleteToDo(item.id)}
              />
            </Text>
          ) : null
        )}
      </ScrollView>
      {error.length > 3 && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android' ? Dimensions.get('screen').height * 0.09 : 0,
  },
  error: {
    color: 'red',
    fontSize: 20,
    margin: 12,
  },
  todoList: {
    fontSize: 20,
    margin: 12,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  deleteButton: {
    fontSize: 20,
    margin: 12,
    padding: 10,
  },
  title: {
    fontSize: 40,
    margin: 12,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});

export default App;
