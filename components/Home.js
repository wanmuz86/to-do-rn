import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList } from 'react-native';
import ListItem from './ListItem'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
    const [todos, setTodos] = useState([]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>navigation.push('Detail',{'item':item})}>
        <ListItem name={item.name} place={item.place} />
        </TouchableOpacity>
      );
    
      const loadData = async () => {
        const value = await AsyncStorage.getItem('@todos')
        if(value !== null) {
          setTodos(JSON.parse(value))

        }
      }

      /// 1= When the page is loaded, I will load the data from Storage
      /// 2= If the data is there, I will show it in a FlatList
      // 3) If the data is not there, then it will show nothing
      useEffect(()=>{

        loadData();
      
      })

  return (
    <View style={styles.container}>
      <Text>Home page</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={()=>navigation.push('Add')}>
          <Text style={styles.button} >Add Item</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      backgroundColor:'blue',
      width:250,
      color:'white',
      padding: 10,
      textAlign:'center',
      
  }
});
