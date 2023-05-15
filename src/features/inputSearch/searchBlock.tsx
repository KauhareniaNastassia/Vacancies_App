import {InputSearch} from "./inputSearch/InputSearch";
import filterIcon from "../../assets/img/filterIcon.svg";
import React, {useRef, useState} from "react";
import css from './searchBlock.module.scss'
import {FilterBar} from "../filterBar/filterBar";
import {useOnClickOutsideCloseSideBar} from "../../hooks/useOnClickOutsideCloseBurgerMenu";
import {useDisclosure} from "@mantine/hooks";

type InputSearchBlockPropsType = {
    handleSearchValue: (keyword: string) => void
}

export const SearchBlock: React.FC<InputSearchBlockPropsType> = ({handleSearchValue}) => {

    const [isFilterBarOpen, setIsFilterBarOpen] = useState<boolean>(false)
    const [isFilterButtonPressed, setIsFilterButtonPressed] = useState<boolean>(false)
    const node = useRef<HTMLDivElement>(null);
    const [opened, handlers] = useDisclosure(false);

    const onClickCloseFilterBar = () => {
        setIsFilterBarOpen(false)
        setIsFilterButtonPressed(false)
    }

    useOnClickOutsideCloseSideBar(node, onClickCloseFilterBar);

    return (
        <section className={css.search__block__wrapper}>

            <div className={css.search__block_input}>
                <InputSearch
                    handleSearchValue={handleSearchValue}
                />
            </div>

            <div ref={node}
                 className={css.search__block_filter_button_wrapper}

            >
                <button
                    className={isFilterButtonPressed ? `${css.search__block_filter_button} ${css.search__block_filter_button_pressed}` : css.search__block_filter_button}
                    onClick={() => {
                        setIsFilterButtonPressed(true)
                        handlers.toggle()
                        //setIsFilterBarOpen(!isFilterBarOpen)
                    }}
                >
                    <img src={filterIcon} alt='filter icon'/>
                </button>

                {
                    opened &&
                    <div className={css.search__block_filterBar_block}
                         onClick={(e) => e.stopPropagation()}>
                        <FilterBar/>
                    </div>
                }
            </div>


        </section>
    )
}