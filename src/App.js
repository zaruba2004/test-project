import React from 'react';
import './App.scss';
import Main from './component/main'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Test project</h2>
      </header>
      <Main />
      <footer>
        <div className="git">
          <a href="https://github.com/zaruba2004" target="_blank" rel="noreferrer"> GitHub(zaruba2004)</a>
          <a href="https://www.linkedin.com/in/yauhen-zaruba-8b9615198/" target="_blank" rel="noreferrer"> Linkedin</a>
          <p>Zaruba Yauhen/2021</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
