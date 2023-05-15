import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import {ButtonComponent} from "../../../common/button/buttonComponent";

import searchIcon from '../../../assets/img/searchIcon.svg'
import {Input} from '@mantine/core';
import {useAppDispatch} from "../../../hooks/hooks";
import {setKeywordAC, setParamsAC} from "../../../redux/vacanciesReducer";

type InputSearchPropsType = {
    /*searchValue: string,
    setSearchValue: (value: string) => void*/
    handleSearchValue: (keyword: string) => void
    searchValue: string
    onChangeSetSearchValue: (searchValue: string) => void
}

export const InputSearch: React.FC<InputSearchPropsType> = ({
                                                                handleSearchValue, searchValue,
                                                                onChangeSetSearchValue
                                                            }) => {

    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>(searchValue);
    const onClickHandleSearchValue = () => {
        onChangeSetSearchValue(search)
    }


    return (
        <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<img src={searchIcon} alt='search icon'/>}
            placeholder="Введите название вакансии"
            radius={'8px'}
            styles={{
                input: {
                    height: '48px',
                    borderColor: '#EAEBED',
                    fontSize: '14px',
                    '&:hover': {
                        borderColor: '#5E96FC'
                    },
                    '@media(max-width:400px)': {
                        height: '40px',
                    }
                },


            }}
            rightSectionWidth={100}
            rightSection={<ButtonComponent onClickHandler={onClickHandleSearchValue} title='Поиск'/>}
        />
    )
}