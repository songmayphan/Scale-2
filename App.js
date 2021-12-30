import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Device } from 'react-native-ble-plx';
import React, { useState } from "react";
//import Scan from "./Scan"

import * as ScreenOrientation from 'expo-screen-orientation';

const manager = new BleManager();

//console.log("state: ", manager.state())


//Scan and connect

const scanAndConnect = () =>{
  manager.startDeviceScan(null, null, (error, device) => {
    console.log("Scanning for device...")
      if (error) {
          // Handle error (scanning will be stopped automatically)
          console.log("ERROR: ", error)
          return
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'pi4')        
          {
          // Stop scanning as it's not necessary if you are scanning for one device.
            console.log ("Found pi4, stop scanning for others now")
          manager.stopDeviceScan();

          // Proceed with connection.
          device.connect()
            .then((device) => {
              console.log("Device ID: ", device.id)
              console.log("Device Name: ", device.name)
          })
          .then((device) => {
            console.log("....Reading all device's services...")
            
            // Do work on device with services and characteristics
            //return manager.characteristicsForDevice('00001801-0000-1000-8000-00805f9b34fb')
           
            

          })
          .catch((error) => {
              // Handle errors
              console.log("Device ERROR: ". errror)
          });
      } 
  });
}
// const device = new Device();
// manager.startDeviceScan(null,null, (error, device) =>{
//   if (error) {
//     // Handle error (scanning will be stopped automatically)
//     console.log("Error in scanning devices:", error);
//     return
//   }
//   // Check if it is a device you are looking for based on advertisement data
//   // or other criteria.
//   console.log("Detected Device Details:", device.id, device.name);
//   // ||device.localName === 'BLEPeripheralApp') 
//   if (device.name === 'pi4'){ //
//     // Stop scanning as it's not necessary if you are scanning for one device.
//     console.log("Device Found, Stopping the Scan.");
//     console.log("Connecting to:",device.name)
//     this.manager.stopDeviceScan();
//     device.connect()
//       .then((device) => {
//         // this.info("Discovering services and characteristics")
//         console.log("Connected...Discovering services and characteristics");
//         return device.discoverAllServicesAndCharacteristics()
//       })
//       .then((device) => {
//         console.log('Services and characteristics discovered');
//         //return this.testChar(device)
//         const services = device.services()
//         console.log(services);
//         return device.readCharacteristicForService(services)
//         // device.readCharacteristicForService("abbaff00-e56a-484c-b832-8b17cf6cbfe8")
//         // this.info("Setting notifications")
//         //return this.setupNotifications(device)
//       })
//       .then(() => {
//         const characteristicsData =  device.readCharacteristicForService();
//         console.log(characteristicsData);
//         //this.info("Listening...")
//       }, (error) => {
//         console.warn(error.message);
//         // this.error(error.message)
//       })
//     }
//   });
export default function App() {
  const [tare, setTare] = useState(0);
  const onPressTare = () => setTare(1)
  
  const [on_status, seton_status] = useState("off");
  const onPressOn = () => seton_status("on");
  const onPressOff = () => seton_status("off");
  return (
    // <PreviewLayout
    //   label ="Precision Products"
    //   values={["Turn On", "TARE"]}
    //   selectedValue={on_status}
    //   setSelectedValue={seton_status}
    // >
    // </PreviewLayout>
    <View style={styles.container}>
    
    <View style={styles.container_header}>
      <Text style={styles.text}>Precision Products</Text>
      <Text>Scale Status: {on_status}</Text>
      <Text>Tare Status: {tare}</Text>
    </View>


    <View style={styles.containerrow}>
      <TouchableOpacity
        style={styles.button_on}
        onPress={onPressOn}
      >
        <Text>TURN ON</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button_on}
        onPress={scanAndConnect}
      >
        <Text>SCAN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button_off}
        onPress={onPressOff}
      >
        <Text>TURN OFF</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button_tare}
        onPress={onPressTare}
      >
        <Text>TARE NOW</Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
    </View>
       
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e4f3',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
   containerrow: {
    flex: 1,
    flexDirection: 'row'
    
  },
  container_header: {
    textAlign: "center",
    marginBottom: 25,
    marginTop: 100,
    padding: 10
    
  },
  text:{
    fontWeight: 'bold',
    color: '#d20f23',
    fontSize: 45,
    borderRadius: 6,
    fontFamily :"monospace"
  },
  button_on: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#8ff991",
    padding: 10,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    
  },
  button_off: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#d20f23",
    padding: 10,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
  },
  button_tare: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#b9b6c2",
    padding: 10,
    alignSelf: "flex-start",
    marginHorizontal: "1%",

  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});
