import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Interactions } from 'aws-amplify';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './index.css';
import axios from 'axios'

class App extends Component {
  componentDidMount() {
    document.title = "Big Mike Personal Trainer (HealthTech)"
    addResponseMessage("Hello, how can I help you today?");
  }

  handleNewUserMessage = (newMessage) => {
    if (newMessage === '') return
    this.submitMsg(newMessage);
  }

  async submitMsg(input) {
    const response = await Interactions.send("BigMikeBotMOBILEHUB", input);
    if (response.intentName === 'GetNutritionFactIntent') {
      const { slots: { Food } } = response;

      axios.get('http://aws2019.gigamike.net/api/nutrition-fact?food=' + Food)
        .then(response => {
        addResponseMessage(JSON.stringify(response.data.text));
      });
    }else{
      addResponseMessage(response.message);
    }
  }

  render() {
    return (
      // eslint-disable-next-line
      <div className="App" className="bg">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Big Mike Personal Trainer (HealthTech)"
          subtitle="Coach Big Mike Personal Trainer (HealthTech). Fitness partner through Health Technology."
        />
      </div>
    );
  } 
}

export default App;
