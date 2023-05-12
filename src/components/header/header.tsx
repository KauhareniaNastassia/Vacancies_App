import React from "react";
import css from './header.module.scss'
import joboredLogo from '../../assets/img/joboredLogo.png'
import {NavLink} from "react-router-dom";
import {BurgerMenu} from "../../common/burgerMenu/burgerMenu";

export const Header: React.FC = () => {

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