import React, {useState} from "react";
import css from './filterBar.module.scss'
import closeIcon from '../../assets/img/closeIcon.svg'
import {Select} from "@mantine/core";
import arrowDown from '../../assets/img/arrowDown.svg'
import {ButtonComponent} from "../../common/button/buttonComponent";
import {NumberInputComponent} from "../../common/numberInputComponent/numberInputComponent";
import {useAppSelector} from "../../hooks/hooks";
import {FilterType} from "../../components/searchPage/searchPage";

type FilterBarPropsType = {
    filters: FilterType
    setFilters: (filters: FilterType) => void
    resetFilters: () => void
    isFiltersReset: boolean
    handlers?: {readonly open: () => void, readonly close: () => void, readonly toggle: () => void}
}

export const FilterBar: React.FC<FilterBarPropsType> = ({setFilters, handlers,resetFilters, isFiltersReset}) => {

    const catalogues = useAppSelector(state => state.search.catalogues)
    const searchState = useAppSelector(state => state.search.params)
    const [catalogue, setCatalogue] = useState<string>(searchState.catalogues);
    const [isCataloguesOpen, setIsCataloguesOpen] = useState<boolean>(false)

    //const [isFiltersReset, setIsFiltersReset] = useState<boolean>(false)
    const [paymentFrom, setPaymentFrom] = useState<string | undefined>(searchState.payment_from)
    const [paymentTo, setPaymentTo] = useState<string | undefined>(searchState.payment_to)


    const onChangeCatalogueValue = (value: string) => {
        setCatalogue(value)
        setIsCataloguesOpen(false)
    }

    const onClickSetFilters = () => {
        setFilters({
            catalogues: catalogue ? catalogue : '',
            payment_from: paymentFrom ? paymentFrom.toString() : '',
            payment_to: paymentTo ? paymentTo.toString() : ''
        })
        if(handlers) {
            handlers.toggle()
        }
    }

    const onClickResetFilters = () => {
        //setIsFiltersReset(true)
        setCatalogue('')
        setPaymentFrom('')
        setPaymentTo('')
        resetFilters()
       /* setFilters({
            catalogues: '',
            payment_from: '',
            payment_to: ''
        })*/
        if(handlers) {
            handlers.close()
        }
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
                            data-elem="industry-select"
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
                    <div data-elem="salary-from-input">
                        <NumberInputComponent
                            label='Оклад'
                            placeholder='От'
                            paymentNumber={Number(paymentFrom)}
                            setPaymentNumber={setPaymentFrom}
                            isFiltersReset={isFiltersReset}
                        />
                    </div>
                    <div data-elem="salary-to-input">
                        <NumberInputComponent
                            placeholder='До'
                            paymentNumber={Number(paymentTo)}
                            setPaymentNumber={setPaymentTo}
                            isFiltersReset={isFiltersReset}
                        />
                    </div>

                </div>

                <ButtonComponent onClickHandler={onClickSetFilters} title='Применить'/>
            </div>
        </section>
    )
}
