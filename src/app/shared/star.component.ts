import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

/**
 * `StarComponent` displays a visual representation of a product rating using stars.
 *
 * It accepts a numeric `rating` as input and emits an event when the star is clicked.
 */
@Component({
  selector: 'pm-star', // Custom HTML tag used to include this component
  templateUrl: './star.component.html', // External template for star display
  styleUrls: ['./star.component.css'], // CSS specific to star visuals
})
export class StarComponent implements OnChanges {
  /**
   * Input property to receive the numeric rating from the parent component.
   */
  @Input() rating = 0;

  /**
   * The calculated width of the star overlay based on the rating.
   * This is used to display partial stars.
   */
  starWidth = 0;

  /**
   * Output event that emits when a star is clicked.
   * It sends a string message indicating which rating was clicked.
   */
  @Output() ratingClicked = new EventEmitter<string>();

  /**
   * Angular lifecycle hook that is triggered whenever input properties change.
   * Used here to calculate the star width dynamically.
   */
  ngOnChanges(): void {
    this.starWidth = (this.rating * 75) / 5; // 75px is the full width of 5 stars
  }

  /**
   * Called when the star component is clicked.
   * Emits a message to the parent component with the clicked rating.
   */
  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
