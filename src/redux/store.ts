import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./appReducer";
import {AuthActionsType, authReducer} from "./authReducer";


const RootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof store.getState>

export type ActionsType =
    | AppActionsType
    | AuthActionsType


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ActionsType>


// @ts-ignore
window.store = store