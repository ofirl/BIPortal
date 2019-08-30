import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import ExampleReport from './pages/ExampleReport/ExampleReport';
import ExampleReportDD from './pages/ExampleReport/ExampleReportDD';
import TestReport from './pages/ExampleReport/TestReport';
 
function App() {
  return (
    <Router>
      <Route path="/" exact component={ExampleReport} />
      <Route path="/ExampleReport" exact component={ExampleReport} />
      <Route path="/ExampleReportDD" exact component={ExampleReportDD} />
      <Route path="/TestReport" exact component={TestReport} />
    </Router>
  );
}

export default App;
