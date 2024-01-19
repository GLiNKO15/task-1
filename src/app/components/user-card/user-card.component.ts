import { Component, Input, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service'

@Component({
  selector: 'user-card',
  standalone: true,
  templateUrl: './user-card.component.html', 
  styleUrl: './user-card.component.css', 
  providers: [UsersService]
})

export class UserComponent implements OnInit{
	constructor(private UsersService: UsersService){}

	@Input()
	name!: string;

	@Input()
	email!: string;

	@Input()
	username!: string;
	
	@Input()
	phone!: string;

	@Input()
	id!: string;
	
	ngOnInit(): void {
		console.log(typeof this.id);
		// console.log(typeof this.phone);
	}

	deleteUser(id: string): void {
		this.UsersService.deleteUserById(id);
	}
}
