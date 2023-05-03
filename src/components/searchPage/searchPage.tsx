import React, {useState} from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {InputSearch} from "../../features/inputSearch/InputSearch";
import {Pagination} from "../pagination/pagination";
import css from './searchPage.module.scss'


export const SearchPage: React.FC = () => {

    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <section className={css.searchPage__wrapper}>

         <FilterBar/>

            <div className={css.searchPage__content_wrapper}>
                <InputSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <VacanciesList/>
                <Pagination/>
            </div>
        </section>
    )
}