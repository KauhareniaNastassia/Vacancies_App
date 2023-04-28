import React from 'react';
import logo from './logo.svg';
import './App.module.scss';
import {Header} from "./components/header";
import css from './App.module.scss'

function App() {
  return (
    <div className={css.app__wrapper}>
      <Header/>
    </div>
  );
}

export default App;
