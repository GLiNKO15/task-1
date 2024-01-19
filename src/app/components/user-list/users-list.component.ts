import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { UserComponent } from '../user-card/user-card.component';
import { user } from '../../types/type-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-list',
  standalone: true,
  templateUrl: './users-list.component.html', 
  imports: [UserComponent, CommonModule]
})

export class UsersListComponent implements OnInit{
  
  constructor(private UsersApiService: UsersApiService, private UsersService: UsersService){
  }

  listUsers: user[] = [];

  deleteUser(users: user[]){
    this.listUsers = users;
    
    console.log(this.listUsers);
  }

  ngOnInit(){
    this.UsersApiService.getUsers().subscribe( users => {
      this.UsersService.setUser( users );
      this.listUsers = this.UsersService.users;
    });
  }
}