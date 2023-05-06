import {AuthActionsType, AuthResponseType, setAccessTokenAC} from "./authReducer";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./appReducer";
import {authAPI} from "../api/authAPI";
import {vacanciesAPI} from "../api/vacanciesAPI";


const initialState: InitialVacanciesStateType = {
    objects: null,
    total: null ,
}

export const vacanciesReducer = (state: InitialVacanciesStateType = initialState, action: VacanciesActionsType): InitialVacanciesStateType => {
    switch (action.type) {
        case "vacancies/SET-VACANCIES":
            return {...state, objects: action.objects}

        default:
            return state
    }
}


//actions
export const setVacanciesAC = (objects: null | VacancyType[]) => ({
    type: 'vacancies/SET-VACANCIES',
    objects
} as const)


// thunks
export const getVacanciesTC = (params: VacanciesParamsType): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await vacanciesAPI.getVacancies(params)
            dispatch(setVacanciesAC(res.data.objects))
            console.log(res)
            dispatch(setAppStatusAC('succeeded'))
        }
        catch(err) {
            console.log(err)
            dispatch(setAppStatusAC('failed'))
        }
    }




//types
export type VacanciesActionsType =
    | ReturnType<typeof setVacanciesAC>

type InitialVacanciesStateType = {
    objects: null | VacancyType[]
    total: null | number
}


export type VacancyType = {
    id: number,
    payment_from: number,
    payment_to: number,
    profession: string,
    currency: string,
    vacancyRichText: string,
    type_of_work: TypeOfWorkVacancyType,
    catalogues: CataloguesVacancyType[],
    town: TownVacancyType,
    firm_name: string,
    firm_activity: string
}
export type TownVacancyType = {
    id: number,
    title: string,
    declension: string,
    hasMetro: boolean,
    genitive: string
}
export type PositionsCataloguesType = {
    id: number,
    title: string,
    key: number
}
export type CataloguesVacancyType = {
    id: number,
    title: string,
    key: number,
    positions: PositionsCataloguesType[]
}
export type TypeOfWorkVacancyType = {
    id: number,
    title: string,
}
export type GetVacanciesResponseType = {
    objects: VacancyType[]
    total: number,
    more: boolean,
    subscription_id: number,
    subscription_active: boolean
}
export type VacanciesParamsType = {
    count?: number,
    page?: number,
    keyword?: string,
    payment_from?: number,
    payment_to?: number,
    catalogues?: [],
    no_agreement?: number
}