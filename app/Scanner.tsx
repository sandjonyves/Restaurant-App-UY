import { View, Text, SafeAreaView, Platform, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Camera, CameraView } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import { Stack } from 'expo-router';
import { StatusBar } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Command } from '@/services/request/Command';
import { decodeToken } from '@/db/Commendes';

const Scanner: React.FC = () => {
    const command = new Command();

    const [permission, requestPermission] = useCameraPermissions();
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [scanCompleted, setScanCompleted] = useState<boolean>(false); // État pour contrôler le scan
    const isPermissionGranted = Boolean(permission?.granted);
    const [DataOfQrcode, setDataQrcode] = useState<any>();

    useEffect(() => {
        requestPermission();
    }, []);

    const handleBarcodeScanned = (data: any) => {
        if (scanCompleted) return; // Ne pas faire de scan si déjà complété

        const decodedData = decodeToken(data.data);
        setDataQrcode(decodedData);
        console.log(decodedData);

        if (decodedData && decodedData.etudiant_id) {
            command.ValidatedCommand({command_id:parseInt(DataOfQrcode.id)});
            
            let printData = `Matricule : ${decodedData.etudiant_id} \n\nNumber : ${decodedData.dish_number}`;
            Alert.alert('Détails du QR Code', printData);
            
            setScanCompleted(true); // Marquer le scan comme complété
        } else {
            Alert.alert('Erreur', 'Les données du QR Code sont invalides.');
        }
    };

    const handleBarcodeNotDetected = () => {
        setOverlayVisible(false);
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
                    <Text>Scanner ici</Text>
                    <View style={{ width: wp(70) }} className='w-50 bg-red border-green-200 border-4'></View>
                    <CameraView
                        onBarcodeScanned={handleBarcodeScanned}
                        style={[styles.camera]}
                    />
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
    },
    cameraContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: "center",
        alignItems: 'center'
    },
    camera: {
        display: 'flex',
        width: "70%",
        height: "50%"
    },
});

export default Scanner;