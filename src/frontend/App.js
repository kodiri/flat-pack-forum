import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ForumIndex from './ForumIndex';
import CreateThread from './CreateThread';
import Thread from './Thread';
import UserProfile from './UserProfile';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import SignOut from './authentication/SignOut';
import Header from './common/Header';
import SideBar from './common/sidebar/SideBar';
import Footer from './common/Footer';
import NotFound from './common/NotFound';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientInfo: undefined
    };
    this.refreshSession = this.refreshSession.bind(this);
  }

  refreshSession() {
    fetch('/refresh-session').then(res => {
      return res.ok ? res.json() : Promise.reject();
    }).then(res => {
      console.log(`Reponse from /refresh-session: ${JSON.stringify(res)}`);
      if (res.hasOwnProperty('clientInfo')) {
        this.setState({ clientInfo: res.clientInfo });
      } else {
        this.setState({ clientInfo: {} });
      }
    });
  }

  componentDidMount() {
    this.refreshSession();
  }

  render() {
    let clientInfo = this.state.clientInfo;
    return clientInfo ?
      (<div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={ForumIndex} />
          <Route exact path='/index' component={ForumIndex} />
          <Route exact path='/createThread' render={props =>
            <CreateThread {...props} clientInfo={clientInfo} />} />
          <Route exact path='/thread/:number' render={props =>
            <Thread {...props} clientInfo={clientInfo} />} />
          <Route exact path='/user/:number' component={UserProfile} />
          <Route exact path='/signIn' render={props =>
            <SignIn {...props} refreshSession={this.refreshSession} />} />
          <Route exact path='/signUp' render={props =>
            <SignUp {...props} refreshSession={this.refreshSession} />} />
          <Route exact path='/signOut' render={props =>
            <SignOut 
              {...props} 
              clientInfo={clientInfo} 
              refreshSession={this.refreshSession} />} />
          <Route exact path='/not-found' component={NotFound} />
          <Route path='/:invalid' component={NotFound} />
        </Switch>
        <SideBar history={this.props.history}
          clientInfo={clientInfo}
          refreshSession={this.refreshSession} />
        <Footer />
      </div>) :
      <></>;
  }
}

export default withRouter(App);
