import {InputSearch} from "./inputSearch/InputSearch";
import filterIcon from "../../assets/img/filterIcon.svg";
import React, {useEffect, useRef, useState} from "react";
import css from './searchBlock.module.scss'
import {FilterBar} from "../filterBar/filterBar";
import {useOnClickOutsideCloseSideBar} from "../../hooks/useOnClickOutsideCloseBurgerMenu";
import {useDisclosure} from "@mantine/hooks";
import {VacanciesParamsType} from "../../redux/vacanciesReducer";
import {FilterType} from "../../components/searchPage/searchPage";

type InputSearchBlockPropsType = {
    filters: FilterType
    setFilters: (filters: FilterType) => void
    searchValue: string
    onChangeSetSearchValue: (searchValue: string) => void
}

export const SearchBlock: React.FC<InputSearchBlockPropsType> = ({
                                                                     searchValue,
                                                                     onChangeSetSearchValue, setFilters, filters
                                                                 }) => {


    const node = useRef<HTMLDivElement>(null);
    const [opened, handlers] = useDisclosure(false);



    return (
        <section className={css.search__block__wrapper}>

            <div className={css.search__block_input}>
                <InputSearch
                    searchValue={searchValue}
                    onChangeSetSearchValue={onChangeSetSearchValue}
                />
            </div>

            <div ref={node}
                 className={css.search__block_filter_button_wrapper}

            >
                <button
                    className={opened
                        ? `${css.search__block_filter_button} ${css.search__block_filter_button_pressed}`
                        : css.search__block_filter_button}
                    onClick={() => {
                        handlers.toggle()
                    }}
                >
                    <img src={filterIcon} alt='filter icon'/>
                </button>

                {
                    opened &&
                    <div className={css.search__block_filterBar_block}>
                        <FilterBar
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </div>
                }
            </div>


        </section>
    )
}