import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogClose,
  } from '@angular/material/dialog';
import { UserInterface } from '../../types/type-user'
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
	selector: 'create-edit-user',
	templateUrl: './create-edit-user.component.html',
	styleUrl: './create-edit-user.component.css',
	standalone: true,
	imports: [
	  MatFormFieldModule,
	  MatInputModule,
	  FormsModule,
	  MatButtonModule,
	  MatDialogTitle,
	  MatDialogContent,
	  MatDialogActions,
	  MatDialogClose,
	  CommonModule
	],
})

export class CreateEditComponent {
	constructor(
	  public dialogRef: MatDialogRef<CreateEditComponent>,
	  @Inject(MAT_DIALOG_DATA) public user: UserInterface,
	) {}
  
	onNoClick(): void {
	  this.dialogRef.close();
	}
  }