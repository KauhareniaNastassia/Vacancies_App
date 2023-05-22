import React, {useEffect} from "react";
import css from './header.module.scss'
import joboredLogo from '../../assets/img/joboredLogo.png'
import {NavLink} from "react-router-dom";
import {BurgerMenu} from "../../common/burgerMenu/burgerMenu";
import {authByPasswordTC, refreshTokenTC} from "../../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getFavoritesTC} from "../../redux/favoritesReducer";
import {getCataloguesTC} from "../../redux/searchReducer";

export const Header: React.FC = () => {
    const authData = useAppSelector(state => state.auth.data)
    const dispatch = useAppDispatch()
    const favoriteVacancies = useAppSelector(state => state.favorites)

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [favoriteVacancies.length])

    useEffect(() => {
        dispatch(getCataloguesTC())
    }, [])

    useEffect(() => {
        if (authData === null) {
            dispatch(authByPasswordTC())
        } else if (authData.refresh_token && 1000 * authData.ttl < Date.now()) {
            dispatch(refreshTokenTC(authData.refresh_token))
        }

    }, [authData])

    return (
        <section className={css.header__wrapper}>

            <div className={css.header__content_wrapper}>

                <NavLink to='/'>
                    <img src={joboredLogo} alt='joboredLogo'/>
                </NavLink>

                <div className={css.header__links_wrapper}>
                    <div className={css.header__link}>
                        <NavLink
                            to="/vacancies"
                            className={({isActive}) => isActive ? `${css.header__link} ${css.header__link_active}` : css.header__link}>
                            Поиск вакансий
                        </NavLink>
                    </div>
                    <div className={css.header__link}>
                        <NavLink
                            to='/favorites'
                            className={({isActive}) => isActive ? `${css.header__link} ${css.header__link_active}` : css.header__link}>
                            Избранное
                        </NavLink>
                    </div>
                </div>

                <div className={css.header__burger_menu_wrapper}>
                    <BurgerMenu/>
                </div>

            </div>

        </section>
    )
}