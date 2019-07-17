import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import toggleClassName from './common/ToggleFn'; 
import ForumIndex from './ForumIndex';
import SubmitThread from './SubmitThread';
import Thread from './Thread';
import SignIn from './authentication/SignIn';
import Header from './common/Header';
import SideBar from './common/SideBar';
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
        <div className="menu-icon" onClick={() => toggleClassName('SideBar', 'active')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" /></svg>
        </div>
        <Header />
        <Switch>
          <Route exact path='/' component={ForumIndex} />
          <Route exact path='/index' component={ForumIndex} />
          <Route exact path='/submit' component={SubmitThread} />
          <Route exact path='/thread/:number' component={Thread} />
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
