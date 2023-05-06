import React from "react";
import {VacancyItem} from "./vacancyItem/vacancyItem";
import css from './vacanciesList.module.scss'
import {VacancyType} from "../../redux/vacanciesReducer";

type VacanciesListPropsType = {
    vacancies: VacancyType[] | null
}

export const VacanciesList: React.FC<VacanciesListPropsType> = ({vacancies}) => {

    return (
        <section className={css.vacanciesList__wrapper}>

            {vacancies && vacancies.map(el =>
                <VacancyItem
                    key={el.id}
                    vacancyItem={el}
                />
            )}

        </section>
    )
}