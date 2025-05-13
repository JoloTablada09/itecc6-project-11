// App.js
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const Drawer = createDrawerNavigator();

// --- Add/Edit/Delete/Search/Reminders Screens ---
const FormScreen = ({ route }) => {
  const screenTitle = route.name;

  // Function to return default sample input for each screen
  const getDefaultInput = (title) => {
    switch (title) {
      case 'Add Event':
        return 'Meeting with advisor at 3PM';
      case 'Edit Event':
        return 'Edit event ID: 12345';
      case 'Delete Event':
        return 'Delete event ID: 12345';
      case 'Search Events':
        return 'Search: Meeting';
      case 'Set Reminders':
        return 'Remind me about Project Deadline';
      default:
        return '';
    }
  };

  const [input, setInput] = useState(getDefaultInput(screenTitle));

  const handleSubmit = () => {
    Alert.alert(`${screenTitle}`, `You entered: ${input}`);
    setInput(getDefaultInput(screenTitle)); // Reset to default input
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{screenTitle}</Text>
      <Text style={styles.label}>Enter Details:</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${screenTitle}`}
        value={input}
        onChangeText={setInput}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" color="#4CAF50" onPress={handleSubmit} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          color="#4CAF50"
          onPress={() => setInput(getDefaultInput(screenTitle))}
        />
      </View>
    </ScrollView>
  );
};

// --- Calendar View Screen ---
const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: 'black',
          selectedDayBackgroundColor: '#4CAF50',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#4CAF50',
          dayTextColor: 'black',
          textDisabledColor: '#d9e1e8',
          dotColor: '#4CAF50',
          selectedDotColor: '#ffffff',
          arrowColor: '#4CAF50',
          monthTextColor: 'black',
        }}
      />
    </View>
  );
};

// --- Main App ---
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#4CAF50',
          drawerInactiveTintColor: 'black',
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen name="Add Event" component={FormScreen} />
        <Drawer.Screen name="Edit Event" component={FormScreen} />
        <Drawer.Screen name="Delete Event" component={FormScreen} />
        <Drawer.Screen name="Search Events" component={FormScreen} />
        <Drawer.Screen name="Set Reminders" component={FormScreen} />
        <Drawer.Screen name="View Calendar" component={CalendarScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    marginBottom: 15,
  },
});
