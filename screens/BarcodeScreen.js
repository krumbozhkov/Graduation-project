import React from 'react';
import { StyleSheet ,View, Text, KeyboardAvoidingView } from 'react-native';

const BarcodeScreen = () => {
  const [shown, setShown] = useState(false);
  return (
    <View style={styles.container}>
      <Button onPress={() => setShown(true)} title='Show'/>
      {shown && <Scanner setShown={setShown}/>}
    </View>
  );
}

export default BarcodeScreen;

const styles = StyleSheet.create({})