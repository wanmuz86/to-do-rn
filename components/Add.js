import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';

export default function Add({navigation}) {
    const [name, setName] = useState('');
    const [place,setPlace] = useState('');
    const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <Text>Add new Item</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setName(text)}
        value={name}
        placeholder="Item Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setDescription(text)}
        value={description}
        placeholder="Item Description"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setPlace(text)}
        value={place}
        placeholder="Item Place"
      />
       <TouchableOpacity onPress={()=>{navigation.pop()}}>
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
    padding:10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor:'green',
    width:250,
    color:'white',
    padding: 10,
    textAlign:'center',
    
}
});
