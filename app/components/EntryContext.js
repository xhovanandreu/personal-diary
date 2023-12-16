import React, { createContext, useState, useEffect } from 'react';
import  { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ##########################################################################################################################

export const NotesContext = createContext();


export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // ------------
  useEffect(() => {
    readData();
  }, []);

  // ------------
  const readData = async () => {
    try {
      let dataArray = [];
      
      AsyncStorage.getAllKeys((err, keys) => {
        
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.forEach((result, i, store) => {
            let data = JSON.parse(store[i][1]);
            dataArray.push(data);
          });

          setNotes(dataArray);
        });
      });
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  // ------------
  const deleteNote = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      readData();
    } catch (e) {
      alert('Failed to delete note');
    }
  };

// ##################################################################################################################

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        deleteNote,
        readData
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
