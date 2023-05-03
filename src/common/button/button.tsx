import React from "react";
import css from './button.module.scss'
import { Button } from '@mantine/core';

type ButtonPropsType = {
    title: string
}

export const ButtonComponent:React.FC<ButtonPropsType> = ({title}) => {
    return (
        <Button
            className={css.button}
            radius={'8px'}
            variant='filled'>
            {title}
        </Button>
    )
}