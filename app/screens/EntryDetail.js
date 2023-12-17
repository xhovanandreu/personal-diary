import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

// import styles                                 from '../components/Style';
import { NotesContext } from '../components/EntryContext';
import {StringFormattedDate} from '../components/function/StringFormattedDate';

// ####################################################################################################################

export const EntryDetail = ({navigation, route}) => {
  const { deleteNote } = useContext(NotesContext);
  const [data,  setData]  = useState([]);

  // ------------
  
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(route.params.key);
      let data = JSON.parse(value);
      setData(data);
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  
  // ------------

  useEffect(() => {
    readData();
  }, []);
    
  // ------------
    
  const handledeleteNote = ( id ) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this dairy?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteNote(id);
            navigation.navigate("HomeScreen");
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
    
  // ############################################################################################################

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

      <View style={[styles.container, styles.screenPadding]}>
        <Text style={styles.pageTitle}>{data.title}</Text>
        
        <Text>{StringFormattedDate(data.date)}</Text>
        <Text style={styles.text}>{data.description}</Text>
        <Text style={styles.label}>Feeling {data.mood}</Text>

        <View style={styles.buttonsContainer}>

          <Pressable onPress={() => navigation.navigate('EditEntryScreen', { key: route.params.key })} style={styles.editButton}>
            <Icon name="edit" size={24} color="white" />
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>

          <Pressable style={styles.deleteButton} 
           onPress={() => handledeleteNote(route.params.key)}>
            <Icon name="trash" size={24} color="white" />
          </Pressable>
        </View>

      </View>
    </ScrollView>
  );
}
    
export default EntryDetail;

const styles = StyleSheet.create({

  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066B3',
    marginVertical: 10,
  },
 
  container:{
    flex: 1,
    backgroundColor: "#fff",
    
},
screenPadding:{
    padding: 20,
},
  label: {
    fontSize: 18,
    fontWeight: 'bold',

    marginTop: 10,
  },

  text: {
    fontSize: 16,

    marginTop: 5,
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: 10
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#0066B3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10
  },
  

  editButtonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },

  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#ed1c24ab',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10
  },

  deleteButtonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
});