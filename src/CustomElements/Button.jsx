import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({ text, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 5
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#3ea0c3',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#3ea0c3',
        fontWeight: '700',
        fontSize: 16,
    },
})