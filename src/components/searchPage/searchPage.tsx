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
import {getCataloguesTC} from "../../redux/searchReducer";
import {Loader} from "../../common/loader/loader";


export const SearchPage: React.FC = ({}) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const favoriteVacancies = useAppSelector(state => state.favorites)
    const vacancies = useAppSelector(state => state.vacancies.objects)
    const paramsForVacanciesSearch = useAppSelector(state => state.vacancies.params)

    const [searchValue, setSearchValue] = useState<string>('');
    const [filters, setFilters] = useState<VacanciesParamsType | undefined>(undefined);


    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)

    const [searchParams, setSearchParams] = useSearchParams()
    const pageUrl = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const keywordURL = searchParams.get('keyword') ? searchParams.get('keyword') + '' : ''
    const [params, setParams] = useState({
        page: 1,

    })
    const handleChangePage = (page: number) => {
        setParams({...params, page})
        setSearchParams({page: page + ''})
    }
    const handleSearchValue = (keyword: string) => {
        //setParams({...params, keyword})
        setSearchParams({keyword: keyword + ''})
    }


    const [cardsForDisplay, setCardsForDisplay] = useState<VacancyType[]>(vacancies);
    let displayedObjects = vacancies?.slice(start, end)

    useEffect(() => {
        dispatch(getFavoritesTC())
    }, [favoriteVacancies.length])

    useEffect(() => {
        dispatch(getCataloguesTC())
    }, [])


    useEffect(() => {

        let params = {
            keyword: searchValue ? searchValue : '',
            payment_from: filters?.payment_from ? filters?.payment_from  : null,
            payment_to: filters?.payment_to ? filters?.payment_to  : null,
            catalogues: filters?.catalogues ? filters?.catalogues  : '',
            page: 1,
            }

        dispatch(getVacanciesTC(params))

    }, [searchValue, filters ])




    return (
        <section className={css.searchPage__wrapper}>

     {/*       {status === 'loading' && <Loader/>}*/}

            <div className={css.searchPage__filter_block}>
                <FilterBar
                    setFilters={setFilters}
                />
            </div>

            {vacancies.length
                ? <div className={css.searchPage__content_wrapper}>

                    <SearchBlock
                        searchValue={searchValue}
                        onChangeSetSearchValue={setSearchValue}
                        handleSearchValue={handleSearchValue}
                    />
                    <VacanciesList vacancies={displayedObjects}/>
                    <PaginationComponent setStart={setStart}
                                         setEnd={setEnd}
                                         itemsCount={paramsForVacanciesSearch.count!}
                                         handleChangePage={handleChangePage}
                    />
                </div>
                : <NotFoundPage/>
            }

        </section>
    )
}