import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function RadioBtn(props){
    const {name, onPressFunc, selected} = props;

    const styles = StyleSheet.create({
        radioButton: {
            height: 20,
            width: 20,
            backgroundColor: "#F8F8F8",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#E6E6E6",
            alignItems: "center",
            justifyContent: "center"
          },
          radioButtonIcon: {
            height: 9,
            width: 9,
            borderRadius: 7,
            backgroundColor: "black"//#98CFB6
          },
          radioButtonText: {
            color: "#f5f4f4",
            margin: 10,
            fontSize: 16,
            marginHorizontal: 10
          },
          row:{
              flexDirection: "row",
              alignItems: "center"
              //justifyContent: "center",
              //margin: 20,
          },
    });

    return(
        <View style={styles.row}>
            <TouchableOpacity onPress={onPressFunc} style={styles.radioButton}>
                {selected && <View style={styles.radioButtonIcon} />}
            </TouchableOpacity>
            <Text style={styles.radioButtonText}>{name}</Text>
        </View>
    );
}//RadioBtn

export default RadioBtn;