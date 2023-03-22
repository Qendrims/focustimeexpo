import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/timer';
import { colors } from './src/units/colors';
import { spacing } from './src/units/sizes';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

// You can import from local files

// or any pure javascript modules available in npm
const STATUSES = {
  COMPLETE: 1,
  CANCELED: 0,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState('learn react 2');
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    loadFocusHistory();
  }, [])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS !== 'ios' ? spacing.md : spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
  },
});
