import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { UserComponent } from '../user-card/user-card.component';
import { UserInterface } from '../../types/type-user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditComponent } from '../modal-create-edit-user/create-edit-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    public dialog: MatDialog
  ) { }

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
        this.UsersService.createUserService(newUser)
      }
    });
  }

  editUser(id: number) {
    let user: UserInterface;

    this.UsersService.users.forEach(data => {
      if (data.id == id) {
        user = data;
      }
    });

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
        this.UsersService.editUserByid(newUser)
      }
    });
  }

  ngOnInit() {
    this.UsersApiService.getUsers().subscribe(users => {
      this.UsersService.setUser(users);
    });
  }
}