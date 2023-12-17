
import { NavigationContainer }              from '@react-navigation/native';
import { createNativeStackNavigator }       from '@react-navigation/native-stack';
import { createBottomTabNavigator }         from '@react-navigation/bottom-tabs';
import FontAwesome5                         from 'react-native-vector-icons/FontAwesome5';

import HomeScreen                           from '../screens/Home';
import AddEntryScreen                       from '../screens/AddEntry';
import EditEntryScreen                       from '../screens/EditEntry';
import EntryDetailScreen                    from '../screens/EntryDetail';

import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIcons                             from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons                             from 'react-native-vector-icons/Ionicons';

import { Pressable}      from 'react-native';

// ################################################################################################# --- STACK NAVIGATOR

const Stack = createNativeStackNavigator();
function HomeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen"               component={HomeScreen}                options={{headerShown: false}} />
      <Stack.Screen name="EntryDetailScreen"         component={EntryDetailScreen}         options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: ``,
          headerStyle: { backgroundColor: '#fff'},
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("HomeScreen")}
            
            >
              <Ionicons  name="chevron-back" size={30} color="#82909D"  />
            </Pressable>
          )
        }} />
      <Stack.Screen name="EditEntryScreen"         component={EditEntryScreen}          options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: ``,
          headerStyle: { backgroundColor: '#fff'},
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("HomeScreen")}
            
            >
              <Ionicons  name="chevron-back" size={30} color="#82909D"  />
            </Pressable>
          )
        }} />
    </Stack.Navigator>
  );
}

// #################################################################################################################
export const NavWrapper = () => {
  const Tab = createBottomTabNavigator();
  
  return (
    <NavigationContainer>
    
        <Tab.Navigator
        
        screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#0066B3',
            tabBarInactiveTintColor: '#494949',
            tabBarActiveBackgroundColor: "#F7F7F7",
            tabBarInactiveBackgroundColor: "#F7F7F7",
            tabBarStyle: { backgroundColor: "#F7F7F7" },
            style: {
            height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0
            }
            
        }}
        >
          <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <FoundationIcon name="home" size={25} color={color} />
              ),
              }}
          />
          
          <Tab.Screen
          name="AddEntryScreen"
          component={AddEntryScreen}
          options={{
              
              tabBarLabel: 'Add Diary',
              tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons name="book-open" size={20} color={color}/>
              ),
              
          }}
          />
            
        </Tab.Navigator>
    </NavigationContainer>
  );
}
