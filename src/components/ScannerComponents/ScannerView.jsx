
import Scanner from './Scanner';
import { useState } from 'react';
import Button from '../../CustomElements/Button';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';

export default function ScannerView() {
    const [show, setShow] = useState(false);

    function changeVisibilityHandler(data) {
        setShow(data);
    }

    return (
        <ScrollView
            behavior="padding"
            alwaysBounceVertical={false}
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {show ? <Scanner changeVisibilityHandler={changeVisibilityHandler} /> :
                <View style={styles.container}>
                    <Text style={styles.title}>Scan QR Code</Text>
                    <Text style={styles.text}>Place qr code inside the frame to scan please avoid shake to get results quickly.</Text>

                    <Image style={styles.image} source={require('../../images/qr-code.png')} />
                    <Button text='Scan QR Code' onPress={() => { setShow(true) }} />
                </View>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "gray",
        fontSize: 18,
        paddingBottom: 5,
        textAlign: 'center'
    },
    container: {
        justifyContent: 'center',
        width: '80%'
    },
    title: {
        padding: 5,
        fontSize: 28,
        color: "black",
        paddingTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        left: 5,
        width: '100%',
        height: '60%',
        position: 'relative',
    }
});