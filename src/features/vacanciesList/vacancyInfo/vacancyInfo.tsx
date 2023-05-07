import React, {useEffect, useRef} from "react";
import css from './vacancyInfo.module.scss'

type VacancyInfoPropsType = {
    info: string
}

export const VacancyInfo:React.FC<VacancyInfoPropsType> = ({info}) => {
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (spanRef.current) {
            spanRef.current.innerHTML = info;
        }
    }, [spanRef]);

    return (
        <section className={css.vacancyInfo__wrapper}>
            <span ref={spanRef} />
        </section>
    )
}