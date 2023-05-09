import {VacancyItem} from "../../features/vacanciesList/vacancyItem/vacancyItem";
import React, {useEffect} from "react";
import css from './vacancyPage.module.scss'
import {VacancyInfo} from "../../features/vacanciesList/vacancyInfo/vacancyInfo";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacancyTC} from "../../redux/vacancyReducer";


export const VacancyPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const vacancy = useAppSelector(state => state.vacancy)


    useEffect(() => {
        dispatch(getVacancyTC(Number(id)))
    }, [id])

    return (
        <section className={css.vacancyPage__wrapper}>
            <VacancyItem
                id={vacancy.id}
                currency={vacancy.currency}
                paymentFrom={vacancy.payment_from}
                profession={vacancy.profession}
                townTitle={vacancy.town?.title}
                typeOfWorkTitle={vacancy.type_of_work?.title}
                isLink={false}
            />

            <VacancyInfo info={vacancy.vacancyRichText}/>
        </section>
    )
}