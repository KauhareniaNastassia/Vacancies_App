import React, {ChangeEvent, RefAttributes, useEffect, useState} from "react";
import css from './filterBar.module.scss'
import closeIcon from '../../assets/img/closeIcon.svg'
import {NativeSelect, Select} from "@mantine/core";
import arrowDown from '../../assets/img/arrowDown.svg'
import {ButtonComponent} from "../../common/button/buttonComponent";
import {NumberInputComponent} from "../../common/numberInputComponent/numberInputComponent";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getCataloguesTC, setCataloguesAC} from "../../redux/searchReducer";
import it from "node:test";
import {VacanciesParamsType} from "../../redux/vacanciesReducer";

type FilterBarPropsType = {
    setFilters: (filters: VacanciesParamsType | undefined) => void
}

export const FilterBar: React.FC<FilterBarPropsType> = ({setFilters}) => {

    const catalogues = useAppSelector(state => state.search.catalogues)

    const [catalogue, setCatalogue] = useState<string>('');
    const [isCataloguesOpen, setIsCataloguesOpen] = useState<boolean>(false)

    const [isFiltersReset, setIsFiltersReset] = useState<boolean>(false)
    const [paymentFrom, setPaymentFrom] = useState<number | undefined>(undefined)
    const [paymentTo, setPaymentTo] = useState<number | undefined>(undefined)


    const onChangeCatalogueValue = (value: string) => {
        setCatalogue(value)
        setIsCataloguesOpen(false)
    }

    const onClickSetFilters = () => {
        setFilters({
            catalogues: catalogue ? catalogue : '',
            payment_from: paymentFrom ? paymentFrom : undefined,
            payment_to: paymentTo ? paymentTo : undefined
        })
    }

    const onClickResetFilters = () => {
        setIsFiltersReset(true)
        setCatalogue('')
        setPaymentFrom(undefined)
        setPaymentTo(undefined)
        setFilters({
            catalogues: '',
            payment_from: undefined,
            payment_to: undefined
        })
    }


    return (
        <section className={css.filterBar__wrapper}>
            <div className={css.filterBar__title_wrapper}>
                <h3 className={css.filterBar__title_name}>Фильтры</h3>
                <button
                    className={css.filterBar__title_button}
                    onClick={onClickResetFilters}
                >
                    Сбросить все
                    <img src={closeIcon} alt='close icon'/>
                </button>
            </div>
            <div className={css.filterBar__filters_wrapper}>

                {catalogues &&
                    <div className={css.filterBar__filter}>
                        <Select
                            label="Отрасль"
                            placeholder="Выберете отрасль"
                            rightSection={<img
                                className={
                                    isCataloguesOpen
                                        ? css.filterBar__filter_arrow_icon
                                        : ''}
                                src={arrowDown}/>}
                            rightSectionWidth={0}
                            className={css.filterBar__filter_item}
                            styles={{
                                rightSection: {pointerEvents: 'none'},
                                input: {
                                    borderColor: '#EAEBED',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        borderColor: '#5E96FC'
                                    }
                                },
                                item: {
                                    '&[data-selected]': {
                                        '&, &:hover': {backgroundColor: '#5E96FC'}
                                    },
                                }
                            }}
                            searchable
                            data={catalogues.map(el => ({
                                value: el.key.toString(),
                                label: el.title.length > 34 ? el.title.slice(0, 30) + '...' : el.title
                            }))}
                            value={catalogue}
                            onChange={onChangeCatalogueValue}
                            onClick={() => {
                                setIsCataloguesOpen(!isCataloguesOpen)
                            }}
                            onBlur={() => setIsCataloguesOpen(false)}
                        />
                    </div>
                }


                <div className={css.filterBar__filter}>

                    <NumberInputComponent
                        label='Оклад'
                        placeholder='От'
                        paymentNumber={paymentFrom}
                        setPaymentNumber={setPaymentFrom}
                        isFiltersReset={isFiltersReset}
                    />
                    <NumberInputComponent
                        placeholder='До'
                        paymentNumber={paymentTo}
                        setPaymentNumber={setPaymentTo}
                        isFiltersReset={isFiltersReset}
                    />
                </div>

                <ButtonComponent onClickHandler={onClickSetFilters} title='Применить'/>
            </div>
        </section>
    )
}
