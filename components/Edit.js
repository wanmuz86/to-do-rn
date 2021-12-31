import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Edit({ navigation }) {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {

        setName(navigation.getParam('item').name)
        setPlace(navigation.getParam('item').place)
        setDescription(navigation.getParam('item').description)
    }, [])

    const saveItem = async () => {
        /// 1) Load all the items from the AsyncStorage
        // 2)  Find the one that is the same , 
        // 3) Change the value with the the edited value
        // 4) Save it!

        const value = await AsyncStorage.getItem('@todos')
        if (value !== null) {
            let todos = JSON.parse(value)
           for (var i = 0; i <todos.length; i++){
               if (todos[i].id === navigation.getParam('item').id){
                todos[i].name = name
                todos[i].place = place
                todos[i].description = description
                break;
               }
           }
        
            await AsyncStorage.setItem('@todos', JSON.stringify(todos))
        navigation.pop()

        }

    }

    return (
        <View style={styles.container}>
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
                <Text style={styles.button} >Edit Item</Text>
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
