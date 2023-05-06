import React, {useEffect} from 'react';
import './App.module.scss';
import {Header} from "./components/header/header";
import css from './App.module.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import {SearchPage} from "./components/searchPage/searchPage";
import {FavoritesPage} from "./components/favoritesPage/favoritesPage";
import {VacancyPage} from "./components/vacancyPage/vacancyPage";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {authByPasswordTC, refreshTokenTC} from "./redux/authReducer";

function App() {

    const authData = useAppSelector(state => state.auth.data)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (authData === null) {
            dispatch(authByPasswordTC())
        }
        else if (authData.refresh_token && 1000*authData.ttl < Date.now()) {
            dispatch(refreshTokenTC(authData.refresh_token))
        }

    }, [authData])




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
