import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: User = new User();

  public registerForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    });
  }

  public saveData(): void {
    console.log(this.registerForm);
    console.log('Valeurs : ', JSON.stringify(this.registerForm.value));
  }
}
