import { createAction, props, createActionGroup, emptyProps } from '@ngrx/store';
import { UserInterface } from '../types/type-user';

// export const apiRequestUser = createAction();
// export const ResultApiRequestUser = createAction('[Users/Api] Users api find', );
// export const FailedApiRequestUser = createAction();
export const deleteUser = createAction('[Users/Local] Delete User by ID', props<{id: number}>());


export const UsersApiActions = createActionGroup({
	source: 'Users API',
	events: {
		'Users api find': props<{users: UserInterface[]}>(),
		'Users api failed': props<{error: unknown}>(),
		'Users api request': emptyProps()
	},
});