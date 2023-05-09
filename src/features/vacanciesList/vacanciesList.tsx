import React from "react";
import {VacancyItem} from "./vacancyItem/vacancyItem";
import css from './vacanciesList.module.scss'
import {VacancyType} from "../../redux/vacanciesReducer";
import {NotFoundPage} from "../notFoundPage/notFoundPage";

type VacanciesListPropsType = {
    vacancies: VacancyType[] | null
}

export const VacanciesList: React.FC<VacanciesListPropsType> = ({vacancies}) => {

    return (
        <section className={css.vacanciesList__wrapper}>

            {vacancies
                ? vacancies.map(el => <VacancyItem
                        key={el.id}
                        id={el.id}
                        profession={el.profession}
                        paymentFrom={el.payment_from}
                        currency={el.currency}
                        typeOfWorkTitle={el.type_of_work.title}
                        townTitle={el.town.title}
                        isLink={!!el.id}
                    />
                )
                : <NotFoundPage/>
            }
        </section>
    )
}