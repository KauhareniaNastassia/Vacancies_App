import React, {useState} from "react";
import css from './vacancyItem.module.scss'
import dotIcon from '../../../assets/img/dotIcon.svg'
import starIconDefault from '../../../assets/img/starIconDefault.svg'
import starIconPressed from '../../../assets/img/starIconPressed.svg'
import locationIcon from '../../../assets/img/locationIcon.svg'
import {NavLink} from "react-router-dom";


export const VacancyItem: React.FC = () => {

    const [starPressed, setStarPressed] = useState(false)

    return (
        <section className={css.vacancyItem__wrapper}>
            <div className={css.vacancyItem__title_wrapper}>
                <NavLink to={'/vacancy'} className={css.vacancyItem__title}>Менеджер-дизайнер</NavLink>

                <button
                    className={css.vacancyItem__star_button}
                    onClick={() => setStarPressed(!starPressed)}>
                    { starPressed
                            ? <img
                                className={css.vacancyItem__star_default}
                                src={starIconPressed}
                                alt='star icon default'/>
                            : <img
                                src={starIconDefault}
                                alt='star icon default'/>
                    }
                </button>
            </div>

            <div className={css.vacancyItem__info_wrapper}>
                <span>
                    з/п от 70000 rub
                </span>
                <img src={dotIcon} alt='dot icon'/>
                <span>
                    Полный рабочий день
                </span>
            </div>

            <div className={css.vacancyItem__location_wrapper}>
                <img src={locationIcon} alt='location icon'/>
                <span>Новый Уренгой</span>
            </div>

        </section>
    )
}