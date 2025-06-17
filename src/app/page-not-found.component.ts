import { Component } from '@angular/core';

/**
 * The `PageNotFoundComponent` is displayed when no matching route is found.
 *
 * It serves as a fallback UI for invalid or non-existent routes,
 * providing users with feedback that they've navigated to an incorrect path.
 */
@Component({
  // Inline HTML template showing a user-friendly 404 message
  template: ` <h1>This is not the page you were looking for!</h1> `,
})
export class PageNotFoundComponent {}
