import React, {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, useState} from "react";
import {ButtonComponent} from "../../../common/button/buttonComponent";

import searchIcon from '../../../assets/img/searchIcon.svg'
import {Input} from '@mantine/core';
import {useAppDispatch} from "../../../hooks/hooks";
import {setKeywordAC, setParamsAC} from "../../../redux/vacanciesReducer";

type InputSearchPropsType = {
    searchValue: string
    onChangeSetSearchValue: (searchValue: string) => void
}

export const InputSearch: React.FC<InputSearchPropsType> = ({
                                                                searchValue,
                                                                onChangeSetSearchValue
                                                            }) => {


    const [search, setSearch] = useState<string>(searchValue);

    const onClickHandleSearchValue = () => {
        onChangeSetSearchValue(search)
    }
    const onKeyDownSetSearchValue: KeyboardEventHandler = (e ) => {
        if (e.key === 'Enter') {
            onChangeSetSearchValue(search)
        }
    }

    return (
        <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => onKeyDownSetSearchValue(e)}
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