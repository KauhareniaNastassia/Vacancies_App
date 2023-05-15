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


export const FilterBar: React.FC = () => {

    const dispatch = useAppDispatch()
    const catalogues = useAppSelector(state => state.search.params.catalogues)

    const [catalogue, setCatalogue] = useState<string>('');
    const [isCataloguesOpen, setIsCataloguesOpen] = useState<boolean>(false)

    const onChangeCatalogueValue = ( value: string) => {

        setCatalogue(value)
        setIsCataloguesOpen(false)
    }

/*

    useEffect(() => {
        dispatch(getCataloguesTC())
    }, [])
*/

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
                                label: el.title.length > 34 ? el.title.slice(0, 30) + '...' : el.title,
                               /* onMouseDown: (e: React.MouseEvent<HTMLInputElement>) => {
                                    e.stopPropagation()
                                }*/
                            }))}


                            value={catalogue}

                            onChange={onChangeCatalogueValue}

                            onClick={() => {
                                setIsCataloguesOpen(!isCataloguesOpen)
                            }

                        }
                            onBlur={() => setIsCataloguesOpen(false)}
                        />
                    </div>
                }


                <div className={css.filterBar__filter}>
                    <NumberInputComponent label='Оклад' placeholder='От'/>
                    <NumberInputComponent placeholder='До'/>
                </div>

                <ButtonComponent title='Применить'/>
            </div>
        </section>
    )
}




/*
<NativeSelect
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
        /!*item: {
            '&[data-selected]': {
                '&, &:hover': {backgroundColor: '#5E96FC'}
            },
        }*!/
    }}
    // searchable
    data={catalogues.map(el => ({
        value: el.key.toString(),
        label: el.title.length > 34 ? el.title.slice(0, 30) + '...' : el.title,
        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
            e.stopPropagation()
        }
    }))}


    value={catalogue}
    onChange={onChangeCatalogueValue}

    onClick={() => {
        setIsCataloguesOpen(!isCataloguesOpen)
    }
    }
    onBlur={() => setIsCataloguesOpen(false)}
/>*/
