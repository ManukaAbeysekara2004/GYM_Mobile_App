import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HamburgerMenu from '../components/HamburgerMenu';

export default function AdminPage() {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* ── Hamburger Menu ── */}
      <HamburgerMenu currentRole="Admin" />

      {/* ── Centered Role Text ── */}
      <View style={styles.container}>
        <Text style={styles.roleText}>Admin</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
