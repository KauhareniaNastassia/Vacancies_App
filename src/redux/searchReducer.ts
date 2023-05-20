import {AuthActionsType, AuthResponseType, setAccessTokenAC} from "./authReducer";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./appReducer";
import {authAPI} from "../api/authAPI";
import {vacanciesAPI} from "../api/vacanciesAPI";
import {cataloguesAPI} from "../api/catalogueAPI";


const initialState: InitialSearchStateType = {
    catalogues: [] as CatalogueType[],
    params: {
        page: '1',
        keyword: '',
        payment_from: '',
        payment_to: '',
        catalogues: '',
    }

}


export const searchReducer = (state: InitialSearchStateType = initialState, action: SearchActionsType): InitialSearchStateType => {
    switch (action.type) {

       /* case "vacancies/SET-KEYWORD":
            return {
                ...state, params: {...state, keyword: action.keyword}
            }*/
        case "vacancies/SET-CATALOGUES":
            return {
                ...state,  catalogues: action.catalogues
            }

        case 'vacancies/UPDATE_URL_PARAMS':
            return { ...state, params: action.params  }


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
export const updateUrlParamsAC = (params: SearchParamsType) => ({
    type: 'vacancies/UPDATE_URL_PARAMS' as const,
    params,
})


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
    | ReturnType<typeof updateUrlParamsAC>

type InitialSearchStateType = {
    catalogues: CatalogueType[],
    params: SearchParamsType
    // total: number
}

export type VacanciesParamsType = {
    published?: number
    count?: number,
    page?: number,
    keyword?: string,
    payment_from?: number | null,
    payment_to?: number | null,
    catalogues?: string,
    no_agreement?: number
}
export type SearchParamsType = {
    //count: string,
    page: string,
    keyword: string,
    payment_from: string,
    payment_to: string ,
    catalogues: string,
}

export type CatalogueType = {
    title: string
    title_trimmed: string
    key: number
}