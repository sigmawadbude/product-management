import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

/**
 * Root component of the application.
 *
 * Acts as the main shell and container for routing.
 * All feature views and components will be rendered within this component
 * via the <router-outlet> directive.
 */
@Component({
  selector: 'app-root', // CSS selector for using this component in HTML
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // Enables Angular routing outlet for nested components
  templateUrl: './app.component.html', // External HTML template
  styleUrl: './app.component.css', // External CSS styles
})
export class AppComponent {
  /**
   * The main application title.
   * Displayed in the navigation bar or page header.
   */
  title = 'Product Management';

  private authService = inject(AuthService);
  private router = inject(Router);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigate(['/login']);
  }
}
