import React, {useEffect, useState} from "react";
import css from './vacancyItem.module.scss'
import dotIcon from '../../../assets/img/dotIcon.svg'
import starIconDefault from '../../../assets/img/starIconDefault.svg'
import starIconPressed from '../../../assets/img/starIconPressed.svg'
import locationIcon from '../../../assets/img/locationIcon.svg'
import {NavLink} from "react-router-dom";
import {VacancyType} from "../../../redux/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {addVacancyToFavoritesTC, removeVacancyFromFavoritesTC} from "../../../redux/favoritesReducer";


type VacancyItemPropsType = {
    id: number
    profession: string
    paymentFrom: number
    currency: string
    typeOfWorkTitle: string
    townTitle: string
    isLink: boolean
}

export const VacancyItem: React.FC<VacancyItemPropsType> = ({
                                                                id,
                                                                paymentFrom,
                                                                typeOfWorkTitle,
                                                                townTitle,
                                                                currency,
                                                                profession,
                                                                isLink
                                                            }) => {

    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.objects)
    const favorites = useAppSelector(state => state.favorites)
    const favoriteVacancy = favorites.find(el => el.id == id)
    const [isFavoriteVacancy, setIsFavoriteVacancy] = useState<boolean>()


    const onClickHandler = async (id: number) => {
        if (vacancies) {
            if (favoriteVacancy) {
                dispatch(removeVacancyFromFavoritesTC(id))
                setIsFavoriteVacancy(false)
            } else {
                let vacancyForFavorites = vacancies.find(el => el.id === id)!
                if (vacancyForFavorites) {
                    dispatch(addVacancyToFavoritesTC(vacancyForFavorites))
                    setIsFavoriteVacancy(true)
                }
            }
        }
    }

    useEffect(() => {
        setIsFavoriteVacancy(!!favoriteVacancy)
    }, [favoriteVacancy])

    return (
        <section className={css.vacancyItem__wrapper}>
            <div className={css.vacancyItem__title_wrapper}>
                {isLink
                    ? <NavLink to={`/vacancies/${id}`}
                               className={css.vacancyItem__title_link}>{profession}</NavLink>
                    : <div className={css.vacancyItem__title}>{profession}</div>
                }

                <button
                    className={css.vacancyItem__star_button}
                    onClick={() => onClickHandler(id)}
                >
                    {isFavoriteVacancy
                        ? <img
                            src={starIconPressed}
                            alt='star icon pressed'/>
                        : <img
                            src={starIconDefault}
                            alt='star icon default'/>
                    }
                </button>

            </div>

            <div className={css.vacancyItem__info_wrapper}>
                <span>
                   {paymentFrom === 0
                       ? 'з/п договорная'
                       : `з/п от ${paymentFrom} ${currency}`}
                </span>
                <img src={dotIcon} alt='dot icon'/>
                <span>
                    {typeOfWorkTitle}
                </span>
            </div>

            <div className={css.vacancyItem__location_wrapper}>
                <img src={locationIcon} alt='location icon'/>
                <span>{townTitle}</span>
            </div>

        </section>
    )
}