import React from "react";
import css from './vacancyInfo.module.scss'
import {VacancyInfoBlock} from "./vacancyInfoBlock/vacancyInfoBlock";


export const VacancyInfo:React.FC = () => {
    return (
        <section className={css.vacancyInfo__wrapper}>
            <VacancyInfoBlock title='Обязанности'/>
            <VacancyInfoBlock title='Требования'/>
            <VacancyInfoBlock title='Условия'/>
        </section>
    )
}