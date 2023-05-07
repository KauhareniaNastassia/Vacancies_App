import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./appReducer";
import {AuthActionsType, authReducer} from "./authReducer";
import {VacanciesActionsType, vacanciesReducer} from "./vacanciesReducer";
import {VacancyActionsType, vacancyReducer} from "./vacancyReducer";


const RootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    vacancies: vacanciesReducer,
    vacancy: vacancyReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof store.getState>

export type ActionsType =
    | AppActionsType
    | AuthActionsType
    | VacanciesActionsType
    | VacancyActionsType


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ActionsType>


// @ts-ignore
window.store = store