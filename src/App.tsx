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

    const favoriteVacancies = useAppSelector(state => state.favorites)
    const status = useAppSelector(state => state.app.status)

/*    const [locationKeys, setLocationKeys] = useState([]);
    const history = useHistory();

    useEffect(() => {
        return history.listen((location) => {
            if (history.action === "PUSH") {
                setLocationKeys([location.key]);
            }

            if (history.action === "POP") {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([_, ...keys]) => keys);

                    // Handle forward event
                } else {
                    setLocationKeys((keys) => [location.key, ...keys]);

                    // Handle back event
                }
            }
        });
    }, [locationKeys]);*/

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
