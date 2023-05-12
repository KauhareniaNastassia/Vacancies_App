import React, {useEffect, useState} from 'react';
import './App.module.scss';
import {Header} from "./components/header/header";
import css from './App.module.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import {SearchPage} from "./components/searchPage/searchPage";
import {FavoritesPage} from "./components/favoritesPage/favoritesPage";
import {VacancyPage} from "./components/vacancyPage/vacancyPage";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {authByPasswordTC, refreshTokenTC} from "./redux/authReducer";
import {VacancyType} from "./redux/vacanciesReducer";
import {getFavoritesTC} from "./redux/favoritesReducer";
import {Loader} from "./common/loader/loader";
import {NotFoundPage} from "./features/notFoundPage/notFoundPage";

function App() {

    const authData = useAppSelector(state => state.auth.data)
    const dispatch = useAppDispatch()
    const favoriteVacancies = useAppSelector(state => state.favorites)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [favoriteVacancies.length])

    useEffect(() => {
        if (authData === null) {
            dispatch(authByPasswordTC())
        } else if (authData.refresh_token && 1000 * authData.ttl < Date.now()) {
            dispatch(refreshTokenTC(authData.refresh_token))
        }

    }, [authData])

    return (
        <div className={css.app__wrapper}>

            {status === 'loading' && <Loader/>}


            <Header/>

            <div className={css.app__content_wrapper}>
                <Routes>
                    <Route path="/" element={<Navigate to="/vacancies"/>}/>
                    <Route path="/vacancies" element={<SearchPage/>}/>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                    <Route path="/vacancies/:id" element={<VacancyPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </div>

        </div>
    );
}

export default App;
