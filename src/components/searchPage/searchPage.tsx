import React, {useEffect, useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {InputSearch} from "../../features/inputSearch/InputSearch";
import {PaginationComponent} from "../pagination/pagination";
import css from './searchPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC, VacancyType} from "../../redux/vacanciesReducer";
import {getFavoritesTC} from "../../redux/favoritesReducer";


export const SearchPage: React.FC = ({}) => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState<string>('');
    const vacancies = useAppSelector(state => state.vacancies.objects)

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)

    const [cardsForDisplay, setCardsForDisplay] = useState(vacancies);

    let displayedObjects = cardsForDisplay?.slice(start, end)

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [])

    useEffect(() => {

        let dataForSearch = {
            keyword: undefined,
            payment_from: undefined,
            payment_to: undefined,
            catalogues: undefined
        }

        dispatch(getVacanciesTC(dataForSearch))
        setCardsForDisplay(vacancies)
    }, [vacancies])

    console.log(start, end)

    return (
        <section className={css.searchPage__wrapper}>

         <FilterBar/>

            <div className={css.searchPage__content_wrapper}>
                <InputSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <VacanciesList vacancies={displayedObjects}/>
                <PaginationComponent setStart={setStart}
                                     setEnd={setEnd}/>
            </div>
        </section>
    )
}