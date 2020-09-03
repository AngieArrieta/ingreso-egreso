import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
    '[Auth] setUser', // type
    props<{ user: Usuario }>() //payload
);

export const unsetUser = createAction('[Auth] unsetUser');