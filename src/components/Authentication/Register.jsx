import { useState } from 'react';
import { auth } from "../../../firebase";
import Button from "../../CustomElements/Button";
import { useNavigation } from "@react-navigation/native";
import checkUserInputHandler from '../../helpers/authentication';
import { StyleSheet, TextInput, View, ScrollView, Text } from 'react-native';

export default function Register() {
    const navigation = useNavigation();
    const [error, setError] = useState('');
    const [userInput, setUserInput] = useState({ email: '', password: '', displayName: '', repeatedPassword: '' });

    function signUpHandler() {
        setError('');
        let message = checkUserInputHandler(userInput?.email, userInput?.password, userInput?.displayName);

        if (userInput?.password !== userInput?.repeatedPassword) {
            message = 'Password and Repeated Password not match!';
        }

        if (!message) {
            auth.createUserWithEmailAndPassword(userInput?.email, userInput?.password)
                .then(function (result) {
                    result.user.updateProfile({ displayName: userInput?.displayName })
                    navigation.navigate('Login');
                })
                .catch(error => setError('Already exist user with this email'))
        } else {
            setError(message);
        }
        /*
                if (!message) {
                    auth.createUserWithEmailAndPassword(email, password)
                        .then(userCredentials => {
                            userCredentials.displayName = userName;
                            const user = userCredentials.user;
                            if (user) {
                                navigation.navigate('Login');
                            }
                        })
                        .catch(error => setError('Already exist user with this email'))
                } else {
                    setError(message);
                }
                */
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
                    placeholder="Name"
                    style={styles.input}
                    value={userInput?.displayName}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, displayName: text }))} />

                <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholder="Password"
                    value={userInput?.password}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, password: text }))} />

                <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholder="Repeat Password"
                    value={userInput?.repeatedPassword}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, repeatedPassword: text }))} />

                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
            </View>

            <View style={styles.buttonContainer}>
                <Button text='Register' onPress={signUpHandler} />
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
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
})