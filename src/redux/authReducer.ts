import {AppThunkType} from "./store";
import {setAppStatusAC} from "./appReducer";
import {authAPI} from "../api/authAPI";


const initialState: InitialAuthStateType = {
    data: null,
}

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case "auth/SET-ACCESS-TOKEN":
            return {...state, data: action.data}

        default:
            return state
    }
}


//  actions
export const setAccessTokenAC = (data: null | AuthResponseType) => ({
    type: 'auth/SET-ACCESS-TOKEN',
    data
} as const)


//  thunks
export const authByPasswordTC = (): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await authAPI.getPassword()
            dispatch(setAccessTokenAC(res.data))
            localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
            localStorage.setItem('token_type', JSON.stringify(res.data.token_type))
            dispatch(setAppStatusAC('succeeded'))

        } catch (err) {
            dispatch(setAppStatusAC('failed'))
        }
    }

export const refreshTokenTC = (refreshToken: string): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await authAPI.refreshToken(refreshToken)
            dispatch(setAccessTokenAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            dispatch(setAppStatusAC('failed'))
        }
    }



//  types
export type AuthActionsType =
    | ReturnType<typeof setAccessTokenAC>


type InitialAuthStateType = {
    data: null | AuthResponseType
}

export type AuthResponseType = {
    access_token: string
    refresh_token: string
    ttl: number
    expires_in: number
    token_type: string
}