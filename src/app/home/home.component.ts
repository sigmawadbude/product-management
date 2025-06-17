import { Component } from '@angular/core';

/**
 * The `HomeComponent` is the landing page of the application.
 *
 * It displays a welcome message and credits the developer.
 */
@Component({
  // Inline HTML template for the home page
  template: `
    <div class="card">
      <div class="card-header">
        {{ title }}
      </div>
      <div class="card-body">
        <div class="container-fluid">
          <!-- Developer attribution -->
          <div class="text-center">Developed by:</div>
          <div class="text-center">
            <h3>{{ developedBy }}</h3>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {
  /**
   * The page title displayed in the header.
   */
  title = 'Welcome';

  /**
   * The name of the developer or organization being credited.
   */
  developedBy = 'Sigma Wadbude';
}
