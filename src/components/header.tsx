import React from "react";
import css from './header.module.scss'
import joboredLogo from '../assets/img/joboredLogo.png'

export const Header:React.FC = () => {
    return (
        <div className={css.header__wrapper}>
<img src={joboredLogo} alt='joboredLogo'/>
        </div>
    )
}