import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Login Page] Login',
    props<{ email: string; password: string, role: string }>()
  );
export const logout = createAction('[Counter Component] Logout');
