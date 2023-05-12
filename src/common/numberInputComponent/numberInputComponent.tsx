import {NumberInput, NumberInputHandlers, NumberInputProps} from "@mantine/core";
import React, {useRef, useState} from "react";
import css from './numberInputComponent.module.scss'
import arrowDown from "../../assets/img/smallArrowDown.svg";
import arrowUp from "../../assets/img/smallArrowUp.svg"

type NumberInputComponentPropsType = {
    label?: string
    placeholder: string
}

export const NumberInputComponent: React.FC<NumberInputComponentPropsType> = ({label, placeholder}) => {
    const handlers = useRef<NumberInputHandlers>();
    const [salaryValue, setSalaryValue] = useState<number>()


    return (
        <NumberInput
            value={salaryValue}
            handlersRef={handlers}
            onChange={() => setSalaryValue(salaryValue)}
            className={css.filterBar__filter_item}
            styles={{
                input: {
                    borderColor: '#EAEBED',
                    borderRadius: '8px',
                    '&:hover': {
                        borderColor: '#5E96FC'
                    },
                    '&:active': {
                        borderColor: '#5E96FC'
                    }},
            }}
            rightSection={
                <div className={css.filterBar__filter_arrows}>

                    <img src={arrowUp}
                         className={css.filterBar__filter_arrow_icon}
                         alt='arrow up'
                         onClick={() => handlers.current?.increment()}/>
                    <img src={arrowDown}
                         alt='arrow down'
                         onClick={() => handlers.current?.decrement()}/>
                </div>
            }
            rightSectionWidth={0}
            placeholder={placeholder}
            label={label}
            min={0}
        />
    )
}