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

    const vacancies = useAppSelector(state => state.vacancies.objects)
    const paramsForVacanciesSearch = useAppSelector(state => state.vacancies.params)

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)

    const [searchParams, setSearchParams] = useSearchParams()
    const pageUrl = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const keywordURL = searchParams.get('keyword') ? searchParams.get('keyword') + '' : ''

    const [params, setParams] = useState({
        page: 1,
        keyword: ''
    })

    const handleChangePage = (page: number) => {
        setParams({ ...params, page })
        setSearchParams({ page: page + '' })
    }

    const handleSearchValue = (keyword: string) => {
        setParams({ ...params, keyword })
        setSearchParams({ keyword: keyword + '' })
    }


    const [cardsForDisplay, setCardsForDisplay] = useState<VacancyType[]>(vacancies);
    let displayedObjects = cardsForDisplay?.slice(start, end)

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [])




    useEffect(() => {
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
                    handleSearchValue={handleSearchValue}

                />
                <VacanciesList vacancies={displayedObjects}/>
                <PaginationComponent setStart={setStart}
                                     setEnd={setEnd}
                                     itemsCount={paramsForVacanciesSearch.count!}
                                     handleChangePage={handleChangePage}

                                     />
            </div>
        </section>
    )
}