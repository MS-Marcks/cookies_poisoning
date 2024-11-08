import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb: FormBuilder = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  form!: FormGroup;

  message: string = "";

  constructor() {
    this.form = this.fb.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.message = "Rellene todos los campos obligatorios";
      return;
    }

    try {
      const request = {
        user: this.form.get("user")?.getRawValue(),
        password: this.form.get("password")?.getRawValue(),
      }
      const response = await this.loginService.login(request);
      this.router.navigate(['/home']);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
