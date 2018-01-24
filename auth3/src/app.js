import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: false };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDChtk9GctfdTiy7-buyH0b1W4OzkOJNpk',
      authDomain: 'auth-a1a0e.firebaseapp.com',
      databaseURL: 'https://auth-a1a0e.firebaseio.com',
      projectId: 'auth-a1a0e',
      storageBucket: 'auth-a1a0e.appspot.com',
      messagingSenderId: '348225534216'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
