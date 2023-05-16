import {NumberInput, NumberInputHandlers, NumberInputProps} from "@mantine/core";
import React, {useEffect, useRef, useState} from "react";
import css from './numberInputComponent.module.scss'
import arrowDown from "../../assets/img/smallArrowDown.svg";
import arrowUp from "../../assets/img/smallArrowUp.svg"

type NumberInputComponentPropsType = {
    label?: string
    placeholder: string
    paymentNumber: number | undefined
    setPaymentNumber: (paymentNumber: number | undefined) => void
}

export const NumberInputComponent: React.FC<NumberInputComponentPropsType> = ({
                                                                                  label,
                                                                                  placeholder,
                                                                                  setPaymentNumber,
                                                                                  paymentNumber
                                                                              }) => {
    const handlers = useRef<NumberInputHandlers>();
    const [salaryValue, setSalaryValue] = useState<number | undefined>(paymentNumber)

    const onChangeSetSalaryValue = (value: number | "") => {
        setSalaryValue(+value)

    }

    console.log('salaryValue', salaryValue)

    useEffect(() => {
        setPaymentNumber(salaryValue)
    }, [salaryValue])

    return (
        <NumberInput
            value={salaryValue}
            handlersRef={handlers}
            onChange={(value) => onChangeSetSalaryValue(value)}
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
                    }
                },
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