import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { login, logout } from './user.actions';
 
export const initialState = {
    user: null
};
 
const _userReducer = createReducer(
  initialState,
  on(login, (state, user) => {
    console.log(user)
   return {...state, user: user}
  }),
  on(logout, (state) => ({...state, user: null})),
);
 
export function userReducer(state, action) {
  return _userReducer(state, action);
}