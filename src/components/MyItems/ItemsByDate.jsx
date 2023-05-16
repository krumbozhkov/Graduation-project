import { useState } from "react";
import Button from "../../CustomElements/Button";
import { Text, View, StyleSheet, ScrollView, Modal } from 'react-native';

export default function ItemsByDate({ show, changeShowHandler, items }) {
    const day = new Date();
    const [result, setResult] = useState([]);
    const [message, setMessage] = useState('');

    function getDataHandler(type) {
        let totalResult = 0;
        let maxDate;
        let minDate;
        let result = [];

        if (type === 'week') {
            const minDate = day.getDate() - 7;
            const maxDate = day.getDate();
            result = items.filter(item => new Date(item.date).getDay() >= minDate && new Date(item.date).getDay() <= maxDate);
        }
        if (type === 'month') {
            maxDate = day.getMonth();
            minDate = day.getMonth() - 1;
            result = items.filter(item => new Date(item.date).getMonth() >= minDate && new Date(item.date).getMonth() <= maxDate);
        }
        if (type === 'year') {
            maxDate = day.getFullYear();
            minDate = day.getFullYear() - 1;
            result = items.filter(item => new Date(item.date).getFullYear() >= minDate && new Date(item.date).getFullYear() <= maxDate);
        }

        if (result.length <= 0) {
            setMessage('Don`t have items for this option!')
        } else {
            result.forEach(el => totalResult += Number(el.amount));
            setResult(result);
            setMessage(`Last ${type} amount: ${totalResult}$`);
        }
    }
    
    return (
        <Modal
            transparent={false}
            animationType="slide"
            visible={show}
            onRequestClose={() => { changeShowHandler(false) }}>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: '75%' }}>
                    <Button text='Last week' onPress={() => getDataHandler('week')} />
                    <Button text='Last month' onPress={() => getDataHandler('month')} />
                    <Button text='Last year' onPress={() => getDataHandler('year')} />

                    {result.length > 0 ? <Text style={styles.text}>{message}</Text>
                        : <Text style={styles.text}>Choose one of the options</Text>}
                </View>
            </ScrollView>
        </Modal >
    )
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 18,
        padding: 5,
        paddingTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});