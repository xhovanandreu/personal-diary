import React, { useState, useEffect, useContext } from "react";
import { Text, Pressable, View, TextInput, Modal } from "react-native";
import styles from '../components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotesContext } from '../components/EntryContext';
import { validateInputs } from '../components/function/Validation';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// #####################################################################################################################
export const EditEntryScreen = ({ navigation, route }) => {
  const { notes, setNotes } = useContext(NotesContext);

  const [formData, setFormData] = useState({
    date: '',
    title: '',
    description: '',
    mood: ''
  });

  const [feedback, setFeedback] = useState({
    date: '',
    title: '',
    description: '',
    mood: ''
  });


  // ---------------
  const saveData = async () => {
    if (validateInputs(formData, setFeedback)) {
      try {
        const jsonformData = JSON.stringify(formData);

        await AsyncStorage.setItem(route.params.key, jsonformData);

        const formDataExistIndex = notes.findIndex((note) => note.date === formData.date);

      if (formDataExistIndex !== -1) {
        // Data already exists, update it
        const updatedNotes = [...notes];
        updatedNotes[formDataExistIndex] = formData;
        setNotes(updatedNotes);
        alert('Data successfully updated');
      } else {
        setNotes((prevNotes) => [...prevNotes, formData]);
        alert('Data successfully saved');
      }
      } catch (e) {
        alert('Failed to save the data to the storage')
      }
    }
  }


  // ---------------
  useEffect(() => {
    readData();
  }, []);


  // ---------------
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(route.params.key);
      let data = JSON.parse(value);
      
      setFormData({
        date: data.date,
        title: data.title,
        description: data.description,
        mood: data.mood
      })
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };


// ##########################################################################################################

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={[styles.container, styles.screenPadding]}>
      <Text style={{ textAlign:"center", fontSize:20, fontWeight:"bold" }}>Edit Entry</Text>

      <Text style={styles.inputLabel}>Date</Text>
      <TextInput
          style={styles.inputcontainer}
          placeholder = 'Date'
          value={formData.date}
          editable={false}
      />

        {feedback.date && <Text style={styles.errorText}>{feedback.date}</Text>}
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.inputcontainer}
          placeholder="Title"
          value={formData.title}
          onChangeText={(text) => {
            setFormData({ ...formData, title: text });
          }}
        />
        {feedback.title && <Text style={styles.errorText}>{feedback.title}</Text>}

        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.inputcontainer, { textAlignVertical: 'top' }]}
          multiline
          numberOfLines={10}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => {
            setFormData({ ...formData, description: text });
          }}
        />
        {feedback.description && <Text style={styles.errorText}>{feedback.description}</Text>}

        <Text style={styles.inputLabel}>Mood</Text>
        <TextInput
          style={styles.inputcontainer}
          placeholder="Mood"
          value={formData.mood}
          onChangeText={(text) => {
            setFormData({ ...formData, mood: text });
          }}
        />
        {feedback.mood && <Text style={styles.errorText}>{feedback.mood}</Text>}
        <Pressable style={styles.mainButton} onPress={saveData}>
          <Text style={[styles.mainButtonTxt]}>Update</Text>
        </Pressable>

      </View>
    </KeyboardAwareScrollView>
  );
}

export default EditEntryScreen;
