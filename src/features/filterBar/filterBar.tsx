import React from "react";
import css from './filterBar.module.scss'
import closeIcon from '../../assets/img/closeIcon.svg'
import {Select} from "@mantine/core";
import arrowDown from '../../assets/img/arrowDown.svg'
import {ButtonComponent} from "../../common/button/buttonComponent";
import {NumberInputComponent} from "../../common/numberInputComponent/numberInputComponent";


export const FilterBar: React.FC = () => {

    return (
        <section className={css.filterBar__wrapper}>
            <div className={css.filterBar__title_wrapper}>
                <h3 className={css.filterBar__title_name}>Фильтры</h3>
                <button className={css.filterBar__title_button}>
                    Сбросить все
                    <img src={closeIcon} alt='close icon'/>
                </button>
            </div>
            <div className={css.filterBar__filters_wrapper}>

                <div className={css.filterBar__filter}>
                    <Select
                        label="Отрасль"
                        placeholder="Выберете отрасль"
                        rightSection={<img src={arrowDown}/>}
                        rightSectionWidth={0}
                        className={css.filterBar__filter_item}
                        styles={{
                            rightSection: {pointerEvents: 'none'},
                            input: {borderColor: '#EAEBED', borderRadius: '8px'},
                        }}
                        data={['React', 'Angular', 'Svelte', 'Vue', 'Angular', 'Svelte', 'Vue']}
                    />
                </div>

                <div className={css.filterBar__filter}>
                    <NumberInputComponent label='Оклад' placeholder='От'/>
                    <NumberInputComponent placeholder='До'/>
                </div>

                <ButtonComponent title='Применить'/>
            </div>
        </section>
    )
}