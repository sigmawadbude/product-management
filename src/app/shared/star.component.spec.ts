import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarComponent } from './star.component';
import { By } from '@angular/platform-browser';

describe('StarComponent', () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StarComponent],
    });

    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate starWidth on changes', () => {
    component.rating = 4; // out of 5
    component.ngOnChanges();
    expect(component.starWidth).toBe((4 * 75) / 5);
  });

  it('should emit ratingClicked event on click', () => {
    spyOn(component.ratingClicked, 'emit');

    component.rating = 3;
    component.onClick();

    expect(component.ratingClicked.emit).toHaveBeenCalledWith(
      'The rating 3 was clicked!'
    );
  });

  it('should emit event when element is clicked (template bound)', () => {
    component.rating = 2;
    component.ngOnChanges();
    fixture.detectChanges();

    spyOn(component.ratingClicked, 'emit');

    const starElement = fixture.debugElement.query(By.css('div')).nativeElement;
    starElement.click();

    expect(component.ratingClicked.emit).toHaveBeenCalledWith(
      'The rating 2 was clicked!'
    );
  });
});
