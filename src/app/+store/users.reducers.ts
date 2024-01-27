import { createReducer, on } from '@ngrx/store';
import { UsersApiActions, deleteUser } from './users.actions';
import { user, UserInterface } from '../types/type-user';

export const initialState: {items: UserInterface[], error: {message: unknown}} = {
	items:[],
	error:{
		message:''
	}
};

export const usersReducer = createReducer(
  	initialState,

	on(UsersApiActions.usersApiFind, (state, {users}) => (
		{
			items: users,
			error: {
				message:''
			}
		}
	)),

	on(UsersApiActions.usersApiFailed, (state, {error}) => (
		{
			items: [],
			error: {
				message: error
			}
		}
	)),

	on(deleteUser, (state, {id}) => (
		{
			items: state.items.filter(user => user.id !== id),
			error: {
				message: state.error.message
			}
		}
			// ...state.filter(user => user.id !== id),
	),
))

