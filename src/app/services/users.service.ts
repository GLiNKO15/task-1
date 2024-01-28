import { Injectable } from "@angular/core";
import { UserInterface, user } from '../types/type-user';
@Injectable({
	providedIn: 'root'
})
export class UsersService{
	users:  UserInterface[] = [];

	setUser(users : user[]){
		this.users = users;
	}

	deleteUserById(id : number){
		this.users = this.users.filter(value => value.id !== id);
	}

	editUserByid(data: UserInterface){
		this.users.forEach((user, index: number) => {
			if(user.id == data.id){
				this.users[index] = data;
			}
		});
	}
	
}