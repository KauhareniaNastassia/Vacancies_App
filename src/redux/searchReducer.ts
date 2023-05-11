import {AuthActionsType, AuthResponseType, setAccessTokenAC} from "./authReducer";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./appReducer";
import {authAPI} from "../api/authAPI";
import {vacanciesAPI} from "../api/vacanciesAPI";
import {cataloguesAPI} from "../api/catalogueAPI";


const initialState: InitialSearchStateType = {
    params: {
        published: 1,
        keyword: '',
        count: 100,
        //page: number,
        payment_from: null,
        payment_to: null,
        catalogues: [] as CatalogueType[],
        no_agreement: 1
    }

}


export const searchReducer = (state: InitialSearchStateType = initialState, action: SearchActionsType): InitialSearchStateType => {
    switch (action.type) {

        case "vacancies/SET-KEYWORD":
            return {
                ...state, params: {...state, keyword: action.keyword}
            }
        case "vacancies/SET-CATALOGUES":
            return {
                ...state, params: {...state, catalogues: action.catalogues}
            }


        default:
            return state
    }
}


//actions

export const setCataloguesAC = (catalogues: CatalogueType[]) => ({
    type: 'vacancies/SET-CATALOGUES',
    catalogues
} as const)
export const setKeywordAC = (keyword: string) => ({
    type: 'vacancies/SET-KEYWORD',
    keyword
} as const)


// thunks
export const getCataloguesTC = (): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await cataloguesAPI.getCatalogues()
            dispatch(setCataloguesAC(res.data))
            console.log(res)
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            console.log(err)
            dispatch(setAppStatusAC('failed'))
        }
    }


//types
export type SearchActionsType =
    | ReturnType<typeof setCataloguesAC>
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
    catalogues?: CatalogueType[],
    no_agreement?: number
}

export type CatalogueType = {
    title: string
    title_trimmed: string
    key: number
}