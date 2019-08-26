import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import ExampleReport from './pages/ExampleReport/ExampleReport';
import ExampleReportDD from './pages/ExampleReport/ExampleReportDD';
 
function App() {
  return (
    <Router>
      <Route path="/" exact component={ExampleReport} />
      <Route path="/ExampleReport" exact component={ExampleReport} />
      <Route path="/ExampleReportDD" exact component={ExampleReportDD} />
    </Router>
  );
}

export default App;
