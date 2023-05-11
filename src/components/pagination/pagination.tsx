import React, {useEffect, useState} from "react";
import css from './pagination.module.scss'


import {Pagination} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC} from "../../redux/vacanciesReducer";

type PaginationComponentPropsType = {
    setStart: (startIndex: number) => void
    setEnd: (endIndex: number) => void
}

export const PaginationComponent: React.FC<PaginationComponentPropsType> = ({setStart,setEnd }) => {

    const total = useAppSelector(state => state.vacancies.total)
    const [activePage, setPage] = useState(1);

    const startIndex = (activePage - 1) * 4;
    const endIndex = startIndex + 4;

    /*const onChangeGetVacanciesForPage = () => {
        setStart(startIndex)
        setEnd(endIndex)
    }*/

    useEffect(() => {
        setStart(startIndex)
        setEnd(endIndex)
    }, [activePage])


    return (
        <section className={css.pagination__wrapper}>
            <Pagination total={Math.ceil(total / 4)}
                        styles={{
                            control: {
                                '&[data-active]': {
                                    backgroundColor: '#5E96FC'
                                }
                            }
                        }}
                        value={activePage}
                        onChange={setPage}
                       // onClick={onChangeGetVacanciesForPage}

            />

        </section>
    )
}
