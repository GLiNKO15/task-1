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
		console.log(this.users);
		this.users = this.users.filter(value => value.id !== id);
	}

	createUserService(data: UserInterface){
		this.users.push({
			...data,

			id: new Date().getMilliseconds()
		})
	}

	editUserByid(data: UserInterface){
		console.log(data.id);

		this.users.forEach((user, index: number) => {

			if(user.id == data.id){
				this.users[index] = data;
			}
		});
	}
	
}