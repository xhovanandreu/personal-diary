import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NotesContext } from '../components/EntryContext';

import EntryItem from '../components/EntryItem';
import SearchBar from '../components/SearchBar';
import ModalComponent from '../components/Modal';
import Icon from 'react-native-vector-icons/FontAwesome';

// ####################################################################################################################
export const Home = ({ navigation }) => {
  const { notes, setNotes } = useContext(NotesContext);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  // -----------------
  const handleSearch = (searchKeyword) => {
    const filteredNotes = notes.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
    setFilteredNotes(filteredNotes);
  };

  

// ###############################################################################################################
  return (
    <ScrollView style={styles.scrollcontainer}>
      <View style={[styles.container, styles.screenPadding]}>

        <View style={{ display: "flex", flexDirection: "row", justifyContent:"space-between", width: "100%" }}>
          <SearchBar onSearch={handleSearch} />
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Icon name="calendar" size={55} color="#0066B3" />
          </TouchableOpacity>
        </View>


        {filteredNotes.length > 0 ? (
          filteredNotes.map((item, index) => (
            <EntryItem key={item.date} item={item} navigation={navigation} />
          ))
        ) : (
          notes.map((item, index) => { 
        
            return (
            <EntryItem key={item.date} item={item} navigation={navigation} />
          )})
        )}

          
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    
  },
screenPadding:{
    padding: 20,
},
});
