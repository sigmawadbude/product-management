import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    {
      id: '1',
      productName: 'Hammer',
      productCode: 'TBX-0011',
      category: 'Tools',
      price: 8.9,
      releaseDate: '2023-05-10',
      description: 'Curved claw steel hammer',
      starRating: 4.8,
      imageUrl: '',
      tags: ['tool', 'hammer'],
    },
    {
      id: '2',
      productName: 'Saw',
      productCode: 'TBX-0022',
      category: 'Tools',
      price: 11.55,
      releaseDate: '2023-03-20',
      description: '15-inch steel blade hand saw',
      starRating: 4.3,
      imageUrl: '',
      tags: ['tool', 'saw'],
    },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['getProducts']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ProductListComponent],
      declarations: [],
      providers: [{ provide: ProductService, useValue: spy }, CurrencyPipe],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    mockProductService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should filter products based on listFilter', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges(); // ngOnInit

    component.listFilter = 'saw';
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].productName).toContain('Saw');
  });

  it('should return all products if filter is empty', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges(); // ngOnInit

    component.listFilter = '';
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should toggle image visibility', () => {
    expect(component.showImage).toBeFalse();
    component.toggleImage();
    expect(component.showImage).toBeTrue();
  });

  it('should handle service error in ngOnInit', () => {
    const errorMessage = 'Server error';
    mockProductService.getProducts.and.returnValue(
      throwError(() => errorMessage)
    );

    fixture.detectChanges(); // ngOnInit

    expect(component.errorMessage).toBe(errorMessage);
    expect(component.products.length).toBe(0);
  });
});
