import React from "react";
import css from './header.module.scss'
import joboredLogo from '../assets/img/joboredLogo.png'
import {NavLink} from "react-router-dom";

export const Header: React.FC = () => {

    return (
        <section className={css.header__wrapper}>
            <img src={joboredLogo} alt='joboredLogo'/>

            <div className={css.header__links_wrapper}>
                <div className={css.header__link}>
                    <NavLink
                        to='/search'
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
        </section>
    )
}