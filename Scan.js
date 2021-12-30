
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BleManager } from 'react-native-ble-plx';
import { Device } from 'react-native-ble-plx';
import React, { useState } from "react";


const Scan = () => {
Alert.alert('Scanning for devices...')
  return (
    <Text>Hello, I am your cat!</Text>
  );
}

export default Scan;