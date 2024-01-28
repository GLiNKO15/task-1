import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { UserInterface } from '../types/type-user';

export const UsersApiActions = createActionGroup({
	source: 'Users API',
	events: {
		'Users api find': props<{users: UserInterface[]}>(),
		'Users api failed': props<{error: unknown}>(),
		'Users api request': emptyProps()
	},
});

export const UsersActions = createActionGroup({
	source: 'Users',
	events: {
		'Delete User by ID': props<{id: number}>(),
		'Create User': props<UserInterface>(),
		'Edit User': props<UserInterface>(),
	},
});