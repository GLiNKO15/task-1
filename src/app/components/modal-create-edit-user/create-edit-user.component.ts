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
import {FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms'

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
	  CommonModule,
	  ReactiveFormsModule
	],
})
export class CreateEditComponent{
	constructor(
	  public dialogRef: MatDialogRef<CreateEditComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: UserInterface & {isEdit: boolean},
	){}
	
	form = new FormGroup({
		name: new FormControl(this.data.name, [Validators.maxLength(16), Validators.required]),
		username: new FormControl(this.data.username, [Validators.maxLength(16), Validators.required]),
		phone: new FormControl(this.data.phone, [Validators.maxLength(10), Validators.required]),
		email: new FormControl(this.data.email, [Validators.email, Validators.required]),
	});
	
	sendUser(){
		if(this.form.valid){
			this.dialogRef.close(this.form.value);
		}
	}
	
	onNoClick(): void {
	  this.dialogRef.close();
	}
  }