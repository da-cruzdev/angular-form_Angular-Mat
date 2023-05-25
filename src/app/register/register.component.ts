import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: User = new User();

  constructor() {}

  ngOnInit(): void {}

  public saveData(registerForm: NgForm): void {
    console.log(registerForm.form);
    console.log('Valeurs : ', JSON.stringify(registerForm.value));
  }
}
