import React, { useContext } from 'react';
import { View, Text, StyleSheet,Pressable, Alert } from 'react-native';
import { NotesContext } from './EntryContext';
import Icon from 'react-native-vector-icons/FontAwesome';

import {StringFormattedDate} from './function/StringFormattedDate';

// ####################################################################################################################

const EntryItem = ({ item, navigation }) => {
  const { deleteNote } = useContext(NotesContext);

  const words = item.description.split(' ');
  const truncatedDescription = words.slice(0, 10).join(' ');

  // ------------
  
  const handledeleteNote = ( id ) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteNote(id);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  
  // ################################################################################################################### --- Render

  return (
    <View style={styles.noteContainer}>
      <Text>{StringFormattedDate(item.date)}</Text>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.mood}>Feeling {item.mood}</Text>
      <Text style={styles.mood}>{truncatedDescription} ...</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#005BBB' : '#0066B3' },
          ]}
          onPress={() => navigation.navigate('EntryDetailScreen', { key: "diary_entry_"+item.date })}
        >
          <Icon name="info-circle" size={20} color="#fff" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#005BBB' : '#0066B3' },
          ]}
          onPress={() => navigation.navigate('EditEntryScreen', {  key: "diary_entry_"+item.date })}
        >
          <Icon name="pencil" size={20} color="#fff" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#FF2E00' : '#ed1c24ab' },
          ]}
          onPress={() => handledeleteNote("diary_entry_"+item.date)}
        >
          <Icon name="trash" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};
export default EntryItem;

// ################################################################################################################### --- Styling

const styles = StyleSheet.create({
  noteContainer: {
    width: "100%",
    backgroundColor: "#F7F7F7", 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0066B3',
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
  },
  mood: {
    fontSize: 16,
    marginBottom: 5,
    color:"#14142A"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: "flex-end",
    marginTop: 5,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    marginRight: 10, // Add right margin to separate buttons
  },
});