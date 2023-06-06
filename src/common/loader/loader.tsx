import loader from '../../assets/img/loader.svg'
import css from './loader.module.scss'
import React from "react";

export const Loader: React.FC = () => (

    <div className={css.loader_wrapper}>

        <div className={css.loader} >
            <img src={loader} alt="loader"/>
        </div>

    </div>
);