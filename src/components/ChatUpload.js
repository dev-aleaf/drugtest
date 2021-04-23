import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Text as TextSVG } from "react-native-svg";

function ChatUpload(props) {
    const { onPressFunc, numChats } = props;
    const [displayTut, setDisplayTut] = useState(false);

    const displayChatTutorial = () => {
        setDisplayTut(prevValue => !prevValue);
    }//displayChatTutorial

    const green = "#1db954";
    const white = "white";

    return (
        <View>
            <TouchableOpacity style={styles.chatSection} onPress={onPressFunc} >
                <View style={styles.row}>
                    <Text style={styles.text}>Chats enviados</Text>
                </View>
                <View style={styles.row}>
                    <Svg width={40} height={30}>
                        <TextSVG stroke={numChats >= 1 ? green: white} fontSize="12" x={16} y={19} textAnchor="middle"> 1 </TextSVG>
                        <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                    </Svg>
                    <Svg width={40} height={30}>
                        <TextSVG stroke={numChats >= 2 ? green: white} fontSize="12" x={15} y={19} textAnchor="middle"> 2 </TextSVG>
                        <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                    </Svg>
                    <Svg width={40} height={30}>
                        <TextSVG stroke={numChats == 3 ? green: white} fontSize="12" x={15} y={19} textAnchor="middle"> 3 </TextSVG>
                        <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                    </Svg>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatSection} onPress={displayChatTutorial} >
                <Text style={[styles.text, styles.pressText]}>¿Cómo exportar chats?</Text>
                {displayTut && <View />}
            </TouchableOpacity>
        </View>
    );
}//ChatUpload

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
    },
    text: {
        color: "#dddddd",
        fontSize: 20,
        textAlign: "left",
        margin: 10,
    },
    pressText: {
        color: "#dddddd",
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    chatSection: {
        alignItems: "center",
        marginTop: 5
    },
});

export default ChatUpload;