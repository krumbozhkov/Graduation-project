import { useState } from 'react';
import { auth } from "../../../firebase";
import Button from "../../CustomElements/Button";
import { useNavigation } from "@react-navigation/native";
import checkUserInputHandler from "../../helpers/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [error, setError] = useState('');
    const [userInput, setUserInput] = useState({ email: '', password: '' });

    async function handleLogin() {
        const message = checkUserInputHandler(userInput?.email, userInput?.password);

        if (!message) {
            auth.signInWithEmailAndPassword(userInput?.email, userInput?.password)
                .then(async (userCredentials) => {
                    const user = userCredentials.user;
                    if (user) {
                        await AsyncStorage.setItem('userData', JSON.stringify(user?.email));
                        await AsyncStorage.setItem('userId', JSON.stringify(user?.uid));
                        await AsyncStorage.setItem('displayName', JSON.stringify(user?.displayName));
                        navigation.navigate('MenuScene', { screen: 'Menu' });
                    } else {
                        setError('Invalid data! Please try again!')
                    }
                })
                .catch(error => setError('Invalid data! Please try again!'))
        } else {
            setError(message);
        }
    }

    return (
        <ScrollView
            behavior="padding"
            alwaysBounceVertical={false}
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={userInput?.email}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, email: text }))} />

                <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholder="Password"
                    value={userInput?.password}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, password: text }))} />
                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
            </View>

            <Pressable
                onPress={() => navigation.navigate('Register')}
                style={({ pressed }) => [{ opacity: pressed ? .75 : 1, margin: 10, color: 'gray' }]} >
                <Text style={styles.text}>Don't have an account? Sign up!</Text>
            </Pressable>

            <View style={styles.buttonContainer}>
                <Button text='Login' onPress={() => handleLogin()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
})