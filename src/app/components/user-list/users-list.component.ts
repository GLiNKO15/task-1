import { Component, OnInit, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { UserComponent } from '../user-card/user-card.component';
import { UserInterface } from '../../types/type-user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditComponent } from '../modal-create-edit-user/create-edit-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { UsersApiActions, UsersActions } from '../../+store/users.actions'
import { getUsersSelector } from '../../+store/users.selectors'

@Component({
  selector: 'users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  imports: [
    UserComponent,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    CreateEditComponent,
  ],
})
export class UsersListComponent implements OnInit {
  constructor(
    public UsersApiService: UsersApiService,
    public UsersService: UsersService,
    public dialog: MatDialog,
  ) { }
  
  private readonly store = inject(Store);
  
  public readonly listUsers$ = this.store.select(getUsersSelector)

  deleteUser(id: number) {
    this.UsersService.deleteUserById(id);
  }

  createUser() {
    const createDialog = this.dialog.open(CreateEditComponent, {
      width: '350px',
      data: {
        name: '',
        username: '',
        email: '',
        phone: '',
        isEdit: false
      },
    });

    createDialog.afterClosed().subscribe((newUser: UserInterface) => {
      if (newUser) {
        newUser = {
          ...newUser,
          id: new Date().getMilliseconds()
        };
        this.store.dispatch(UsersActions.createUser(newUser));
      }
    });
  }

  editUser(id: number) {
    let user: UserInterface;

    this.listUsers$.subscribe((data: UserInterface[])=>{
      for (let i = 0; i < data.length; i++) {
        if(data[i].id == id) {
          user = data[i];
        }
      }
    })

    const createDialog = this.dialog.open(CreateEditComponent, {
      width: '350px',
      data: {
        name: user!.name,
        username: user!.username,
        email: user!.email,
        phone: user!.phone,
        isEdit: true
      }
    });

    createDialog.afterClosed().subscribe((newUser: UserInterface) => {
      newUser = {
        ...newUser,
        id: id
      }

      if (newUser.name) {
        this.store.dispatch(UsersActions.editUser(newUser));
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(UsersApiActions.usersApiRequest());
  }
}