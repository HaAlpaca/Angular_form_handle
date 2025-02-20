import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import {
  filter,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

const validateUsernameFromApiDebounce = (api: ApiService) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() =>
        api
          .validateUsername(control.value)
          .pipe(map((isValid) => (isValid ? null : { username: true })))
      )
    );
  };
};

const validateControlsValue = (
  firstControlName: string,
  secondControlName: string
) => {
  return function (formGroup: FormGroup): ValidationErrors | null {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private readonly fb: FormBuilder, private api: ApiService) {}
  formSubmit$ = new Subject<boolean | null>();
  PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
  registerForm: FormGroup = this.fb.group(
    {
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
        validateUsernameFromApiDebounce(this.api),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.PASSWORD_PATTERN),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.PASSWORD_PATTERN),
        ]),
      ],
    },
    {
      validators: validateControlsValue('password', 'confirmPassword'),
    }
  );

  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        tap(() => this.registerForm.markAsDirty()),
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => {
          this.submitForm();
        })
      )
      .subscribe();
  }
  submitForm(): void {
    alert('Form submitted');
  }
}
