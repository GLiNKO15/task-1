import { Component, Input, EventEmitter, Output, inject } from '@angular/core';
import { UserInterface } from '../../types/type-user'
import { UsersListComponent } from '../user-list/users-list.component'
import { Store, select } from '@ngrx/store';
import { UsersActions } from '../../+store/users.actions';

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
	editUser = new EventEmitter<number>();

	private readonly store = inject(Store);

	deleteUserById(id: number): void {
		this.store.dispatch(UsersActions.deleteUserByID({id}))
	}
	
	editUserById(id: number): void {
		this.editUser.emit(id);
	}
}
