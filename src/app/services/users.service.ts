import { Injectable } from "@angular/core";
import { user } from '../types/type-user';
@Injectable()

export class UsersService{
	users: user[] = [];

	setUser(users : user[]){
		
		this.users = users;
		console.log(this.users);
	}
	deleteUserById(id : string){
		this.users.splice(1, 1);
		console.log(this.users);
	}
}