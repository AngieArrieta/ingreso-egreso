import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

// definicion del tipo de estado
export interface State {
    isLoading: boolean; //para que mi app no haga nada hasta que resuelva
    prueba?: number;
}

// definicion del estado inicial
export const initialState: State = {
   isLoading: false
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true})), // crea un arreglo con todos los estados
    on(stopLoading, state => ({ ...state, isLoading: false}))

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}