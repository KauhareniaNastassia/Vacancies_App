import React from "react";
import {ButtonComponent} from "../../common/button/button";
import css from './inputSearch.module.scss'
import searchIcon from '../../assets/img/searchIcon.svg'

type InputSearchPropsType = {
    searchValue: string,
    setSearchValue: (value: string) => void
}

export const InputSearch: React.FC<InputSearchPropsType> = ({searchValue, setSearchValue}) => {

    return (
        <section className={css.inputSearch__wrapper}>

            <div className={css.inputSearch__input_wrapper}>
                <img src={searchIcon} alt='search icon'/>
                <input
                    className={css.inputSearch__input}
                    value={searchValue}
                    placeholder="Введите название вакансии"
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </div>
            <ButtonComponent title='Поиск'/>

            {/*<Button title='Поиск'/>*/}

        </section>
    )
}