import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {VacancyItem} from "../../features/vacanciesList/vacancyItem/vacancyItem";
import React from "react";
import css from './vacancyPage.module.scss'
import {VacancyInfo} from "../../features/vacanciesList/vacancyInfo/vacancyInfo";


export const VacancyPage = () => {
    return (
        <section className={css.vacancyPage__wrapper}>
            <VacancyItem/>

            <VacancyInfo/>
        </section>
    )
}