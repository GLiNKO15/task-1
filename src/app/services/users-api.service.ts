import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { user } from '../types/type-user';
@Injectable()
export class UsersApiService{
	constructor(private http: HttpClient){
	}
	getUsers(){
		return this.http.get<user[]>('https://jsonplaceholder.typicode.com/users');
	}
}