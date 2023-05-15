import React from "react";
import notFoundPageIcon from '../../assets/img/notFoundPageIcon.svg'
import css from './notFoundPage.module.scss'
import {useNavigate} from "react-router-dom";
import {ButtonComponent} from "../../common/button/buttonComponent";


export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate()

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

            <ButtonComponent
                title='Поиск вакансий'
                onClickHandler={() => navigate('/vacancies')}
            />

        </section>
    )
}