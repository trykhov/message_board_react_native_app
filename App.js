import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList } from 'react-native';
import { Input, Card, Button, Icon } from 'native-base';
import * as firebase from firebase;

// firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyC1AC08ZnST0_R3ToAxGBZ0b8Ma-clcLds",
  authDomain: "reactbootcamp-fab67.firebaseapp.com",
  databaseURL: "https://reactbootcamp-fab67.firebaseio.com",
  projectId: "reactbootcamp-fab67",
  storageBucket: "",
  messagingSenderId: "897342952156",
  appId: "1:897342952156:web:bc63d2be62e7e10c"
};


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageList: []
    }
  };

  sendMessage = message => {
    let messageListRef = firebase.database().ref("message_list");
    let newMessageRef = messageListRef.push(); // pushes message to database
    newMessageRef.set({
      text: message,
      time: Date.now()
    });
    this.setState({message: ""}) // when message is sent, you want it to be cleared again
  };

  updateList = messageList => {
    this.setState({messageList: messageList});
  };

  componentDidMount() {
    let self = this;
    let messageListRef = firebase.database().ref("message_list");
    messageListRef.on("value", dataSnapShot => {
      // into a callback
      if(dataSnapShot.val()) {
        let messageList = Object.values(dataSnapShot.val());
        self.updateList(messageList); // since this is a callback, we can't use this
      }
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Message Board</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList 
            data={this.state.messageList} 
            inverted 
            keyExtractor={(item, index) => item.time.toString()}
            renderItem={({item}) => (
              <Card style={styles.listItem}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timeText}>{new Date(item.time).toLocaleDateString}</Text>
              </Card>
            )}  
          />
        </View>
        <View style={styles.inputContainer}>
          <Input 
            onChangeText={text => this.setState({message: text})} 
            value={this.state.message}
            placeholder="Enter message"
          />
          <Button danger rounded icon
            onPress={() => this.sendMessage(this.state.message)}
          >
            <Icon name="arrow-forward"></Icon>
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    margin: 2,
    backgroundColor: "#01CBC6"
  },
  header: {
    backgroundColor: "#2B2B52",
    alignItems: "center",
    height: 40,
    justifyContent: "center"
  },
  headerText: {
    paddingHorizontal: 10,
    color: "#FFF",
    fontSize: 20
  },
  listContainer: {
    flex: 1,
    padding: 5
  },
  listItem: {
    padding: 10
  },
  messageText: {
    fontSize: 20
  },
  timeText: {
    fontSize: 10
  },
  inputContainer: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 5,
    borderRadius: 15,
    borderColor: "#2B2B52",
    color: "#fff"
  }
});

