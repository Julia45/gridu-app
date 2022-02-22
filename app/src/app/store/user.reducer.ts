import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { changeTheme } from './user.actions';
 
export const initialState = {
  name: "dark"
};
 
const _userReducer = createReducer(
  initialState,
  on(changeTheme, (state, action) => {
   return {
     ...state, name: action.name
    }
  }),
);
 
export function userReducer(state, action) {
  return _userReducer(state, action);
}