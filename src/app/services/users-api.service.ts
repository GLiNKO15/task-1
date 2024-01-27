import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { user, UserInterface } from '../types/type-user';

@Injectable({
	providedIn: 'root'
})
export class UsersApiService{
	constructor(private http: HttpClient){}
	
	public getUsers(){
		console.log('Requet пошел');
		
		return this.http.get<UserInterface[]>('https://jsonplaceholder.typicode.com/users');
	}
}