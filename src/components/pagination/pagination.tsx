import React, {useEffect, useState} from "react";
import css from './pagination.module.scss'


import {Pagination} from '@mantine/core';

type PaginationComponentPropsType = {
    setStart: (startIndex: number) => void
    setEnd: (endIndex: number) => void
    itemsCount: number
    handleChangePage?: (page: number) => void
}

export const PaginationComponent: React.FC<PaginationComponentPropsType> = ({
                                                                                setStart,
                                                                                setEnd,
                                                                                handleChangePage,
                                                                                itemsCount
                                                                            }) => {
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
