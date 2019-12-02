import State from '../types/State';
import Action from '../types/Action'
import {LOGIN_SUCCESS} from "./actions";

export const initialState = {
    isLoading: false,
    isLoggedIn: false,
    history: ["a"]
};

export const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case LOGIN_SUCCESS: {
            return {...state, isLoggedIn: true}
        }
        default:
            return state;
    }
}
