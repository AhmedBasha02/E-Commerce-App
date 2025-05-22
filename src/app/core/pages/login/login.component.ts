import { Component, inject, OnInit } from '@angular/core';
import { AuthLoginService } from '../../services/auth/auth-login.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authLoginService = inject(AuthLoginService);
  private readonly router = inject(Router);
  // private readonly formBuilder = inject(FormBuilder);

  apiError!: string;
  isCallingApi: boolean = false;

  toggleInput: boolean = false;

  loginForm!: FormGroup;

  //another sol and its better for forms

  // loginForm: FormGroup = this.formBuilder.group({
  //   email: [null, [Validators.required, Validators.email]],
  //   password: [
  //     null,
  //     [
  //       Validators.required,
  //       Validators.pattern(
  //         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/
  //       ),
  //     ],
  //   ],
  // });

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/
          //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
          //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        ),
      ]),
    });
  }

  togglePassword() {
    this.toggleInput = !this.toggleInput;
  }

  login() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      // this.loginForm.reset();
      this.apiError = '';
      if (!this.isCallingApi) {
        this.isCallingApi = true;
        this.authLoginService.loginUser(this.loginForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.isCallingApi = false;
            // localStorage.setItem('userToken', res.token);
            //or
            this.authLoginService.setToken(res.token);
            this.authLoginService.saveUserToken();
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
            this.apiError = err.error.message;
            this.isCallingApi = false;
          },
          complete() {
            console.log('completed Login');
          },
        });
      }
    }
  }
}
