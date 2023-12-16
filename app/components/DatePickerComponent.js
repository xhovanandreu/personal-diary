import React, { useState } from 'react';
import {
  Pressable,
  Text,
  Modal,
  View,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../components/function/FormatDate';

// ##########################################################################################################################
export const DatePickerButton = ({ previousSelectedDate, showPicker, setShowPicker, toggleDatePicker, formData, setFormData }) => {
    
    const [newDate, setNewDate] = useState(new Date());
  
    // ------------
    const onChange = ({type}, selectedDate) => {
        if (type == 'set') {
            
            const currentDate = selectedDate;
            setNewDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                
                const formattedDate = formatDate(currentDate);

                setFormData ({ ...formData, date: formattedDate });
            }
        } else {
            toggleDatePicker();
        }
    };
  
    // ------------
    const confirmIOSDate = () => {
        const day = String(newDate.getDate()).padStart(2, '0');
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const year = newDate.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;

        setFormData ({ ...formData, date: formattedDate });
        toggleDatePicker();
  
    }

// #############################################################################################################
  return (
    <>
        {showPicker && Platform.OS === 'android' && (
            <DateTimePicker 
                mode='date'
                display='spinner'
                value={newDate}
                onChange={onChange}
            />
        )}

        {showPicker && Platform.OS === 'ios' && (

            <Modal
                animationType="slide"
                transparent={true}
                visible={showPicker}
                onRequestClose={() => {
                // Handle modal close
                setShowPicker(false);
            }}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View
                        style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        paddingBottom: 15,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        elevation: 5, // Android shadow
                        shadowColor: '#000', // iOS shadow
                        shadowOffset: { width: 0, height: -3 }, // iOS shadow
                        shadowOpacity: 0.5, // iOS shadow
                        }}
                    >
                    <DateTimePicker 
                        style={{ color: 'black' }}
                        
                        textColor='black'
                        mode='date'
                        display='spinner'
                        value={newDate}
                        onChange={onChange}
                        
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 15}} >
                        <Pressable style={{ backgroundColor:"#fff", padding: 10, borderRadius:10, paddingHorizontal: 15 }}
                        onPress={toggleDatePicker}
                        >
                            <Text>Cancel</Text>
                        </Pressable>
                        
                        <Pressable style={{ backgroundColor:"#fff", borderRadius:10, padding: 10, paddingHorizontal: 15 }}
                        onPress={confirmIOSDate}
                        >
                            <Text>Confirm</Text>
                        </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>
        )}
    </>
  );
};

export default DatePickerButton;
