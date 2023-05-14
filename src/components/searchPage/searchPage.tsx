import React, {useEffect, useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {PaginationComponent} from "../pagination/pagination";
import css from './searchPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC, VacancyType} from "../../redux/vacanciesReducer";
import {getFavoritesTC} from "../../redux/favoritesReducer";
import {useSearchParams} from "react-router-dom";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {SearchBlock} from "../../features/inputSearch/searchBlock";


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
    }, [])


    useEffect(() => {
        /*setParams({page: +pageUrl})
        setSearchParams(pageUrl)


        let dataForSearch = {
            page: +pageUrl,
        }*/
        dispatch(getVacanciesTC())
        //setCardsForDisplay(vacancies)
    }, [])


    return (
        <section className={css.searchPage__wrapper}>


            <div className={css.searchPage__filter_block}>
                <FilterBar/>
            </div>



            {vacancies
                ? <div className={css.searchPage__content_wrapper}>

                    <SearchBlock handleSearchValue={handleSearchValue}/>

                   {/* <div className={css.searchPage__content_search_wrapper}>
                        <div className={css.searchPage__content_search_input}>
                            <InputSearch
                                handleSearchValue={handleSearchValue}
                            />
                        </div>


                        <button className={css.searchPage__content_search_filter}>
                            <img src={filterIcon} alt='filter icon'/>
                        </button>
                    </div>*/}


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