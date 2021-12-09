import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList } from 'react-native';
import ListItem from './ListItem'
export default function Home({navigation}) {
    const todos = [
        {
            "id":1,
            "name":"Watch Series",
            "place":"Netflix",
            "description":"Few more episodes left from 6..."
        },
        {
            "id":2,
            "name":"Prepare Slide",
            "place":"PC",
            "description":"Need to change the pitch deck to include xx and yy."
        },
        {
            "id":3,
            "name":"Dinner",
            "place":"home",
            "description":"Order burger ramly"
        },
    ]
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>navigation.push('Detail',{'item':item})}>
        <ListItem name={item.name} place={item.place} />
        </TouchableOpacity>
      );
      

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
