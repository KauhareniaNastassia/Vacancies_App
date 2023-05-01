import React from "react";
import {FilterBar} from "../../features/filterBar/filterBar";
import {VacanciesList} from "../../features/vacanciesList/vacanciesList";
import {InputSearch} from "../../features/inputSearch/InputSearch";
import {Pagination} from "../pagination/pagination";


export const SearchPage: React.FC = () => {

    return (
        <section>
         <FilterBar/>

            <div>
                <InputSearch/>
                <VacanciesList/>
                <Pagination/>
            </div>

        </section>
    )
}