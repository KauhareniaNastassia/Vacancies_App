import React from 'react';
import './App.module.scss';
import {Header} from "./components/header/header";
import css from './App.module.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import {SearchPage} from "./components/searchPage/searchPage";
import {FavoritesPage} from "./components/favoritesPage/favoritesPage";
import {VacancyPage} from "./components/vacancyPage/vacancyPage";

function App() {
  return (
    <div className={css.app__wrapper}>
      <Header/>

        <div className={css.app__content_wrapper}>
          <Routes>
            <Route path="/" element={<Navigate to="/vacancies"/>}/>
            <Route path="/vacancies" element={<SearchPage/>}/>
            <Route path="/favorites" element={<FavoritesPage/>}/>
            <Route path="/vacancy" element={<VacancyPage/>}/>
           {/* <Route path={`/vacancies/${vacancy.id}`} element={<VacancyPage/>}/>*/}

          </Routes>
        </div>
    </div>
  );
}

export default App;
