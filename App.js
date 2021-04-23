/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnalysisStack from 'drugtest/src/components/AnalysisStack';
import AdminStack from 'drugtest/src/components/AdminStack';
import OptionsStack from 'drugtest/src/components/OptionsStack';
import ShareMenu from 'react-native-share-menu';
import { handleChatURI } from "./src/Chats";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faDiceD20, faFeather } from '@fortawesome/free-solid-svg-icons';
import Loading from './src/components/Loading';
import { OkAlert } from './src/components/CustomAlerts';
import { get } from './src/utils/storage';

const Tabs = createBottomTabNavigator();

/*----------------Get chat functionality------------------*/
type SharedItem = {
  mimeType: string,
  data: string,
};

const App: () => React$Node = () => {
  /*This is to receive the file(chat) */
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [loading, setLoading] = useState(false);
  const [reloadAll, setReloadAll] = useState(false);

  function handleReloadLogged(reloadValue){
    setReloadAll(reloadValue);
  }//handleReloadLogged

    async function getUser(){
      const fndUser = await get("user");
      if(fndUser)
      {
        console.log("user found in appjs", fndUser);
        setReloadAll(true);
      }
    }//getUser

  const handleShare = useCallback((item: ?SharedItem) => {
    if (!item) {
      return;
    }

    const { mimeType, data } = item;

    setSharedData(data);
    setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    getUser();
    ShareMenu.getInitialShare(handleShare);
    const listener = ShareMenu.addNewShareListener(handleShare);
    return () => listener.remove();
  }, []);

  useEffect(()=>{
    getSharedChat();
  }, [sharedData, reloadAll]);

  const getSharedChat = async () => {
    if (sharedData) {
      let errMess = "";
      let success = true;
      const analysisFlags = await get("analysisFlags");
      if (analysisFlags)
      {
        setLoading(true);
        const idResFinal = JSON.parse(analysisFlags).idResFinal;
        console.log("idResFinal got from android in chat.js", idResFinal);
        var chatURI = sharedData.toString();
        const ret = await handleChatURI(chatURI,idResFinal);
        setLoading(false);
        if (!ret.success)
        {
          success = false;
          errMess = ret.message;
        }
      }
      else
      {
        success = false;
        errMess = "No se encontró un dato en el storage de tu dispositivo necesario para realizar el envío, realiza el cuestionario nuevamente."
      }
      if(success)
        OkAlert({ title: "Éxito", message: "Chat enviado correctamente." });
      else
        OkAlert({ title: "Error", message: errMess });
    }
  }//getSharedChat
  /*-----------------------------End of get chat--------------- */



  return (
    <NavigationContainer key={reloadAll}>
      { loading && <Loading />}
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#1db954', //fefefe #1db954
          inactiveTintColor: '#fefefe', //fefefe 9A9F99
          style: {
            backgroundColor: "#120078"
          },
        }}

      >
        <Tabs.Screen
          name="Analysis"
          options={{
            tabBarVisible: reloadAll,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faDiceD20}
                style={{ color: color }}
                size={30}
              />
            )
          }}>
            {props => <AnalysisStack
              {...props}
              reloadLogged={handleReloadLogged}
              reloadValue={reloadAll}
            />}
        </Tabs.Screen>

        <Tabs.Screen
          component={AdminStack}
          name="Admin"
          options={{
            tabBarVisible: reloadAll,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faFeather /*faFilter faFeather*/}
                style={{ color: color }}
                size={30}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Options"
          options={{
            tabBarVisible: reloadAll,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faBars}
                style={{ color: color }}
                size={30}
              />
            )
          }}>
            {props => <OptionsStack {...props} reloadLogged={handleReloadLogged}/>}
          </Tabs.Screen>

      </Tabs.Navigator>
    </NavigationContainer>


  );
};


export default App;
