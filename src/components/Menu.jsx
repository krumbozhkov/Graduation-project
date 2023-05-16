import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';

export default function MenuElement() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [userData, setUserData] = useState('');

    useEffect(() => {
        getUserLoginData();
    }, [getUserLoginData]);

    async function getUserLoginData() {
        const result = JSON.parse(await AsyncStorage.getItem("userId"));
        const nameResult = JSON.parse(await AsyncStorage.getItem("displayName"));

        result ? setUserData(result) : setUserData('')
        nameResult ? setName(nameResult) : setName('')
    }

    async function removeUserData() {
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('displayName');
        setUserData('');
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    {name ? <Text style={{ fontSize: 34, paddingBottom: 30 }}>Welcome {name}!</Text> :
                        <Text style={{ fontSize: 34, paddingBottom: 30 }}>Menu</Text>}
                    {userData ?
                        <View style={styles.blocks}>
                            <Pressable onPress={() => navigation.navigate('EditUser')} style={({ pressed }) => [{ opacity: pressed ? .7 : 1 }, styles.item]} >
                                <Text style={styles.text}>Edit User</Text>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate('MyItems')} style={({ pressed }) => [{ opacity: pressed ? .7 : 1 }, styles.item]} >
                                <Text style={styles.text}>My Items</Text>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate('Scanner')} style={({ pressed }) => [{ opacity: pressed ? .7 : 1 }, styles.item]} >
                                <Text style={styles.text}>Scan</Text>
                            </Pressable>

                            <Pressable
                                onPress={removeUserData}
                                style={({ pressed }) => [{ opacity: pressed ? .7 : 1, }, styles.item]} >
                                <Text style={styles.text}>Logout </Text>
                            </Pressable>
                        </View> :
                        <View style={[styles.blocks, { paddingBottom: 20 }]}>
                            <Pressable onPress={() => navigation.navigate('Login')} style={({ pressed }) => [{ opacity: pressed ? .7 : 1 }, styles.item]} >
                                <Text style={styles.text}>Login</Text>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('Register')} style={({ pressed }) => [{ opacity: pressed ? .7 : 1 }, styles.item]} >
                                <Text style={styles.text}>Register</Text>
                            </Pressable>
                        </View>
                    }
                </View>
            </ScrollView >
        </>
    )
}

const styles = StyleSheet.create({
    blocks: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    item: {
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        width: '90%',
        alignItems: 'center',
        borderWidth: 1,
        minWidth: '70%'
    },
})