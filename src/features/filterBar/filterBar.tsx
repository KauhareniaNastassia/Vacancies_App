import React from "react";
import css from './filterBar.module.scss'
import closeIcon from '../../assets/img/closeIcon.svg'

import {NumberInput, Select} from "@mantine/core";
import { Button } from '@mantine/core';
import arrowDown from '../../assets/img/arrowDown.svg'
import {ButtonComponent} from "../../common/button/button";


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
                        rightSectionWidth={30}
                        className={css.filterBar__filter_item}
                        styles={{
                            rightSection: { pointerEvents: 'none', paddingRight: '12px' },
                            item: { padding: '5px 0 5px 5px' },
                        }}
                        data={['React', 'Angular', 'Svelte', 'Vue', 'Angular', 'Svelte', 'Vue']}
                    />
                </div>

                <div className={css.filterBar__filter}>

                    <NumberInput
                        className={css.filterBar__filter_item}
                        placeholder="От"
                        label="Оклад"
                        min={0}
                    />
                    <NumberInput
                        //defaultValue={18}
                        className={css.filterBar__filter_item}
                        placeholder="До"
                        min={0}

                        //label="Оклад"
                    />


                </div>


                <ButtonComponent title='Применить'/>



            </div>

        </section>
    )
}