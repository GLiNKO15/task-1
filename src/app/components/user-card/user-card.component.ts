import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserInterface } from '../../types/type-user'
import { UsersListComponent } from '../user-list/users-list.component'

@Component({
  selector: 'user-card',
  standalone: true,
  templateUrl: './user-card.component.html', 
  styleUrl: './user-card.component.css', 
  imports: [ UsersListComponent ],
})
export class UserComponent{
	@Input()
	user!: UserInterface;

	@Output()
	deleteUser = new EventEmitter<number>();

	@Output()
	editUser = new EventEmitter<number>();

	deleteUserById(id: number): void {
		this.deleteUser.emit(id);
	}
	
	editUserById(id: number): void {
		this.editUser.emit(id);
	}
}
