import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
}
