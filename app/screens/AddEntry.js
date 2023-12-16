import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  Pressable,
  View,
  TextInput
} from "react-native";
import styles from '../components/Style';
import { NotesContext } from '../components/EntryContext';
import { validateInputs } from '../components/function/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView }from 'react-native-keyboard-aware-scroll-view';
import DatePickerButton from '../components/DatePickerComponent';
import { formatDate } from '../components/function/FormatDate';


// ##########################################################################################################################

export const AddEntry = ({ navigation, route }) => {
  const { notes, setNotes } = useContext(NotesContext);

  const [formData, setFormData] = useState({
    date:  route?.params?.date ? route.params.date : '',
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


  // -------------
  const saveData = async () => {
    if (validateInputs(formData, setFeedback)) {
      try {
        const jsonformData = JSON.stringify(formData);
        const uniqueId = formatDate(formData.date);

        const entryKey = `diary_entry_${uniqueId}`;
        await AsyncStorage.setItem(entryKey, jsonformData);
        
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
        navigation.navigate('HomeScreen');
      } catch (e) {
        alert('Failed to save the data to the storage');
      }
    }
  };

  // -------------
  useEffect(() => {
    if (route?.params?.date && route.params.date !== formData.date) {
      setFormData({ ...formData, date: route.params.date });
    }
  }, [route?.params?.date]);


  // -------------
  const [showPicker, setShowPicker] = useState(false);
  
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  // -------------

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={[styles.container, styles.screenPadding]}>
      <Text style={{ textAlign:"center", fontSize:20, fontWeight:"bold" }}>Add Entry</Text>
      
      <Text style={styles.inputLabel}>Date</Text>
      <Pressable onPress={toggleDatePicker}>
        <TextInput
            style={styles.inputcontainer}
            placeholder = 'Date'
            value={formData.date}
            editable={false}
            onPressIn={toggleDatePicker}
        />
      </Pressable>

      <DatePickerButton 
        toggleDatePicker={toggleDatePicker}
        formData={formData}
        setFormData={setFormData}
        previousSelectedDate={formData.date}
        showPicker={showPicker}
        setShowPicker={setShowPicker} />

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
          <Text style={[styles.mainButtonTxt]}>Save</Text>
        </Pressable>

      </View>
    </KeyboardAwareScrollView>
  );
}

export default AddEntry;
