import Button from '../CustomElements/Button';
import { useNavigation } from "@react-navigation/native";
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';

export default function Help() {
    const navigation = useNavigation();

    return (
        <ScrollView
            behavior="padding"
            alwaysBounceVertical={false}
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ padding: 5 }}>
                <Text style={styles.title}>How to use this application?</Text>
                <Image style={styles.image} source={require('../images/help.png')} />
                <View>
                    <Text style={styles.text}>
                        If you want to use this application, you need to create an account. When you have account, need to login into your account.
                        When you login in your account you can scan items. Also you can find your "Scanning History".
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '47%', }}>
                    <Button text='Register' onPress={() => navigation.navigate('Register')} />
                    <Button text='Login' onPress={() => navigation.navigate('Login')} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "gray",
        fontSize: 16,
        padding: 10,
        paddingTop: 15,
        textAlign: 'center',
    },
    title: {
        color: "black",
        fontSize: 28,
        padding: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        left: 50,
        position: 'relative',
    }
});