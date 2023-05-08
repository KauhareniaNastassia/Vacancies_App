import React, {useEffect} from "react";
import {NotFoundPage} from "../../features/notFoundPage/notFoundPage";
import {VacancyType} from "../../redux/vacanciesReducer";
import {VacancyItem} from "../../features/vacanciesList/vacancyItem/vacancyItem";

type FavoritesPage = {
    favoriteVacancies: VacancyType[]
    addVacancyToFavoritesHandler: (id: number) => void
}

export const FavoritesPage: React.FC<FavoritesPage> = ({favoriteVacancies, addVacancyToFavoritesHandler}) => {



    return (
        <section>

            {favoriteVacancies.length !== 0 ?
                favoriteVacancies.reverse().map((el) =>
                    <VacancyItem
                        key={el.id}
                        id={el.id}
                        profession={el.profession}
                        paymentFrom={el.payment_from}
                        currency={el.currency}
                        typeOfWorkTitle={el.type_of_work.title}
                        townTitle={el.town.title}
                        isLink={!!el.id}
                        addVacancyToFavoritesHandler={addVacancyToFavoritesHandler}
                        //addVacancyToFavoritesHandler={addVacancyToFavoritesHandler}
                    />
                )
            :  <NotFoundPage/>
            }


        </section>
    )
}