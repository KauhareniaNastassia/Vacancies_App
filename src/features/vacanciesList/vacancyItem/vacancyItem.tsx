import React, {useState} from "react";
import css from './vacancyItem.module.scss'
import dotIcon from '../../../assets/img/dotIcon.svg'
import starIconDefault from '../../../assets/img/starIconDefault.svg'
import starIconPressed from '../../../assets/img/starIconPressed.svg'
import locationIcon from '../../../assets/img/locationIcon.svg'
import {NavLink} from "react-router-dom";
import {VacancyType} from "../../../redux/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {addVacancyToFavoritesTC} from "../../../redux/favoritesReducer";


type VacancyItemPropsType = {
    id: number
    profession: string
    paymentFrom: number
    currency: string
    typeOfWorkTitle: string
    townTitle: string
    isLink: boolean
    //addVacancyToFavoritesHandler: (id: number) => void
    //addVacancyToFavoritesHandler: () => void
}

export const VacancyItem: React.FC<VacancyItemPropsType> = ({
                                                                id,
                                                                paymentFrom,
                                                                typeOfWorkTitle,
                                                                townTitle,
                                                                currency,
                                                                profession, isLink

                                                            }) => {


    const dispatch = useAppDispatch()
    const [starPressed, setStarPressed] = useState(false)
    const vacancies = useAppSelector(state => state.vacancies)
    const iFavoriteVacancy = useAppSelector(state => state.favorites).find(el => el.id === id)



    const addVacancyHandler = (id: number) => {
        if(vacancies) {
            let vacancyForFavorites = vacancies.find(el => el.id === id)!
            if (vacancyForFavorites ) {
                dispatch(addVacancyToFavoritesTC(vacancyForFavorites))
                setStarPressed(true)
                }
            }
    }

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
                    onClick={() => addVacancyHandler(id)}
                >
                    {iFavoriteVacancy || starPressed
                        ? <img
                            className={css.vacancyItem__star_default}
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
                    з/п от {paymentFrom} {currency}
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