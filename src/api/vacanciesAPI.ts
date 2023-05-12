import {customInstance} from "./instance";
import {GetVacanciesResponseType, VacanciesParamsType} from "../redux/vacanciesReducer";


export const vacanciesAPI = {
    getVacancies(params?: VacanciesParamsType) {
        return customInstance.get<GetVacanciesResponseType>('/vacancies/', {
            params: {
                published: '1',
                count: 100,
                ...params
            }
        })
    },

    getVacancy(id: number) {
        return customInstance.get(`/vacancies/${id}`)

    }
}