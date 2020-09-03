import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

////////////////////////////// REDUCER GLOBAL (integrador) ///////////////////////////////
// se muestra en del redux-dev-tools

export interface AppState {
   ui: ui.State,
   user: auth.State
}


export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer
}