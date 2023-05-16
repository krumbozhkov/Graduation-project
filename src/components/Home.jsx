import Button from '../CustomElements/Button';
import { useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <ScrollView
            behavior="padding"
            alwaysBounceVertical={false}
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{padding: 25}}>
                <Image style={styles.image} source={require('../images/logo.png')} />
                <Text style={styles.title}>Welcome to Scan App</Text>
                <Text style={styles.text}>Please give access your "Camera" so that we can scan items.</Text>
                <View style={{ justifyContent: 'center', margin: 5 }}>
                    <Button text='How to use application?' onPress={() => navigation.navigate('Help')} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 5,
        fontSize: 16,
        paddingTop: 10,
        color: "gray",
        textAlign: 'center',
    },
    title: {
        padding: 5,
        fontSize: 28,
        color: "black",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 250,
    }
});