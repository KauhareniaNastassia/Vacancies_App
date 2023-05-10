import React, {useState} from "react";
import css from './pagination.module.scss'


import { Pagination } from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC} from "../../redux/vacanciesReducer";

type PaginationComponentPropsType = {
    setStart: (startIndex: number) => void
    setEnd: (endIndex: number) => void
}

export const PaginationComponent:React.FC <PaginationComponentPropsType> = ({setStart, setEnd}) => {

    const vacancies=useAppSelector(state => state.vacancies)
    const [activePage, setActivePage] = useState(1);

    const startIndex = (activePage - 1) * 4;
    const endIndex = startIndex + 4;

    const onChangeGetVacanciesForPage = () => {
        setActivePage(activePage)
        setStart(startIndex)
        setEnd(endIndex)
    }


    return (
        <section className={css.pagination__wrapper}>
            <Pagination total={Math.ceil(vacancies.total/4)}
                        styles={{
                            control:{
                                '&[data-active]': {
                                    backgroundColor: '#5E96FC'
                                }
                            }
                        }}

                        onChange={onChangeGetVacanciesForPage}

            />

        </section>
    )
}
