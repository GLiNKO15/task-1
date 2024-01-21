import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { UserComponent } from '../user-card/user-card.component';
import { user} from '../../types/type-user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditComponent } from '../modal-create-edit-user/create-edit-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

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

export class UsersListComponent implements OnInit{
  
  constructor(
    private UsersApiService: UsersApiService,
    private UsersService: UsersService,
    public dialog: MatDialog
    ){}

  listUsers: user[] = [];

  deleteUser(users: user[]){
    this.listUsers = users;
    console.log(this.listUsers);
  }

  openDialog(id?: number): void {
    let editUser: user | undefined;
    let form : FormGroup<{
      name: FormControl<string | null>;
      username: FormControl<string | null>;
      email: FormControl<string | null>;
      phone: FormControl<string | null>;
    }>;

    let dialogRef;

    if(id){
      this.listUsers.forEach(element => {
        if(element.id == id) editUser = element;
      });
    }
    if(editUser){
      form = new FormGroup({
        name: new FormControl(editUser.name),
        username: new FormControl(editUser.username),
        email: new FormControl(editUser.email),
        phone: new FormControl(editUser.phone)
      });

      dialogRef = this.dialog.open(CreateEditComponent, {data: form.value});
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //edit user
      });
      
    }else{
      form = new FormGroup({
        name: new FormControl(''),
        username: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
      });

      dialogRef = this.dialog.open(CreateEditComponent, {data: form.value});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
          result = {
            ...result,
            id: new Date().getUTCMilliseconds()
          }
          this.listUsers.push(result)
        }
      });
    }
  }

  ngOnInit(){
    this.UsersApiService.getUsers().subscribe( users => {
      this.UsersService.setUser( users );
      this.listUsers = this.UsersService.users;
    });
  }
}