import { auth } from "../../../firebase";
import { useState, useEffect } from 'react';
import Button from "../../CustomElements/Button";
import checkUserInputHandler from "../../helpers/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

export default function EditUserScene() {
    const currentUser = auth.currentUser;
    const [message, setMessage] = useState({ errorMessage: '', successMessage: '' });
    const [userInput, setUserInput] = useState({ email: '', password: '', displayName: '' });

    useEffect(() => {
        currentUser ? setUserInput({ email: currentUser?.email, password: '', displayName: currentUser?.displayName })
            : setUserInput({ email: '', password: '', displayName: '' })
    }, [message])

    async function editUserHandler() {
        setUserInput({ successMessage: '', errorMessage: '' })
        const message = checkUserInputHandler(userInput?.email, userInput?.password, userInput?.displayName);

        if (!message) {
            try {
                const update = {
                    email: userInput?.email,
                    password: userInput?.password,
                    displayName: userInput?.displayName,
                };
                await auth.currentUser.updateProfile(update);
                await AsyncStorage.setItem('userData', JSON.stringify(userInput?.email));
                await AsyncStorage.setItem('displayName', JSON.stringify(userInput?.displayName));
                setMessage((prevState) => ({ ...prevState, successMessage: 'Changes were saved successfully!' }));
            } catch (error) {
                setMessage((prevState) => ({ ...prevState, errorMessage: error }));
            }
        } else {
            setMessage((prevState) => ({ ...prevState, errorMessage: message }));
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
                    value={userInput.email}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, email: text }))} />

                <TextInput
                    placeholder="Name"
                    value={userInput.displayName}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, displayName: text }))}
                    style={styles.input} />

                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    value={userInput.password}
                    onChangeText={text => setUserInput((prevState) => ({ ...prevState, password: text }))} />

                {message?.successMessage ? <Text style={styles.successLabel}>{message?.successMessage}</Text> : null}
                {message?.errorMessage ? <Text style={styles.errorMessage}>{message?.errorMessage}</Text> : null}
            </View>

            <View style={styles.buttonContainer}>
                <Button text='Save' onPress={() => { editUserHandler(); }} />
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
    },
    successLabel: {
        fontSize: 16,
        color: 'green',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
})