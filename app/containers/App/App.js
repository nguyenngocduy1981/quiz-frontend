import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import ExamPage from 'containers/ExamPage/Loadable';
import GoiyPage from 'containers/GoiyPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s"
      defaultTitle="Exam App"
    >
      <meta name="description" content="Exam App" />
    </Helmet>
    <div id={'top'}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/exam/:name" component={ExamPage} />
      <Route path="/goiy" component={GoiyPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    </div>
    <a id={'go_top'} href={'#top'}>Go top</a>
  </div>
);

export default App;
