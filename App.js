import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavWrapper }                         from './app/components/NavWrapper';
import { SafeAreaProvider, SafeAreaView }     from 'react-native-safe-area-context';
import { NotesProvider } from './app/components/EntryContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={insidestyles.container}  edges={["right", "top", "left"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <NotesProvider>
          <NavWrapper />
        </NotesProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const insidestyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  
});
