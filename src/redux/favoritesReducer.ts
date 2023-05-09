import {VacancyType} from "./vacanciesReducer";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./appReducer";


const initialState: InitialFavoritesStateType = []

export const favoritesReducer = (state: InitialFavoritesStateType = initialState, action: FavoritesActionsType): InitialFavoritesStateType => {
    switch (action.type) {
        case "favorites/GET-FAVORITES":
            return [...action.favoritesArray]
        case "favorites/ADD-VACANCY-TO-FAVORITES":
            return [action.vacancy, ...state]
        default:
            return state
    }
}

//actions
export const getFavoritesAC = (favoritesArray: VacancyType[]) => ({
    type: 'favorites/GET-FAVORITES',
    favoritesArray
} as const)
export const addVacancyToFavoritesAC = (vacancy: VacancyType) => ({
    type: 'favorites/ADD-VACANCY-TO-FAVORITES',
    vacancy
} as const)


//thunks

export const getFavoritesTC = (): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {

            let currentArray = Array.isArray(JSON.parse(localStorage.getItem("Favorites") || "{}"))
                ? JSON.parse(localStorage.getItem("Favorites") || "{}")
                : [];

            dispatch(getFavoritesAC(currentArray))
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            localStorage.setItem("Favorites", "[]");
            dispatch(setAppStatusAC('failed'))
        }
    }


export const addVacancyToFavoritesTC = (vacancy: VacancyType): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {

            let currentArray = Array.isArray(JSON.parse(localStorage.getItem("Favorites") || "{}"))
                ? JSON.parse(localStorage.getItem("Favorites") || "{}")
                : [];

            //dispatch(isVacancyFavoriteAC(true))
            currentArray.push(vacancy);
            localStorage.setItem("Favorites", JSON.stringify(currentArray));


            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            localStorage.setItem("Favorites", "[]");
            dispatch(setAppStatusAC('failed'))
        }
    }
export const removeVacancyFromFavoritesTC = (id: number): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {

            let currentArray = Array.isArray(JSON.parse(localStorage.getItem("Favorites") || "{}"))
                ? JSON.parse(localStorage.getItem("Favorites") || "{}")
                : [];
            currentArray.filter((el: { id: number; }) => el.id !== id);
            localStorage.setItem("Favorites", JSON.stringify(currentArray));

            //dispatch(isVacancyFavoriteAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            localStorage.setItem("Favorites", "[]");
            dispatch(setAppStatusAC('failed'))
        }
    }


//types
export type FavoritesActionsType =
    | ReturnType<typeof addVacancyToFavoritesAC>
    | ReturnType<typeof getFavoritesAC>

export type InitialFavoritesStateType = VacancyType[]
