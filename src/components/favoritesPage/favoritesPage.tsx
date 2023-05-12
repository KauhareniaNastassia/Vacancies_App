import React, {useEffect, useState} from "react";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {VacancyItem} from "../../features/vacanciesList/vacancyItem/vacancyItem";
import {useAppSelector} from "../../hooks/hooks";
import css from './favoritesPage.module.scss'
import {PaginationComponent} from "../pagination/pagination";
import {VacancyType} from "../../redux/vacanciesReducer";


export const FavoritesPage: React.FC = () => {

    const favoriteVacancies = useAppSelector(state => state.favorites)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)
    const [cardsForDisplay, setCardsForDisplay] = useState<VacancyType[]>(favoriteVacancies);
    let displayedObjects = cardsForDisplay?.slice(start, end)

    useEffect(() => {
        setCardsForDisplay(favoriteVacancies)
    }, [favoriteVacancies.length])


    return (
        <section className={css.favoritesPage__wrapper}>
            <div className={css.favoritesList__wrapper}>
                {favoriteVacancies.length !== 0 ?
                    displayedObjects.map((el) =>
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
            </div>

            {
                favoriteVacancies.length > 4 && <PaginationComponent
                itemsCount={favoriteVacancies.length}
                    setStart={setStart}
                    setEnd={setEnd}/>
            }




        </section>
    )
}