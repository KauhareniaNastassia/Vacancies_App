import React, {useState} from "react";
import {VacancyItem} from "./vacancyItem/vacancyItem";
import css from './vacanciesList.module.scss'
import {VacancyType} from "../../redux/vacanciesReducer";

type VacanciesListPropsType = {
    vacancies: VacancyType[] | null
    addVacancyToFavoritesHandler: (id: number) => void
}

export const VacanciesList: React.FC<VacanciesListPropsType> = ({vacancies, addVacancyToFavoritesHandler}) => {



    return (
        <section className={css.vacanciesList__wrapper}>

            {vacancies && vacancies.map(el =>  <VacancyItem
                        key={el.id}
                        id={el.id}
                        profession={el.profession}
                        paymentFrom={el.payment_from}
                        currency={el.currency}
                        typeOfWorkTitle={el.type_of_work.title}
                        townTitle={el.town.title}
                        isLink={!!el.id}
                        addVacancyToFavoritesHandler={addVacancyToFavoritesHandler}
                        //addVacancyToFavoritesHandler={addVacancyToFavoritesHandler}
                    />

            )}

        </section>
    )
}