import {AuthActionsType, AuthResponseType, setAccessTokenAC} from "./authReducer";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./appReducer";
import {authAPI} from "../api/authAPI";
import {vacanciesAPI} from "../api/vacanciesAPI";


const initialState: InitialSearchStateType ={
    params: {
        published: 1,
        keyword: '',
        count: 100,
        //page: number,
        payment_from: null,
        payment_to: null,
        catalogues: [],
        no_agreement: 1
    }

}



export const searchReducer = (state: InitialSearchStateType = initialState, action: SearchActionsType): InitialSearchStateType => {
    switch (action.type) {

        case "vacancies/SET-KEYWORD":
            return {
                ...state, params: {...state, keyword: action.keyword}
            }



        default:
            return state
    }
}


//actions

export const setParamsAC = (params: VacanciesParamsType) => ({
    type: 'vacancies/SET-PARAMS',
    params
} as const)
export const setKeywordAC = (keyword: string) => ({
    type: 'vacancies/SET-KEYWORD',
    keyword
} as const)


// thunks
export const getVacanciesTC = (params: VacanciesParamsType): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await vacanciesAPI.getVacancies(params)

            console.log(res)
            dispatch(setAppStatusAC('succeeded'))
        }
        catch(err) {
            console.log(err)
            dispatch(setAppStatusAC('failed'))
        }
    }





//types
export type SearchActionsType =
    | ReturnType<typeof setParamsAC>
    | ReturnType<typeof setKeywordAC>

type InitialSearchStateType = {
    params: VacanciesParamsType
    // total: number
}

export type VacanciesParamsType = {
    published?: number
    count?: number,
    page?: number,
    keyword?: string,
    payment_from?: number | null,
    payment_to?: number | null,
    catalogues?: [],
    no_agreement?: number
}