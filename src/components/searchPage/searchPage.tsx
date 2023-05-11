import React, {useEffect, useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {InputSearch} from "../../features/inputSearch/InputSearch";
import {PaginationComponent} from "../pagination/pagination";
import css from './searchPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC, VacancyType} from "../../redux/vacanciesReducer";
import {getFavoritesTC} from "../../redux/favoritesReducer";
import {useSearchParams} from "react-router-dom";


export const SearchPage: React.FC = ({}) => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState<string>('');
    const vacancies = useAppSelector(state => state.vacancies.objects)

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)

    const [searchParams, setSearchParams] = useSearchParams()
    const pageUrl = searchParams.get('page') ? searchParams.get('page') + '' : '1'

    const [params, setParams] = useState({
        page: 1,

    })
    const handleChangePage = (page: number) => {
        setParams({ ...params, page })
        setSearchParams({ page: page + '' })
    }


    const [cardsForDisplay, setCardsForDisplay] = useState<VacancyType[]>(vacancies);
    let displayedObjects = cardsForDisplay?.slice(start, end)

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [])


    useEffect(() => {
        setSearchParams({ page: pageUrl})
        setParams({ page: +pageUrl})

        let dataForSearch = {
            page: +pageUrl,
        }
        dispatch(getVacanciesTC(dataForSearch))
        setCardsForDisplay(vacancies)
    }, [])



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
                                     setEnd={setEnd}
                                     itemsCount={100}
                                     handleChangePage={handleChangePage}

                                     />
            </div>
        </section>
    )
}