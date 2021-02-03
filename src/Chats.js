//On this document we will do chat processing
/*
    -Fetching file on phone's filesystem
    -Cut chat to only messages from last month
    -Storage shorter version of the chat into a json array
    -Send the chat to the backend
 */


import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import { postRequest } from './utils/HttpRequest'


function saveChatReceived(chatURI) {
    if (Platform.OS === 'ios') {
        fetchChatIOS(chatURI);
    } else if (Platform.OS === 'android') {
        //for Android up to 6.0 version ask the user for permission to access the local storage
        if (requestStoragePermission()) {
            //Fetch chat by using its URI
            fetchChatAndroid(chatURI);
        }
    }
}

//Looks for the chat inside the mobile storage, reads the chat and splits it into an array of messages
const fetchChatAndroid = (chatURI) => {
    RNFetchBlob.fs
        .readStream(chatURI, 'utf8')
        .then((stream) => {

            let data = '';
            stream.open();
            console.log('Chat found!!...');
            stream.onData((chunk) => {
                data += chunk;
            });
            stream.onEnd(() => {
                console.log('Reading chat...');
                cutChat(data);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}; //fetchChatAndroid

const fetchChatIOS = (chatURI) => {

    //Remove file// prefix 
    let arr = chatURI.split('/');
    const dirs = RNFetchBlob.fs.dirs;
    let filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`;
    decodedFilePath = decodeURI(filePath)
    //---------------------------------------

    RNFetchBlob.fs.exists(decodedFilePath)
        .then((exist) => {
            console.log(`file ${exist ? '' : 'not'} exists`)
        })
        .catch(() => { console.error(err) })


    /*RNFetchBlob.fs.readFile(decodedFilePath, 'utf8')
    .then((data) => {
    console.log(data);
    })*/

}//fetchChatIOS

const cutChat = async (chatContent) => {
    try {
        var messagesArray = chatContent.split('\n'); //Turn string into array

        messagesArray.reverse(); //Put array backwards to get last messages first

        var validDateMessages = await messagesArray.filter(filterbyDate);
        //console.log(validDateMessages);
        await sendChatToBackend(validDateMessages);

    } catch (error) {

    }
}; //cutChat

var today = new Date(); //THIS MIGHT NOT GO HERE!!

const filterbyDate = (message) => {
    if (message) {
        //if message is not empty like this ""

        var messageDate = message.split(',', 1); //get date
        if (messageDate[0].search('/') !== -1) {
            //Make sure the message starts with a date

            let mdy = messageDate[0].split('/'); //Get the day, month and year into an array
            let ObjectMessageDate = new Date('20' + mdy[2], mdy[0] - 1, mdy[1]);
            var timeElapsedMs = today.getTime() - ObjectMessageDate.getTime(); // time in ms from today to this message
            var daysElapsed = Math.round(timeElapsedMs / (1000 * 60 * 60 * 24)); //Get the days elapsed
            if (daysElapsed < 30) {
                //console.log(daysElapsed);
                return true;
            }
        }
    } else {
        return false;
    }
};


const sendChatToBackend = async (validDateMessages) => {

    console.log(validDateMessages);
    const url = "http:192.168.100.107:3030/chat/save-chat";
    const data = {
        chat: validDateMessages,
        boleta: 2017630222,
        password: 123,
    };

    postRequest(url, data)
        .then(result => {
            console.log("result de postReq", result);
            if (result.success) {
                //handle successs
            }
            else {
                console.error('error');
            }
        })
        .catch(err => {
            console.error(err);
        });


}//sendChatToBackend

const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Drugtest App External storage permission',
                message:
                    'Drugtest App needs access to your local files ' +
                    'so you can do all the tests.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can open the mobile storage');
            return true;
        } else {
            console.log('Files permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
    }
};

export { saveChatReceived };
