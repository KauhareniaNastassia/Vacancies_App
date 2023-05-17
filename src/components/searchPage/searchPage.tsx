import React, {useEffect, useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {PaginationComponent} from "../pagination/pagination";
import css from './searchPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC, VacanciesParamsType, VacancyType} from "../../redux/vacanciesReducer";
import {getFavoritesTC} from "../../redux/favoritesReducer";
import {useSearchParams} from "react-router-dom";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {SearchBlock} from "../../features/inputSearch/searchBlock";
import {getCataloguesTC, updateUrlParamsAC} from "../../redux/searchReducer";
import {Loader} from "../../common/loader/loader";


export const SearchPage: React.FC = ({}) => {
    const dispatch = useAppDispatch()
    const favoriteVacancies = useAppSelector(state => state.favorites)
    const vacancies = useAppSelector(state => state.vacancies.objects)
    const [activePage, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [filters, setFilters] = useState<VacanciesParamsType | undefined>(undefined);


    const [searchParams, setSearchParams] = useSearchParams()

    const [params, setParams] = useState({
        page: activePage,

    })
    const handleChangePage = (page: number) => {
        setPage(page)
        // setParams({...params, page})
        //setSearchParams({page: page + ''})
    }
    const handleSearchValue = (keyword: string) => {
        //setParams({...params, keyword})
        setSearchParams({keyword: keyword + ''})
    }


    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [favoriteVacancies.length])

    useEffect(() => {
        dispatch(getCataloguesTC())
    }, [])


    useEffect(() => {

        let paramsV = {
            keyword: searchValue ? searchValue : '',
            payment_from: filters?.payment_from ? filters?.payment_from : null,
            payment_to: filters?.payment_to ? filters?.payment_to : null,
            catalogues: filters?.catalogues ? filters?.catalogues : '',
            page: activePage ? activePage : 1,
        }

        //dispatch(updateUrlParamsAC(paramsV))
        dispatch(getVacanciesTC(paramsV))

    }, [searchValue, filters, activePage])

    /*useEffect(() => {
        const urlParams = {
            page:  activePage + '',
            keyword: searchValue + '',
            catalogues: filters?.catalogues + '',
            payment_from: filters?.payment_from + '',
            payment_to: filters?.payment_to + '',

        }

        setSearchParams(urlParams);
    }, [searchValue, filters, activePage])*/


    console.log(params.page)

    return (
        <section className={css.searchPage__wrapper}>

            <div className={css.searchPage__filter_block}>
                <FilterBar
                    setFilters={setFilters}
                />
            </div>

            <div className={css.searchPage__content_wrapper}>

                <SearchBlock
                    setFilters={setFilters}
                    searchValue={searchValue}
                    onChangeSetSearchValue={setSearchValue}
                />

                {vacancies.length
                    ? <>
                        <VacanciesList vacancies={vacancies}/>
                        <PaginationComponent

                            activePage={activePage}
                            setPage={handleChangePage}
                        />
                    </>
                    : <NotFoundPage/>
                }
            </div>
        </section>
    )
}