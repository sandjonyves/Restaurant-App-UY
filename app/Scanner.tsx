import { View, Text, SafeAreaView, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Camera, CameraView } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import { Stack } from 'expo-router';
import { StatusBar } from 'native-base';
import CustomOverlay from '@/components/CustomOverlay';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
// Assurez-vous que le chemin est correct

const Scanner: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const isPermissionGranted = Boolean(permission?.granted);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarcodeScanned = (data: any) => {
    console.log(data);
    setOverlayVisible(true); // Affiche l'overlay lors de la lecture d'un code-barres
  };

  const handleBarcodeNotDetected = () => {
    setOverlayVisible(false); // Cache l'overlay si aucun code-barres n'est détecté
  };

  return (
    <SafeAreaView style={styles.container} className='bg-gray-500'>
      <Stack.Screen
        options={{
          title: 'Scanner Qrcode',
          headerShown: false,
        }}
      />
      {isPermissionGranted ? (
        <View style={styles.cameraContainer}>
          {Platform.OS === "android" && <StatusBar hidden />}
          <Text>Scanner ICi</Text>
          <View style={{ width: wp(70) }} className='w-50 bg-red border-green-200 border-4'></View>
          <CameraView
            onBarcodeScanned={handleBarcodeScanned}
          
            style={[styles.camera]}
            
          />
          {/* <CustomOverlay visible={overlayVisible}>
            <View style={styles.scannerArea}>
              <Text style={styles.overlayText}>Scannez ici</Text>
            </View>
          </CustomOverlay> */}
        </View>
      ) : (
        <Text>Vous n'avez pas la permission</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'black'
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    justifyContent:"center",
    alignItems:'center'
  },
  camera: {
    display:'flex',
    width:"70%",
    height:"50%"
  
    
  },
  scannerArea: {
    width: 250, // Largeur de la zone de scan
    height: 250, // Hauteur de la zone de scan
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Scanner;