import {customInstance} from "./instance";
import {GetVacanciesResponseType, VacanciesParamsType} from "../redux/vacanciesReducer";
import {CatalogueType} from "../redux/searchReducer";


export const cataloguesAPI = {
    getCatalogues() {
        return customInstance.get<CatalogueType[]>('/catalogues/', )
    },

}