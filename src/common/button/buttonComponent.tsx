import React from "react";
import css from './buttonComponent.module.scss'
import {Button, rem} from '@mantine/core';
import {VacanciesParamsType} from "../../redux/vacanciesReducer";

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
}

export const ButtonComponent: React.FC<ButtonPropsType> = ({title, onClickHandler}) => {
    return (
        <Button
            onClick={onClickHandler}
            className={title === 'Поиск вакансий' ? css.button_light : css.button}
            radius={'8px'}

            styles={{
                root: {
                    '@media(max-width:400px)': {
                        height: '30px'
                    }
                }
            }
            }
        >
            {title}
        </Button>
    )
}