import React, {useEffect, useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {PaginationComponent} from "../pagination/pagination";
import css from './searchPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC} from "../../redux/vacanciesReducer";
import {getFavoritesTC} from "../../redux/favoritesReducer";
import {useSearchParams} from "react-router-dom";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {SearchBlock} from "../../features/inputSearch/searchBlock";
import {getCataloguesTC, updateUrlParamsAC} from "../../redux/searchReducer";
import {filterParams} from "../../utils/filterParams";

export type FilterType = {
    payment_from?: string
    payment_to?: string
    catalogues?: string
}

export const SearchPage: React.FC = ({}) => {
    const dispatch = useAppDispatch()
    const favoriteVacancies = useAppSelector(state => state.favorites)
    const vacancies = useAppSelector(state => state.vacancies.objects)
    const searchState = useAppSelector(state => state.search.params)

    const [searchValue, setSearchValue] = useState(searchState.keyword);
    const [activePage, setPage] = useState(searchState.page);
    const [filters, setFilters] = useState<FilterType>({
        catalogues: searchState.catalogues,
        payment_from: searchState.payment_from,
        payment_to: searchState.payment_to,
    });
    const [searchParams, setSearchParams] = useSearchParams(searchState)


    const handleChangePage = (page: number) => {
        dispatch(updateUrlParamsAC({...searchState, page: page + ''}))
        setSearchParams({
            ...filterParams({
                ...searchState, page: page + ''
            })
        })
        setPage(page.toString())
    }
    const handleSearchValue = (keyword: string) => {
        dispatch(updateUrlParamsAC({...searchState, page: '1' + '', keyword: keyword + ''}))
        setSearchParams({
            ...filterParams({
                ...searchState, keyword: keyword + '', page: '1' + ''
            })
        })
        setSearchValue(keyword)
    }

    const handleFiltersValue = ( filters: FilterType, keyword?: string) => {
        dispatch(updateUrlParamsAC({
            ...searchState,
            keyword: keyword + '',
            page: '1' + '',
            catalogues: filters.catalogues + '',
            payment_from: filters.payment_from + '',
            payment_to: filters.payment_to + ''
        }))
        setSearchParams({
            ...filterParams({
                ...searchState, page: '1' + '',
                catalogues: filters.catalogues + '',
                payment_from: filters.payment_from + '',
                payment_to: filters.payment_to + ''
            })
        })
        setFilters(filters)
    }

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [favoriteVacancies.length])

    useEffect(() => {
        dispatch(getCataloguesTC())
    }, [])


    useEffect(() => {
        let params = {
            keyword: searchValue ? searchValue : '',
            payment_from: filters.payment_from ? Number(filters.payment_from) : null,
            payment_to: filters.payment_to ? Number(filters.payment_to) : null,
            catalogues: filters.catalogues ? filters.catalogues : '',
            page: Number(activePage) ? Number(activePage) : 1,
        }
        dispatch(getVacanciesTC(params))
    }, [searchValue, filters, activePage])


    return (
        <section className={css.searchPage__wrapper}>

            <div className={css.searchPage__filter_block}>
                <FilterBar
                    filters={filters}
                    setFilters={handleFiltersValue}
                />
            </div>

            <div className={css.searchPage__content_wrapper}>

                <SearchBlock
                    filters={filters}
                    setFilters={setFilters}
                    searchValue={searchValue}
                    onChangeSetSearchValue={handleSearchValue}
                />

                {vacancies.length
                    ? <>
                        <VacanciesList vacancies={vacancies}/>
                        <PaginationComponent

                            activePage={Number(activePage)}
                            setPage={handleChangePage}
                        />
                    </>
                    : <NotFoundPage/>
                }
            </div>
        </section>
    )
}