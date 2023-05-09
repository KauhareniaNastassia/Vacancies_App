import {AppThunkType} from "./store";
import {setAppStatusAC} from "./appReducer";
import {vacanciesAPI} from "../api/vacanciesAPI";
import {VacancyType} from "./vacanciesReducer";


const initialState: InitialVacancyStateType = {} as VacancyType


export const vacancyReducer = (state: InitialVacancyStateType = initialState, action: VacancyActionsType): InitialVacancyStateType => {
    switch (action.type) {
        case "vacancy/SET-VACANCY":
            return action.vacancy

        default:
            return state
    }
}


//actions
export const setVacancyAC = (vacancy:  VacancyType) => ({
    type: 'vacancy/SET-VACANCY',
    vacancy
} as const)




//thunks

export const getVacancyTC = (id: number): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await vacanciesAPI.getVacancy(id)
            dispatch(setVacancyAC(res.data))
            console.log(res)
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            console.log(err)
            dispatch(setAppStatusAC('failed'))
        }
    }


//types

export type VacancyActionsType =
    | ReturnType<typeof setVacancyAC>



export type InitialVacancyStateType = VacancyType
    //isFavorite: boolean