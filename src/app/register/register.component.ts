import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: User = new User();

  public registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      notification: 'email',
      sendCatalog: false,
    });
  }

  public saveData(): void {
    console.log(this.registerForm);
    console.log('Valeurs : ', JSON.stringify(this.registerForm.value));
  }

  public fillFormData() {
    this.registerForm.patchValue({
      lastName: ' Da-cruz',
      firstName: 'Wilfried',
      email: 'will@dev.com',
      sendCatalog: true,
    });
  }
  public handleNotificationChange(event: any) {
    const selectedValue = event.value;
    this.setNotificationSetting(selectedValue);
  }

  public setNotificationSetting(method: string) {
    const phoneControl = this.registerForm.get('phone');

    if (method === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }

    phoneControl?.updateValueAndValidity();
  }
}
