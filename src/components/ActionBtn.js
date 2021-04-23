import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function FinishBtn(props) {

    const { extraStyles, onPressFunc, btnText, disabled } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity disabled={disabled}
                style={[styles.button, extraStyles, disabled && styles.disabledBtn]}
                onPress={() => onPressFunc()}>
                <Text style={[styles.btnText, disabled && styles.disabledTxt]}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
}//FinishBtn

const styles = StyleSheet.create({
    btnText: {
        color: "#f5f4f4",
        fontSize: 18,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#0d0cb5", //0028ff 0d0cb5 0900c3 3e64ff 342ead 0779e4 sombra 
        borderColor: "#0d0cb5",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        height: 50,
        marginVertical: 10,
        padding: 10,
        width: 300,
        shadowColor: "#b0deff",//5edfff 010a43 000
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    container: {
        alignItems: "center",
    },
    disabledBtn: {
        backgroundColor: "rgba(13, 12, 181,0.3)",
    },
    disabledTxt: {
        color: "#C1C1C1",
    }

});

export default FinishBtn;