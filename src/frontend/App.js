import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import ForumIndex from './ForumIndex';
import SubmitThread from './SubmitThread';
import Thread from './Thread';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={ForumIndex} />
        <Route exact path='/index' component={ForumIndex} />
        <Route exact path='/submit' component={SubmitThread} />
        <Route exact path='/thread' component={Thread} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
