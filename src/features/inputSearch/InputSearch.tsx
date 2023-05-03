import React from "react";
import {ButtonComponent} from "../../common/button/buttonComponent";

import searchIcon from '../../assets/img/searchIcon.svg'
import {Input} from '@mantine/core';

type InputSearchPropsType = {
    searchValue: string,
    setSearchValue: (value: string) => void
}

export const InputSearch: React.FC<InputSearchPropsType> = ({searchValue, setSearchValue}) => {

    return (
        <Input
            icon={<img src={searchIcon} alt='search icon'/>}
            placeholder="Введите название вакансии"
            radius={'8px'}
            styles={{ input: { height: '48px', borderColor: '#EAEBED', fontSize: '14px'}}}
            rightSectionWidth={100}
            rightSection={<ButtonComponent title='Поиск'/>}
        />
    )
}