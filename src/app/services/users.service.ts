import { Injectable } from "@angular/core";
import { user } from '../types/type-user';
@Injectable({
	providedIn: 'root'
})

export class UsersService{
	users: user[] = [];

	
	setUser(users : user[]){
		this.users = users;
	}
	deleteUserById(id : number){
		this.users = this.users.filter(value => value.id !== +id);
	}
}