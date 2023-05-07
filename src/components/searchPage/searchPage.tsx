import React, {useEffect, useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {InputSearch} from "../../features/inputSearch/InputSearch";
import {Pagination} from "../pagination/pagination";
import css from './searchPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC} from "../../redux/vacanciesReducer";


export const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState<string>('');
    const vacancies = useAppSelector(state => state.vacancies.objects)

    useEffect(() => {

        let dataForSearch = {

        }

        dispatch(getVacanciesTC(dataForSearch))
    }, [])


    return (
        <section className={css.searchPage__wrapper}>

         <FilterBar/>

            <div className={css.searchPage__content_wrapper}>
                <InputSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <VacanciesList vacancies={vacancies}/>
                <Pagination/>
            </div>
        </section>
    )
}