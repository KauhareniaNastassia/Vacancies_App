import React, {useEffect, useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {PaginationComponent} from "../pagination/pagination";
import css from './searchPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC} from "../../redux/vacanciesReducer";
import {useSearchParams} from "react-router-dom";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {SearchBlock} from "../../features/inputSearch/searchBlock";
import {updateUrlParamsAC} from "../../redux/searchReducer";
import {filterParams} from "../../utils/filterParams";

export type FilterType = {
    payment_from?: string
    payment_to?: string
    catalogues?: string
}

export const SearchPage: React.FC = ({}) => {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.objects)
    const searchState = useAppSelector(state => state.search.params)
    const [isFiltersReset, setIsFiltersReset] = useState<boolean>(false)

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
        setPage('1')
    }

    const handleFiltersValue = (filters: FilterType) => {
        dispatch(updateUrlParamsAC({
            ...searchState,
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
        setPage('1')
    }

    const handleResetAllFilters = () => {
        dispatch(updateUrlParamsAC({
            ...searchState,
            keyword: '',
            page: '1' + '',
            catalogues: '',
            payment_from: '',
            payment_to: ''
        }))
        setSearchParams({
            ...filterParams({
                ...searchState, page: '1' + '',
                keyword: '',
                catalogues: '',
                payment_from: '',
                payment_to: ''
            })
        })
        setFilters({
            catalogues: '',
            payment_from: '',
            payment_to: ''
        })
        setSearchValue('')
        setIsFiltersReset(true)
    }


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
                    resetFilters={handleResetAllFilters}
                    isFiltersReset={isFiltersReset}
                />
            </div>

            <div className={css.searchPage__content_wrapper}>

                <SearchBlock
                    filters={filters}
                    setFilters={setFilters}
                    searchValue={searchValue}
                    onChangeSetSearchValue={handleSearchValue}
                    isFiltersReset={isFiltersReset}
                    resetFilters={handleResetAllFilters}
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