import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isloading = false;
  loginForm = new FormGroup({
    identifier: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // when compoent is redner then first constructer is called
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  get email() {
    // console.log(this.loginForm.get('email'));
    return this.loginForm.get('identifier');
  }
  get password() {
    return this.loginForm.get('password');
  }

  handleLoginSubmit() {
    const credential = {
      identifier: this.loginForm.value.identifier,
      password: this.loginForm.value.password,
    };
    this.isloading = true;
    this.authService.login(credential).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isloading = false;
        sessionStorage.setItem('token', JSON.stringify(res.jwt));
        sessionStorage.setItem('user_id', JSON.stringify(res.user.id));

        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Login Successfully',
        });
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.log(error);
        this.isloading = false;
        this.toast.error({
          detail: 'ERROR',
          summary: error.error.error.message,
          sticky: true,
        });
      },
    });
  }
}
