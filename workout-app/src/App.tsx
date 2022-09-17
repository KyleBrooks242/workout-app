import React from 'react';
import './styling/App.scss';
import {LoginComponent} from "./components/LoginComponent";
import {MenuComponent} from "./components/MenuComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MenuComponent/>
      </header>
      {/*<LoginComponent/>*/}
    </div>
  );
}

export default App;
