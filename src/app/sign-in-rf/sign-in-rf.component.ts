import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { noWhiteSpaceValidator } from '../shared/Validators/no-white-space-validator';

@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './sign-in-rf.component.html',
  styleUrls: ['./sign-in-rf.component.scss'],
})
export class SignInRfComponent implements OnInit {
  constructor(private readonly fb: FormBuilder) {}
  signInForm: FormGroup = this.fb.group({
    username: [
      'HaLacDa',
      [
        Validators.required,
        Validators.minLength(6),
        noWhiteSpaceValidator(),
        // Validators.pattern(/^[a-z]{6,32}$/i),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
      ],
    ],
    rememberMe: false,
  });

  ngOnInit(): void {}
  onSubmit(form: FormGroup) {
    console.log(form);
  }
}
