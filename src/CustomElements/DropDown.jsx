import { StyleSheet, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';

export default function Dropdown({ label, filterDataHandler, toggleDropdown, visible }) {
    const OPTIONS = ['Last Weak', 'Last Month', 'Last Year'];
 
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={toggleDropdown}>
            {!visible ? <Text style={styles.text}>{label}</Text> : <Text style={styles.text}>Your Options</Text>}

            {visible ? <ScrollView bounces={false}>
                <Pressable style={({ pressed }) => [{ opacity: pressed ? .65 : 1 }]}>
                    {OPTIONS?.map(option =>
                        <Text
                            key={option}
                            style={styles.options}
                            onPress={() => { filterDataHandler(option) }}>
                            {option}</Text>
                    )}
                </Pressable>
            </ScrollView> : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        zIndex: 1,
        padding: 15,
        borderRadius: 10,
        borderColor: '#3ea0c3',
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 16,
        color: '#3ea0c3',
        fontWeight: '700',
        textAlign: 'center',
    },
    dropdown: {
        top: 50,
        position: 'absolute',
        backgroundColor: '#fff',
    },
    options: {
        zIndex: 1,
        padding: 15,
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        borderColor: '#3ea0c3',
        paddingHorizontal: 10,
    }
});