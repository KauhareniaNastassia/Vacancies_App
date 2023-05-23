import React, {useEffect, useState} from "react";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {VacancyItem} from "../../features/vacanciesList/vacancyItem/vacancyItem";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import css from './favoritesPage.module.scss'
import {PaginationComponent} from "../pagination/pagination";
import {VacancyType} from "../../redux/vacanciesReducer";
import {getFavoritesTC} from "../../redux/favoritesReducer";


export const FavoritesPage: React.FC = () => {
    const favoriteVacancies = useAppSelector(state => state.favorites)
    const dispatch = useAppDispatch()
    const [activePage, setPage] = useState(1);
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)
    const [cardsForDisplay, setCardsForDisplay] = useState<VacancyType[]>(favoriteVacancies);
    let displayedObjects = cardsForDisplay?.slice(start, end)

    const startIndex = (activePage - 1) * 4;
    const endIndex = startIndex + 4;

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [favoriteVacancies.length])

    useEffect(() => {
        setCardsForDisplay(favoriteVacancies)
    }, [favoriteVacancies.length])

    useEffect(() => {
        setStart(startIndex)
        setEnd(endIndex)
    }, [activePage])

    return (
        <section className={css.favoritesPage__wrapper}>

            <div className={css.favoritesList__wrapper}>

                {favoriteVacancies.length !== 0
                    ? displayedObjects.map((el) =>
                        <VacancyItem
                            key={el.id}
                            id={el.id}
                            profession={el.profession}
                            paymentFrom={el.payment_from}
                            currency={el.currency}
                            typeOfWorkTitle={el.type_of_work.title}
                            townTitle={el.town.title}
                            isLink={!!el.id}
                        />)
                    : <NotFoundPage/>
                }
            </div>

            {
                favoriteVacancies.length > 4 && <PaginationComponent
                    activePage={activePage}
                    setPage={setPage}
                    itemsCount={favoriteVacancies.length}
                />
            }
        </section>
    )
}