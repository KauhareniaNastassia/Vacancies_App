import React from "react";
import notFoundPageIcon from '../../assets/img/notFoundPageIcon.svg'
import css from './notFoundPage.module.scss'


export const NotFoundPage: React.FC = () => {
    return (
        <section className={css.notFoundPage__wrapper}>

            <img
                src={notFoundPageIcon}
                alt='not found page icon'
                className={css.notFoundPage__icon}
            />
            <span className={css.notFoundPage__message}>
                Упс, здесь еще ничего нет!
            </span>

        </section>
    )
}