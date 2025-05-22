import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthRegisterService } from '../../services/auth/auth-register.service';
import { flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../../shared/ui/error-message/error-message.component";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authRegisterService = inject(AuthRegisterService);
  private readonly router = inject(Router);

  apiError!: string;
  isCallingApi: boolean = false;
  toggleInputPass: boolean = false;
  toggleInputRePass: boolean = false;

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/
            //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
            //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
          ),
        ]),
        rePassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/
            //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            //Minimum eight characters and  at least one uppercase letter, one lowercase letter, one number and one special character:
          ),
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/),
        ]),
      },
      //if have 1 func for validation make this --> this.validateRePassword  if have more make the lower
      //{ validators: [this.validateRePassword] }
      this.validateRePassword
    );
  }

  register() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      // this.registerForm.reset();
      this.apiError = '';
      if (!this.isCallingApi) {
        this.isCallingApi = true;
        this.authRegisterService
          .registerUser(this.registerForm.value)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.isCallingApi = false;
              this.router.navigate(['/auth/login']);
            },
            error: (err) => {
              console.log(err);
              this.apiError = err.error.message;
              this.isCallingApi = false;
            },
            complete() {
              console.log('completed Register');
            },
          });
      }
    }
  }

  togglePassword() {
    this.toggleInputPass = !this.toggleInputPass;
  }
  toggleRePassword() {
    this.toggleInputRePass = !this.toggleInputRePass;
  }

  validateRePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password == rePassword) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
}
