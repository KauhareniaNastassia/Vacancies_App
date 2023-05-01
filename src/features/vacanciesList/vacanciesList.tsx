import React from "react";
import {VacancyItem} from "./vacancyItem/vacancyItem";
import css from './vacanciesList.module.scss'


export const VacanciesList: React.FC = () => {

    return (
        <section className={css.vacanciesList__wrapper}>
            <VacancyItem/>
            <VacancyItem/>
            <VacancyItem/>
        </section>
    )
}