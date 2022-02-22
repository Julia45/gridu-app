import { createAction, props } from '@ngrx/store';
export const changeTheme = createAction(
  'Change',
  props<{ name: string }>()
);

