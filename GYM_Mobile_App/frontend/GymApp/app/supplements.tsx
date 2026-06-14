import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import HamburgerMenu from '../components/HamburgerMenu';

export default function SupplementsScreen() {
  const { role } = useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* ── Hamburger Menu ── */}
      <HamburgerMenu currentRole={(role as any) || 'User'} />

      {/* ── Centered Title Text ── */}
      <View style={styles.container}>
        <Text style={styles.titleText}>Supplements</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
