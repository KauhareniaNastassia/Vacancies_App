const initialState: InitialAppStateType = {
    status: 'idle',
}

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case "app/SET-APP-STATUS":
            return {...state, status: action.status}

        default:
            return state
    }
}


//  actions
export const setAppStatusAC = (status: AppStatusType) => ({
    type: 'app/SET-APP-STATUS',
    status
} as const)



//  types

export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>


type InitialAppStateType = {
    status: AppStatusType

}

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

