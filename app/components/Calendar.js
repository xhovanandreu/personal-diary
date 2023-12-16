import React, {useContext} from 'react';
import { Calendar } from 'react-native-calendars';
import { NotesContext } from './EntryContext';
import { formatDate } from '../components/function/FormatDate';

// ####################################################################################################################
export const CalendarComponent = ({ navigation, setModalVisible }) => {
  const { notes } = useContext(NotesContext);
  
  const onDayPress = (day) => {
    const uniqueId = formatDate(day.dateString);
    const foundNote = notes.find((note) => note.date === uniqueId);

    if (foundNote?.date) {
      navigation.navigate('EntryDetailScreen', { key: 'diary_entry_' + foundNote.date });
    } else {
      navigation.navigate('AddEntryScreen', { date: uniqueId });
    }
    setModalVisible(false);
  };
// ###################################################################################################################

  return (
    <Calendar
      onDayPress={(day) => {onDayPress(day)}}
    />
  );
};

export default CalendarComponent;
