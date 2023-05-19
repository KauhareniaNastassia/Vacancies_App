import React, {useEffect, useState} from "react";
import css from './pagination.module.scss'


import {Pagination} from '@mantine/core';
import {useAppSelector} from "../../hooks/hooks";

type PaginationComponentPropsType = {
    activePage: number
    setPage: (activePage: number) => void
    itemsCount?: number
}

export const PaginationComponent: React.FC<PaginationComponentPropsType> = ({
                                                                                setPage,
                                                                                activePage,
                                                                                itemsCount
                                                                            }) => {
    let total = useAppSelector(state => state.vacancies.total)

    if (itemsCount) {
        total = itemsCount
    }

    useEffect(() => {
        setPage(activePage)
    }, [])

    console.log(activePage)
    return (
        <section className={css.pagination__wrapper}>

            <Pagination total={Math.ceil(total > 500
                ? 500 / 4
                : total / 4)}
                        size={window.innerWidth < 600 ? 'sm' : 'md'}
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
