import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import RepositoriesRoute from '../RepositoriesRoute';
import RepositoryRoute from '../RepositoryRoute';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={RepositoriesRoute} />
      <Route path="/repository/:id*" exact component={RepositoryRoute} />
    </Router>
  );
}

export default App;
