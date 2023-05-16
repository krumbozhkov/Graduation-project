import { db } from "../../../firebase";
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

export default function ItemCard({ item, changeItemsHandler }) {

    async function alertFunctionHandler() {
        Alert.alert(
            'Choose',
            `Choose one of the options`,
            [
                { text: 'Delete', onPress: () => { deleteItemById(item.baseID) } },
                { text: 'Cancel', style: 'cancel' },
            ]
        )
    }

    async function deleteItemById(id) {
        await db.ref('receipts').child(id).remove();
        changeItemsHandler(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Date: {item.date} - {item.amount}$</Text>
            <Pressable style={({ pressed }) => [{ opacity: pressed ? .65 : 1, paddingLeft: 5 }]}>
                <Entypo name="dots-three-vertical" size={24} color={'black'} onPress={() => { alertFunctionHandler() }} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 18,
        padding: 5,
        paddingTop: 10
    },
    container: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f0f5f5',
    }
});