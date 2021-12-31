import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Modal,Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const deletePressed = async () => {


    const value = await AsyncStorage.getItem('@todos')
        if(value !== null) {
         let todos = JSON.parse(value)

         // 2 delete the item
         let deletedArray = todos.filter(val=>{
           return val.id != navigation.getParam('item').id
         })

         await AsyncStorage.setItem('@todos', JSON.stringify(deletedArray))

        }
// 1) Load the "todos" from AsyncStorage
// 2) Using splice or filter, remove the item from the array
// 3) Save it inside the storage
// 4) Move pack to previous page

    setModalVisible(!modalVisible)
    navigation.pop()
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={deletePressed}>
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text>Detail page</Text>
      <Text>{navigation.getParam('item').name}</Text>
      <Text>{navigation.getParam('item').description}</Text>
      <Text>{navigation.getParam('item').place}</Text>
      <TouchableOpacity onPress={() => navigation.push('Edit', {
        item:navigation.getParam('item')
      })}>
        <Text style={styles.editButton}>Edit Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.button}>Delete Item</Text>
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
  editButton: {
    backgroundColor:'blue',
    width:250,
    color:'white',
    padding: 10,
    textAlign:'center',
    marginTop:10  
},
  button: {
    backgroundColor:'red',
    width:250,
    color:'white',
    padding: 10,
    textAlign:'center',
    marginTop:10
    
}
});
