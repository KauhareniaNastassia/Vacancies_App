import React, {useEffect} from "react";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {VacancyItem} from "../../features/vacanciesList/vacancyItem/vacancyItem";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getFavoritesTC} from "../../redux/favoritesReducer";
import css from './favoritesPage.module.scss'


export const FavoritesPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const favoriteVacancies = useAppSelector(state => state.favorites)

  /*  useEffect(() => {
        dispatch(getFavoritesTC())
    }, [favoriteVacancies.length])*/

    return (
        <section className={css.favoritesList__wrapper}>

            {favoriteVacancies.length !== 0 ?
                favoriteVacancies.map((el) =>
                    <VacancyItem
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