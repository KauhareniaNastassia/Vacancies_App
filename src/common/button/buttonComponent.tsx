import React from "react";
import css from './buttonComponent.module.scss'
import { Button } from '@mantine/core';

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
}

export const ButtonComponent:React.FC<ButtonPropsType> = ({title, onClickHandler}) => {
    return (
        <Button
            onClick={onClickHandler}
            className={title === 'Поиск вакансий' ? css.button_light : css.button}
            radius={'8px'}
        >
            {title}
        </Button>
    )
}