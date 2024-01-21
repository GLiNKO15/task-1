import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { user } from '../../types/type-user'
import { UsersListComponent } from '../user-list/users-list.component'

@Component({
  selector: 'user-card',
  standalone: true,
  templateUrl: './user-card.component.html', 
  styleUrl: './user-card.component.css', 
  imports: [ UsersListComponent ],
})

export class UserComponent{
	constructor(private UsersService: UsersService){}
	
	@Input()
	user!: user;

	@Output()
	deleteUser = new EventEmitter<user[]>();

	deleteUserById(id: number): void {
		this.UsersService.deleteUserById(id);
		this.deleteUser.emit(this.UsersService.users);
	}
}
