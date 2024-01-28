import { createReducer, on } from '@ngrx/store';
import { UsersApiActions, UsersActions } from './users.actions';
import { UserInterface } from '../types/type-user';

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

	on(UsersActions.createUser, (state, newUser: UserInterface) => (
		{
			items:[
				...state.items,
				newUser
			],
			error:{
				message:state.error.message
			}
		}
	)),

	on(UsersActions.editUser, (state, payload) => (
		{
			items: state.items.map((user, index)=>{
				if(user.id == payload.id){
					return payload
				}else{
					return user
				}
			}),
			error:{
				message: state.error.message
			}
		}
	)),

	on(UsersActions.deleteUserByID, (state, {id}) => (
		{
			items: state.items.filter(user => user.id !== id),
			error: {
				message: state.error.message
			}
		}
	),
));
