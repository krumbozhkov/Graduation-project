import ItemCard from "./ItemCard";
import ItemsByDate from "./ItemsByDate";
import { useEffect, useState } from "react";
import { Entypo } from '@expo/vector-icons';
import Button from '../../CustomElements/Button';
import Dropdown from "../../CustomElements/DropDown";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItemsHandler, getItemsByDataHandler } from "../../helpers/getItems";

export default function ListItems() {
    let totalAmount = 0;
    const [item, setItem] = useState([]);
    const [error, setError] = useState([]);
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [updateView, setUpdateView] = useState(false);

    useEffect(() => {
        setTotal(0);
    }, []);

    useEffect(() => {
        getItems();
    }, [updateView]);

    async function getItems() {
        const userId = JSON.parse(await AsyncStorage.getItem("userId"));
        const result = await getItemsHandler(userId);

        if (Array.isArray(result)) {
            setItem(result);
        } else {
            setError(result);
        }
    }

    function changeShowHandler(data) {
        setShow(data);
    }

    function changeItemsHandler(data) {
        setUpdateView(data);
    }

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    async function filterDataHandler(type) {
        const result = await getItemsByDataHandler(type, item);

        result?.errorMessage ? setError(result?.errorMessage) : setError('');
        result?.data ? setItem(Object.values(result.data)) : setItem([]);
        result?.successMessage ? setTotal(result?.successMessage) : setTotal('');
        setVisible(false);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', padding: 25 }}>
                    {item?.length > 0 ?
                        <View>
                            <Text style={styles.title}>Scanning History</Text>
                            <View>
                                <Dropdown label='Filter by date' filterDataHandler={filterDataHandler} toggleDropdown={toggleDropdown} visible={visible} />
                                {total ? <Text style={styles.text}>{total}</Text> : null}
                            </View>
                            {(item && !showMore) ?
                                <View>
                                    {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
                                    {item?.slice(0, 3)?.map(it => {
                                        totalAmount += Number(it.amount);
                                        return <ItemCard key={it.id} item={it} changeItemsHandler={changeItemsHandler} />
                                    })}
                                    {item?.length > 3 &&
                                        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                            <Entypo name="chevron-with-circle-down" size={26} color="black" onPress={() => setShowMore(true)} />
                                            <Text onPress={() => setShowMore(true)} style={{ fontWeight: 'bold', paddingLeft: 5 }}>See More</Text>
                                        </View>}
                                </View> :
                                <View>
                                    {item?.map(it => {
                                        totalAmount += Number(it.amount);
                                        return <ItemCard key={it.id} item={it} changeItemsHandler={changeItemsHandler} />
                                    })}
                                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                        <Entypo name="arrow-with-circle-up" size={26} color="black" onPress={() => setShowMore(false)} />
                                        <Text onPress={() => setShowMore(false)} style={{ fontWeight: 'bold', paddingLeft: 5 }}>Less</Text>
                                    </View>
                                </View>
                            }
                        </View> :
                        <View>
                            <Text style={styles.text}>No items found!</Text>
                        </View>}
                </View>
                {show ? <ItemsByDate show={show} changeShowHandler={changeShowHandler} items={item} /> : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 16,
        padding: 5,
        paddingTop: 10,
        textAlign: 'center',
    },
    title: {
        color: "black",
        fontSize: 28,
        padding: 5,
        paddingTop: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
});