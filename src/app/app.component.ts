import { Component, inject } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Event as RouterEvent,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

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
  loading = true;

  private authService = inject(AuthService);
  private router = inject(Router);
  private messagesService = inject(MessageService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed() {
    return this.messagesService.isDisplayed;
  }

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  displayMessages() {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }
  hideMessages() {
    this.router.navigate([{ outlets: {popup: null} }]);
    this.messagesService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    this.messagesService.reset();
    console.log('Log out');
    this.router.navigate(['/login']);
  }
}
