import React from 'react';
import logo from './logo.svg';
import './App.css';
import TemplatePage from './pages/template/Template'

function App() {
  return (
    <TemplatePage>

      WHATEVER I WANT

    </TemplatePage>
  );

  return (
    <div className="App" style={{height:'100%', width:'100%'}}>
      <TemplatePage />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
    </div>
  );
}

export default App;
