import { useState, useEffect } from 'react';
import Button from '../../CustomElements/Button';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Scanner({ changeVisibilityHandler }) {
    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        askForCameraPermission();
    }, []);

    async function askForCameraPermission() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    async function addItemHandler(date, time, amount) {
        const userId = JSON.parse(await AsyncStorage.getItem("userId"));
        const id = Math.random().toString(16).slice(2);

        await fetch(`https://graduation-project-2e021-default-rtdb.europe-west1.firebasedatabase.app/receipts.json`, {
            method: 'POST',
            body: JSON.stringify({ id, date, time, amount, userId }),
        });

        setScanned(false);
        changeVisibilityHandler(false);
    }

    async function alertFunctionHandler(type, data) {
        const [firstElement, secondElement, date, time, amount] = data?.split('*');

        if (!date || !time || !amount) {
            Alert.alert(
                'Please scan valid item!',
                `Try again to scan your item`,
                [
                    { text: 'OK', onPress: () => { setScanned(false); changeVisibilityHandler(false); } },
                ]
            )
        } else {
            Alert.alert(
                'Are you sure?',
                `Do you want to save item with ${amount}$?`,
                [
                    { text: 'Yes', onPress: () => { addItemHandler(date, time, amount) } },
                    { text: 'No', onPress: () => { setScanned(false); changeVisibilityHandler(false); } },
                ]
            )
        }
    }

    async function handleBarCodeScanned({ type, data }) {
        setScanned(true);
        alertFunctionHandler(type, data)
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>)
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    return (
        <View style={styles.container} >
            <View style={styles.barcodeBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        margin: 20,
    },
    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'black'
    }
});