import {customInstance} from "./instance";
import {GetVacanciesResponseType, VacanciesParamsType} from "../redux/vacanciesReducer";


export const vacanciesAPI = {
    getVacancies(params?: VacanciesParamsType) {
        return customInstance.get<GetVacanciesResponseType>('/vacancies/', {
            params: {
                ...params,
                published: '1',
                no_agreement: '1',
                count: 4,

            }
        })
    },

    getVacancy(id: number) {
        return customInstance.get(`/vacancies/${id}`)

    }
}