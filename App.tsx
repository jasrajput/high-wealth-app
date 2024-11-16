import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './app/Navigations/Routes';

class App extends Component {

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    },1000);
  }


  render() {
    return (
        <Routes/>
    );
  }
}

export default App;