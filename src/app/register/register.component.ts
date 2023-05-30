import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

function ratingRangeValidator(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if ((!!c.value && isNaN(c.value)) || c.value < min || c.value > max) {
      return { rangeError: true };
    }

    return null;
  };
}

function emailMatcher(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const email = control.get('email');
  const confirmEmail = control.get('confirmEmail');

  if (email?.value !== confirmEmail?.value) {
    return { match: true };
  }

  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: User = new User();

  public registerForm!: FormGroup;
  isMatch!: boolean;

  errorMsg!: string;

  private validationErrorMessages: { [key: string]: string } = {
    required: 'Entrez votre email',
    email: "L'email n'est pas valide",
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', Validators.required],
        },
        { validators: emailMatcher }
      ),
      phone: '',
      rating: [null, ratingRangeValidator(1, 5)],
      notification: 'email',
      sendCatalog: false,
    });

    this.registerForm.get('notification')?.valueChanges.subscribe((value) => {
      this.setNotificationSetting(value);
    });

    const emailControl = this.registerForm.get('emailGroup.email');
    emailControl?.valueChanges.subscribe((val) => {
      this.setMessage(emailControl);
      console.log(val);
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
      emailGroup: { email: 'will@dev.com' },
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

  public isControlInvalidAndUntouched(
    controlName: string,
    errorKey?: string
  ): boolean {
    const control = this.registerForm.get(controlName);
    const errors = control?.errors;

    return (
      (control?.invalid && control?.dirty) ||
      (control?.touched && (errorKey ? errors?.[errorKey] : true))
    );
  }

  private setMessage(val: AbstractControl): void {
    this.errorMsg = '';

    if ((val.touched || val.dirty) && val.errors) {
      this.errorMsg = Object.keys(val.errors)
        .map((key) => this.validationErrorMessages[key])
        .join(' ');
    }
  }

  // onChangeConfirmEmail(value: string): void {
  //   const emailValue = this.registerForm.get('email')?.value;

  //   //this.isMatch = emailValue === value;
  // }

  // isCMatch(a: string, b: string) {
  //   console.log(a === b);
  //   return a === b;
  // }
}
