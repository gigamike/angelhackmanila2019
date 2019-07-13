import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui'
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

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
    addResponseMessage(response.message);
  }

  render() {
    return (
      <div className="App">
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
