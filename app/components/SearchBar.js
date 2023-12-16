import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// #################################################################################################################
export const SearchBar = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const handleSearch = (text) => {
    setSearchKeyword(text);
    onSearch(text);
  };

// ################################################################################################################
  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchKeyword}
      />
        <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    width:"80%",
    justifyContent: "space-between"

  },
  searchInput: {
    width: "90%",
    paddingVertical:10,
  },
});