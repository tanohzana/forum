import React from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import Shell from '../common/Shell';
import Home from '../pages/Home';
import Post from '../pages/Post';
import PageNotFound from '../pages/PageNotFound';

import style from './App.scss';
import './styles.global.scss';

const App = () => {
  return (
    <div className={style.App}>
      <HashRouter>
        <Shell>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/postinfo/:postId" component={Post} />

            {/* Default Route */}
            <Route component={PageNotFound} />
          </Switch>
        </Shell>
      </HashRouter>
    </div>
  );
};

export default App;
