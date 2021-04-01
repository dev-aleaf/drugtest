/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { Image } from "react-native";
import AnalysisStack from 'drugtest/src/components/AnalysisStack';
import AdminStack from 'drugtest/src/components/AdminStack';
import OptionsStack from 'drugtest/src/components/OptionsStack';
import ShareMenu from 'react-native-share-menu';
import { saveChatReceived } from "./src/Chats";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faDiceD20, faFeather, faFilter } from '@fortawesome/free-solid-svg-icons';

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

  const handleShare = useCallback((item: ?SharedItem) => {
    if (!item) {
      return;
    }

    const { mimeType, data } = item;

    setSharedData(data);
    setSharedMimeType(mimeType);

  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
    const listener = ShareMenu.addNewShareListener(handleShare);
    getSharedChat();

    return () => {
      listener.remove();
    };
  }, []);

  const getSharedChat = () => {
    if (sharedMimeType) {
      console.log("There is a MimeType: " + sharedMimeType);
      var chatURI = sharedData.toString();
      saveChatReceived(chatURI);
    }
    else {
      console.log("there is nothing to share");
    }
  };

  return (

    <NavigationContainer>

      <Tabs.Navigator
        tabBarOptions={{
          //tintColor: "#fefefe",
          activeTintColor: '#1db954', //fefefe #1db954
          inactiveTintColor: '#fefefe', //fefefe 9A9F99
          style: {
            backgroundColor: "#120078"
          },
        }}

      >
        <Tabs.Screen
          component={AnalysisStack}
          name="Analysis"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={ faDiceD20 }
                style={{color: color}}
                size={30}
              />
            )
          }}
        />

        <Tabs.Screen
          component={AdminStack}
          name="Admin"
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon
                  icon={ faFeather /*faFilter faFeather*/ }
                  style={{color: color}}
                  size={30}
              />
            )
          }}
        />

        <Tabs.Screen
          component={OptionsStack}
          name="Options"
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon
                  icon={ faBars }
                  style={{color: color}}
                  size={30}
              />
            )
          }}
        />

      </Tabs.Navigator>
    </NavigationContainer>
  );
};


export default App;
