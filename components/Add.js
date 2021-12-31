import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Add({ navigation }) {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');

  const saveItem = async () => {
    /// 1)  It will load the todo item in the asyncstorage

    const value = await AsyncStorage.getItem('@todos')

    /// 2) If there is an existing item, it will add it to the end and then save the item
    if (value !== null) {

      // Get the existing item
      let itemsArray = JSON.parse(value)
      // I will get the id of the last item and I will add by 1
      let currentId = itemsArray[itemsArray.length - 1].id + 1
      let newItem = {
        id: currentId,
        name: name,
        place: place,
        description: description
      }
      itemsArray.push(newItem)
      await AsyncStorage.setItem('@todos', JSON.stringify(itemsArray))

    }
    else {
      /// 3) If there is no item saved previously, it will create a new array,
      //    add the item at the end and then save it

      let newArray = []
      let newItem = {
        id:1,
        name: name,
        place: place,
        description: description
      }
      newArray.push(newItem)
      await AsyncStorage.setItem('@todos',JSON.stringify(newArray))

    }
    navigation.pop()



  }

  return (
    <View style={styles.container}>
      <Text>Add new Item</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Item Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        value={description}
        placeholder="Item Description"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPlace(text)}
        value={place}
        placeholder="Item Place"
      />
      <TouchableOpacity onPress={saveItem}>
        <Text style={styles.button} >Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    width: 250,
    color: 'white',
    padding: 10,
    textAlign: 'center',

  }
});
