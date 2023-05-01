import React from "react";
import css from './vacancyInfoBlock.module.scss'

type VacancyInfoBlockPropsType = {
    title: string
}

export const VacancyInfoBlock:React.FC<VacancyInfoBlockPropsType> = ({title}) => {
    return (
        <section className={css.vacancyInfoBlock__wrapper}>
            <h3 className={css.vacancyInfoBlock__title}>
                {title}
            </h3>
            <ul className={css.vacancyInfoBlock__list}>
                <li>
                    Разработка дизайн-макетов для наружной, интерьерной рекламы, полиграфии, сувенирной продукции.
                </li>
                <li>
                    Создание дизайна логотипов и брендбуков
                </li>
                <li>
                    Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.
                </li>
                <li>
                    Управленческая функция: обучение, адаптация дизайнеров, их контроль, оценка
                </li>
            </ul>
        </section>
    )
}