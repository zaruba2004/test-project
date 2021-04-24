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
          <a href="https://github.com/zaruba2004" target="_blank" rel="noreferrer"> @zaruba2004</a>
        </div>
        <div className="year">
          <p>2021</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
