import React from "react";
import css from './button.module.scss'

type ButtonPropsType = {
    title: string
}

export const Button:React.FC<ButtonPropsType> = ({title}) => {
    return (
        <button className={css.button}>
            {title}
        </button>
    )
}