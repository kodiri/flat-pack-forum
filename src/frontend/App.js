import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ForumIndex from './ForumIndex';
import CreateThread from './CreateThread';
import Thread from './Thread';
import UserProfile from './UserProfile';
import SignIn from './authentication/SignIn';
import Header from './common/Header';
import SideBar from './common/sidebar/SideBar';
import Footer from './common/Footer';
import NotFound from './common/NotFound';

import './App.css';

class App extends React.Component {
  // An example fetch request
  componentDidMount() {
    fetch('/refresh-session').then(res => {
      return res.ok ? res.json() : Promise.reject();
    }).then(res => {
      console.log(`Reponse from /refresh-session: ${JSON.stringify(res)}`);
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={ForumIndex} />
          <Route exact path='/index' component={ForumIndex} />
          <Route exact path='/createThread' component={CreateThread} />
          <Route exact path='/thread/:number' component={Thread} />
          <Route exact path='/user/:number' component={UserProfile} />
          <Route exact path='/signIn' component={SignIn} />
          <Route exact path='/not-found' component={NotFound} />
          <Route path='/:invalid' component={NotFound} />
        </Switch>
        <SideBar />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
