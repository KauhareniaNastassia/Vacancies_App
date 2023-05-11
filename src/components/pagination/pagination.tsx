import React, {ChangeEvent, useEffect, useState} from "react";
import css from './pagination.module.scss'


import {Pagination} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getVacanciesTC} from "../../redux/vacanciesReducer";

type PaginationComponentPropsType = {
    setStart: (startIndex: number) => void
    setEnd: (endIndex: number) => void
    itemsCount: number
    handleChangePage?: (page: number) => void
}

export const PaginationComponent: React.FC<PaginationComponentPropsType> = ({
                                                                                setStart,
                                                                                setEnd, handleChangePage,
                                                                                itemsCount
                                                                            }) => {

    // const total = useAppSelector(state => state.vacancies.total)
    const [activePage, setPage] = useState(1);

    const startIndex = (activePage - 1) * 4;
    const endIndex = startIndex + 4;


    useEffect(() => {
        setStart(startIndex)
        setEnd(endIndex)
        if (handleChangePage) {
            handleChangePage(activePage)
        }
    }, [activePage])


    return (
        <section className={css.pagination__wrapper}>
            <Pagination total={Math.ceil(itemsCount / 4)}
                        styles={{
                            control: {
                                '&[data-active]': {
                                    backgroundColor: '#5E96FC'
                                }
                            }
                        }}
                        value={activePage}
                        onChange={setPage}


            />

        </section>
    )
}
