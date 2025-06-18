import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage = '';
  pageTitle = 'Log In';

  private authService = inject(AuthService);
  private router = inject(Router);

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      // Navigate to the Product List page after log in.
      this.router.navigate(['/products']);
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
