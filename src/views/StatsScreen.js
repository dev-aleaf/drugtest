import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, processColor, Platform } from 'react-native';
import ActionBtn from '../components/ActionBtn';
import { getRequest } from '../utils/HttpRequest';
import Loading from '../components/Loading';
import {androidHost} from '../utils/hosts';
import Login from './Login';
import { get } from '../utils/storage';

export default function StatsScreen(props) {
    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    async function getUser(){
        const userSt = await get("user");
        console.log("user in StatsScreen", userSt);
        setUser(userSt);
    }//getUser

    function submitData() {
        setLoading(true);
        const url = `http:${localHost}:3030/admin/get-all-quest-res`;

        getRequest(url)

            .then(result => {
                setLoading(false);
                if (result.success)
                    props.navigation.navigate('Home');
                else
                    console.log(result.message);
            })
            .catch(err => {
                console.log("error aquí");
                console.log(err);
            });
    }//submitData

    useEffect(()=>{
        getUser();
    },[]);

    if(!user)
        return <Login navigation={props.navigation}/>

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            <Text style={styles.text}>Here is going to be the selection of the data</Text>

            <ActionBtn
                btnText={"Obtener datos"}
                onPressFunc={submitData}
            />
        </View>
    );
}//StatsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#120078",/*120078 */
        flex: 1,
    },
    text: {
        color: "#f5f4f4",
        fontSize: 20,
        textAlign: "center"
    },
});