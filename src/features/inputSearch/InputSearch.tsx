import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import {ButtonComponent} from "../../common/button/buttonComponent";

import searchIcon from '../../assets/img/searchIcon.svg'
import {Input} from '@mantine/core';
import {useAppDispatch} from "../../hooks/hooks";
import {setKeywordAC, setParamsAC} from "../../redux/vacanciesReducer";

type InputSearchPropsType = {
    /*searchValue: string,
    setSearchValue: (value: string) => void*/
    handleSearchValue: (keyword: string) => void
}

export const InputSearch: React.FC<InputSearchPropsType> = ({handleSearchValue}) => {
const dispatch = useAppDispatch()
   /* const onClickSetSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }*/
    const [searchValue, setSearchValue] = useState<string>('');
    const onClickHandleSearchValue = () => {
        dispatch(setKeywordAC(searchValue))
        handleSearchValue(searchValue)
    }


    return (
        <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            icon={<img src={searchIcon} alt='search icon'/>}
            placeholder="Введите название вакансии"
            radius={'8px'}
            styles={{ input: { height: '48px', borderColor: '#EAEBED', fontSize: '14px'}}}
            rightSectionWidth={100}
            rightSection={<ButtonComponent onClickHandler={onClickHandleSearchValue} title='Поиск'/>}
        />
    )
}