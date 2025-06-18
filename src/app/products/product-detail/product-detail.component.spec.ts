import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { Product, ProductResolved } from '../../interfaces/product';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const mockProduct: Product = {
    id: '1',
    productName: 'Test Product',
    productCode: 'TP-001',
    category: 'Test Category',
    tags: ['test'],
    releaseDate: '2025-01-01',
    price: 99.99,
    description: 'Test Description',
    starRating: 4.5,
    imageUrl: 'test.jpg',
  };

  // Helper function to create ActivatedRoute mock with resolvedData
  function createActivatedRouteMock(resolvedData: ProductResolved) {
    return {
      snapshot: {
        data: {
          resolvedData,
        },
      },
    };
  }

  describe('when resolvedData has a valid product', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProductDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: createActivatedRouteMock({ product: mockProduct }),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProductDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set product and pageTitle on ngOnInit', () => {
      expect(component.product).toEqual(mockProduct);
      expect(component.pageTitle).toBe(
        `Product Detail: ${mockProduct.productName}`
      );
      expect(component.errorMessage).toBe('');
    });

    it('should update pageTitle to product name when onProductRetrieved is called', () => {
      component.onProductRetrieved(mockProduct);
      expect(component.pageTitle).toBe(
        `Product Detail: ${mockProduct.productName}`
      );
    });

    it('should update pageTitle to "No product found" when onProductRetrieved is called with null', () => {
      component.onProductRetrieved(null as any);
      expect(component.pageTitle).toBe('No product found');
    });
  });

  describe('when resolvedData has an error', () => {
    const errorMessage = 'Test error occurred';

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProductDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: createActivatedRouteMock({
              product: null,
              error: errorMessage,
            }),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProductDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set errorMessage on ngOnInit', () => {
      expect(component.errorMessage).toBe(errorMessage);
    });

    it('should have null product and default pageTitle', () => {
      expect(component.product).toBeNull();
      expect(component.pageTitle).toBe('Product Detail');
    });
  });

  describe('onProductRetrieved method', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProductDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: createActivatedRouteMock({ product: null }),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProductDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set product and pageTitle properly for a valid product', () => {
      component.onProductRetrieved(mockProduct);
      expect(component.product).toEqual(mockProduct);
      expect(component.pageTitle).toBe(
        `Product Detail: ${mockProduct.productName}`
      );
    });

    it('should set pageTitle to "No product found" when given null product', () => {
      component.onProductRetrieved(null as any);
      expect(component.product).toBeNull();
      expect(component.pageTitle).toBe('No product found');
    });
  });
});
