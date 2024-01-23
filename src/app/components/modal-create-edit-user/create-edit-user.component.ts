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
	  
	) {}
	
	v = Validators;

	form = new FormGroup({
		name: new FormControl(this.data.name, [this.v.maxLength(16), this.v.required]),
		username: new FormControl(this.data.username, [this.v.maxLength(16), this.v.required]),
		phone: new FormControl(this.data.phone, [this.v.maxLength(10), this.v.required]),
		email: new FormControl(this.data.email, [this.v.email, this.v.required]),
	});
	
	sendUser(){
		console.log(this.form.value);

		if(this.form.valid){
			this.dialogRef.close(this.form.value);
		}
	}

	onNoClick(): void {
	  this.dialogRef.close();
	}
  }